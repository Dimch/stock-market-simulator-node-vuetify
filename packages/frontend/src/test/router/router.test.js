import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createMemoryHistory} from 'vue-router';

const routerStoreMocks = vi.hoisted(() => ({
  authStore: null,
  csrfStore: null,
  uiStore: null,
}));

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(() => routerStoreMocks.authStore),
}));

vi.mock('@/stores/csrf', () => ({
  useCsrfStore: vi.fn(() => routerStoreMocks.csrfStore),
}));

vi.mock('@/stores/ui', () => ({
  useUIStore: vi.fn(() => routerStoreMocks.uiStore),
}));

import {createAppRouter} from '@/router';

const createAuthStore = (overrides = {}) => ({
  isAuthenticated: vi.fn().mockResolvedValue(false),
  loginRoute: '/login',
  redirectRoute: '/console/admin/dashboards/market',
  returnUrl: null,
  $patch: vi.fn(function patch(values) {
    Object.assign(this, values);
  }),
  ...overrides,
});

const createCsrfStore = (overrides = {}) => ({
  token: null,
  fetchToken: vi.fn().mockImplementation(async function fetchToken() {
    this.token = 'csrf-token';
  }),
  ...overrides,
});

const createUiStore = () => {
  const transitions = [];
  let isLoading = false;

  return {
    transitions,
    get isLoading() {
      return isLoading;
    },
    set isLoading(value) {
      transitions.push(value);
      isLoading = value;
    },
  };
};

describe('app router guards', () => {
  beforeEach(() => {
    localStorage.clear();
    routerStoreMocks.authStore = createAuthStore();
    routerStoreMocks.csrfStore = createCsrfStore();
    routerStoreMocks.uiStore = createUiStore();
  });

  it('redirects unauthenticated users to the login page and remembers the target route', async () => {
    const router = createAppRouter(createMemoryHistory());

    await router.push('/console/admin/dashboards/market');

    expect(router.currentRoute.value.fullPath).toBe('/login');
    expect(routerStoreMocks.authStore.$patch).toHaveBeenCalledWith({returnUrl: '/console/admin/dashboards/market'});
    expect(routerStoreMocks.authStore.returnUrl).toBe('/console/admin/dashboards/market');
    expect(routerStoreMocks.csrfStore.fetchToken).toHaveBeenCalledTimes(1);
    expect(routerStoreMocks.uiStore.transitions).toContain(true);
    expect(routerStoreMocks.uiStore.isLoading).toBe(false);
  }, 15000);

  it('does not fetch a csrf token again when one is already present', async () => {
    routerStoreMocks.csrfStore = createCsrfStore({token: 'existing-csrf-token'});
    const router = createAppRouter(createMemoryHistory());

    await router.push('/console/admin/dashboards/market');

    expect(router.currentRoute.value.fullPath).toBe('/login');
    expect(routerStoreMocks.csrfStore.fetchToken).not.toHaveBeenCalled();
  });

  it('redirects authenticated users away from the login page to their return URL', async () => {
    routerStoreMocks.authStore = createAuthStore({
      isAuthenticated: vi.fn().mockResolvedValue(true),
      returnUrl: '/console/admin/dashboards/security',
    });

    const router = createAppRouter(createMemoryHistory());
    await router.push('/login');

    expect(router.currentRoute.value.fullPath).toBe('/console/admin/dashboards/security');
  });

  it('redirects authenticated users from the login page to the default dashboard when no return URL is set', async () => {
    routerStoreMocks.authStore = createAuthStore({
      isAuthenticated: vi.fn().mockResolvedValue(true),
      returnUrl: null,
      redirectRoute: '/console/admin/dashboards/market',
    });

    const router = createAppRouter(createMemoryHistory());
    await router.push('/login');

    expect(router.currentRoute.value.fullPath).toBe('/console/admin/dashboards/market');
  });
});


