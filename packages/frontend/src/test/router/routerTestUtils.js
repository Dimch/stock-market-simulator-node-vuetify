import {vi} from 'vitest';

export const RouterPageStub = {
  render: () => null,
};

export const routerTestRoutes = [
  {
    path: '/',
    name: 'Landing',
    component: RouterPageStub,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'AdminAuthentication',
    component: RouterPageStub,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/404',
    name: '404',
    component: RouterPageStub,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/console/admin/dashboards/market',
    name: 'Market',
    component: RouterPageStub,
    meta: {
      requiresAuth: true,
      authStrategy: 'admin',
      loginRoute: '/login',
    },
  },
  {
    path: '/console/admin/dashboards/security',
    name: 'Security',
    component: RouterPageStub,
    meta: {
      requiresAuth: true,
      authStrategy: 'admin',
      loginRoute: '/login',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

export const createAuthStoreMock = (overrides = {}) => ({
  isAuthenticated: vi.fn().mockResolvedValue(false),
  loginRoute: '/login',
  redirectRoute: '/console/admin/dashboards/market',
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
