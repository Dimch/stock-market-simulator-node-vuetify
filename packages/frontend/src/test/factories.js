export const createUser = (overrides = {}) => ({
  id: 1,
  email: 'admin@example.com',
  name: 'Admin',
  ...overrides,
});

export const createStock = (overrides = {}) => ({
  ticker: 'ZVEX',
  name: 'Zephyr Vex Technologies',
  price: 150,
  changeAmount: 4.5,
  changePercent: 3.1,
  ...overrides,
});

export const createRateLimit = (overrides = {}) => ({
  title: 'Admin login',
  description: 'Rate limit for admin authentication requests',
  salt: '10/minute',
  value: 4,
  max: 10,
  percentage: 0.4,
  updatedAt: '2026-05-01T00:00:00.000Z',
  size: 1,
  unit: 'minute',
  bucket: {
    unit: 'minute',
    width: 1,
  },
  data: [0, 1, 2, 4],
  ...overrides,
});

export const createCsrfPayload = (csrfToken = 'test-csrf-token') => ({csrfToken});

