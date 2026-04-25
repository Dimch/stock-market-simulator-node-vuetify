/**
 * StockMarket Service
 * Manages stock prices and market simulation
 */
import fp from 'lodash/fp.js';
import {DateTime} from 'luxon';
import {Stocks, StockPrices} from '../../database/index.js';
import {generatePriceSequence, updatePrice} from '../lib/stockSimulator.js';
const {first, flow, last, map, orderBy, slice} = fp;

const getPrices = map('price');
export function getTimeLabels(startDate = DateTime.now(), periodRange) {
  const now = startDate.startOf('minute');
  return Array.from({length: periodRange}, (_, i) => now.minus({minutes: periodRange - i}).toFormat('HH:mm'));
}

export class StockMarketService {
  constructor(StocksDb = Stocks, StockPricesDb = StockPrices) {
    this.stocks = StocksDb;
    this.stockPrices = StockPricesDb;
  }

  /**
   * Get all stocks with current prices
   */
  async getAllStocks() {
    return this.stocks.getAllStocks();
  }

  /**
   * Get a single stock by ticker
   */
  async getStock(ticker) {
    return this.stocks.getStock(ticker);
  }

  /**
   * Simulate a market tick - update all prices with realistic movement
   */
  async simulateTick(volatility = 0.02) {
    const stocks = await this.getAllStocks();
    const updates = [];
    for (const stock of stocks) {
      const newPrice = await updatePrice(stock.price, volatility);
      // Round to 2 decimal places
      const roundedPrice = Math.round(newPrice * 100) / 100;
      await this.stocks.setPrice({ticker: stock.ticker, price: roundedPrice});
      // Record in price journal
      const period = await this.stockPrices.getRecordCount(stock.ticker);
      await this.stockPrices.recordPrice(stock.ticker, roundedPrice, period);
      updates.push({
        ticker: stock.ticker,
        oldPrice: stock.price,
        newPrice: roundedPrice,
        change: roundedPrice - stock.price,
        changePercent: (roundedPrice - stock.price) / stock.price,
      });
    }
    return updates;
  }

  async initializeStocks() {
    const stocks = await this.getAllStocks();
    console.info(`Deleting stock price data for ${stocks.length} stocks...`);
    await this.stockPrices.clearHistory();
    console.info(`Initializing stock price data for ${stocks.length} stocks...`);
    for (const stock of stocks) {
      await this.initializeStockPriceData(stock.ticker);
    }
    console.info('Stock prices initialized.');
  }

  /* Initialize stock price data in journal,
   * By default generate 24 hours of minute-level data.
   * TODO: run stock initialization process in the async flow.
   * @param {string} ticker - Stock ticker symbol
   * @param {number} initialPeriods - Number of initial periods to generate
   */
  async initializeStockPriceData(ticker, initialPeriods = 60 * 24) {
    const stock = await this.getStock(ticker);
    if (!stock) throw new Error(`Stock with ticker ${ticker} not found`);

    // Generate initial price sequence
    const generated = generatePriceSequence(stock.price, initialPeriods, {reverse: true});
    // Record generated prices in journal
    for (const [idx, price] of generated.entries()) {
      const roundedPrice = Math.round(price * 100) / 100;
      await this.stockPrices.recordPrice(ticker, roundedPrice, idx);
    }
  }

  /**
   * Get price history from journal, generate missing data if needed
   * Returns existing recorded prices and fills gaps with generated sequences
   */
  async getPriceHistory(ticker, periods = 60) {
    const stock = await this.getStock(ticker);
    if (!stock) return null;

    const {changeAmount, changePercent, prices} = await this.calculateChange(stock, periods);
    const timeLabels = getTimeLabels(DateTime.fromSQL(stock.updated_at), prices.length);

    return {
      ticker: stock.ticker,
      name: stock.name,
      currentPrice: stock.price,
      changeAmount,
      changePercent,
      prices,
      timeLabels,
    };
  }

  async calculateChange(stock, periods = 60, returnPrices = true) {
    const recordedPrices = await this.stockPrices.getPriceHistory(stock.ticker, periods);

    const prices = getPrices(recordedPrices);
    const firstPrice = first(prices) || stock.price;
    const lastPrice = last(prices) || stock.price;
    const changeAmount = lastPrice - firstPrice;
    const changePercent = firstPrice ? (changeAmount / firstPrice * 100) : 0;

    return {
      changeAmount,
      changePercent,
      prices: returnPrices ? prices : undefined,
    };
  }

  async getDashboard() {
    const periodRange = 60 * 24; // last 24 hours
    const stocks = await this.getAllStocks();
    const result = [];
    for (const stock of stocks) {
      const {changeAmount, changePercent} = await this.calculateChange(stock, periodRange, false);
      result.push({
        ...stock,
        changeAmount,
        changePercent,
        periodRange,
      });
    }
    return orderBy(['ticket'], ['asc'])(result);
  }

  /**
   * Reset a stock price (for testing)
   */
  async resetPrice(ticker, price) {
    await this.stocks.setPrice({ticker, price});
    return this.getStock(ticker);
  }

  async getTop(count = 5, periodRange = 60) {
    const stocks = await this.getAllStocks();
    const result = [];
    for (const stock of stocks) {
      const {changeAmount, changePercent} = await this.calculateChange(stock, periodRange, false);
      result.push({
        ...stock,
        changeAmount,
        changePercent,
        periodRange,
      });
    }
    return flow(orderBy(['changeAmount'], ['desc']), slice(0, count))(result);
  }
}

export const stockMarketService = new StockMarketService();
