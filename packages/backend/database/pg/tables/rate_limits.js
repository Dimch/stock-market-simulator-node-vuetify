import {exec, one, rows} from '../client.js';

export class RateLimits {
  // Implementation of Store interface for sliding-window-limiter package.
  // NOTE: Must store buckets column only, as used in package.
  // NOTE-2: In Postgres instead of "window" (special operator) use "buckets".
  static async set(key, salt, buckets) {
    const query = {
      text: `
        insert into staff.rate_limits (
          key,
          salt,
          buckets
        )
        values ($1, $2, $3)
        on conflict("key", salt) do
        update set
          buckets = excluded.buckets,
          updated_at = current_timestamp;
      `,
      values: [key, salt, buckets],
    };
    await exec(query);
  }

  // Implementation of Store interface for sliding-window-limiter package.
  // NOTE: Must return buckets column only, as used in package.
  static async get(key, salt) {
    const query = {
      text: `
        select
          buckets as "window",
          updated_at
        from staff.rate_limits
        where
          "key" = $1
          and salt = $2
        limit 1;
      `,
      values: [key, salt],
    };
    const limit = await exec(query).then(one);
    return limit ? limit.window : null;
  }

  static async getKeySaltPairs() {
    const query = {
      text: `
        select
          "key",
          salt,
          updated_at,
          buckets as "window"
        from staff.rate_limits;
      `,
    };
    return exec(query).then(rows);
  }

  static async getByKey(key) {
    const query = {
      text: `
        select
          salt,
          buckets as "window",
          updated_at
        from staff.rate_limits
        where key = $1
        order by salt asc;
      `,
      values: [key],
    };
    return exec(query).then(rows);
  }
}
