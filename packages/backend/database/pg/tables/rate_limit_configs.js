import {exec, one, rows} from '../client.js';

export class RateLimitConfigs {
  static async save(config) {
    const {key, name, description, max, size, width, unit} = config;
    const query = {
      text: `
        insert into staff.rate_limit_configs (
          key,
          name,
          description,
          max,
          size,
          width,
          unit
        )
        values ($1, $2, $3, $4, $5, $6, $7)
        on conflict(key) do
        update set
          name = excluded.name,
          description = excluded.description,
          max = excluded.max,
          size = excluded.size,
          width = excluded.width,
          unit = excluded.unit,
          updated_at = current_timestamp;
      `,
      values: [key, name, description, max, size, width, unit],
    };
    await exec(query);
  }

  static async get(key) {
    const query = {
      text: `
        select *
        from staff.rate_limit_configs
        where key = $1
        limit 1;
      `,
      values: [key],
    };
    return exec(query).then(one);
  }

  static async getAll() {
    const query = {
      text: `
        select *
        from staff.rate_limit_configs;
      `,
    };
    return exec(query).then(rows);
  }
}
