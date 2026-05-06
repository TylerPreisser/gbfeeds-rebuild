// src/data/cross-sell-map.ts
// Static cross-sell suggestions for the PDP "Build a feed program with this" block.
// RSC-only: no 'use client'.
//
// Keys and values are product slugs from products.live.json.
// Updated 2026-05-06: slug reconciliation to match 6B.2 public/products/ folder names.

/**
 * Cross-sell map: product slug → array of related product slugs.
 * Used on PDP pages to suggest 2–3 complementary products.
 */
export const crossSellMap: Record<string, string[]> = {
  // ── Deer feed ───────────────────────────────────────────────────────────────
  'buck-chow-40lb': [
    'corn-candy-7lb',            // natural pairing — attract + feed
    'tws-600lb-gravity-feeder',  // fill a feeder with Buck Chow
    'reveal-x',                  // document results on trail cam
  ],
  'corn-candy-7lb': [
    'buck-chow-40lb',            // the complete nutrition + attraction stack
    'reveal-x',                  // watch deer respond at distance
    'camera-stake',              // stake the cam right at the feed site
  ],
  'buck-chow-2000lb-pallet': [
    'buck-chow-40lb',            // reorder single bags between pallet cycles
    'tws-2000lb-gravity-feeder', // match feeder capacity to pallet scale
    'reveal-x-pro',              // serious property = serious camera
  ],

  // ── Feeders ─────────────────────────────────────────────────────────────────
  'tws-2000lb-gravity-feeder': [
    'buck-chow-2000lb-pallet',   // fill it
    'buck-chow-40lb',            // reload with single bags
    'reveal-x-pro',              // monitor the investment
  ],
  'tws-600lb-gravity-feeder': [
    'buck-chow-40lb',            // fill it with Buck Chow
    'corn-candy-7lb',            // add Corn Candy to the mix
    'reveal-x',                  // see who's showing up
  ],
  'tws-600lb-lucky-buck-spin': [
    'buck-chow-40lb',            // Buck Chow works in spin feeders
    'corn-candy-7lb',            // Corn Candy in the spin mix
    'reveal-x',                  // trail cam pairs naturally
  ],
  'tws-2000lb-spin-feeder': [
    'buck-chow-2000lb-pallet',   // pallet supply for the 2000lb feeder
    'buck-chow-40lb',            // single-bag reloads
    'reveal-x-pro',              // serious property management camera
  ],

  // ── Tactacam cameras ────────────────────────────────────────────────────────
  'reveal-x': [
    '32gb-sd-card',              // needs an SD card
    'lithium-battery',           // long-life power
    'camera-stake',              // ground-mount option
    'buck-chow-40lb',            // put it near a Buck Chow feed site
  ],
  'reveal-x-pro': [
    '32gb-sd-card',              // needs an SD card
    'lithium-battery',           // long-life power
    'solar-panel',               // keep it running indefinitely
    'buck-chow-40lb',            // document Buck Chow results
  ],
  'tactacam-reveal-bundle': [
    'camera-stake',              // ground deployment
    'solar-panel',               // extend runtime beyond the included battery
    'buck-chow-40lb',            // set it up at a feed site
  ],

  // ── Accessories ────────────────────────────────────────────────────────────
  '32gb-sd-card': [
    'reveal-x',                  // compatible camera
    'reveal-x-pro',              // compatible camera
    'tactacam-reveal-bundle',    // the bundle includes one too
  ],
  'lithium-battery': [
    'reveal-x',                  // compatible camera
    'reveal-x-pro',              // compatible camera
    'solar-panel',               // solar + battery = maximum runtime
  ],
  'camera-stake': [
    'reveal-x',                  // the camera it holds
    'reveal-x-pro',              // alternate camera
    'buck-chow-40lb',            // stake the cam at a feed site
  ],
  'solar-panel': [
    'reveal-x',                  // powers this camera
    'reveal-x-pro',              // powers this camera
    'lithium-battery',           // solar + battery backup stack
  ],

  // ── Apparel ─────────────────────────────────────────────────────────────────
  'camo-hat': [
    'black-hat',                 // sibling apparel
    'buck-chow-40lb',            // the brand's flagship product
    'corn-candy-7lb',            // the other GB Feeds staple
  ],
  'black-hat': [
    'camo-hat',                  // sibling apparel
    'buck-chow-40lb',            // the brand's flagship product
    'corn-candy-7lb',            // the other GB Feeds staple
  ],
};

/**
 * Get cross-sell product slugs for a given product slug.
 * Returns up to 3 suggestions. Returns empty array if no cross-sells defined.
 */
export function getCrossSells(slug: string): string[] {
  return (crossSellMap[slug] ?? []).slice(0, 3);
}
