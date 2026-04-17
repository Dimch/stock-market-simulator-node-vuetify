export const init = (db) => {
  if (!db.isOpen) throw new Error('Database is not open');

  db.exec(`
    create table if not exists stock_prices (
      id          integer primary key not null,
      ticker      text not null,
      price       real not null,
      period      integer default 0 not null,
      foreign key (ticker) references stocks(ticker)
    );
  `);

  // Create an index for faster lookups by ticker and period
  db.exec(`
    create index if not exists idx_stock_prices_ticker_period
    on stock_prices(ticker, period);
  `);
};

export class StockPrices {
  constructor(db) {
    if (!db.isOpen) throw new Error('Database is not open');
    this.db = db;
  }

  static create(db) {
    return new StockPrices(db);
  }

  /**
   * Record a price point in the journal
   */
  recordPrice(ticker, price, period) {
    const stmt = this.db.prepare(`
      insert into stock_prices (ticker, price, period)
      values (?, ?, ?)
    `);
    stmt.run(ticker, price, period);
  }

  /**
   * Get price history for a ticker
   * @param {string} ticker - Stock ticker symbol
   * @param {number} periods - Number of periods to retrieve
   * @returns {Array} Array of {price} objects
   */
  getPriceHistory(ticker, periods = 30) {
    const stmt = this.db.prepare(`
      select price
      from stock_prices
      where ticker = ?
      order by period desc
      limit ?
    `);
    return stmt.all(ticker, periods).toReversed();
  }

  /**
   * Get the count of recorded prices for a ticker
   */
  getRecordCount(ticker) {
    const stmt = this.db.prepare(`
      select count(*) as count
      from stock_prices
      where ticker = ?
    `);
    return stmt.get(ticker)?.count || 0;
  }

  /**
   * Clear all price history (for testing)
   */
  clearHistory(ticker = null) {
    if (ticker) {
      const stmt = this.db.prepare(`delete from stock_prices where ticker = ?`);
      stmt.run(ticker);
    } else {
      this.db.exec(`delete from stock_prices`);
    }
  }
}
