import fp from 'lodash/fp.js';
import {parseJson} from '../helpers.js';
const {map} = fp;

const parseWindow = parseJson('window');

export const init = async (db) => {
  if (!db.isOpen) throw new Error('Database is not open');

  db.exec(`
    create table if not exists rate_limits (
      id          integer primary key autoincrement,
      key         text not null,
      salt        text default '' not null,
      window      text default '{}' not null,
      updated_at  datetime default current_timestamp not null
    );
  `);

  // Create an index for faster lookups by key and salt
  db.exec(`
    create unique index if not exists idx_rate_limits_key_salt
    on rate_limits(key, salt);
  `);
};

export class RateLimits {
  constructor(db) {
    if (!db.isOpen) throw new Error('Database is not open');
    this.db = db;
  }

  static create(db) {
    return new RateLimits(db);
  }

  // Implementation of Store interface for sliding-window-limiter package.
  // NOTE: Must store window column only, as used in package.
  set(key, salt, window) {
    const stmt = this.db.prepare(`
      insert into rate_limits (
        key,
        salt,
        window
      )
      values (
        :key,
        :salt,
        :window
      )
      on conflict(key, salt) do
      update set
        window = excluded.window,
        updated_at = current_timestamp;
    `);
    stmt.run({key, salt, window: JSON.stringify(window)});
  }

  // Implementation of Store interface for sliding-window-limiter package.
  // NOTE: Must return window column only, as used in package.
  get(key, salt) {
    const stmt = this.db.prepare(`
      select window, updated_at
      from rate_limits
      where
        key = :key
        and salt = :salt
      limit 1;
    `);
    const limit = stmt.get({key, salt});
    return limit ? parseWindow(limit).window : null;
  }

  getKeySaltPairs() {
    const stmt = this.db.prepare(`
      select key, salt, updated_at, window
      from rate_limits;
    `);
    return map(parseWindow)(stmt.all());
  }

  getByKey(key) {
    const stmt = this.db.prepare(`
      select salt, window, updated_at
      from rate_limits
      where key = :key
      order by salt asc;
    `);
    const limits = stmt.all({key});
    return map(parseWindow)(limits);
  }
};
