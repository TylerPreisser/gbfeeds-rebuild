// src/components/page/CustomerReviewsPage.tsx
// RSC — no 'use client'.
// Designed reviews page: 22 verbatim testimonials presented as a 2-column
// magazine grid with stamp accents. Replaces the prior left-aligned text dump.
// Boundary: page/ imports atomic/ + data/.

import { Container } from '@/components/atomic/Container';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Rule } from '@/components/atomic/Rule';
import { Stamp } from '@/components/atomic/Stamp';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { testimonials } from '@/data/testimonials';

/**
 * <CustomerReviewsPage> — 22 verbatim customer testimonials.
 *
 * Layout: a 1-column on mobile / 2-column masonry on lg+ grid of testimonial
 * cards. Each card has a hairline border, a quote in DM Serif italic, and a
 * mono attribution stamp. Featured (long) quotes get accent treatment.
 */
export function CustomerReviewsPage() {
  // Identify a few featured quotes to give larger visual weight.
  const featuredIds = new Set(['jerry-1', 'andy-1', 'dylan-1']);

  return (
    <main id="main-content" className="bg-[var(--color-paper)]">
      <PaperGrain />

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <section
        className="relative py-20 sm:py-24 lg:py-32"
        aria-label="Customer reviews page header"
      >
        <Container variant="narrow">
          <p className="font-mono text-mono-xs tracking-[0.18em] uppercase text-[var(--color-ink-quiet)] text-center mb-4">
            From real GB Feeds customers
          </p>
          <Heading
            as="h1"
            size="display-md"
            className="text-center leading-[1.05] tracking-[0.01em] mb-6"
          >
            No paid sponsorships, no famous TV personalities — just real
            hunters sharing real success stories.
          </Heading>
          <Text
            variant="body-lg"
            className="text-center max-w-2xl mx-auto text-[var(--color-ink-muted)] leading-[1.5]"
          >
            22 verbatim testimonials from the gbfeeds.com customer-review
            page. First-name attribution only. No edits.
          </Text>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── TESTIMONIAL GRID ────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-24 lg:py-32"
        aria-label="All 22 customer testimonials"
      >
        <Container>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            role="list"
            aria-label="Customer testimonials"
          >
            {testimonials.map((testimonial, i) => {
              const isFeatured = featuredIds.has(testimonial.id);
              const isLong = testimonial.quote.length > 80;
              return (
                <figure
                  key={testimonial.id}
                  role="listitem"
                  className={[
                    'flex flex-col gap-4 p-6 lg:p-7',
                    'bg-[var(--color-paper-3)]',
                    'border border-[var(--color-rule)]',
                    'transition-colors duration-200',
                    'hover:border-[var(--color-ink)]',
                    isFeatured ? 'lg:col-span-2' : '',
                    isLong && !isFeatured ? 'md:col-span-2 lg:col-span-1' : '',
                  ].join(' ')}
                >
                  {/* Index stamp */}
                  <div className="flex items-center justify-between">
                    <Stamp
                      value={`№ ${String(i + 1).padStart(2, '0')}`}
                    />
                    {testimonial.productMentioned && (
                      <span className="font-mono text-mono-xs tracking-[0.06em] uppercase text-[var(--color-accent)]">
                        {testimonial.productMentioned.replace(/-/g, ' ')}
                      </span>
                    )}
                  </div>

                  <blockquote
                    className={[
                      'font-body italic text-[var(--color-ink)] leading-[1.4]',
                      isFeatured
                        ? 'text-[clamp(1.125rem,1rem+0.6vw,1.5rem)]'
                        : 'text-[clamp(0.9375rem,0.875rem+0.3vw,1.125rem)]',
                    ].join(' ')}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <figcaption
                    className="font-mono text-mono-xs tracking-[0.08em] uppercase text-[var(--color-ink-quiet)] mt-auto"
                  >
                    — {testimonial.attribution}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
