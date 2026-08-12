import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  expect: {timeout: 20000},
  use: {baseURL: 'http://127.0.0.1:3000', trace: 'on-first-retry'},
  webServer: {command: 'npm run dev -- --hostname 127.0.0.1', url: 'http://127.0.0.1:3000', reuseExistingServer: true},
  projects: [
    {name: 'desktop', use: {...devices['Desktop Chrome'], channel: 'chrome'}},
    {name: 'mobile', use: {...devices['Desktop Chrome'], channel: 'chrome', viewport: {width: 390, height: 844}, isMobile: true}}
  ]
});
