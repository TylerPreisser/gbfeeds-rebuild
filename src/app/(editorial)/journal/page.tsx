// src/app/(editorial)/journal/page.tsx
// RSC — no 'use client'.
// Journal index page listing 3 launch articles.

import type { Metadata } from 'next';
import { JournalIndexPage } from '@/components/page/JournalIndexPage';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { allJournalEntriesAreDraft } from '@/data/journal-index';

const ALL_DRAFTS = allJournalEntriesAreDraft();

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Field Journal — Stand Notes & Ingredient Deep-Dives | GB Feeds',
    description:
      'Greg Brungardt\'s field journal. Stand-by-stand notes from Riley County, ingredient deep-dives, and honest analysis on what moves the needle for Kansas whitetail.',
    canonical: '/journal',
    ogImage: '/og/default.png',
  }),
  // Noindex the journal index when every article is still in draft/pending-review status.
  // Phase 8: remove this after Greg approves at least one article.
  ...(ALL_DRAFTS ? { robots: { index: false, follow: true } } : {}),
};

export default function Page() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Journal', href: '/journal' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <JournalIndexPage />
    </>
  );
}
