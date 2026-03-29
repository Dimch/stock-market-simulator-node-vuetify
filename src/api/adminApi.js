import {useQuery} from '@pinia/colada';
import {useClient, data} from './httpClient';

const api = client => ({
  getRateLimits: () => client.get('/rate-limits').then(data),
  getStockPeriods: (ticker, periods) => client.get(`/stocks/${ticker}/${periods}`).then(data),
  getStocks: () => client.get(`/stocks`).then(data),
});

export const useAdminApi = () => useClient('/admin', {api});

export const useRateLimitQuery = () => useQuery({
  key: () => ['rateLimits'],
  query: async () => useAdminApi().getRateLimits(),
  placeholderData: () => [{}, {}, {}, {}], // placeholder for 4 rate limits
  staleTime: 9 * 1000,
});
