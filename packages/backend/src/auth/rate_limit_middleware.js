import fp from 'lodash/fp.js';
import {RateLimiter} from 'sliding-window-limiter';
import {store} from '../admin_services/rate_limit_store_adapter.js';
import {RateLimitConfigs} from '../../database/sqlite/index.js';
const {snakeCase} = fp;

export class RateLimit {
  constructor(key, salt) {
    this.key = key;
    this.salt = salt;
  }

  static async init(key, salt = '') {
    return await new RateLimit(key, salt).load();
  }

  async load() {
    const {size, width, unit, max, updated_at} = RateLimitConfigs.get(this.key);
    this.updatedAt = updated_at;
    this.limiter = await RateLimiter.load({
      name: store.makeKey(this.key, this.salt),
      max, store, window: {size, width, unit},
    });
    return this;
  }

  async update(value) {
    return this.limiter.update(value, new Date());
  }
}

const parseIp = ip => ip === '::1' ? '127.0.0.1' : ip;

export const limitAdminLoginByIp = strategyName => async (req, res, next) => {
  const limit = await RateLimit.init(`login_by_ip_${snakeCase(strategyName)}`, parseIp(req.ip));
  if (await limit.update(1))
    return next();
  res.status(429)
    .send('Too many login attempts from this IP, please try again later.');
};

export const limitAdminLoginByUser = strategyName => async (req, res, next) => {
  const limit = await RateLimit.init(`login_by_user_${snakeCase(strategyName)}`, req.user.email);
  if (await limit.update(1))
    return next();
  req.logout(() => res.status(429)
    .send('Too many login attempts for this user, please try again later.'),
  );
};
