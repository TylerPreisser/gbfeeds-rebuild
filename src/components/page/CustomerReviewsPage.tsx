// src/components/page/CustomerReviewsPage.tsx
// RSC — no 'use client'.
// Designed reviews page: 22 verbatim testimonials presented as a 2-column
// magazine grid with stamp accents. Replaces the prior left-aligned text dump.
// Boundary: page/ imports atomic/ + data/.

import { Container } from '@/components/atomic/Container';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Rule } from '@/components/atomic/Rule';
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
  return (
    <main id="main-content" className="bg-[var(--color-paper)]">
      <PaperGrain />

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <section
        className="relative py-14 sm:py-16 lg:py-20"
        aria-label="Customer reviews page header"
      >
        <Container variant="narrow">
          <p className="font-mono text-mono-xs tracking-[0.18em] uppercase text-[var(--color-ink-quiet)] text-center mb-4">
            From real GB Feeds customers
          </p>
          <Heading
            as="h1"
            size="display-sm"
            className="text-center leading-[1.05] tracking-[0.01em] mb-5 max-w-4xl mx-auto text-[clamp(2.35rem,5vw,5.25rem)]"
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
        className="py-14 sm:py-16 lg:py-20"
        aria-label="All 22 customer testimonials"
      >
        <Container>
          <div
            className="columns-1 md:columns-2 lg:columns-3 gap-4 lg:gap-5 [column-fill:balance]"
            role="list"
            aria-label="Customer testimonials"
          >
            {testimonials.map((testimonial) => {
              return (
                <figure
                  key={testimonial.id}
                  role="listitem"
                  className={[
                    'premium-card mb-4 lg:mb-5 break-inside-avoid flex flex-col gap-3 p-4 lg:p-5',
                    'bg-[var(--color-paper-3)]',
                    'border border-[var(--color-rule)]',
                    'transition-colors duration-200',
                    'hover:border-[var(--color-ink)]',
                  ].join(' ')}
                >
                  {testimonial.productMentioned && (
                    <span className="font-mono text-mono-xs tracking-[0.06em] uppercase text-[var(--color-accent)]">
                      {testimonial.productMentioned.replace(/-/g, ' ')}
                    </span>
                  )}

                  <blockquote
                    className={[
                      'font-body italic text-[var(--color-ink)] leading-[1.4]',
                      'text-[clamp(0.9rem,0.85rem+0.25vw,1.0625rem)]',
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
