// src/data/feed-program-map.ts
// 48 feed-program bundles: 4 regions × 4 seasons × 3 goals.
// getBundle() provides direct lookup with nearest-neighbor fallback.
// RSC-only: no 'use client'.

import type { Region, Season, Goal, Bundle } from '@/types/product';

// ─── Bundle registry ──────────────────────────────────────────────────────────

/**
 * All 48 bundles (4 regions × 4 seasons × 3 goals).
 * Keyed as `${region}|${season}|${goal}` for O(1) lookup.
 * paymentLinkUrl is a placeholder — Phase 8 replaces with real Stripe bundle URLs.
 */
const bundleRegistry: Record<string, Bundle> = {};

function addBundle(bundle: Bundle): void {
  bundleRegistry[`${bundle.region}|${bundle.season}|${bundle.goal}`] = bundle;
}

// ─── Kansas bundles ───────────────────────────────────────────────────────────

// Kansas × Pre-Rut
addBundle({
  region: 'kansas', season: 'pre-rut', goal: 'trophy',
  skus: ['buck-chow', 'corn-candy', 'reveal-x-20'],
  rationale: 'Max protein + long-range aroma to pattern trophy bucks before they break velvet routes.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-pre-rut-trophy',
});
addBundle({
  region: 'kansas', season: 'pre-rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Year-round 20% protein and aroma attraction for whole-herd health building before rut stress.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-pre-rut-health',
});
addBundle({
  region: 'kansas', season: 'pre-rut', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'corn-candy'],
  rationale: 'Pallet-scale commitment keeps multiple feed sites active to hold deer population on your property.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-pre-rut-density',
});

// Kansas × Rut
addBundle({
  region: 'kansas', season: 'rut', goal: 'trophy',
  skus: ['corn-candy', 'reveal-x-pro', 'buck-chow'],
  rationale: 'Long-range Corn Candy aroma draws bucks between chasing cycles; X-Pro no-glow camera patterns movement.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-rut-trophy',
});
addBundle({
  region: 'kansas', season: 'rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'High-energy Buck Chow replenishes body weight burns; Corn Candy keeps does at the site.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-rut-health',
});
addBundle({
  region: 'kansas', season: 'rut', goal: 'density',
  skus: ['buck-chow', 'corn-candy', 'tws-600lb-gravity-feeder'],
  rationale: 'High-volume gravity feeder + Buck Chow + Corn Candy creates a doe-anchor that pulls every buck in the area.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-rut-density',
});

// Kansas × Post-Rut
addBundle({
  region: 'kansas', season: 'post-rut', goal: 'trophy',
  skus: ['buck-chow', 'reveal-x-20'],
  rationale: 'Recovery protein for exhausted bucks; camera inventory identifies which studs survived the rut.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-post-rut-trophy',
});
addBundle({
  region: 'kansas', season: 'post-rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Year-round Buck Chow keeps does conditioned through late gestation; Corn Candy maintains traffic.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-post-rut-health',
});
addBundle({
  region: 'kansas', season: 'post-rut', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'tws-2000lb-gravity-feeder'],
  rationale: 'Full-property commitment — 2000lb pallet + 2000lb feeder holds deer through the toughest winter months.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-post-rut-density',
});

// Kansas × Antler-Growth
addBundle({
  region: 'kansas', season: 'antler-growth', goal: 'trophy',
  skus: ['buck-chow', 'corn-candy', 'reveal-x-pro'],
  rationale: 'Maximum mineral + protein support during velvet; X-Pro documents antler development without disturbing bucks.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-antler-growth-trophy',
});
addBundle({
  region: 'kansas', season: 'antler-growth', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Year-round 20% protein + minerals supports does through fawn season and bucks through velvet simultaneously.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-antler-growth-health',
});
addBundle({
  region: 'kansas', season: 'antler-growth', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'corn-candy', 'tws-600lb-gravity-feeder'],
  rationale: 'Maximum capacity feeding for properties managing high deer density through summer.',
  paymentLinkUrl: 'about:blank#TODO-bundle-kansas-antler-growth-density',
});

// ─── Midwest bundles ──────────────────────────────────────────────────────────

// Midwest × Pre-Rut
addBundle({
  region: 'midwest', season: 'pre-rut', goal: 'trophy',
  skus: ['buck-chow', 'corn-candy', 'reveal-x-20'],
  rationale: 'Midwest timber and agriculture edges respond to long-range aroma; protein primes bucks for the rut window.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-pre-rut-trophy',
});
addBundle({
  region: 'midwest', season: 'pre-rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Whole-herd health nutrition ahead of the demanding rut period.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-pre-rut-health',
});
addBundle({
  region: 'midwest', season: 'pre-rut', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'corn-candy'],
  rationale: 'Multiple feed sites across timber / ag edge country using pallet-scale supply.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-pre-rut-density',
});

// Midwest × Rut
addBundle({
  region: 'midwest', season: 'rut', goal: 'trophy',
  skus: ['corn-candy', 'reveal-x-pro', 'buck-chow'],
  rationale: 'Aroma attraction across Midwest travel corridors; no-glow camera for pattern data without spooking pressured deer.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-rut-trophy',
});
addBundle({
  region: 'midwest', season: 'rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'High-energy recovery nutrition during peak rut burn.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-rut-health',
});
addBundle({
  region: 'midwest', season: 'rut', goal: 'density',
  skus: ['buck-chow', 'corn-candy', 'tws-600lb-gravity-feeder'],
  rationale: 'High-volume feeder anchors does in Midwest ag/timber corridors, drawing every buck in range.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-rut-density',
});

// Midwest × Post-Rut
addBundle({
  region: 'midwest', season: 'post-rut', goal: 'trophy',
  skus: ['buck-chow', 'reveal-x-20'],
  rationale: 'Winter recovery nutrition + camera inventory of surviving mature bucks.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-post-rut-trophy',
});
addBundle({
  region: 'midwest', season: 'post-rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Year-round program keeps the whole herd conditioned through Midwest winters.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-post-rut-health',
});
addBundle({
  region: 'midwest', season: 'post-rut', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'tws-2000lb-gravity-feeder'],
  rationale: 'Large-property pallet + feeder program to hold deer through harsh Midwest winters.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-post-rut-density',
});

// Midwest × Antler-Growth
addBundle({
  region: 'midwest', season: 'antler-growth', goal: 'trophy',
  skus: ['buck-chow', 'corn-candy', 'reveal-x-pro'],
  rationale: 'Mineral-rich protein for Midwest velvet bucks; no-glow camera documents antler development.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-antler-growth-trophy',
});
addBundle({
  region: 'midwest', season: 'antler-growth', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Summer mineral and protein support for fawn production and antler growth.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-antler-growth-health',
});
addBundle({
  region: 'midwest', season: 'antler-growth', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'corn-candy', 'tws-600lb-gravity-feeder'],
  rationale: 'Maximum summer throughput for large Midwest properties with high deer density.',
  paymentLinkUrl: 'about:blank#TODO-bundle-midwest-antler-growth-density',
});

// ─── Plains bundles ───────────────────────────────────────────────────────────

// Plains × Pre-Rut
addBundle({
  region: 'plains', season: 'pre-rut', goal: 'trophy',
  skus: ['buck-chow', 'corn-candy', 'reveal-x-20'],
  rationale: 'Open plains require maximum long-range aroma; Buck Chow protein builds rut-ready body condition.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-pre-rut-trophy',
});
addBundle({
  region: 'plains', season: 'pre-rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Whole-herd pre-rut nutrition in open-country feeding scenarios.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-pre-rut-health',
});
addBundle({
  region: 'plains', season: 'pre-rut', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'corn-candy'],
  rationale: 'Plains-scale pallet program to keep multiple sites active across open country.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-pre-rut-density',
});

// Plains × Rut
addBundle({
  region: 'plains', season: 'rut', goal: 'trophy',
  skus: ['corn-candy', 'buck-chow', 'reveal-x-pro'],
  rationale: 'Long-range Corn Candy aroma travels far in open plains; no-glow camera patterns open-country buck movement.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-rut-trophy',
});
addBundle({
  region: 'plains', season: 'rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Recovery energy for plains bucks burning significant ground coverage during the rut.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-rut-health',
});
addBundle({
  region: 'plains', season: 'rut', goal: 'density',
  skus: ['buck-chow', 'corn-candy', 'tws-600lb-gravity-feeder'],
  rationale: 'High-volume feeding anchor in open country to concentrate deer during the rut.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-rut-density',
});

// Plains × Post-Rut
addBundle({
  region: 'plains', season: 'post-rut', goal: 'trophy',
  skus: ['buck-chow', 'reveal-x-20'],
  rationale: 'Winter recovery protein for plains bucks; camera patterns surviving mature deer.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-post-rut-trophy',
});
addBundle({
  region: 'plains', season: 'post-rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Year-round nutrition program for plains herds through long, open-country winters.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-post-rut-health',
});
addBundle({
  region: 'plains', season: 'post-rut', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'tws-2000lb-gravity-feeder'],
  rationale: 'Large-scale feeder + pallet program to hold deer on plains properties through winter.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-post-rut-density',
});

// Plains × Antler-Growth
addBundle({
  region: 'plains', season: 'antler-growth', goal: 'trophy',
  skus: ['buck-chow', 'corn-candy', 'reveal-x-pro'],
  rationale: 'Open-country velvet documentation + maximum mineral input for plains trophy genetics.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-antler-growth-trophy',
});
addBundle({
  region: 'plains', season: 'antler-growth', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Summer mineral and protein program for plains fawn crop and antler development.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-antler-growth-health',
});
addBundle({
  region: 'plains', season: 'antler-growth', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'corn-candy', 'tws-600lb-gravity-feeder'],
  rationale: 'High-capacity summer feeding program for dense plains deer populations.',
  paymentLinkUrl: 'about:blank#TODO-bundle-plains-antler-growth-density',
});

// ─── South bundles ────────────────────────────────────────────────────────────

// South × Pre-Rut
addBundle({
  region: 'south', season: 'pre-rut', goal: 'trophy',
  skus: ['buck-chow', 'corn-candy', 'reveal-x-20'],
  rationale: 'Southern pre-rut timing varies — long-range aroma + protein stack sets up for extended attraction windows.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-pre-rut-trophy',
});
addBundle({
  region: 'south', season: 'pre-rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Year-round nutrition through Southern pre-rut heat; Buck Chow feeds whole herd.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-pre-rut-health',
});
addBundle({
  region: 'south', season: 'pre-rut', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'corn-candy'],
  rationale: 'Pallet-scale protein supply for high-density Southern properties ahead of the rut.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-pre-rut-density',
});

// South × Rut
addBundle({
  region: 'south', season: 'rut', goal: 'trophy',
  skus: ['corn-candy', 'buck-chow', 'reveal-x-pro'],
  rationale: 'Southern rut is shorter and more intense — max aroma + no-glow documentation is critical.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-rut-trophy',
});
addBundle({
  region: 'south', season: 'rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'High-energy rut recovery for Southern bucks under heat and breeding pressure.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-rut-health',
});
addBundle({
  region: 'south', season: 'rut', goal: 'density',
  skus: ['buck-chow', 'corn-candy', 'tws-600lb-gravity-feeder'],
  rationale: 'High-volume Southern feeder anchor to concentrate deer on your property during the rut.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-rut-density',
});

// South × Post-Rut
addBundle({
  region: 'south', season: 'post-rut', goal: 'trophy',
  skus: ['buck-chow', 'reveal-x-20'],
  rationale: 'Post-rut recovery in Southern mild winters; camera documents surviving mature bucks.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-post-rut-trophy',
});
addBundle({
  region: 'south', season: 'post-rut', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Year-round nutrition for Southern herds where feeding windows overlap across seasons.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-post-rut-health',
});
addBundle({
  region: 'south', season: 'post-rut', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'tws-2000lb-gravity-feeder'],
  rationale: 'Large Southern property winter feeding to hold deer through January–February.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-post-rut-density',
});

// South × Antler-Growth
addBundle({
  region: 'south', season: 'antler-growth', goal: 'trophy',
  skus: ['buck-chow', 'corn-candy', 'reveal-x-pro'],
  rationale: 'Southern velvet growth is year-round with high heat stress — mineral support is critical for max antler mass.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-antler-growth-trophy',
});
addBundle({
  region: 'south', season: 'antler-growth', goal: 'health',
  skus: ['buck-chow', 'corn-candy'],
  rationale: 'Summer mineral and protein program supports Southern fawn crop and extended antler growth season.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-antler-growth-health',
});
addBundle({
  region: 'south', season: 'antler-growth', goal: 'density',
  skus: ['buck-chow-2000lb-pallet', 'corn-candy', 'tws-600lb-spin-feeder'],
  rationale: 'High-capacity spin feeder + pallet program for large Southern properties with year-round deer density.',
  paymentLinkUrl: 'about:blank#TODO-bundle-south-antler-growth-density',
});

// ─── Lookup function ──────────────────────────────────────────────────────────

/**
 * Similarity score between two (region, season, goal) combos.
 * Higher = more similar. Used for nearest-neighbor fallback.
 */
function similarity(
  r1: Region, s1: Season, g1: Goal,
  r2: Region, s2: Season, g2: Goal,
): number {
  let score = 0;
  if (r1 === r2) score += 4; // region match is highest weight
  if (s1 === s2) score += 3; // season match is second
  if (g1 === g2) score += 2; // goal match is third
  return score;
}

/**
 * Get the feed-program bundle for a given (region, season, goal) combination.
 * Direct O(1) lookup; falls back to nearest-neighbor if exact match is missing.
 * Always returns a Bundle — the 48-bundle registry guarantees full coverage.
 */
export function getBundle(region: Region, season: Season, goal: Goal): Bundle {
  const key = `${region}|${season}|${goal}`;
  const direct = bundleRegistry[key];
  if (direct) return direct;

  // Nearest-neighbor fallback (should not be needed with 48 full coverage,
  // but guards against future partial updates)
  let bestBundle: Bundle | null = null;
  let bestScore = -1;

  for (const [k, bundle] of Object.entries(bundleRegistry)) {
    const [r, s, g] = k.split('|') as [Region, Season, Goal];
    const score = similarity(region, season, goal, r, s, g);
    if (score > bestScore) {
      bestScore = score;
      bestBundle = bundle;
    }
  }

  // bestBundle is guaranteed to be non-null since the registry has 48 entries
  return bestBundle!;
}

/** Get all bundles (for admin / sitemap use) */
export function getAllBundles(): Bundle[] {
  return Object.values(bundleRegistry);
}
