import {defineConfig, devices} from '@playwright/test';
import {fileURLToPath} from 'node:url';

const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url));
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './smoke',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  reporter: isCI
    ? [['github'], ['html', {open: 'never'}]]
    : [['list'], ['html', {open: 'never'}]],
  outputDir: './test-results',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: [
    {
      command: 'PORT=3001 NODE_ENV=test npm --workspace packages/backend run start',
      url: 'http://127.0.0.1:3001/health',
      cwd: workspaceRoot,
      reuseExistingServer: !isCI,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'BACKEND_BASE_URL=http://127.0.0.1:3001 PORT=3000 npm --workspace packages/frontend run dev -- --host 127.0.0.1',
      url: 'http://127.0.0.1:3000',
      cwd: workspaceRoot,
      reuseExistingServer: !isCI,
      timeout: 120_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});

