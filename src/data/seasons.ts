// src/data/seasons.ts
// 4 whitetail feeding season phases with metadata for /season/[phase] pages.
// RSC-only: no 'use client'.

import type { SeasonMeta } from '@/types/product';

/**
 * All 4 whitetail feeding season phases.
 * Drives /season/[phase] pages and season-skus.ts SKU curation.
 */
export const seasons: SeasonMeta[] = [
  {
    phase: 'pre-rut',
    displayName: 'Pre-Rut',
    dateRange: 'Late September → Mid-October',
    description:
      'Bucks are establishing rubs and scrapes, starting to break out of bachelor groups, and covering more ground every day. This is the window to load up protein and maximize attraction before the madness begins.',
    nutritionalPriority:
      'Protein build is the priority through Pre-Rut. Bucks need maximum protein and mineral support to sustain body mass as their metabolism shifts into overdrive. Buck Chow\'s 20% protein content is purpose-built for this phase — every bag is packed with the Real Results Protein Pellets and Calcium + Phosphorus minerals that support the final push of antler mineralization.\n\nAttraction matters just as much as nutrition in this window. Corn Candy mixed into your feeder gives you a 5X aroma advantage when deer are expanding their range daily. The combination of Buck Chow and Corn Candy in a well-placed gravity feeder has produced more pre-rut trail cam inventory on Kansas properties than any other approach we\'ve tested.',
    accentModifier: '--color-accent',
  },
  {
    phase: 'rut',
    displayName: 'Rut',
    dateRange: 'Mid-October → Mid-November',
    description:
      'The rut is here. Bucks are on their feet at all hours chasing does, covering 10–15 miles a day, and eating little. The key during this phase is maintaining attraction at established feed sites so bucks return between chasing cycles.',
    nutritionalPriority:
      'Bucks burn significant body weight during the rut — some lose 15–25% of their body mass in three weeks. High-energy feed sites are critical recovery stops. Buck Chow\'s roasted soybeans and natural grains deliver dense, digestible energy when bucks need it most.\n\nDoes are the priority consumer during the rut, and healthy does return to the same sites daily. A well-attended Corn Candy-enhanced feed site acts as a natural doe attractor that pulls bucks in when they circle on scent. Position your feeder site downwind of your stand and let the long-range aroma do the work.',
    accentModifier: '--color-accent',
  },
  {
    phase: 'post-rut',
    displayName: 'Post-Rut',
    dateRange: 'Mid-November → January',
    description:
      'Bucks are exhausted, does are bred, and the entire herd is in recovery mode. High-calorie, high-protein feed through Post-Rut determines how well deer enter winter, and how quickly bucks begin to rebuild for next season.',
    nutritionalPriority:
      'Recovery and hold is the Post-Rut priority. Deer that enter winter on a quality feed program hold body condition better, drop less weight, and shed earlier in spring. Buck Chow\'s protein and mineral profile is designed to be fed year-round — Post-Rut through late winter is where it does its quietest and most important work.\n\nDoes are entering late gestation by January, and what a doe eats now directly affects fawn birth weight in spring. Keeping a quality protein feed available through Post-Rut is one of the highest-leverage investments you can make in next year\'s fawn crop. Year-round Buck Chow customers consistently see heavier spring fawns and higher summer survival rates.',
    accentModifier: '--color-ink-muted',
  },
  {
    phase: 'antler-growth',
    displayName: 'Antler Growth',
    dateRange: 'April → August',
    description:
      'Bucks are in velvet. This is the fastest period of bone growth in the natural world — a mature buck can produce up to an inch of antler per day during peak growth. Mineral and protein levels during this window set the ceiling for the entire hunting season.',
    nutritionalPriority:
      'Mineral mass is the Antler Growth priority. Calcium and Phosphorus are the primary structural minerals in antler tissue — Buck Chow includes both in their optimal ratio for maximum antler mineralization. The 20% protein content supports the extraordinary metabolic demands of velvet growth while the natural grain base provides sustained energy.\n\nSpring and summer are when the long-game decisions get made. Properties that maintain quality protein and mineral programs through Antler Growth consistently produce deer with heavier, denser, and more symmetrical antlers than properties with seasonal-only programs. Corn Candy added to your feeder through summer keeps traffic consistent so you build inventory and pattern data before the season opens.',
    accentModifier: '--color-success',
  },
];

/** Get a season by its phase slug */
export function getSeasonByPhase(phase: string): SeasonMeta | null {
  return seasons.find((s) => s.phase === phase) ?? null;
}

/** Get all phase slugs for generateStaticParams */
export function getAllSeasonPhases(): string[] {
  return seasons.map((s) => s.phase);
}
