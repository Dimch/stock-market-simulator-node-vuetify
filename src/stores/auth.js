import {defineStore} from 'pinia';
import {useAuthApi, useStockAuthApi} from '@/api/authApi.js';
import {get} from 'lodash';

const strategyConfig = {
  admin: {
    use: useAuthApi,
    loginPath: '/login',
    redirectTo: '/console/admin/dashboards/market',
  },
  customer: {
    use: useStockAuthApi,
    loginPath: 'CustomerAuthentication',
  },
};

const useApiStrategy = strategy => strategyConfig[strategy]?.use() || useAuthApi();
const getLoginPath = strategy => strategyConfig[strategy]?.loginPath || '/login';
const getRedirectPath = strategy => strategyConfig[strategy]?.redirectTo || '/';

export const useAuthStore = strategy => defineStore('auth' + strategy?.toUpperCase(), () => {
  const api = useApiStrategy(strategy);
  const user = ref(null);
  const returnUrl = ref(null);
  const router = ref(null);

  const loginRoute = computed(() => getLoginPath(strategy));
  const redirectRoute = computed(() => getRedirectPath(strategy));

  const login = async (username, password) => {
    try {
      user.value = await api.authenticate(username, password);
      localStorage.setItem('user', JSON.stringify(user.value));
      router.value.push(returnUrl.value || redirectRoute.value);
    } catch (err) {
      console.error('Login error:', err);
    }
  };
  const logout = async () => {
    try {
      await api.logout();
      user.value = null;
      localStorage.removeItem('user');
      router.value.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };
  const isAuthenticated = async () => {
    try {
      const {authenticated, user: serverUser} = await api.isAuthenticated();
      if (!authenticated) {
        user.value = null;
        localStorage.removeItem('user');
      } else if (!user.value) {
        user.value = serverUser;
        localStorage.setItem('user', JSON.stringify(user.value));
      }
      return authenticated;
    } catch (err) {
      console.error('Authentication check error:', err);
    }
  };

  return {
    user,
    returnUrl,
    loginRoute,
    redirectRoute,
    login,
    logout,
    isAuthenticated,
    router,
  };
})();

export const useAdminAuthStore = () => useAuthStore('admin');
export const useCustomerAuthStore = () => useAuthStore('customer');