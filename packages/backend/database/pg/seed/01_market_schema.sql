-- Create schema for market data
create schema market;
comment
on schema market is 'SStock market specific data, e.g. list of stocks and prices';
alter
schema market owner to postgres;

create table market.stocks
(
  id         serial
    constraint stocks_pk
      primary key,
  ticker     varchar(10)               not null,
  name       varchar(100)              not null,
  price      money                     not null,
  updated_at timestamptz default now() not null
);
comment
on table market.stocks is 'List of stocks available on the market';
alter table market.stocks owner to postgres;
create unique index stocks_ticker_uindex on market.stocks (ticker);

create table market.stock_prices
(
  ticker varchar(10) not null
    constraint stock_prices_stocks_ticker_fk
      references market.stocks (ticker),
  period integer not null,
  price  money       not null,
  constraint stock_prices_pk
    primary key (ticker, period)
);
alter table market.stock_prices owner to postgres;

create table market.customers
(
  id         serial
    constraint customers_pk
      primary key,
  username   varchar(255)              not null,
  password   text                      not null,
  name       varchar(255)              not null,
  ip         varchar(100)              not null,
  balance    money       default 0     not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
alter table market.customers owner to postgres;
create unique index customers_username_uindex on market.customers (username);

create table market.customer_stocks
(
  stock_id            integer                   not null
    constraint customer_stocks_stocks_id_fk
      references market.stocks,
  customer_id         integer                   not null
    constraint customer_stocks_customers_id_fk
      references market.customers,
  amount              integer                   not null,
  zero_amount_balance money                     not null,
  updated_at          timestamptz default now() not null,
  constraint customer_stocks_pk
    primary key (stock_id, customer_id)
);
alter table market.customer_stocks owner to postgres;

create table market.transactions
(
  id          serial
    constraint transactions_pk
      primary key,
  customer_id integer                   not null
    constraint transactions_customers_id_fk
      references market.customers,
  stock_id    integer                   not null
    constraint transactions_stocks_id_fk
      references market.stocks,
  amount      integer                   not null,
  price       money                     not null,
  created_at  timestamptz default now() not null
);
alter table market.transactions owner to postgres;
create index transactions_customer_id_index
  on market.transactions (customer_id);
create index transactions_stock_id_index
  on market.transactions (stock_id);

