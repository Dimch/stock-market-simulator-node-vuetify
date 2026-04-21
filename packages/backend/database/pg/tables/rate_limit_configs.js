import {exec, one, rows} from '../client.js';

//   // TODO: Generate rate limit entries
//   db.exec(`
//     insert or ignore into rate_limit_configs (key, name, description, max, size, width, unit)
//     values
//       ('login_by_ip_admin', 'Logins', 'Max 5 attempts per minute', 5, 10, 6, 'second'),
//       ('login_by_ip_customer', 'Logins', 'Max 10 attempts per minute', 10, 10, 6, 'second'),
//       ('login_by_user_admin', 'Logins', 'Max 4 successful attempts per hour', 4, 60, 1, 'minute'),
//       ('login_by_user_customer', 'Logins', 'Max 8 successful attempts per hour', 8, 60, 1, 'minute');
//   `;

export class RateLimitConfigs {
  static async save(config) {
    const {key, name, description, max, size, width, unit} = config;
    const query = {
      text: `
        insert into rate_limit_configs (
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
        from rate_limit_configs
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
        from rate_limit_configs;
      `,
    };
    return exec(query).then(rows);
  }
}
