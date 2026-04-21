import argon2 from 'argon2';

export const init = async (db) => {
  if (!db.isOpen) throw new Error('Database is not open');

  db.exec(`
    create table if not exists admins (
      id          integer primary key not null,
      name        text not null,
      email       text unique not null,
      password    text not null,
      created_at  datetime default current_timestamp not null
    );
  `);

  // Check if a default admin user exists
  const adminExists = Admins.create(db).getByEmail('admin@example.com');
  if (adminExists) return;
  // Create a default admin user
  const hashedPassword = await argon2.hash('password');
  Admins.create(db).new({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
  });
};

export class Admins {
  constructor(db) {
    if (!db.isOpen) throw new Error('Database is not open');
    this.db = db;
  }

  static create(db) {
    return new Admins(db);
  }

  new(admin) {
    const stmt = this.db.prepare(`
      insert into admins (
        name,
        email,
        password
      )
      values (
        :name,
        :email,
        :password
      );
    `);
    stmt.run(admin);
  }

  getByEmail(email) {
    const stmt = this.db.prepare(`
      select *
      from admins
      where email = ?
      limit 1
    `);
    return stmt.get(email);
  }
};
