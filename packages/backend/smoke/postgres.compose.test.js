import request from 'supertest';
import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {createApplication} from '../src/app.js';
import {close as closePostgresPool} from '../database/pg/client.js';

const ADMIN_CREDENTIALS = {
  username: 'admin@example.com',
  password: 'password',
};

describe('Docker Compose Postgres smoke test', () => {
  let app;
  let agent;

  const fetchCsrfToken = async () => {
    const res = await agent.get('/csrf-token');
    expect(res.status).toBe(200);
    expect(res.body.csrfToken).toBeTruthy();
    return res.body.csrfToken;
  };

  beforeAll(() => {
    app = createApplication();
    agent = request.agent(app);
  });

  afterAll(async () => {
    await closePostgresPool();
  });

  it('authenticates the seeded admin against Postgres and returns seeded stock data', async () => {
    const healthRes = await agent.get('/health');
    expect(healthRes.status).toBe(200);

    const csrfToken = await fetchCsrfToken();
    const loginRes = await agent
      .post('/admin/auth')
      .set('x-csrf-token', csrfToken)
      .send(ADMIN_CREDENTIALS);

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toMatchObject({
      email: ADMIN_CREDENTIALS.username,
      name: 'Admin',
    });
    expect(loginRes.body).toHaveProperty('id');

    const stocksRes = await agent.get('/stock-market/stocks');
    expect(stocksRes.status).toBe(200);
    expect(stocksRes.body).toEqual(expect.any(Array));
    expect(stocksRes.body.length).toBeGreaterThanOrEqual(12);
    expect(stocksRes.body).toContainEqual(expect.objectContaining({
      ticker: 'ZVEX',
      name: 'Zephyr Vex Technologies',
      price: 150,
    }));
  });
});

