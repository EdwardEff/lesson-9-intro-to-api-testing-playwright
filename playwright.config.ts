import { defineConfig } from '@playwright/test'
import * as dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 6 : 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://backend.tallinn-learning.ee',
  },
 
  projects: [
    {
      name: 'API tests',
    },
  ],
})