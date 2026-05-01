import {expect, test} from '@playwright/test';

const adminCredentials = {
  username: 'admin@example.com',
  password: 'password',
};

const loginAsSeededAdmin = async (page) => {
  await page.goto('/login');
  await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();

  await page.getByLabel('email').fill(adminCredentials.username);
  await page.getByLabel('password').fill(adminCredentials.password);
  await page.locator('input[type="checkbox"]').first().check({force: true});
  await page.getByRole('button', {name: 'Login'}).click();

  await expect(page).toHaveURL(/\/console\/admin\/dashboards\/market$/);
};

test.describe('frontend smoke suite', () => {
  test('redirects unauthenticated users away from protected admin routes', async ({page}) => {
    await page.goto('/console/admin/dashboards/market');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();
  });

  test('authenticates through the admin login form and lands on the market dashboard', async ({page}) => {
    await loginAsSeededAdmin(page);

    await expect(page.getByText('Stocks Live')).toBeVisible();
    await expect(page.getByText('Zephyr Vex Technologies')).toBeVisible();
  });

  test('loads the market dashboard after login', async ({page}) => {
    await loginAsSeededAdmin(page);
    await page.goto('/console/admin/dashboards/market');

    await expect(page).toHaveURL(/\/console\/admin\/dashboards\/market$/);
    await expect(page.getByText('Stocks Live')).toBeVisible();
    await expect(page.getByText('Zephyr Vex Technologies')).toBeVisible();
  });

  test('loads the security dashboard after login', async ({page}) => {
    await loginAsSeededAdmin(page);
    await page.goto('/console/admin/dashboards/security');

    await expect(page).toHaveURL(/\/console\/admin\/dashboards\/security$/);
    await expect(page.getByText('Rate Limit Configurations')).toBeVisible();
  });
});


