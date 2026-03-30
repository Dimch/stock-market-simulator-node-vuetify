import request from 'supertest';
import {beforeEach, describe, expect, it} from 'vitest';
import {createApplication} from '../backend/app.js';

const ADMIN_CREDENTIALS = {
  username: 'admin@example.com',
  password: 'password',
};

describe('/auth endpoints', () => {
  let app;
  let agent;

  const fetchCsrfToken = async () => {
    const res = await agent.get('/csrf-token');
    expect(res.status).toBe(200);
    expect(res.body.csrfToken).toBeTruthy();
    return res.body.csrfToken;
  };

  const login = async () => {
    const csrfToken = await fetchCsrfToken();
    return agent
      .post('/admin/auth')
      .set('x-csrf-token', csrfToken)
      .send(ADMIN_CREDENTIALS)
      .expect(200);
  };

  beforeEach(() => {
    app = createApplication();
    agent = request.agent(app);
  });

  describe('GET /csrf-token', () => {
    it('returns a CSRF token', async () => {
      const res = await agent.get('/csrf-token');
      expect(res.status).toBe(200);
      expect(res.body.csrfToken).toBeTruthy();
    });
  });

  describe('GET /admin/auth', () => {
    it('allows requests without a CSRF token', async () => {
      const res = await agent.get('/admin/auth');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({authenticated: false});
    });

    it('reflects authenticated session state', async () => {
      await login();
      const res = await agent.get('/admin/auth');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({authenticated: true});
    });
  });

  describe('POST /admin/auth', () => {
    it('requires a CSRF token', async () => {
      const res = await agent
        .post('/admin/auth')
        .send(ADMIN_CREDENTIALS);

      expect(res.status).toBe(419);
      expect(res.text).toBe('invalid csrf token');
    });

    it('authenticates valid credentials', async () => {
      const csrfToken = await fetchCsrfToken();

      const res = await agent
        .post('/admin/auth')
        .set('x-csrf-token', csrfToken)
        .send(ADMIN_CREDENTIALS);

      expect(res.status).toBe(200);
      console.error('Response body:', res.body);
      expect(res.body).toMatchObject({
        email: ADMIN_CREDENTIALS.username,
        name: 'Admin',
      });
      expect(res.body).toHaveProperty('id');
    });

    it('rejects invalid credentials', async () => {
      const csrfToken = await fetchCsrfToken();

      const res = await agent
        .post('/admin/auth')
        .set('x-csrf-token', csrfToken)
        .send({
          username: ADMIN_CREDENTIALS.username,
          password: 'not-the-password',
        });

      expect(res.status).toBe(401);
    });
  });

  describe('DELETE /admin/auth', () => {
    it('requires a CSRF token', async () => {
      const res = await agent.delete('/admin/auth');
      expect(res.status).toBe(419);
      expect(res.text).toBe('invalid csrf token');
    });

    it('logs out the active session', async () => {
      await login();

      const csrfToken = await fetchCsrfToken();
      const logoutRes = await agent
        .delete('/admin/auth')
        .set('x-csrf-token', csrfToken);

      expect(logoutRes.status).toBe(200);

      const postLogoutRes = await agent.get('/admin/auth');
      expect(postLogoutRes.status).toBe(200);
      expect(postLogoutRes.body).toMatchObject({authenticated: false});
    });
  });
});
