import fp from 'lodash/fp.js';
import {RateLimits} from './rate_limits.js';
const {split} = fp;

const getKeySalt = split('§');

export class RateLimitStoreAdapter {
  static async makeKey(key, salt) {
    return `${key}§${salt}`;
  }

  static async get(_key) {
    const [key, salt] = getKeySalt(_key);
    return RateLimits.get(key, salt);
  }

  static async set(_key, window) {
    const [key, salt] = getKeySalt(_key);
    return RateLimits.set(key, salt, window);
  }
}
