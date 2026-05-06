import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for GB Feeds E2E + smoke tests.
 * Tests run against `out/` served by `npx serve` on :4173.
 *
 * CI usage:
 *   npx serve -s out -p 4173 --no-clipboard &
 *   npm run test:e2e
 *
 * Local usage (webServer auto-starts if not running):
 *   npm run test:e2e
 *
 * Architecture ref: 05_architecture.md § F (Playwright Config Highlights)
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  // Disallow `.only` in CI — prevents accidentally shipping focused tests.
  forbidOnly: !!process.env.CI,
  // 1 retry on CI to absorb flakiness from serve startup timing.
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Auto-start `serve` in local dev when not already running.
  // In CI, the serve process is started manually before `playwright test`.
  webServer: {
    command: 'npx serve -s out -p 4173 --no-clipboard',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-iphone-14',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'mobile-pixel-7',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'reduced-motion',
      // reducedMotion is a valid BrowserContext option; cast is required
      // because @playwright/test 1.51.x UseOptions types do not surface it
      // at the top level (it lives on BrowserContextOptions).
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      use: { ...devices['Desktop Chrome'], reducedMotion: 'reduce' } as any,
    },
  ],
});
