import fp from 'lodash/fp.js';
import {RateLimitsRepo, db} from '../../database/sqlite/index.js';
const {split} = fp;

const getKeySalt = split('§');

export class RateLimitStoreAdapter extends RateLimitsRepo {
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

export const store = RateLimitStoreAdapter.create(db);
