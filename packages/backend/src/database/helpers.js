import fp from 'lodash/fp.js';
const {isNull, isString, mapValues} = fp;

const mapValuesFull = mapValues.convert({cap: false});

export const parseJson = (jsonKeys = []) => {
  if (isString(jsonKeys))
    jsonKeys = [jsonKeys];
  if (isNull(jsonKeys))
    jsonKeys = [];
  return mapValuesFull((val, key) => {
    if (jsonKeys.includes(key))
      return JSON.parse(val);
    return val;
  });
};
