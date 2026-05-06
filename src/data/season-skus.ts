// src/data/season-skus.ts
// Maps Season → product slugs curated for that season's /season/[phase] page.
// RSC-only: no 'use client'.

import type { Season } from '@/types/product';

/**
 * Season → curated product slug array.
 * Each season displays 3–5 ProductCards on its season page.
 *
 * Curation logic:
 * - pre-rut: Max protein + attraction combo
 * - rut: High energy + long-range aroma + trail cam to monitor movement
 * - post-rut: Recovery nutrition + monitoring
 * - antler-growth: Minerals + year-round protein + trail cam
 */
export const seasonSkus: Record<Season, string[]> = {
  'pre-rut': [
    'buck-chow',
    'corn-candy',
    'reveal-x-20',
    'adjustable-camera-stake',
  ],
  rut: [
    'buck-chow',
    'corn-candy',
    'reveal-x-20',
    'reveal-x-pro',
  ],
  'post-rut': [
    'buck-chow',
    'buck-chow-2000lb-pallet',
    'reveal-x-20',
    '32gb-sd-card',
  ],
  'antler-growth': [
    'buck-chow',
    'corn-candy',
    'buck-chow-2000lb-pallet',
    'tws-600lb-gravity-feeder',
    'reveal-x-20',
  ],
};

/** Get product slugs for a given season */
export function getSkusForSeason(season: Season): string[] {
  return seasonSkus[season] ?? [];
}
