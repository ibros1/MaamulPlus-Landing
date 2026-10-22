import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://localhost:${PORT}`, trace: 'retain-on-failure' },
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02 } },
  projects: [
    { name: 'chromium-1440', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'chromium-768', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } } },
    { name: 'chromium-360', use: { ...devices['Pixel 5'], viewport: { width: 360, height: 740 } } },
    { name: 'webkit-1440', use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 900 } } },
    { name: 'webkit-360', use: { ...devices['iPhone 13'], viewport: { width: 360, height: 740 } } },
  ],
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    env: { E2E_MOCK_LEADS: '1', NEXT_PUBLIC_SITE_URL: 'https://maamulplus.com' },
  },
});
