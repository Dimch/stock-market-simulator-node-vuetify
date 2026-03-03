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
      ('ZVEX', 'ZephyrVex Technologies', 150.00),
      ('NXUM', 'NexiumCore Systems', 2800.00),
      ('PYRX', 'PyreX Digital Solutions', 300.00),
      ('KXOR', 'KineticXOR Industries', 3500.00),
      ('VXLT', 'VaultX Entertainment', 600.00),
      ('OXEN', 'OxenMind Computing', 350.00),
      ('ZXFL', 'ZephyrFlow Innovations', 700.00);
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

  setPrice(stock = {ticker: '', price}) {
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
    
    stocks.forEach(stock => {
      const newPrice = updatePrice(stock.price, volatility);
      this.setPrice({ticker: stock.ticker, price: Math.round(newPrice * 100) / 100});
    });
  }
};
