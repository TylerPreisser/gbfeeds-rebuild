// src/app/manifest.ts
// Generates /manifest.webmanifest at build time via Next.js App Router.
// Enables "Add to Home Screen" on mobile with brand colors and icons.

import type { MetadataRoute } from 'next';

// Required for output: 'export' static export compatibility
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GB Feeds',
    short_name: 'GB Feeds',
    description: 'Premium deer feed and wildlife supplements from Riley County, Kansas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#EDE7D9',
    theme_color: '#0F0E0B',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
