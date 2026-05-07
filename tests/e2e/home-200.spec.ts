import { test, expect } from '@playwright/test';

/**
 * Smoke spec: Home page (/)
 *
 * Critical path: Site loads → hero visible → brand identity present.
 * Ref: 05_architecture.md § C, Test Case 1 (home.spec.ts).
 *
 * NOTE: This is a stub-level smoke test, not the full Case 1 spec.
 * The full spec (console-error checks, image warnings, footer presence)
 * is a follow-up engagement deliverable.
 */
test.describe('Home page smoke', () => {
  test('/ returns 200 and contains expected h1', async ({ page }) => {
    const response = await page.goto('/');

    // Server must return 200 (not 4xx/5xx from the static serve).
    expect(response?.status()).toBe(200);

    // Exactly one h1 on the page.
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // h1 text must contain the brand-critical string "GB Feeds".
    // This guards against a catastrophic brand/content regression
    // (e.g., wrong page served, build corruption, wrong data bake).
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text).toContain('GB Feeds');
  });

  test('/ has a canonical link tag pointing to the site origin', async ({ page }) => {
    await page.goto('/');

    // Canonical must be present — guards against duplicate-content SEO risk.
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
  });

  test('/ has exactly one <main> landmark', async ({ page }) => {
    await page.goto('/');
    const mainCount = await page.locator('main').count();
    expect(mainCount).toBe(1);
  });
});
