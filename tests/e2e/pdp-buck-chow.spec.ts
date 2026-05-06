import { test, expect } from '@playwright/test';

/**
 * Smoke spec: Buck Chow 40lb PDP (/products/buck-chow-40lb/)
 *
 * Critical path: Product detail page renders → BagTag triptych visible.
 * Ref: 05_architecture.md § C, Test Case 5 (pdp-buck-chow.spec.ts).
 *
 * NOTE: This is a stub-level smoke test. The full Case 5 spec adds:
 * - "Buy Now" href validation against /^https:\/\/buy\.stripe\.com\//
 * - NOT about:blank#TODO assertion (once Stripe Payment Links are live)
 * - Spot-check of 2 additional PDPs (Corn Candy, TWS 2000lb gravity)
 * These are follow-up engagement deliverables once Stripe links are wired.
 */
test.describe('Buck Chow 40lb PDP smoke', () => {
  test('/products/buck-chow-40lb/ returns 200', async ({ page }) => {
    const response = await page.goto('/products/buck-chow-40lb/');
    expect(response?.status()).toBe(200);
  });

  test('/products/buck-chow-40lb/ has exactly one h1', async ({ page }) => {
    await page.goto('/products/buck-chow-40lb/');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('/products/buck-chow-40lb/ renders BagTag triptych (3 panels)', async ({
    page,
  }) => {
    await page.goto('/products/buck-chow-40lb/');

    // BagTagTriptych renders 3 data-testid="bag-tag" panels.
    // The triptych is the primary product-identity element — if it's
    // missing, the PDP template has catastrophically regressed.
    //
    // Implementation note: BagTagStatic renders immediately; BagTagAnimated
    // is lazy-loaded. The static variant is always in the DOM, so this
    // check works without waiting for animation hydration.
    const bagTags = page.locator('[data-testid="bag-tag"]');

    // Allow up to 10s for the static SSG content to appear.
    await expect(bagTags.first()).toBeVisible({ timeout: 10_000 });

    const count = await bagTags.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('/products/buck-chow-40lb/ has a CTA link (Buy Now or phone fallback)', async ({
    page,
  }) => {
    await page.goto('/products/buck-chow-40lb/');

    // Either a Stripe Payment Link or the tel: fallback must be present.
    // Both are valid at this stub stage (Stripe links not yet wired).
    const cta = page.locator('a[href^="https://buy.stripe.com/"], a[href^="tel:"]');
    await expect(cta.first()).toBeVisible({ timeout: 10_000 });
  });
});
