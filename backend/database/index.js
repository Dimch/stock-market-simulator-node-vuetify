import {DatabaseSync} from 'node:sqlite';
import {init as initAdmins,
  Admins as AdminsRepo} from './tables/admins.js';
import {init as initCustomers,
  Customers as CustomersRepo} from './tables/customers.js';
import {init as initCustomerStocks,
  CustomerStocks as CustomerStocksRepo} from './tables/customer_stocks.js';
import {init as initStocks,
  Stocks as StocksRepo} from './tables/stocks.js';
import {init as initStockPrices,
  StockPrices as StockPricesRepo} from './tables/stock_prices.js';
import {init as initTransactions,
  Transactions as TransactionsRepo} from './tables/transactions.js';
import {init as initRateLimits,
  RateLimits as RateLimitsRepo} from './tables/rate_limits.js';
import {init as initRateLimitConfigs,
  RateLimitConfigs as RateLimitConfigsRepo} from './tables/rate_limit_configs.js';

// TODO: make database configurable

export const db = new DatabaseSync(':memory:');

export const Admins = AdminsRepo.create(db);
export const Customers = CustomersRepo.create(db);
export const CustomerStocks = CustomerStocksRepo.create(db);
export const Stocks = StocksRepo.create(db);
export const StockPrices = StockPricesRepo.create(db);
export const Transactions = TransactionsRepo.create(db);
export const RateLimits = RateLimitsRepo.create(db);
export const RateLimitConfigs = RateLimitConfigsRepo.create(db);

await initAdmins(db);
await initCustomers(db);
initStocks(db);
initStockPrices(db);
initTransactions(db);
initCustomerStocks(db);
initRateLimits(db);
initRateLimitConfigs(db);
export {RateLimits as RateLimitsRepo} from './tables/rate_limits.js';
