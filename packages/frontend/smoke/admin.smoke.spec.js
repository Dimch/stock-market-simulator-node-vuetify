import {expect, test} from '@playwright/test';

const ROUTES = {
  login: '/login',
  marketDashboard: '/console/admin/dashboards/market',
  securityDashboard: '/console/admin/dashboards/security',
};

const URL_PATTERNS = {
  login: /\/login$/,
  marketDashboard: /\/console\/admin\/dashboards\/market$/,
  securityDashboard: /\/console\/admin\/dashboards\/security$/,
};

const LABELS = {
  email: 'email',
  password: 'password',
  login: 'Login',
};

const SELECTORS = {
  rememberMeCheckbox: 'input[type="checkbox"]',
};

const TEXT = {
  stocksLive: 'Stocks Live',
  seededStockName: 'Zephyr Vex Technologies',
  rateLimitConfigurations: 'Rate Limit Configurations',
};

const adminCredentials = {
  username: 'admin@example.com',
  password: 'password',
};

const loginAsSeededAdmin = async (page) => {
  await page.goto(ROUTES.login);
  await expect(page.getByRole('heading', {name: LABELS.login})).toBeVisible();

  await page.getByLabel(LABELS.email).fill(adminCredentials.username);
  await page.getByLabel(LABELS.password).fill(adminCredentials.password);
  await page.locator(SELECTORS.rememberMeCheckbox).first().check({force: true});
  await page.getByRole('button', {name: LABELS.login}).click();

  await expect(page).toHaveURL(URL_PATTERNS.marketDashboard);
};

test.describe('frontend smoke suite', () => {
  test('redirects unauthenticated users away from protected admin routes', async ({page}) => {
    await page.goto(ROUTES.marketDashboard);

    await expect(page).toHaveURL(URL_PATTERNS.login);
    await expect(page.getByRole('heading', {name: LABELS.login})).toBeVisible();
  });

  test('authenticates through the admin login form and lands on the market dashboard', async ({page}) => {
    await loginAsSeededAdmin(page);

    await expect(page.getByText(TEXT.stocksLive)).toBeVisible();
    await expect(page.getByText(TEXT.seededStockName)).toBeVisible();
  });

  test('loads the market dashboard after login', async ({page}) => {
    await loginAsSeededAdmin(page);
    await page.goto(ROUTES.marketDashboard);

    await expect(page).toHaveURL(URL_PATTERNS.marketDashboard);
    await expect(page.getByText(TEXT.stocksLive)).toBeVisible();
    await expect(page.getByText(TEXT.seededStockName)).toBeVisible();
  });

  test('loads the security dashboard after login', async ({page}) => {
    await loginAsSeededAdmin(page);
    await page.goto(ROUTES.securityDashboard);

    await expect(page).toHaveURL(URL_PATTERNS.securityDashboard);
    await expect(page.getByText(TEXT.rateLimitConfigurations)).toBeVisible();
  });
});
