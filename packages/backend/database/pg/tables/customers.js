import {exec, rows, one} from '../client.js';
import fp from 'lodash/fp.js';
import argon2 from 'argon2';
const {defaults} = fp;

// export const init = async (db) => {
//   if (!db.isOpen) throw new Error('Database is not open');
//
//   db.exec(`
//     create table if not exists customers (
//       id          integer primary key not null,
//       username    text unique not null,
//       password    text not null,
//       name        text not null,
//       ip          text not null,
//       balance     real default 100000 not null,
//       created_at  datetime default current_timestamp not null
//     )
//   `);
//
//   // Check if a default customer user exists
//   const customerExists = Customers.create(db).getByIp(DefaultCustomer().ip);
//   if (customerExists) return;
//   // Create a default customer user
//   const hashedPassword = await argon2.hash('password');
//   Customers.create(db).new({...DefaultCustomer(), password: hashedPassword});
// };

const DefaultCustomer = () => ({
  username: 'default_user',
  password: 'password',
  name: 'Default Customer',
  ip: '127.0.0.1',
  balance: 100_000,
});

export class Customers {
  static async new(customer) {
    const {username, password, name, ip, balance} = customer;
    const query = {
      text: `
        insert into customers (
          username,
          password,
          name,
          ip,
          balance
        )
        values ($1, $2, $3, $4, $5);
      `,
      values: [username, password, name, ip, balance],
    };
    await exec(query);
  }

  static async getByIp(ip) {
    const query = {
      text: `
        select *
        from customers
        where ip = $1
        limit 1;
      `,
      values: [ip],
    };
    return exec(query).then(one);
  }

  static async getByUsername(username) {
    const query = {
      text: `
        select *
        from customers
        where username = $1
          limit 1;
      `,
      values: [username],
    };
    return exec(query).then(one);
  }
}
