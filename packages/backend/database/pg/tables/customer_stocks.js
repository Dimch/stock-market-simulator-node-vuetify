import {exec} from '../client.js';

export class CustomerStocks {
  static async save(customerStock) {
    const {customerId, stockId, amount, balanceAmount} = customerStock;
    const query = {
      text: `
        insert into customer_stocks (
          customer_id,
          stock_id,
          amount,
          balance_amount
        )
        values ($1, $2, $3, $4)
          on conflict(customer_id, stock_id) do update set
            amount = excluded.amount,
            balance_amount = excluded.balance_amount,
            updated_at = current_timestamp;
      `,
      values: [customerId, stockId, amount, balanceAmount],
    };
    await exec(query);
  }
}
