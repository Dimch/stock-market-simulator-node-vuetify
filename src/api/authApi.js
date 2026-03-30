import {useClient, data} from './httpClient';

const api = client => ({
  isAuthenticated: () => client.get('/').then(data),
  authenticate: (username, password) => client.post('/', {username, password}).then(data),
  logout: () => client.delete('/'),
});

export const useAuthApi = () => useClient(`/admin/auth`, {api});
export const useStockAuthApi = () => useClient(`/stock-market/auth`, {api});
