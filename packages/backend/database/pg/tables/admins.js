import {exec, one} from '../client.js';
import argon2 from 'argon2';

// export const init = async (db) => {
//   if (!db.isOpen) throw new Error('Database is not open');
//
//   // Check if a default admin user exists
//   const adminExists = Admins.create(db).getByEmail('admin@example.com');
//   if (adminExists) return;
//   // Create a default admin user
//   const hashedPassword = await argon2.hash('password');
//   Admins.create(db).new({
//     name: 'Admin',
//     email: 'admin@example.com',
//     password: hashedPassword,
//   });
// };

export class Admins {
  static async new(admin) {
    const query = {
      text: `
        insert into admins (
          name,
          email,
          password
        )
        values ($1, $2, $3, $4));
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
        from admins
        where email = $1
        limit 1;
        `,
      values: [email],
    };
    return exec(query).then(one);
  }
}
