// src/components/page/WhyGBFeedsPage.tsx
// RSC — no 'use client'.
// Verbatim copy from CONTENT_INVENTORY.md § /why-gb-feeds.
// Replaces "10,000 inches" with <LiveCount />.
// Boundary: page/ imports composite/ + atomic/ + decoration/ + data/.

import Link from 'next/link';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { Marker } from '@/components/atomic/Marker';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { LiveCount } from '@/components/composite/LiveCount';
import { pillars } from '@/data/pillars';

/**
 * <WhyGBFeedsPage> — expanded four-pillar explanation.
 * "10,000 inches" inline occurrences replaced with <LiveCount />.
 * Each pillar has a Marker left-margin stamp.
 */
export function WhyGBFeedsPage() {
  return (
    <main id="main-content">

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
        aria-label="Why GB Feeds page header"
      >
        <HairlineRules />
        <PaperGrain />
        <Container>
          <div className="py-14 md:py-20">
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
              RILEY COUNTY, KS / GB FEEDS DIFFERENCE
            </p>
            <Heading as="h1" size="display-lg">
              Why GB Feeds
            </Heading>
            <Text variant="body-lg" className="mt-4 max-w-2xl text-[var(--color-ink-muted)]">
              Four pillars. No shortcuts. Tested in Kansas.
            </Text>
          </div>
        </Container>
      </section>

      {/* ── FOUR PILLARS ─────────────────────────────────────────────────── */}
      <Section bg="paper">
        <PaperGrain />
        <Container>
          <div className="flex flex-col gap-16">
            {pillars.map((pillar) => {
              // Only pillar 01 (Proven Results) references the inch count
              const isProvenResults = pillar.number === '01';

              return (
                <article
                  key={pillar.number}
                  className="flex gap-8 lg:gap-16"
                  aria-label={`Pillar ${pillar.number}: ${pillar.heading}`}
                >
                  {/* Left margin stamp */}
                  <div className="hidden md:block shrink-0">
                    <Marker
                      county="Manhattan, KS"
                      extra={[{ value: `PILLAR ${pillar.number}` }]}
                      aria-label={`Pillar ${pillar.number} field notes`}
                    />
                  </div>

                  {/* Pillar content */}
                  <div className="flex-1 max-w-2xl">
                    {/* Mobile eyebrow stamp */}
                    <p className="md:hidden font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-3">
                      Pillar {pillar.number}
                    </p>

                    <Heading as="h2" size="display-md" className="mb-5">
                      {pillar.heading}
                    </Heading>

                    {isProvenResults ? (
                      // Pillar 01 body: replace the static "10,000 inches" with <LiveCount />
                      <Text variant="body-md" className="leading-[1.5] text-[var(--color-ink-muted)]">
                        When we say we help hunters create their once in a lifetime story, we mean it. It&apos;s the foundation of our company and it&apos;s who we are. In 2023 and 2024, our customers harvested over{' '}
                        <LiveCount suffix="inches" variant="inline" />{' '}
                        of antler using GB Feeds products right here in Kansas.
                      </Text>
                    ) : (
                      <Text variant="body-md" className="leading-[1.5] text-[var(--color-ink-muted)]">
                        {pillar.body}
                      </Text>
                    )}
                  </div>

                  {/* Mobile: pillar number as giant display element */}
                  <div className="hidden lg:flex items-start shrink-0">
                    <span
                      className="font-display text-[8rem] leading-none text-[var(--color-gray-100)] select-none"
                      aria-hidden="true"
                    >
                      {pillar.number}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── CTA BAND ─────────────────────────────────────────────────────── */}
      <Section bg="paper-2">
        <PaperGrain />
        <Container variant="narrow">
          <Rule weight="strong" className="mb-8" />
          <div className="text-center">
            <Heading as="h2" size="display-md" className="mb-4">
              Ready to put it to work?
            </Heading>
            <Text variant="body-md" className="text-[var(--color-ink-muted)] mb-8">
              Over{' '}
              <LiveCount suffix="inches" variant="inline" />{' '}
              harvested by hunters who made the switch.
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
              Shop All Products
            </Link>
          </div>
          <Rule weight="strong" className="mt-8" />
        </Container>
      </Section>

    </main>
  );
}
