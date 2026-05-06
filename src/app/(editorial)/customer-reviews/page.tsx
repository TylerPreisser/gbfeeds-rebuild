// src/app/(editorial)/customer-reviews/page.tsx
// RSC — no 'use client'.
// All 22 verbatim testimonials. JSON-LD Review[] inside Organization.

import type { Metadata } from 'next';
import { CustomerReviewsPage } from '@/components/page/CustomerReviewsPage';
import { buildMetadata } from '@/lib/seo';
import { reviewListSchema } from '@/lib/seo';
import { testimonials } from '@/data/testimonials';

export const metadata: Metadata = buildMetadata({
  title: 'Customer Reviews — Real Results from Real Hunters | GB Feeds',
  description:
    'No paid sponsorships. No famous TV personalities. Just real Kansas hunters sharing real results with GB Feeds deer feed products.',
  canonical: '/customer-reviews',
  ogImage: '/og/customer-reviews.png',
});

export default function Page() {
  const reviewSchema = reviewListSchema(testimonials);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <CustomerReviewsPage />
    </>
  );
}
