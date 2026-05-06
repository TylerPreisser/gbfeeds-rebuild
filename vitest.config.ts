import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
    // Run only tests in tests/unit/ for the unit test suite
    include: ['tests/unit/**/*.test.ts'],
    // Set NEXT_PUBLIC_SITE_URL for seo.ts canonical() tests
    env: {
      NEXT_PUBLIC_SITE_URL: 'https://gbfeeds.com',
    },
  },
  resolve: {
    alias: {
      // Mirror the @/* path alias from tsconfig.json
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
});
