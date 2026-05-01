import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createPinia, setActivePinia} from 'pinia';
import {useAuthStore} from '@/stores/auth';
import {createUser} from '@/test/factories';

const authApiMocks = vi.hoisted(() => ({
  adminApi: {
    authenticate: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: vi.fn(),
  },
  customerApi: {
    authenticate: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: vi.fn(),
  },
}));

vi.mock('@/api/authApi.js', () => ({
  useAuthApi: () => authApiMocks.adminApi,
  useStockAuthApi: () => authApiMocks.customerApi,
}));

describe('auth store', () => {
  const routerPush = vi.fn();

  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    routerPush.mockReset();

    for (const api of [authApiMocks.adminApi, authApiMocks.customerApi]) {
      api.authenticate.mockReset();
      api.logout.mockReset();
      api.isAuthenticated.mockReset();
    }
  });

  it('logs in an admin user, persists the user, and redirects to the return URL', async () => {
    const user = createUser();
    authApiMocks.adminApi.authenticate.mockResolvedValue(user);

    const store = useAuthStore('admin');
    store.$patch({
      router: {push: routerPush},
      returnUrl: '/console/admin/dashboards/security',
    });

    await store.login('admin@example.com', 'password');

    expect(authApiMocks.adminApi.authenticate).toHaveBeenCalledWith('admin@example.com', 'password');
    expect(store.user).toEqual(user);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(user);
    expect(routerPush).toHaveBeenCalledWith('/console/admin/dashboards/security');
  });

  it('rethrows login failures so the UI can surface the error', async () => {
    const loginError = new Error('Invalid credentials');
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    authApiMocks.adminApi.authenticate.mockRejectedValue(loginError);

    const store = useAuthStore('admin');
    store.$patch({router: {push: routerPush}});

    await expect(store.login('admin@example.com', 'wrong-password')).rejects.toThrow('Invalid credentials');
    expect(consoleError).toHaveBeenCalledWith('Login error:', loginError);
    expect(store.user).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(routerPush).not.toHaveBeenCalled();
  });

  it('logs out and clears persisted user state', async () => {
    authApiMocks.adminApi.logout.mockResolvedValue(undefined);

    const store = useAuthStore('admin');
    store.$patch({
      router: {push: routerPush},
      user: createUser(),
    });
    localStorage.setItem('user', JSON.stringify(store.user));

    await store.logout();

    expect(authApiMocks.adminApi.logout).toHaveBeenCalledTimes(1);
    expect(store.user).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(routerPush).toHaveBeenCalledWith('/');
  });

  it('hydrates the user from the server when authenticated', async () => {
    const user = createUser({name: 'Hydrated Admin'});
    authApiMocks.adminApi.isAuthenticated.mockResolvedValue({authenticated: true, user});

    const store = useAuthStore('admin');

    await expect(store.isAuthenticated()).resolves.toBe(true);
    expect(store.user).toEqual(user);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual(user);
  });

  it('clears stale local state when the session is no longer authenticated', async () => {
    authApiMocks.adminApi.isAuthenticated.mockResolvedValue({authenticated: false, user: null});

    const store = useAuthStore('admin');
    store.$patch({user: createUser()});
    localStorage.setItem('user', JSON.stringify(store.user));

    await expect(store.isAuthenticated()).resolves.toBe(false);
    expect(store.user).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('uses the customer API strategy and default redirect configuration', async () => {
    const user = createUser({email: 'trader@example.com', name: 'Trader'});
    authApiMocks.customerApi.authenticate.mockResolvedValue(user);

    const store = useAuthStore('customer');
    store.$patch({router: {push: routerPush}});

    await store.login('trader@example.com', 'password');

    expect(authApiMocks.customerApi.authenticate).toHaveBeenCalledWith('trader@example.com', 'password');
    expect(store.loginRoute).toBe('CustomerAuthentication');
    expect(store.redirectRoute).toBe('/');
    expect(routerPush).toHaveBeenCalledWith('/');
  });
});


