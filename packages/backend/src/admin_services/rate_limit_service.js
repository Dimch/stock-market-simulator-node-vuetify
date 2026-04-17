import fp from 'lodash/fp.js';
import {Duration} from 'luxon';
import {RateLimits, RateLimitConfigs} from '../database/index.js';
import {RateLimiter} from 'sliding-window-limiter';
import {store} from './rate_limit_store_adapter.js';
const {isInteger, map, reduce, startCase, sum} = fp;

const UNITS = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

const calculateUnitDuration = (unit, width, size) => {
  if (!UNITS.includes(unit)) throw new TypeError(`Invalid unit: ${unit}`);
  const duration = Duration.fromObject({[unit]: width * size});
  const largerUnit = UNITS[UNITS.indexOf(unit) + 1];
  const newDuration = duration.shiftTo(largerUnit);
  if (isInteger(newDuration.as(largerUnit)))
      return {
        unit: largerUnit,
        size: newDuration.as(largerUnit),
        bucketUnit: unit,
      };
  return {
    unit,
    size: width * size,
    bucketUnit: unit,
  };
};
export class RateLimitInfo {
  constructor({config, limit}) {
    this.title = startCase(config.key);
    this.description = config.description;
    this.salt = limit.salt;
    this.data = limit.window.timeSlices;
    this.updatedAt = limit.updated_at;
    this.max = config.max;
    const {unit, size, bucketUnit} = calculateUnitDuration(config.unit, config.width, config.size);
    this.unit = unit;
    this.size = size;
    this.width = config.width;
    this.bucketUnit = bucketUnit;
  }

  get value() {
    return sum(this.data);
  }

  get rate() {
    return this.value / this.max;
  }

  get item() {
    return {
      title: this.title,
      description: this.description,
      salt: this.salt,
      value: this.value,
      percentage: this.rate,
      max: this.max,
      updatedAt: this.updatedAt,
      unit: this.unit,
      size: this.size,
      data: this.data,
      bucket: {
        unit: this.bucketUnit,
        width: this.width,
      },
    };
  }

  static dashboardItems(config) {
    return map(limit => new RateLimitInfo({config, limit}).item);
  }
}

export class RateLimitService {
  constructor(options = {}, RateLimitsDB = RateLimits, RateLimitConfigsDB = RateLimitConfigs) {
    this.store = RateLimitsDB;
    this.configs = RateLimitConfigsDB;
    this.updateInterval = null;
    this.updatePeriod = options.updatePeriod || 5 * 1000; // Default to 5 seconds
  }

  getDashboard() {
    const configs = this.configs.getAll();
    return reduce((acc, config) => {
      const limits = RateLimits.getByKey(config.key);
      return [...acc, ...RateLimitInfo.dashboardItems(config)(limits)];
    }, [])(configs);
  }

  async updateLimits() {
  const limits = this.store.getKeySaltPairs();
    if (!limits?.length) return;

    for (const limit of limits) {
      const {width, unit} = limit.window;
      const size = limit.window.timeSlices.length * width;
      const limiter = await RateLimiter.load({
        name: store.makeKey(limit.key, limit.salt),
        max: Number.MAX_SAFE_INTEGER, store, window: {size, width, unit},
      });
      await limiter.updateTime(new Date());
    }
  }

  startUpdate() {
    if (this.updateInterval) return; // Already updating
    this.updateInterval = setInterval(
      () => this.updateLimits(),
      this.updatePeriod);
  }

  stopUpdate() {
    clearInterval(this.updateInterval);
    this.updateInterval = null;
  }
}

export const rateLimitService = new RateLimitService();
