import {exec, rows} from '../client.js';
import fp from 'lodash/fp.js';

const {flow, getOr} = fp;

const getCountOrZero = flow(rows, getOr(0, 'count'));

export class StockPrices {
  /**
   * Record a price point in the journal
   */
  static async recordPrice(ticker, price, period) {
    const query = {
      text: `
        insert into stock_prices (ticker, price, period)
        values ($1, $2, $3);
      `,
      values: [ticker, price, period],
    };
    await exec(query);
  }

  /**
   * Get price history for a ticker
   * @param {string} ticker - Stock ticker symbol
   * @param {number} periods - Number of periods to retrieve
   * @returns {Array} Array of {price} objects
   */
  static async getPriceHistory(ticker, periods = 30) {
    const query = {
      text: `
        select price
        from stock_prices
        where ticker = $1
        order by period desc
        limit $2;
      `,
      values: [ticker, periods],
    };
    const result = await exec(query).then(rows);
    return result.toReversed();
  }

  /**
   * Get the count of recorded prices for a ticker
   */
  static async getRecordCount(ticker) {
    const query = {
      text: `
        select count(*) as count
        from stock_prices
        where ticker = $1
      `,
      values: [ticker],
    };
    return exec(query).then(getCountOrZero);
  }

  /**
   * Clear all price history (for testing)
   */
  static async clearHistory(ticker = null) {
    const query = ticker
      ? ({
        text: `delete from stock_prices where ticker = $1;`,
        values: [ticker],
      })
      : ({
        text: `delete from stock_prices`,
      });
    await exec(query);
  }
}
