// src/components/page/JournalIndexPage.tsx
// RSC — no 'use client'.
// Journal index: 3 article cards with hand-stamped date reveal on hover.
// Boundary: page/ imports composite/ + atomic/ + decoration/ + data/.

import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { Stamp } from '@/components/atomic/Stamp';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { getRecentJournalEntries } from '@/data/journal-index';
import { cn } from '@/lib/cn';

const SEASON_LABELS: Record<string, string> = {
  'pre-rut': 'Pre-Rut',
  rut: 'Rut',
  'post-rut': 'Post-Rut',
  'antler-growth': 'Antler Growth',
};

const ACTIVITY_LABELS = ['', 'Quiet', 'Low', 'Moderate', 'Active', 'Heavy'];

/**
 * <JournalIndexPage> — lists all 3 journal articles as cards.
 * Cards have: cover image, date stamp, season, county, dek, read time.
 * Hover: date-stamp overlay reveals with subtle rotation (pure CSS group-hover).
 */
export function JournalIndexPage() {
  const entries = getRecentJournalEntries(10);

  return (
    <main id="main-content">

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
        aria-label="Journal page header"
      >
        <HairlineRules />
        <PaperGrain />
        <Container>
          <div className="py-14 md:py-20">
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
              RILEY COUNTY, KS / FIELD NOTES / GREG BRUNGARDT
            </p>
            <Heading as="h1" size="display-lg">
              Field Journal
            </Heading>
            <Text variant="body-lg" className="mt-4 max-w-xl text-[var(--color-ink-muted)] font-body italic">
              Stand notes, ingredient walks, and honest field analysis. No editorial polish.
            </Text>
          </div>
        </Container>
      </section>

      {/* ── ARTICLE GRID ─────────────────────────────────────────────────── */}
      <Section bg="paper">
        <PaperGrain />
        <Container>
          <Rule weight="hair" className="mb-10" />

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            aria-label="Journal articles"
          >
            {entries.map((entry) => (
              <article
                key={entry.slug}
                className="group relative flex flex-col bg-[var(--color-paper-3)] border border-[var(--color-rule)] hover:border-[var(--color-ink)] transition-all duration-200"
                aria-label={entry.title}
              >
                {/* Cover image */}
                {entry.coverImage && (
                  <a
                    href={`/journal/${entry.slug}`}
                    className="block overflow-hidden aspect-[3/2] relative"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={entry.coverImage}
                      alt={`Cover image for ${entry.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover filter grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                    />

                    {/* Date stamp overlay — reveals on hover with rotation */}
                    <div
                      className={cn(
                        'absolute bottom-3 left-3',
                        'opacity-0 group-hover:opacity-100',
                        'rotate-[-1.5deg] group-hover:rotate-0',
                        'transition-all duration-220 ease-out',
                        'bg-[var(--color-paper)] border border-[var(--color-rule)] px-2 py-1',
                      )}
                      aria-hidden="true"
                    >
                      <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                        {entry.date}
                      </span>
                    </div>
                  </a>
                )}

                {/* Article metadata row */}
                <div className="flex flex-wrap items-center gap-2 px-5 pt-4">
                  <Stamp value={SEASON_LABELS[entry.season] ?? entry.season} />
                  <Stamp variant="county" value={`${entry.county} Co.`} />
                  <Stamp value={`${entry.readMinutes} min`} />
                </div>

                {/* Article body */}
                <div className="flex flex-col gap-2 px-5 py-4 flex-1">
                  <Heading as="h2" size="display-sm" className="line-clamp-3">
                    <a
                      href={`/journal/${entry.slug}`}
                      className="hover:text-[var(--color-accent)] transition-colors duration-200"
                    >
                      {entry.title}
                    </a>
                  </Heading>

                  <Text variant="body-sm" className="text-[var(--color-ink-muted)] leading-[1.4] line-clamp-3">
                    {entry.dek}
                  </Text>

                  {/* Activity score */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5" aria-label={`Activity score: ${entry.activityScore} out of 5`}>
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
                    <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                      {ACTIVITY_LABELS[entry.activityScore]}
                    </span>
                  </div>
                </div>

                {/* CTA row */}
                <div className="px-5 pb-5 mt-auto">
                  <Rule weight="hair" className="mb-4" />
                  <a
                    href={`/journal/${entry.slug}`}
                    className="font-mono text-mono-xs tracking-[0.04em] uppercase
                      text-[var(--color-ink-quiet)] hover:text-[var(--color-accent)]
                      transition-colors duration-200
                      focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    Read entry →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

    </main>
  );
}
