// src/components/page/CustomerReviewsPage.tsx
// RSC — no 'use client'.
// Brutally minimal per ORIGINAL_TRUTH.md § 6.1–6.3.
// Title = verbatim "No paid sponsorships..." centered multi-line.
// Single-column left-aligned tightly-stacked list of 22 testimonials.
// No photos. No avatars. No dates. No platform tags. No dividers. No cards.
// Boundary: page/ imports atomic/ + data/.

import { Container } from '@/components/atomic/Container';
import { Heading } from '@/components/atomic/Heading';
import { Rule } from '@/components/atomic/Rule';
import { testimonials } from '@/data/testimonials';

/**
 * <CustomerReviewsPage> — 22 verbatim testimonials, brutally minimal.
 * Per ORIGINAL_TRUTH.md § 6.1: centered title, then single-column LEFT-ALIGNED
 * tightly-stacked list of all 22 reviews. No cards, no avatars, no tags.
 */
export function CustomerReviewsPage() {
  return (
    <main id="main-content">

      {/* ── PAGE TITLE ── verbatim "No paid sponsorships..." ─────────────── */}
      <section
        className="bg-white py-20 sm:py-24 lg:py-32"
        aria-label="Customer reviews page header"
      >
        <Container variant="narrow">
          <Heading
            as="h1"
            size="display-md"
            className="text-center leading-[1.15]"
          >
            No paid sponsorships, no famous TV personalities, just real hunters
            sharing real success stories
          </Heading>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── TESTIMONIALS — single-column left-aligned list ─────────────── */}
      <section
        className="bg-white py-20 sm:py-24 lg:py-32"
        aria-label="All 22 customer testimonials"
      >
        <Container variant="narrow">
          <div
            className="flex flex-col gap-6"
            role="list"
            aria-label="Customer testimonials"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                role="listitem"
                className="flex flex-col gap-0.5"
              >
                <p className="font-body text-body-md text-[var(--color-ink)] leading-[1.4]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="font-body text-body-sm text-[var(--color-ink-muted)]">
                  -{testimonial.attribution}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </main>
  );
}
