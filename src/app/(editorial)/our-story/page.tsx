// src/app/(editorial)/our-story/page.tsx
// RSC — no 'use client'.
// Greg's founder narrative verbatim from CONTENT_INVENTORY.md § /our-story.

import type { Metadata } from 'next';
import { OurStoryPage } from '@/components/page/OurStoryPage';
import { buildMetadata, orgSchema, aboutPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our Story — Greg Brungardt & GB Feeds | GB Feeds',
  description:
    'A deer feed company founded for hunters, by hunters. Greg Brungardt started GB Feeds in 2017 after years of product testing in Kansas. This is how GB Feeds was born.',
  canonical: '/our-story',
  ogImage: '/og/default.png',
});

export default function Page() {
  const org = orgSchema();
  const about = aboutPageSchema();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(about) }}
      />
      <OurStoryPage />
    </>
  );
}
