export const init = async (db) => {
  if (!db.isOpen) throw new Error('Database is not open');

  db.exec(`
    create table if not exists rate_limit_configs (
      key         text primary key not null,
      name        text not null,
      description text not null,
      max         real default 0 not null,
      size        int not null,
      width       int not null,
      unit        text not null,
      updated_at  datetime default current_timestamp not null
    );
  `);

  // TODO: Generate rate limit entries
  db.exec(`
    insert or ignore into rate_limit_configs (key, name, description, max, size, width, unit)
    values
      ('login_by_ip_admin', 'Logins', 'Max 5 attempts per minute', 5, 10, 6, 'second'),
      ('login_by_ip_customer', 'Logins', 'Max 10 attempts per minute', 10, 10, 6, 'second'),
      ('login_by_user_admin', 'Logins', 'Max 4 successful attempts per hour', 4, 60, 1, 'minute'),
      ('login_by_user_customer', 'Logins', 'Max 8 successful attempts per hour', 8, 60, 1, 'minute');
  `);
};

export class RateLimitConfigs {
  constructor(db) {
    if (!db.isOpen) throw new Error('Database is not open');
    this.db = db;
  }

  static create(db) {
    return new RateLimitConfigs(db);
  }

  save(config) {
    const stmt = this.db.prepare(`
      insert into rate_limit_configs (
        key,
        name,
        description,
        max,
        size,
        width,
        unit
      )
      values (
        :key,
        :name,
        :description,
        :max,
        :size,
        :width,
        :unit
      )
      on conflict(key) do
      update set
        name = excluded.name,
        description = excluded.description,
        max = excluded.max,
        size = excluded.size,
        width = excluded.width,
        unit = excluded.unit,
        updated_at = current_timestamp;
    `);
    stmt.run(config);
  }

  get(key) {
    const stmt = this.db.prepare(`
      select *
      from rate_limit_configs
      where key = ?
      limit 1;
    `);
    return stmt.get(key);
  }

  getAll() {
    const stmt = this.db.prepare(`
      select *
      from rate_limit_configs;
    `);
    return stmt.all();
  }
};
