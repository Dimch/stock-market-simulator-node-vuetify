import fp from 'lodash/fp.js';
const {reduce, times} = fp;
/**
 * Stock market simulator using geometric Brownian motion
 * Generates realistic price movements with drift and volatility
 */

/**
 * Generate a random normal distribution value using Box-Muller transform
 */
const randomNormal = () => {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
};

/**
 * Generate next price using geometric Brownian motion
 * @param {number} currentPrice - The current stock price
 * @param {number} drift - Expected return (e.g., 0.0001 for slight uptrend)
 * @param {number} volatility - Price volatility/standard deviation (e.g., 0.02)
 * @param {number} dt - Time step as fraction of year (e.g., 1/252 for daily)
 * @returns {number} Next simulated price
 */
export const generateNextPrice = (currentPrice, drift = 0.0001, volatility = 0.02, dt = 1 / 252) => {
  const randomComponent = randomNormal() * Math.sqrt(dt);
  const geometricReturn = (drift * dt) + (volatility * randomComponent);
  return currentPrice * Math.exp(geometricReturn);
};

/**
 * Generate a sequence of prices over time
 * @param {number} initialPrice - Starting price
 * @param {number} periods - Number of periods to simulate
 * @param {object} options - Configuration
 * @returns {number[]} Array of simulated prices
 */
export const generatePriceSequence = (initialPrice, periods = 100, options = {}) => {
  const {
    drift = 0.0001, // Slight uptrend
    volatility = 0.02, // 2% daily volatility
    dt = 1 / 252, // Daily time step (252 trading days/year)
    reverse = false, // If true, generate sequence backwards
  } = options;

  let currentPrice = initialPrice;
  const fromCurrentPrice = () => {
    currentPrice = generateNextPrice(currentPrice, drift, volatility, dt);
    // Floor at $0.01 to avoid negative prices
    return Math.max(currentPrice, 0.01);
  };
  const prices = [
    initialPrice,
    ...times(fromCurrentPrice, periods),
  ];
  return reverse ? prices.toReversed() : prices;
};

/**
 * Generate a single price update with realistic random movement
 * Useful for real-time price updates
 * @param {number} currentPrice - Current stock price
 * @param {number} volatility - Daily price volatility as decimal (e.g., 0.02 = 2%)
 * @returns {number} Updated price
 */
export const updatePrice = (currentPrice, volatility = 0.02) => {
  return generateNextPrice(currentPrice, 0.000_05, volatility, 1 / 252);
};

/**
 * Generate multiple stock price sequences (for multiple stocks/tickers)
 * @param {object[]} stocks - Array of {ticker, price} objects
 * @param {number} periods - Number of periods to simulate
 * @param {object} options - Configuration
 * @returns {object} {ticker: priceArray} mapping
 */
export const generateMultipleSequences = (stocks, periods = 100, options = {}) =>
  reduce((acc, stock) => ({
    ...acc,
    [stock.ticker]: generatePriceSequence(stock.price, periods, options),
  }), {})(stocks);
