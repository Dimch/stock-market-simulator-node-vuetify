import {Pool, types} from 'pg';
import fp from 'lodash/fp.js';

const {first, flow, get} = fp;

const dateTimeParser = (value) => new Date(`${value.replace(' ', 'T')}Z`);
types.setTypeParser(types.builtins.TIMESTAMP, dateTimeParser);
types.setTypeParser(types.builtins.DATE, dateTimeParser);
types.setTypeParser(types.builtins.NUMERIC, (value) => value ? parseFloat(value) : 0);

const config = {
  host: 'stock-simulator-db',
  database: 'stock_simulator_dev',
  user: 'postgres',
  password: 'postgres',
};
const pool = new Pool(config);

export const exec = queryConf => pool.query(queryConf);
export const rows = get('rows');
export const one = flow([rows, first]);
