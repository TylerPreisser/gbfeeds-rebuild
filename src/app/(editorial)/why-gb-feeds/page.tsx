// src/app/(editorial)/why-gb-feeds/page.tsx
// RSC — no 'use client'.

import type { Metadata } from 'next';
import { WhyGBFeedsPage } from '@/components/page/WhyGBFeedsPage';
import { buildMetadata, whyGbFeedsPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Why GB Feeds — Proven Results, Quality, Value | GB Feeds',
  description:
    'Four pillars. Tested right here in Kansas. Over 7,500 inches of antler harvested using GB Feeds products. See why serious hunters choose GB Feeds.',
  canonical: '/why-gb-feeds',
  ogImage: '/og/default.png',
});

export default function Page() {
  const schema = whyGbFeedsPageSchema();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <WhyGBFeedsPage />
    </>
  );
}
