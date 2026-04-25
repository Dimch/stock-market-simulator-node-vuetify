import {exec, one} from '../client.js';
import argon2 from 'argon2';

export const init = async () => {
  // Check if a default customer user exists
  const customerExists = await Customers.getByIp(DefaultCustomer().ip);
  if (customerExists) return;

  // Create a default customer user
  const hashedPassword = await argon2.hash('password');
  await Customers.new({...DefaultCustomer(), password: hashedPassword});
};

const DefaultCustomer = () => ({
  username: 'guest',
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
        insert into market.customers (
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
        from market.customers
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
        from market.customers
        where username = $1
          limit 1;
      `,
      values: [username],
    };
    return exec(query).then(one);
  }
}
