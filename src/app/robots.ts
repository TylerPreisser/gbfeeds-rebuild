// src/app/robots.ts
// Generates robots.txt at build time via Next.js App Router.
// Allows all crawlers and points to the sitemap.

import type { MetadataRoute } from 'next';

// Required for output: 'export' static export compatibility
export const dynamic = 'force-static';

const SITE_URL =
  process.env['NEXT_PUBLIC_SITE_URL']?.replace(/\/$/, '') ?? 'https://gbfeeds.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
