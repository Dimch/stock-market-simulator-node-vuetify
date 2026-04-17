export const init = (db) => {
  if (!db.isOpen) throw new Error('Database is not open');

  db.exec(`
    create table if not exists stocks (
      id          integer primary key not null,
      ticker      text unique not null,
      name        text not null,
      price       real not null,
      updated_at  datetime default current_timestamp not null
    );
  `);

  // Populate with some default stocks
  db.exec(`
    insert or ignore into stocks (ticker, name, price)
    values
      ('ZVEX', 'Zephyr Vex Technologies', 150.00),
      ('NRVS', 'NervousCore Systems', 2800.00),
      ('PYRO', 'Pyro Digital Solutions', 300.00),
      ('KORI', 'Kinetic OR Industries', 3500.00),
      ('VELT', 'Vault Entertainment', 600.00),
      ('OXEN', 'OxenMind Computing', 350.00),
      ('SFFL', 'SaffronFlow Innovations', 700.00),
      ('QAUM', 'Quantum Analytics', 2200.00),
      ('RXOL', 'Radius Box Solutions', 450.00),
      ('PRZU', 'Zaibatzu Pharmaceuticals', 1800.00),
      ('AMLG', 'Amalgam Amalgamation', 550.00),
      ('UZEN', 'UltraZen Networks', 1200.00);
  `);
};

export class Stocks {
  constructor(db) {
    if (!db.isOpen) throw new Error('Database is not open');
    this.db = db;
  }

  static create(db) {
    return new Stocks(db);
  }

  setPrice(stock) {
    const stmt = this.db.prepare(`
      update stocks
      set
        price = :price,
        updated_at = current_timestamp
      where
        ticker = :ticker;
    `);

    stmt.run(stock);
  }

  getPrice(ticker) {
    const stmt = this.db.prepare(`
      select price
      from stocks
      where ticker = ?
      limit 1;
    `);
    return stmt.get(ticker)?.price;
  }

  getStock(ticker) {
    const stmt = this.db.prepare(`
      select id, ticker, name, price, updated_at
      from stocks
      where ticker = ?
      limit 1
    `);
    return stmt.get(ticker);
  }

  getAllStocks() {
    const stmt = this.db.prepare(`
      select id, ticker, name, price, updated_at
      from stocks
      order by ticker;
    `);
    return stmt.all();
  }

  async updateAllPrices(volatility = 0.02) {
    const {updatePrice} = await import('../../lib/stockSimulator.js');
    const stocks = this.getAllStocks();

    for (const stock of stocks) {
      const newPrice = updatePrice(stock.price, volatility);
      this.setPrice({ticker: stock.ticker, price: Math.round(newPrice * 100) / 100});
    }
  }
};
