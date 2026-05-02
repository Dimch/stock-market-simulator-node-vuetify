import {vi} from 'vitest';

export const ROUTER_TEST_PATHS = {
  landing: '/',
  login: '/login',
  notFound: '/404',
  marketDashboard: '/console/admin/dashboards/market',
  securityDashboard: '/console/admin/dashboards/security',
};

export const RouterPageStub = {
  render: () => null,
};

export const routerTestRoutes = [
  {
    path: ROUTER_TEST_PATHS.landing,
    name: 'Landing',
    component: RouterPageStub,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: ROUTER_TEST_PATHS.login,
    name: 'AdminAuthentication',
    component: RouterPageStub,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: ROUTER_TEST_PATHS.notFound,
    name: '404',
    component: RouterPageStub,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: ROUTER_TEST_PATHS.marketDashboard,
    name: 'Market',
    component: RouterPageStub,
    meta: {
      requiresAuth: true,
      authStrategy: 'admin',
      loginRoute: ROUTER_TEST_PATHS.login,
    },
  },
  {
    path: ROUTER_TEST_PATHS.securityDashboard,
    name: 'Security',
    component: RouterPageStub,
    meta: {
      requiresAuth: true,
      authStrategy: 'admin',
      loginRoute: ROUTER_TEST_PATHS.login,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTER_TEST_PATHS.notFound,
  },
];

export const createAuthStoreMock = (overrides = {}) => ({
  isAuthenticated: vi.fn().mockResolvedValue(false),
  loginRoute: ROUTER_TEST_PATHS.login,
  redirectRoute: ROUTER_TEST_PATHS.marketDashboard,
  returnUrl: null,
  $patch: vi.fn(function patch(values) {
    Object.assign(this, values);
  }),
  ...overrides,
});

export const createCsrfStoreMock = (overrides = {}) => ({
  token: null,
  fetchToken: vi.fn().mockImplementation(async function fetchToken() {
    this.token = 'csrf-token';
  }),
  ...overrides,
});

export const createUiStoreMock = () => {
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
