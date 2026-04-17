export const init = (db) => {
  if (!db.isOpen) throw new Error('Database is not open');

  db.exec(`
    create table if not exists customer_stocks (
      stock_id                  integer not null,
      customer_id               integer not null,
      amount                    integer not null,
      zero_amount_balance       real not null,
      updated_at                datetime default current_timestamp not null,
      primary key (stock_id, customer_id),
      foreign key (stock_id)    references stocks(id)
                                  on delete no action,
      foreign key (customer_id) references customers(id)
                                  on delete no action
    );
  `);
};

export class CustomerStocks {
  constructor(db) {
    if (!db.isOpen) throw new Error('Database is not open');
    this.db = db;
  }

  static create(db) {
    return new CustomerStocks(db);
  }

  save(customerStock) {
    const stmt = this.db.prepare(`
      insert into customer_stocks (
        customer_id,
        stock_id,
        amount,
        balance_amount
      )
      values (
        :customerId,
        :stockId,
        :amount,
        :balanceAmount
      )
      on conflict(customer_id, stock_id) do update set
        amount = excluded.amount,
        balance_amount = excluded.balance_amount,
        updated_at = current_timestamp
    `);

    stmt.run(customerStock);
  }
};
