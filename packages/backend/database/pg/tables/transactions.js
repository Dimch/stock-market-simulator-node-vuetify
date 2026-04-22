import {exec, rows} from '../client.js';

export class Transactions {
  static async new(transaction) {
    const {customerId, stockId, amount, price} = transaction;
    const query = {
      text: `
        insert into market.transactions (
          customer_id,
          stock_id,
          amount,
          price
        )
        values ($1, $2, $3, $4);
      `,
      values: [
        customerId,
        stockId,
        amount,
        price,
      ],
    };
    await exec(query);
  }

  static async getByCustomer(customerId) {
    const query = {
      text: `
        select *
        from market.transactions
        where customer_id = ?
        limit 5;
      `,
      values: [customerId],
    };
    return exec(query).then(rows);
  }
}
