import {exec, rows} from '../client.js';
import fp from 'lodash/fp.js';

const {flow, get} = fp;

const getPrice = flow(rows, get('price'));

export class Stocks {
  static async setPrice(stock) {
    const {ticker, price} = stock;
    const query = {
      text: `
        update stocks
        set
          price = $1,
          updated_at = now()
        where
          ticker = $2;
      `,
      values: [price, ticker],
    };
    await exec(query);
  }

  static async getPrice(ticker) {
    const query = {
      text: `
        select price
        from stocks
        where ticker = $1
        limit 1;
      `,
      values: [ticker],
    };
    return exec(query).then(getPrice);
  }

  static async getStock(ticker) {
    const query = {
      text: `
        select id, ticker, name, price, updated_at
        from stocks
        where ticker = $1
        limit 1
      `,
      values: [ticker],
    };
    return exec(query).then(rows);
  }

  static async getAllStocks() {
    const query = {
      text: `
        select id, ticker, name, price, updated_at
        from stocks
        order by ticker;
      `,
    };
    return exec(query).then(rows);
  }

  static async updateAllPrices(volatility = 0.02) {
    const {updatePrice} = await import('../../../src/lib/stockSimulator.js');
    const stocks = this.getAllStocks();

    for (const stock of stocks) {
      const newPrice = updatePrice(stock.price, volatility);
      await this.setPrice({ticker: stock.ticker, price: Math.round(newPrice * 100) / 100});
    }
  }
}
