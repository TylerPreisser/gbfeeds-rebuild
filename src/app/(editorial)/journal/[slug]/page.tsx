// src/app/(editorial)/journal/[slug]/page.tsx
// RSC — no 'use client'.
// Dynamic journal article page. generateStaticParams from MDX filenames.
// Renders MDX via next-mdx-remote/rsc. Sticky date stamp in left margin.
// JSON-LD: Article schema.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getMDXComponents } from '../../../../../mdx-components';
import { getJournalEntryBySlug } from '@/data/journal-index';
import { buildMetadata, articleSchema, breadcrumbSchema } from '@/lib/seo';
import { Container } from '@/components/atomic/Container';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Stamp } from '@/components/atomic/Stamp';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { cn } from '@/lib/cn';

// ─── Static params ────────────────────────────────────────────────────────────

const JOURNAL_DIR = join(process.cwd(), 'src', 'content', 'journal');

export function generateStaticParams(): { slug: string }[] {
  try {
    const files = readdirSync(JOURNAL_DIR);
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
  } catch {
    return [];
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);
  if (!entry) return {};

  const base = buildMetadata({
    title: `${entry.title} | GB Feeds Journal`,
    description: entry.dek,
    canonical: `/journal/${slug}`,
    ogImage: `/og/journal-${slug}.png`,
  });

  // Noindex draft articles until Greg reviews and approves the copy.
  // Phase 8: remove draft flag from journal-index.ts entries after approval.
  if (entry.draft) {
    return { ...base, robots: { index: false, follow: true } };
  }

  return base;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SEASON_LABELS: Record<string, string> = {
  'pre-rut': 'Pre-Rut',
  rut: 'Rut',
  'post-rut': 'Post-Rut',
  'antler-growth': 'Antler Growth',
};

const ACTIVITY_LABELS = ['', 'Quiet', 'Low', 'Moderate', 'Active', 'Heavy'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getJournalEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  // Read raw MDX source
  let source = '';
  try {
    source = readFileSync(join(JOURNAL_DIR, `${slug}.mdx`), 'utf-8');
  } catch {
    notFound();
  }

  // Strip frontmatter for MDXRemote (it doesn't need to re-parse it)
  const contentWithoutFrontmatter = source.replace(/^---[\s\S]+?---\n/, '');

  // JSON-LD schemas
  const articleLd = articleSchema(entry);
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Journal', href: '/journal' },
    { name: entry.title, href: `/journal/${slug}` },
  ]);

  const components = getMDXComponents({});

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <main id="main-content">

        {/* ── ARTICLE HEADER ─────────────────────────────────────────────── */}
        <section
          className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
          aria-label="Article header"
        >
          <HairlineRules />
          <PaperGrain />

          {/* Hero / cover image */}
          {entry.coverImage && (
            <div className="relative aspect-[3/1] overflow-hidden">
              <img
                src={entry.coverImage}
                alt={`Cover image for ${entry.title}`}
                className="w-full h-full object-cover filter grayscale-[0.4]"
                loading="eager"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-paper-2)] via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          )}

          <Container>
            <div className="py-10 md:py-14">
              {/* Metadata stamps row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <Stamp variant="date" value={entry.date} />
                <Stamp variant="county" value={`${entry.county} Co., KS`} />
                <Stamp value={SEASON_LABELS[entry.season] ?? entry.season} />
                <Stamp variant="wind" value={entry.wind} />
                <Stamp value={`${entry.readMinutes} min read`} />
              </div>

              {/* Title */}
              <Heading as="h1" size="display-lg" className="mb-5 max-w-3xl">
                {entry.title}
              </Heading>

              {/* Dek */}
              <Text variant="body-lg" className="max-w-2xl font-body italic text-[var(--color-ink-muted)]">
                {entry.dek}
              </Text>

              {/* Activity score */}
              <div className="flex items-center gap-2 mt-5">
                <div
                  className="flex gap-0.5"
                  aria-label={`Activity score: ${entry.activityScore} out of 5 — ${ACTIVITY_LABELS[entry.activityScore]}`}
                >
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <span
                      key={dot}
                      className={cn(
                        'w-2 h-2 rounded-full',
                        dot <= entry.activityScore
                          ? 'bg-[var(--color-accent)]'
                          : 'bg-[var(--color-rule)]',
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                  {entry.weather} · {ACTIVITY_LABELS[entry.activityScore]} activity
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* ── ARTICLE BODY ───────────────────────────────────────────────── */}
        <div className="relative bg-[var(--color-paper)]">
          <PaperGrain />
          <HairlineRules />
          <Container>
            <div className="py-12 flex gap-8 lg:gap-16">

              {/* Sticky left-margin stamp — scrubs alongside article scroll */}
              <aside
                className="hidden md:block shrink-0 w-20 lg:w-28"
                aria-label="Article field notes"
              >
                <div className="sticky top-24 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <Stamp variant="date" value={entry.date.slice(0, 7)} />
                    <Stamp variant="county" value={`${entry.county}`} />
                    <Stamp variant="wind" value={entry.wind} />
                    <Stamp value={entry.season.toUpperCase()} />
                  </div>
                  <div
                    className="mt-4 flex gap-0.5 flex-col"
                    aria-label="Activity level"
                  >
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          dot <= entry.activityScore
                            ? 'bg-[var(--color-accent)]'
                            : 'bg-[var(--color-rule)]',
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </aside>

              {/* Article content */}
              <article
                className="flex-1 max-w-2xl min-w-0"
                aria-label={entry.title}
              >
                {entry.draft && (
                  <div className="mb-6 flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-3">
                    <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-accent)]">
                      DRAFT · PENDING REVIEW
                    </p>
                    <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                      Posted by GB Feeds
                    </span>
                  </div>
                )}
                <MDXRemote source={contentWithoutFrontmatter} components={components} />
              </article>
            </div>
          </Container>
        </div>

        {/* ── NAV: BACK TO JOURNAL ─────────────────────────────────────────── */}
        <div className="bg-[var(--color-paper-2)] border-t border-[var(--color-rule)]">
          <Container>
            <div className="py-6 flex items-center justify-between gap-4">
              <Link
                href="/journal"
                className="font-mono text-mono-xs tracking-[0.04em] uppercase
                  text-[var(--color-ink-quiet)] hover:text-[var(--color-accent)]
                  transition-colors duration-200
                  focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                ← Back to Journal
              </Link>
              <div className="flex flex-wrap gap-2">
                {entry.tags.slice(0, 4).map((tag) => (
                  <Stamp key={tag} value={tag} />
                ))}
              </div>
            </div>
          </Container>
        </div>

      </main>
    </>
  );
}
