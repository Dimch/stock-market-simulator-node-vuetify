import fp from 'lodash/fp.js';
import {RateLimits} from './rate_limits.js';
const {split} = fp;

const getKeySalt = split('§');

export class RateLimitStoreAdapter extends RateLimits {
  constructor(db) {
    super(db);
  }

  static create(db) {
    return new RateLimitStoreAdapter(db);
  }

  makeKey(key, salt) {
    return `${key}§${salt}`;
  }

  get(_key) {
    const [key, salt] = getKeySalt(_key);
    return super.get(key, salt);
  }

  set(_key, window) {
    const [key, salt] = getKeySalt(_key);
    return super.set(key, salt, window);
  }
}
