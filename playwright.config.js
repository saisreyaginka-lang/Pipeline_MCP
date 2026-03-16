// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',   // folder where your tests live
  use: {
    headless: true,     // run tests without opening browser window
    baseURL: 'http://localhost:3000', // your React app
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: true,
  },
  reporter: [['list'], ['html']], // console + HTML report
});
