// src/components/page/CustomerReviewsPage.tsx
// RSC — no 'use client'.
// All 22 verbatim testimonials in masonry-ish grid.
// <MarqueeTicker> at top with 4 highest-impact quotes.
// Boundary: page/ imports composite/ + atomic/ + decoration/ + data/.

import Link from 'next/link';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { TestimonialCard } from '@/components/composite/TestimonialCard';
import { MarqueeTicker } from '@/components/composite/MarqueeTicker';
import { testimonials } from '@/data/testimonials';

// Top 4 marquee testimonials — high-impact, short, punchy
const MARQUEE_SLUGS = ['dylan-1', 'torrey-1', 'seth-1', 'nathan-1'];
const marqueeTestimonials = testimonials.filter((t) => MARQUEE_SLUGS.includes(t.id));

/**
 * <CustomerReviewsPage> — all 22 verbatim testimonials.
 * Layout: MarqueeTicker ticker → hero heading → masonry-style 3-column grid.
 */
export function CustomerReviewsPage() {
  return (
    <main id="main-content">

      {/* ── MARQUEE TICKER ───────────────────────────────────────────────── */}
      <div
        className="bg-[var(--color-ink)] border-b border-[var(--color-gray-700)]"
        aria-label="Scrolling testimonial highlights"
      >
        <MarqueeTicker
          testimonials={marqueeTestimonials}
          className="py-3"
        />
      </div>

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
        aria-label="Customer reviews page header"
      >
        <HairlineRules />
        <PaperGrain />
        <Container>
          <div className="py-14 md:py-20">
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
              KANSAS / MIDWEST / REAL HUNTERS / REAL RESULTS
            </p>
            <Heading as="h1" size="display-lg" className="mb-4">
              Customer Reviews
            </Heading>
            <Text variant="body-lg" className="max-w-2xl text-[var(--color-ink-muted)] font-body italic">
              No paid sponsorships, no famous TV personalities, just real hunters sharing real success stories
            </Text>
          </div>
        </Container>
      </section>

      {/* ── TESTIMONIALS GRID ────────────────────────────────────────────── */}
      <Section bg="paper">
        <PaperGrain />
        <Container>
          <Rule weight="hair" className="mb-10" />

          {/* Masonry-ish 3-column grid — CSS columns for natural flow */}
          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            aria-label="All 22 customer testimonials"
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="break-inside-avoid">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <Rule weight="hair" className="mt-10 mb-8" />

          {/* Bottom CTA */}
          <div className="text-center">
            <Text variant="body-md" className="text-[var(--color-ink-muted)] mb-4">
              Ready to add your success story?
            </Text>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3
                font-display uppercase tracking-[0.02em] text-body-md
                bg-[var(--color-ink)] text-[var(--color-paper)]
                border border-[var(--color-ink)]
                hover:bg-[var(--color-gray-900)] transition-colors duration-200
                focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              Shop GB Feeds
            </Link>
          </div>
        </Container>
      </Section>

    </main>
  );
}
