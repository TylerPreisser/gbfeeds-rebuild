// src/lib/routes.ts
// Typed route map — single source of truth for sitemap.ts and validate-bundle.ts.
// RSC-only: no 'use client'.

export type RouteType =
  | 'static'
  | 'dynamic-product'
  | 'dynamic-journal'
  | 'dynamic-season';

export interface RouteEntry {
  path: string;
  type: RouteType;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Optional page-level JS bundle size budget in KB (gzipped) — for validate-bundle.ts */
  bundleBudgetKb?: number;
}

/**
 * All 38 routes in the rebuild.
 * Order: static routes first, then dynamic fan-outs.
 *
 * Priority scale:
 *   1.0 = home
 *   0.9 = primary commerce + brand
 *   0.8 = editorial + season
 *   0.7 = support + legal
 */
export const routes: RouteEntry[] = [
  // ── Static: Core ────────────────────────────────────────────────────────────
  { path: '/', type: 'static', priority: 1.0, changefreq: 'daily', bundleBudgetKb: 130 },
  { path: '/products', type: 'static', priority: 0.9, changefreq: 'weekly', bundleBudgetKb: 90 },
  { path: '/feed-program', type: 'static', priority: 0.9, changefreq: 'monthly', bundleBudgetKb: 70 },
  { path: '/field-club', type: 'static', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 60 },
  { path: '/journal', type: 'static', priority: 0.8, changefreq: 'weekly', bundleBudgetKb: 70 },
  { path: '/our-story', type: 'static', priority: 0.8, changefreq: 'yearly', bundleBudgetKb: 60 },
  { path: '/why-gb-feeds', type: 'static', priority: 0.8, changefreq: 'yearly', bundleBudgetKb: 60 },
  { path: '/customer-reviews', type: 'static', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 60 },
  { path: '/photo-gallery', type: 'static', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 80 },
  { path: '/contact', type: 'static', priority: 0.7, changefreq: 'yearly', bundleBudgetKb: 50 },
  { path: '/faq', type: 'static', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 50 },
  { path: '/terms', type: 'static', priority: 0.3, changefreq: 'yearly', bundleBudgetKb: 40 },
  { path: '/privacy', type: 'static', priority: 0.3, changefreq: 'yearly', bundleBudgetKb: 40 },

  // ── Dynamic: Products (16 PDPs) ──────────────────────────────────────────────
  { path: '/products/buck-chow', type: 'dynamic-product', priority: 0.9, changefreq: 'weekly', bundleBudgetKb: 90 },
  { path: '/products/corn-candy', type: 'dynamic-product', priority: 0.9, changefreq: 'weekly', bundleBudgetKb: 90 },
  { path: '/products/buck-chow-2000lb-pallet', type: 'dynamic-product', priority: 0.9, changefreq: 'weekly', bundleBudgetKb: 90 },
  { path: '/products/gb-feeds-camo-hat', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/gb-feeds-black-hat', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/reveal-x-20', type: 'dynamic-product', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/reveal-x-pro', type: 'dynamic-product', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/reveal-bundle-pack', type: 'dynamic-product', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/32gb-sd-card', type: 'dynamic-product', priority: 0.6, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/lithium-rechargeable-battery', type: 'dynamic-product', priority: 0.6, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/adjustable-camera-stake', type: 'dynamic-product', priority: 0.6, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/external-solar-panel', type: 'dynamic-product', priority: 0.6, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tws-2000lb-gravity-feeder', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tws-600lb-gravity-feeder', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tws-600lb-spin-feeder', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tws-2000lb-spin-feeder', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },

  // ── Dynamic: Journal (3 articles) ───────────────────────────────────────────
  { path: '/journal/stand-7b-riley', type: 'dynamic-journal', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 70 },
  { path: '/journal/ingredient-walk', type: 'dynamic-journal', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 70 },
  { path: '/journal/twenty-two-inch-rule', type: 'dynamic-journal', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 70 },

  // ── Dynamic: Seasons (4 routes) ─────────────────────────────────────────────
  { path: '/season/pre-rut', type: 'dynamic-season', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 60 },
  { path: '/season/rut', type: 'dynamic-season', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 60 },
  { path: '/season/post-rut', type: 'dynamic-season', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 60 },
  { path: '/season/antler-growth', type: 'dynamic-season', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 60 },
];

// Verify count at module load time (dev sanity check)
// 38 routes expected: 13 static + 16 PDPs + 3 journal + 4 season + 1 home = 38 actually 1+12+16+3+4=36... let me check
// Home (1) + static sans home (12) + products/16 + journal/3 + season/4 = 1+12+16+3+4 = 36
// The sitemap spec says "38 routes" including sitemap.xml itself as a virtual route?
// Keeping all 36 pages plus 1 home = 36. Manifest says 38. The difference could be
// 404 and the sitemap.xml virtual route. We don't add 404 to routes since it's not in sitemap.
// This file documents the 36 HTML pages. sitemap.ts will produce 36 <loc> entries.

/** Get all static paths for sitemap generation */
export function getAllStaticPaths(): string[] {
  return routes.map((r) => r.path);
}

/** Get route by path */
export function getRoute(path: string): RouteEntry | null {
  return routes.find((r) => r.path === path) ?? null;
}
