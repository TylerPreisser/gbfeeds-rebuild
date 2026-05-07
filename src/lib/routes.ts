// src/lib/routes.ts
// Typed route map — single source of truth for sitemap.ts.
// Matches ORIGINAL_TRUTH.md § 0 canonical route list exactly.
// RSC-only: no 'use client'.

export type RouteType =
  | 'static'
  | 'dynamic-product';

export interface RouteEntry {
  path: string;
  type: RouteType;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  bundleBudgetKb?: number;
}

/**
 * All routes in the rebuild — matches the original gbfeeds.com canonical route list.
 * No invented routes (/feed-program, /field-club, /journal/*, /season/*).
 */
export const routes: RouteEntry[] = [
  // ── Static: Core ────────────────────────────────────────────────────────────
  { path: '/', type: 'static', priority: 1.0, changefreq: 'daily', bundleBudgetKb: 130 },
  { path: '/products', type: 'static', priority: 0.9, changefreq: 'weekly', bundleBudgetKb: 90 },
  { path: '/our-story', type: 'static', priority: 0.8, changefreq: 'yearly', bundleBudgetKb: 60 },
  { path: '/why-gb-feeds', type: 'static', priority: 0.8, changefreq: 'yearly', bundleBudgetKb: 60 },
  { path: '/customer-reviews', type: 'static', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 60 },
  { path: '/photo-gallery', type: 'static', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 80 },
  { path: '/terms', type: 'static', priority: 0.3, changefreq: 'yearly', bundleBudgetKb: 40 },
  { path: '/privacy', type: 'static', priority: 0.3, changefreq: 'yearly', bundleBudgetKb: 40 },

  // ── Dynamic: Products (16 PDPs) ──────────────────────────────────────────────
  { path: '/products/buck-chow-40lb', type: 'dynamic-product', priority: 0.9, changefreq: 'weekly', bundleBudgetKb: 90 },
  { path: '/products/corn-candy-7lb', type: 'dynamic-product', priority: 0.9, changefreq: 'weekly', bundleBudgetKb: 90 },
  { path: '/products/buck-chow-2000lb-pallet', type: 'dynamic-product', priority: 0.9, changefreq: 'weekly', bundleBudgetKb: 90 },
  { path: '/products/camo-hat', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/black-hat', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/reveal-x', type: 'dynamic-product', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/reveal-x-pro', type: 'dynamic-product', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tactacam-reveal-bundle', type: 'dynamic-product', priority: 0.8, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/32gb-sd-card', type: 'dynamic-product', priority: 0.6, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/lithium-battery', type: 'dynamic-product', priority: 0.6, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/camera-stake', type: 'dynamic-product', priority: 0.6, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/solar-panel', type: 'dynamic-product', priority: 0.6, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tws-2000lb-gravity-feeder', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tws-600lb-gravity-feeder', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tws-600lb-lucky-buck-spin', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
  { path: '/products/tws-2000lb-spin-feeder', type: 'dynamic-product', priority: 0.7, changefreq: 'monthly', bundleBudgetKb: 90 },
];

/** Get all static paths for sitemap generation */
export function getAllStaticPaths(): string[] {
  return routes.map((r) => r.path);
}

/** Get route by path */
export function getRoute(path: string): RouteEntry | null {
  return routes.find((r) => r.path === path) ?? null;
}
