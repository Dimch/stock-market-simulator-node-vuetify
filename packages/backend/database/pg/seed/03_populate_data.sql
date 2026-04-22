-- Populate Rate Limit configurations
insert into staff.rate_limit_configs
  (key, name, description, max, size, width, unit)
values
  ('login_by_ip_admin', 'Logins', 'Max 5 attempts per minute', 5, 10, 6, 'second'),
  ('login_by_ip_customer', 'Logins', 'Max 10 attempts per minute', 10, 10, 6, 'second'),
  ('login_by_user_admin', 'Logins', 'Max 4 successful attempts per hour', 4, 60, 1, 'minute'),
  ('login_by_user_customer', 'Logins', 'Max 8 successful attempts per hour', 8, 60, 1, 'minute');

-- Populate Stocks initial data
insert into market.stocks (ticker, name, price)
values
  ('ZVEX', 'Zephyr Vex Technologies', 150.00),
  ('NRVS', 'NervousCore Systems', 2800.00),
  ('PYRO', 'Pyro Digital Solutions', 300.00),
  ('KORI', 'Kinetic OR Industries', 3500.00),
  ('VELT', 'Vault Entertainment', 600.00),
  ('OXEN', 'OxenMind Computing', 350.00),
  ('SFFL', 'SaffronFlow Innovations', 700.00),
  ('QAUM', 'Quantum Analytics', 2200.00),
  ('RXOL', 'Radius Box Solutions', 450.00),
  ('PRZU', 'Zaibatzu Pharmaceuticals', 1800.00),
  ('AMLG', 'Amalgam Amalgamation', 550.00),
  ('UZEN', 'UltraZen Networks', 1200.00);
