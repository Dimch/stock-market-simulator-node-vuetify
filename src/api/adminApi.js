import {useClient, data} from './httpClient';

const api = client => ({
  getRateLimits: () => client.get('/rate-limits').then(data),
  getStockPeriods: (ticker, periods) => client.get(`/stocks/${ticker}/${periods}`).then(data),
  getStocks: () => client.get(`/stocks`).then(data),
});

export const useAdminApi = () => useClient('/admin', {api});
