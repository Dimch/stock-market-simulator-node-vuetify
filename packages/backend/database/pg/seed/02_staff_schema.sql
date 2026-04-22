-- Create schema for administration staff data
create schema staff;
comment
on schema staff is 'Website''s administration console related data, e.g. administrators and rate limits';
alter
schema staff owner to postgres;

create table staff.admins
(
  id        serial
    constraint admins_pk
      primary key,
  name      varchar(255)              not null,
  email     varchar(255)              not null,
  password  text                      not null,
  crated_at timestamptz default now() not null
);
comment on table staff.admins is 'Administration staff';
alter table staff.admins owner to postgres;
create unique index admins_email_uindex
  on staff.admins (email);

create table staff.rate_limits
(
  id         serial
    constraint rate_limits_pk
      primary key,
  key        varchar(100)              not null,
  salt       text        default ''    not null,
  buckets    jsonb       default '{}'  not null,
  updated_at timestamptz default now() not null
);
alter table staff.rate_limits owner to postgres;
create unique index rate_limits_key_salt_uindex on staff.rate_limits (key, salt);

create table staff.rate_limit_configs
(
  key         varchar(100)              not null
    constraint rate_limit_configs_pk
      primary key,
  name        varchar(100)              not null,
  description text                      not null,
  max         decimal                   not null,
  size        integer                   not null,
  width       integer                   not null,
  unit        varchar(50)               not null,
  updated_at  timestamptz default now() not null
);
alter table staff.rate_limit_configs owner to postgres;

