// src/app/sitemap.ts
// Generates sitemap.xml at build time via Next.js App Router.
// Covers all real routes from ORIGINAL_TRUTH.md — no invented routes.

import type { MetadataRoute } from 'next';

// Required for output: 'export' static export compatibility
export const dynamic = 'force-static';

import { getAllProducts } from '@/data/products';

const SITE_URL = (
  process.env['NEXT_PUBLIC_SITE_URL'] || 'https://gbfeeds.com'
).replace(/\/$/, '');

function url(path: string): string {
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${withSlash}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    // Core — priority 1.0
    { url: url('/'), lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },

    // Commerce — priority 0.9
    { url: url('/products'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },

    // Editorial — priority 0.8
    { url: url('/our-story'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: url('/why-gb-feeds'), lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },

    // Support — priority 0.7
    { url: url('/customer-reviews'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/photo-gallery'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

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

  return [...staticRoutes, ...pdpRoutes];
}
