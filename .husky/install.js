// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0);
}
const husky = (await import('husky')).default;
console.log(husky());
