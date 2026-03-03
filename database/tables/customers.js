import fp from 'lodash/fp.js';
const {defaults} = fp;
import argon2 from 'argon2';

export const init = async (db) => {
  if (!db.isOpen) throw new Error('Database is not open');

  db.exec(`
    create table if not exists customers (
      id          integer primary key not null,
      username    text unique not null,
      password    text not null,
      name        text not null,
      ip          text not null,
      balance     real default 100000 not null,
      created_at  datetime default current_timestamp not null
    )
  `);

  // Check if a default customer user exists
  const customerExists = Customers.create(db).getByIp(DefaultCustomer().ip);
  if (customerExists) return;
  // Create a default customer user
  const hashedPassword = await argon2.hash('password');
  Customers.create(db).new({...DefaultCustomer(), password: hashedPassword});
};

const DefaultCustomer = () => ({
  username: 'default_user',
  password: 'password', 
  name: 'Default Customer',
  ip: '127.0.0.1',
  balance: 100000,
});

export class Customers {
  constructor(db) {
    if (!db.isOpen) throw new Error('Database is not open');
    this.db = db;
  }

  static create(db) {
    return new Customers(db);
  }

  new(customer = {username, password, ip, balance}) {
    const stmt = this.db.prepare(`
      insert into customers (
        username,
        password,
        name,
        ip,
        balance
      )
      values (
        :username,
        :password,
        :name,
        :ip,
        :balance
      );
    `);
    stmt.run(customer);
  }

  getByIp(ip) {
    const stmt = this.db.prepare(`
      select *
      from customers
      where ip = ?
      limit 1;
    `);
    return stmt.get(ip);
  }

  getByUsername(username) {
    const stmt = this.db.prepare(`
      select *
      from customers
      where username = ?
      limit 1;
    `);
    return stmt.get(username);
  }
};
