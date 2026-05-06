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
    // Wait for full hydration so BagTagTriptychLoader's static→animated swap settles.
    await page.goto('/products/buck-chow-40lb/', { waitUntil: 'networkidle' });

    // BagTagTriptych renders 3 panels with data-testid="bag-tag".
    // Both Static (SSR) and Animated (post-hydration) variants carry the testid.
    const bagTags = page.locator('[data-testid="bag-tag"]');

    // DOM-presence-only check — Playwright's toBeVisible races framer-motion's
    // initial="hidden" + whileInView animation in the animated variant. The
    // panels are always in the DOM regardless of animation state.
    await expect(bagTags).toHaveCount(3, { timeout: 10_000 });
  });

  test('/products/buck-chow-40lb/ has a CTA link (Buy Now or phone fallback)', async ({
    page,
  }) => {
    await page.goto('/products/buck-chow-40lb/', { waitUntil: 'networkidle' });

    // Either a Stripe Payment Link or the tel: fallback must be present.
    // Both are valid at this stub stage (Stripe links not yet wired).
    // DOM-presence check (toHaveCount) — the CTA is always in DOM after
    // hydration; toBeVisible races the framer-motion entrance variants.
    const cta = page.locator('a[href^="https://buy.stripe.com/"], a[href^="tel:"]');
    await expect(cta.first()).toHaveCount(1, { timeout: 10_000 });
  });
});
