export const init = (db) => {
  if (!db.isOpen) throw new Error('Database is not open');

  db.exec(`
    create table if not exists transactions (
      id                        integer primary key not null,
      customer_id               integer not null,
      stock_id                  integer not null,
      amount                    integer not null,
      price                     real not null,
      created_at                datetime default current_timestamp not null,
      foreign key (customer_id) references customers(id) on delete no action,
      foreign key (stock_id)    references stocks(id) on delete no action
    );
  `);
};

export class Transactions {
  constructor(db) {
    if (!db.isOpen) throw new Error('Database is not open');
    this.db = db;
  }

  static create(db) {
    return new Transactions(db);
  }

  new(transaction = {customerId, stockId, amount, price}) {
    const stmt = this.db.prepare(`
      insert into transactions (
        customer_id,
        stock_id,
        amount,
        price
      )
      values (
        :customerId,
        :stockId,
        :amount,
        :price
      );
    `);
    stmt.run(transaction);
  }

  getByCustomer(customerId) {
    const stmt = this.db.prepare(`
      select *
      from transactions
      where customer_id = ?
      limit 5
    `);
    return stmt.all(customerId);
  }
};
