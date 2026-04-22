import {Admins, init as initAdmins} from './tables/admins.js';
export {CustomerStocks} from './tables/customer_stocks.js';
import {Customers, init as initCustomers} from './tables/customers.js';
export {Admins, Customers};
export {RateLimitConfigs} from './tables/rate_limit_configs.js';
export {RateLimits} from './tables/rate_limits.js';
export {StockPrices} from './tables/stock_prices.js';
export {Stocks} from './tables/stocks.js';
export {Transactions} from './tables/transactions.js';
export {RateLimitStoreAdapter as store} from './tables/rate_limit_store_adapter.js';

await initAdmins();
await initCustomers();
