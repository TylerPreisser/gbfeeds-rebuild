// src/app/sitemap.ts
// Generates sitemap.xml at build time via Next.js App Router.
// Covers all 36 HTML routes from src/lib/routes.ts.
// The PDP slugs use actual slugs from products.live.json (not the legacy routes.ts paths).

import type { MetadataRoute } from 'next';

// Required for output: 'export' static export compatibility
export const dynamic = 'force-static';

import { getAllProducts } from '@/data/products';
import { getAllJournalSlugs } from '@/data/journal-index';
import { getAllSeasonPhases } from '@/data/seasons';

const SITE_URL = (
  process.env['NEXT_PUBLIC_SITE_URL'] || 'https://gbfeeds.com'
).replace(/\/$/, '');

function url(path: string): string {
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${withSlash}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const journalSlugs = getAllJournalSlugs();
  const seasonPhases = getAllSeasonPhases();

  const staticRoutes: MetadataRoute.Sitemap = [
    // Core — priority 1.0
    { url: url('/'), lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },

    // Commerce — priority 0.9
    { url: url('/products'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/feed-program'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },

    // Editorial — priority 0.8
    { url: url('/our-story'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: url('/why-gb-feeds'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: url('/journal'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/field-club'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },

    // Support — priority 0.7
    { url: url('/customer-reviews'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/photo-gallery'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/contact'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: url('/faq'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Legal — priority 0.3
    { url: url('/terms'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/privacy'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic: 16 PDPs
  const pdpRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/products/${p.slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p.category === 'deer-feed' ? 0.9 : 0.7,
  }));

  // Dynamic: 3 journal articles
  const journalRoutes: MetadataRoute.Sitemap = journalSlugs.map((slug) => ({
    url: url(`/journal/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic: 4 season pages
  const seasonRoutes: MetadataRoute.Sitemap = seasonPhases.map((phase) => ({
    url: url(`/season/${phase}`),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...pdpRoutes, ...journalRoutes, ...seasonRoutes];
}
