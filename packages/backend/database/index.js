const dbType = process.env.DB || 'sqlite';

const service = await import(`./${dbType}/index.js`);
const {
  Admins,
  CustomerStocks,
  Customers,
  RateLimitConfigs,
  RateLimits,
  StockPrices,
  Stocks,
  Transactions,
  store,
} = service;

export {
  Admins,
  CustomerStocks,
  Customers,
  RateLimitConfigs,
  RateLimits,
  StockPrices,
  Stocks,
  Transactions,
  store,
};
