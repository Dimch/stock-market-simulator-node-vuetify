import {exec, rows} from '../client.js';
import fp from 'lodash/fp.js';

const {flow, get} = fp;

const getPrice = flow(rows, get('price'));

//   // Populate with some default stocks
//   db.exec(`
//     insert or ignore into stocks (ticker, name, price)
//     values
//       ('ZVEX', 'Zephyr Vex Technologies', 150.00),
//       ('NRVS', 'NervousCore Systems', 2800.00),
//       ('PYRO', 'Pyro Digital Solutions', 300.00),
//       ('KORI', 'Kinetic OR Industries', 3500.00),
//       ('VELT', 'Vault Entertainment', 600.00),
//       ('OXEN', 'OxenMind Computing', 350.00),
//       ('SFFL', 'SaffronFlow Innovations', 700.00),
//       ('QAUM', 'Quantum Analytics', 2200.00),
//       ('RXOL', 'Radius Box Solutions', 450.00),
//       ('PRZU', 'Zaibatzu Pharmaceuticals', 1800.00),
//       ('AMLG', 'Amalgam Amalgamation', 550.00),
//       ('UZEN', 'UltraZen Networks', 1200.00);
//   `);

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
