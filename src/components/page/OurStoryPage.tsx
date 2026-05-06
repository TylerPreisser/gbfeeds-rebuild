// src/components/page/OurStoryPage.tsx
// RSC — no 'use client'.
// Greg's founder narrative. Verbatim from CONTENT_INVENTORY.md § /our-story.
// Signature motion: the signed note slides up on scroll — pure CSS transform/opacity
// via the .story-note-enter class applied on .in-view (IntersectionObserver handled
// by CSS @starting-style, falls back to static for no-JS / reduced-motion).
// Boundary: page/ imports composite/ + atomic/ + decoration/.

import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { Marker } from '@/components/atomic/Marker';
import { Stamp } from '@/components/atomic/Stamp';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';

/**
 * <OurStoryPage> — Greg's founder narrative.
 * inch-wide left Marker with date/county/wind stamps.
 * Pull-quote for the signature line about being the best, not the biggest.
 * Greg-signature.svg in oxblood at the bottom.
 */
export function OurStoryPage() {
  return (
    <main id="main-content">

      {/* ── HERO HEADER ────────────────────────────────────────────────── */}
      <section
        className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
        aria-label="Our story page header"
      >
        <HairlineRules />
        <PaperGrain />
        <Container>
          <div className="py-14 md:py-20">
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
              RILEY COUNTY, KS / EST. 2017 / FOUNDER&apos;S NOTE
            </p>
            <Heading as="h1" size="display-lg">
              Our Story
            </Heading>
            <Text variant="body-lg" className="mt-4 max-w-xl text-[var(--color-ink-muted)] font-body italic">
              A deer feed company founded for hunters, by hunters
            </Text>
          </div>
        </Container>
      </section>

      {/* ── FOUNDER NARRATIVE ──────────────────────────────────────────── */}
      <Section bg="paper">
        <PaperGrain />
        <Container>
          <div className="flex gap-8 lg:gap-16">

            {/* Left-margin logbook stamp column */}
            <div className="hidden md:block shrink-0">
              <Marker
                date="2017-01-01"
                county="Riley Co."
                wind="W 12"
                extra={[{ value: 'Kansas' }]}
                aria-label="Founder story field notes"
              />
            </div>

            {/* Founder narrative body */}
            <article
              className="flex-1 max-w-2xl"
              aria-label="Greg's founder narrative"
            >
              {/* Lifestyle hero image */}
              <div className="mb-8 relative">
                <img
                  src="/photos/lifestyle/lifestyle-img-3622.webp"
                  alt="Greg Brungardt scouting a Kansas hunting property at dusk"
                  width={800}
                  height={533}
                  className="w-full aspect-[3/2] object-cover border border-[var(--color-rule)]"
                  loading="lazy"
                />
                <p className="mt-2 font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                  Riley County, Kansas — pre-season scouting
                </p>
              </div>

              {/* Opening paragraph */}
              <Text variant="body-md" className="leading-[1.5] text-[var(--color-ink-muted)] mb-6">
                Have you ever bought a deer feed product and been disappointed when it didn&apos;t work? Me too...
              </Text>

              <Text variant="body-md" className="leading-[1.5] text-[var(--color-ink-muted)] mb-6">
                In 2017, I began to envision a deer feed company unlike any other. A company with product tested right here in the Midwest with a proven track record of success. Five years later and after dozens of product testing sites, hundreds of component trials and nearly a million trail cam pictures, GB FEEDS WAS BORN!
              </Text>

              {/* Pull-quote — signature line */}
              <blockquote
                className="my-8 pl-5 border-l-2 border-[var(--color-accent)]"
                aria-label="Greg's mission statement"
              >
                <p className="font-body italic text-body-lg text-[var(--color-ink)] leading-[1.3]">
                  Being the biggest feed company has never been the goal, we want to be the <em>BEST</em> feed company.
                </p>
              </blockquote>

              <Text variant="body-md" className="leading-[1.5] text-[var(--color-ink-muted)] mb-6">
                Our direct to consumer model is based on four pillars:
              </Text>

              {/* Four pillars list */}
              <ul className="mb-6 flex flex-col gap-2" aria-label="GB Feeds four pillars">
                {[
                  'Proven Results',
                  'Quality Products',
                  'Unmatched Value',
                  'Superior Customer Service',
                ].map((pillar) => (
                  <li key={pillar} className="flex items-center gap-3">
                    <span
                      className="shrink-0 w-4 h-px bg-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                    <span className="font-display uppercase tracking-[0.02em] text-display-sm text-[var(--color-ink)]">
                      {pillar}
                    </span>
                  </li>
                ))}
              </ul>

              <Text variant="body-md" className="leading-[1.5] text-[var(--color-ink-muted)] mb-6">
                These pillars guide the company in every decision we make and serve as the foundation for all current and future products.
              </Text>

              <Text variant="body-md" className="leading-[1.5] text-[var(--color-ink-muted)] mb-8">
                If you&apos;re in the market for quality deer feed products, proven to help you develop and harvest bigger bucks, at a value you can afford, I would like to be the first to welcome you to the GB Feeds family.
              </Text>

              <Text variant="body-md" className="leading-[1.5] text-[var(--color-ink-muted)] mb-8">
                We&apos;re glad you&apos;re here!
              </Text>

              <Rule weight="hair" className="mb-6" />

              {/* Signature */}
              <div
                className="flex flex-col gap-2"
                aria-label="Signed by Greg Brungardt"
              >
                <img
                  src="/brand/greg-signature.svg"
                  alt="Greg Brungardt's signature"
                  width={180}
                  height={60}
                  className="h-12 w-auto"
                  style={{ color: 'var(--color-accent)' } as React.CSSProperties}
                />
                <div className="flex items-center gap-3">
                  <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                    Greg Brungardt
                  </span>
                  <Stamp value="FOUNDER" />
                  <Stamp variant="county" value="Manhattan, KS" />
                </div>
              </div>
            </article>
          </div>
        </Container>
      </Section>

    </main>
  );
}
