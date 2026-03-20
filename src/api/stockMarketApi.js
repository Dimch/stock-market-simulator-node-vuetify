import {useClient, data} from './httpClient';

// Stock Market API
// Provides methods to interact with stock market data
// such as retrieving stock prices and history.
// Used by frontend components to display stock information,
// and provide buy/sell functionality.
const api = client => ({
  getTop: () => client.get('/stocks/hot').then(data),
  getAllStocks: () => client.get('/stocks').then(data),
  getPriceHistory: (ticker, periods = 30) => client.get(`/history/${ticker}`, {params: {periods }}).then(data),
  buyStock: (ticker, quantity) => client.post(`/stocks/${ticker}/buy`, {quantity}).then(data),
  sellStock: (ticker, quantity) => client.post(`/stocks/${ticker}/sell`, {quantity}).then(data),
});

export const useStockMarketApi = () => useClient('/stock-market', {api});
