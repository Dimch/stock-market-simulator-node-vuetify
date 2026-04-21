/**
 * StockMarket Service
 * Manages stock prices and market simulation
 */
import fp from 'lodash/fp.js';
import {DateTime} from 'luxon';
import {Stocks, StockPrices} from '../../database/sqlite/index.js';
import {generatePriceSequence, updatePrice} from '../lib/stockSimulator.js';
const {first, flow, last, map, orderBy, slice} = fp;

const getPrices = map('price');
export function getTimeLabels(startDate = DateTime.now(), periodRange) {
  const now = startDate.startOf('minute');
  return Array.from({length: periodRange}, (_, i) => now.minus({minutes: periodRange - i}).toFormat('HH:mm'));
};

export class StockMarketService {
  constructor(StocksDb = Stocks, StockPricesDb = StockPrices) {
    this.stocks = StocksDb;
    this.stockPrices = StockPricesDb;
  }

  /**
   * Get all stocks with current prices
   */
  getAllStocks() {
    return this.stocks.getAllStocks();
  }

  /**
   * Get a single stock by ticker
   */
  getStock(ticker) {
    return this.stocks.getStock(ticker);
  }

  /**
   * Simulate a market tick - update all prices with realistic movement
   */
  simulateTick(volatility = 0.02) {
    const stocks = this.getAllStocks();
    const updates = stocks.map(stock => {
      const newPrice = updatePrice(stock.price, volatility);
      // Round to 2 decimal places
      const roundedPrice = Math.round(newPrice * 100) / 100;
      this.stocks.setPrice({ticker: stock.ticker, price: roundedPrice});
      // Record in price journal
      const period = this.stockPrices.getRecordCount(stock.ticker);
      this.stockPrices.recordPrice(stock.ticker, roundedPrice, period);
      return {
        ticker: stock.ticker,
        oldPrice: stock.price,
        newPrice: roundedPrice,
        change: roundedPrice - stock.price,
        changePercent: (roundedPrice - stock.price) / stock.price,
      };
    });
    return updates;
  }

  initializeStocks() {
    const stocks = this.getAllStocks();
    console.info(`Initializing stock price data for ${stocks.length} stocks...`);
    for (const stock of stocks) {
      this.initializeStockPriceData(stock.ticker);
    }
  }

  /* Initialize stock price data in journal,
   * By default generate 24 hours of minute-level data.
   * @param {string} ticker - Stock ticker symbol
   * @param {number} initialPeriods - Number of initial periods to generate
   */
  initializeStockPriceData(ticker, initialPeriods = 60 * 24) {
    const stock = this.getStock(ticker);
    if (!stock) throw new Error(`Stock with ticker ${ticker} not found`);

    // Generate initial price sequence
    const generated = generatePriceSequence(stock.price, initialPeriods, {reverse: true});
    // Record generated prices in journal
    for (const [idx, price] of generated.entries()) {
      const roundedPrice = Math.round(price * 100) / 100;
      this.stockPrices.recordPrice(ticker, roundedPrice, idx);
    }
  }

  /**
   * Get price history from journal, generate missing data if needed
   * Returns existing recorded prices and fills gaps with generated sequences
   */
  getPriceHistory(ticker, periods = 60) {
    const stock = this.getStock(ticker);
    if (!stock) return null;

    const {changeAmount, changePercent, prices} = this.calculateChange(stock, periods);
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

  calculateChange(stock, periods = 60, returnPrices = true) {
    const recordedPrices = this.stockPrices.getPriceHistory(stock.ticker, periods);

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

  getDashboard() {
    const periodRange = 60 * 24; // last 24 hours
    const stocks = this.getAllStocks();
    return flow(
      map(stock => {
        const {changeAmount, changePercent} = this.calculateChange(stock, periodRange, false);
        return {
          ...stock,
          changeAmount,
          changePercent,
          periodRange,
        };
      }),
      orderBy(['ticket'], ['asc']),
    )(stocks);
  }

  /**
   * Reset a stock price (for testing)
   */
  resetPrice(ticker, price) {
    this.stocks.setPrice({ticker, price});
    return this.getStock(ticker);
  }

  getTop(count = 5, periodRange = 60) {
    const stocks = this.getAllStocks();
    return flow(
      map(stock => {
        const {changeAmount, changePercent} = this.calculateChange(stock, periodRange, false);
        return {
          ...stock,
          changeAmount,
          changePercent,
          periodRange,
        };
      }),
      orderBy(['changeAmount'], ['desc']),
      slice(0, count),
    )(stocks);
  }
};

export const stockMarketService = new StockMarketService();
