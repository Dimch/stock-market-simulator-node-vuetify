import {exec, one} from '../client.js';
import argon2 from 'argon2';

export const init = async () => {
  const email = 'admin@example.com';

  // Check if a default admin user exists
  const adminExists = await Admins.getByEmail(email);
  if (adminExists) return;

  // Create a default admin user
  const password = await argon2.hash('password');
  await Admins.new({name: 'Admin', email, password});
};

export class Admins {
  static async new(admin) {
    const query = {
      text: `
        insert into staff.admins (
          name,
          email,
          password
        )
        values ($1, $2, $3);
        `,
      values: [
        admin.name,
        admin.email,
        admin.password,
      ],
    };
    return exec(query);
  }

  static async getByEmail(email) {
    const query = {
      text: `
        select *
        from staff.admins
        where email = $1
        limit 1;
        `,
      values: [email],
    };
    return exec(query).then(one);
  }
}
