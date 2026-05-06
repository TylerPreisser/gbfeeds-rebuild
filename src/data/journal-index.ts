// src/data/journal-index.ts
// Frontmatter for the 3 launch journal articles.
// RSC-only: no 'use client'. Article body MDX comes in Phase 6D.7.

import type { JournalEntry } from '@/types/product';

/**
 * All 3 launch journal articles with full frontmatter.
 * Article body MDX lives in src/content/journal/<slug>.mdx (Phase 6D.7).
 */
export const journalIndex: JournalEntry[] = [
  {
    slug: 'stand-7b-riley',
    title: "Stand 7B, Riley County: Why I Switched My Spin Feeders Back to Gravity",
    date: '2024-10-08',
    county: 'Riley',
    season: 'pre-rut',
    weather: 'Overcast, 54°F',
    wind: 'NW 9',
    activityScore: 4,
    tags: ['pre-rut', 'feeders', 'riley-county', 'gravity-vs-spin', 'buck-chow'],
    coverImage: '/photos/lifestyle/lifestyle-img-3622-640w.webp',
    readMinutes: 7,
    dek:
      "After three years running spin feeders at Stand 7B, one bad motor failure during early October cost me two weeks of bucks hitting the site. Here's what I changed and why it mattered.",
    // Agent-authored first-person narrative — pending Greg's review and approval.
    // Phase 8: remove draft flag, add "— Greg" attribution after approval.
    draft: true,
  },
  {
    slug: 'ingredient-walk',
    title: "What's Actually In a Bag of Buck Chow: An Ingredient-by-Ingredient Walk",
    date: '2024-08-15',
    county: 'Riley',
    season: 'antler-growth',
    weather: 'Sunny, 88°F',
    wind: 'S 6',
    activityScore: 2,
    tags: ['antler-growth', 'nutrition', 'ingredients', 'buck-chow', 'protein'],
    coverImage: '/photos/lifestyle/lifestyle-img-3622-640w.webp',
    readMinutes: 9,
    dek:
      "I get asked about the formula constantly. Here is every ingredient in Buck Chow, why it's in there, and what would happen to your deer herd if it wasn't.",
    // Agent-authored first-person narrative — pending Greg's review and approval.
    // Phase 8: remove draft flag, add "— Greg" attribution after approval.
    draft: true,
  },
  {
    slug: 'twenty-two-inch-rule',
    title: "How We Measure Inches: The 22-Inch Rule and Why Greens Don't Count",
    date: '2024-11-20',
    county: 'Riley',
    season: 'rut',
    weather: 'Clear, 38°F',
    wind: 'W 12',
    activityScore: 5,
    tags: ['rut', 'scoring', 'trophy', 'antler-measurement', 'field-judging'],
    coverImage: '/photos/lifestyle/lifestyle-img-3622-640w.webp',
    readMinutes: 6,
    dek:
      "The 22-inch rule is the fastest way to field-judge a shooter without getting caught staring. If it breaks the ears on both sides, it's probably there. Here's the full system.",
    // Agent-authored first-person narrative — pending Greg's review and approval.
    // Phase 8: remove draft flag, add "— Greg" attribution after approval.
    draft: true,
  },
];

/** Get a journal entry by slug */
export function getJournalEntryBySlug(slug: string): JournalEntry | null {
  return journalIndex.find((e) => e.slug === slug) ?? null;
}

/** Get all journal slugs for generateStaticParams */
export function getAllJournalSlugs(): string[] {
  return journalIndex.map((e) => e.slug);
}

/** Get recent journal entries (sorted newest-first) */
export function getRecentJournalEntries(limit = 3): JournalEntry[] {
  return [...journalIndex]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Returns true when every article in the journal is marked draft: true.
 * Used by the journal index page to conditionally apply noindex.
 */
export function allJournalEntriesAreDraft(): boolean {
  return journalIndex.length > 0 && journalIndex.every((e) => e.draft === true);
}
