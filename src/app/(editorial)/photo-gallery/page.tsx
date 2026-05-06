// src/app/(editorial)/photo-gallery/page.tsx
// RSC — no 'use client'.
// Static photo grid with client lightbox child.

import type { Metadata } from 'next';
import { PhotoGalleryPage } from '@/components/page/PhotoGalleryPage';
import { buildMetadata, photoGallerySchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Photo Gallery — GB Feeds in the Field | GB Feeds',
  description:
    'Trail cam photos, harvest photos, and field shots from GB Feeds customers across Kansas and the Midwest.',
  canonical: '/photo-gallery',
  ogImage: '/og/default.png',
});

export default function Page() {
  const schema = photoGallerySchema();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PhotoGalleryPage />
    </>
  );
}
