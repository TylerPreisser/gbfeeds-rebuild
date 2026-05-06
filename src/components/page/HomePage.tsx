// src/components/page/HomePage.tsx
// RSC — no 'use client'.
// Home page orchestrator. Composes all 7 sections.
// Boundary: page/ may import composite/ + motion/ (via dynamic) + decoration/ + atomic/ + data/ + lib/.

import Link from 'next/link';
import { pillars } from '@/data/pillars';
import { faqs } from '@/data/faq';
import { getRecentJournalEntries } from '@/data/journal-index';
import type { HarvestsFile } from '@/types/harvests';
import { Button } from '@/components/atomic/Button';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Stamp } from '@/components/atomic/Stamp';
import { Rule } from '@/components/atomic/Rule';
import { Section } from '@/components/atomic/Section';
import { Container } from '@/components/atomic/Container';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { FAQItem } from '@/components/composite/FAQItem';
import { NewsletterForm } from '@/components/composite/NewsletterForm';
import { orgSchema, webSiteSchema, faqSchema } from '@/lib/seo';
import { cn } from '@/lib/cn';
// SignatureMoveLoader is a 'use client' component that owns the dynamic() + ssr:false boundary.
// App Router rule: ssr:false in dynamic() requires a Client Component file.
import { SignatureMoveLoader } from '@/components/motion/SignatureMoveLoader';

// ─── Props ────────────────────────────────────────────────────────────────────

interface HomePageProps {
  harvests: HarvestsFile;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function HomePage({ harvests }: HomePageProps) {
  const recentJournal = getRecentJournalEntries(3);
  const homeFaqs = faqs.slice(0, 4);

  return (
    <>
      {/* JSON-LD: Organization + WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />

      <main id="main-content">

        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        {/* min-h-[100svh] uses Small Viewport Height — accounts for iOS Safari
            collapsing browser chrome (~52–84px). min-h-screen (100vh) includes
            the toolbar height, clipping bottom CTAs on first load. */}
        <section
          className="relative min-h-[100svh] flex flex-col justify-end bg-[var(--color-paper)] overflow-hidden"
          aria-label="GB Feeds hero"
        >
          {/* Atmosphere layers */}
          <PaperGrain />
          <HairlineRules />

          {/* Left-margin logbook marker */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[clamp(4rem,6vw,6rem)] border-r border-[var(--color-rule)]
              flex flex-col items-center pt-8 gap-4"
            aria-hidden="true"
          >
            <Stamp value="2017" variant="date" />
            <Stamp value="RILEY" variant="county" />
            <Stamp value="NW 9" variant="wind" />
            <Stamp value="40 LB" variant="weight" />
          </div>

          {/* Hero content — offset for left margin */}
          <div className="relative z-10 pl-[clamp(4rem,6vw,6rem)] pr-4 md:pr-8 pb-16 pt-24 md:pt-32">
            {/* Monospace eyebrow */}
            <p
              className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4"
              aria-hidden="true"
            >
              MANHATTAN, KS · EST. 2017 · FIELD-TESTED
            </p>

            {/* Main headline — Bebas Neue, full-bleed */}
            <Heading
              as="h1"
              size="display-xl"
              className="max-w-4xl leading-[0.95]"
            >
              WORLD&apos;S BEST DEER FEEDS
              <br />
              FOR THE WORLD&apos;S BEST
              <br />
              DEER HUNTERS
            </Heading>

            {/* Sub-hero — DM Serif Display italic */}
            <p
              className="font-body italic text-body-lg text-[var(--color-ink-muted)] mt-6 mb-8 max-w-xl leading-[1.4]"
            >
              A deer feed company founded for hunters, by hunters.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button as="a" href="/products" variant="primary">
                SHOP THE LINE
              </Button>
              <Button as="a" href="/feed-program" variant="secondary">
                BUILD YOUR FEED PROGRAM
              </Button>
            </div>

            {/* Stat strip below CTAs */}
            <div
              className="flex flex-wrap gap-6 mt-10 font-mono text-mono-xs tracking-[0.04em] uppercase
                text-[var(--color-ink-quiet)]"
              aria-label="Proof points"
            >
              <span>7,500+ Inches Documented</span>
              <span>Kansas-Made</span>
              <span>20% Protein</span>
              <span>Direct to Hunter</span>
            </div>
          </div>

          {/* Bottom hairline */}
          <Rule weight="hair" className="relative z-10" />
        </section>

        {/* ── 2. FOUR-PILLAR GB FEEDS DIFFERENCE ──────────────────────────── */}
        <Section bg="paper-2" aria-label="The GB Feeds Difference">
          <PaperGrain />
          <HairlineRules />
          <Container>
            {/* Section label */}
            <div className="flex items-center gap-4 mb-12">
              <Rule weight="hair" className="flex-1" />
              <Heading as="h2" size="display-sm" className="shrink-0">
                THE GB FEEDS DIFFERENCE
              </Heading>
              <Rule weight="hair" className="flex-1" />
            </div>

            {/* 2×2 pillar grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-rule)]">
              {pillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="relative bg-[var(--color-paper-2)] p-8 md:p-10"
                >
                  {/* Monospace number stamp */}
                  <span
                    className="block font-mono text-[4rem] leading-none tracking-[0.04em]
                      text-[var(--color-rule)] mb-4 select-none"
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>

                  {/* Pillar heading — Bebas Neue */}
                  <Heading as="h3" size="display-md" className="mb-3">
                    {pillar.heading}
                  </Heading>

                  {/* Body — DM Serif Display */}
                  <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.4]">
                    {pillar.body}
                  </Text>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <Button as="a" href="/why-gb-feeds" variant="ghost">
                WHY GB FEEDS →
              </Button>
            </div>
          </Container>
        </Section>

        {/* ── 3. SIGNATURE SCROLL MOMENT ───────────────────────────────────── */}
        {/*
          The RSC wrapper provides explicit min-height BEFORE hydration to prevent CLS.
          SignatureMove is dynamic-imported with ssr:false — on first server render
          this section is an empty bone-paper box at min-height 100svh. On hydration
          the GSAP pin boots and the element is already the right height, so no CLS.
          100svh (small viewport height) prevents iOS Safari chrome from clipping content.
        */}
        <section
          className="signature-pin bg-[var(--color-paper)]"
          style={{ minHeight: '100svh' }}
          aria-label="Antler inches harvested — GB Feeds counter"
        >
          <SignatureMoveLoader
            total={harvests.total_inches}
            asOf={harvests.updated_at}
            pins={harvests.pins}
          />
        </section>

        {/* ── 4. FOUNDER SIGNED-QUOTE MOMENT ───────────────────────────────── */}
        <Section bg="paper" aria-label="Founder message from Greg Brungardt">
          <PaperGrain />
          <HairlineRules />
          <Container variant="narrow">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              {/* Pull quote + signature */}
              <div className="flex-1">
                <blockquote>
                  <p
                    className="font-body italic text-body-lg text-[var(--color-ink-muted)]
                      leading-[1.4] mb-6"
                  >
                    &ldquo;Being the biggest feed company has never been the goal,
                    we want to be the{' '}
                    <em className="not-italic text-[var(--color-ink)]">BEST</em>{' '}
                    feed company. Our direct to consumer model is based on four pillars&hellip;
                    these pillars guide the company in every decision we make.&rdquo;
                  </p>
                </blockquote>

                {/* Greg signature SVG */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/greg-signature.svg"
                  alt="Greg Brungardt signature"
                  width={160}
                  height={48}
                  className="mb-4"
                  style={{ color: 'var(--color-accent)' }}
                  loading="lazy"
                />

                <Link
                  href="/our-story"
                  className="font-mono text-mono-xs tracking-[0.04em] uppercase
                    text-[var(--color-ink-quiet)] hover:text-[var(--color-accent)]
                    transition-colors duration-200"
                >
                  READ GREG&apos;S STORY →
                </Link>
              </div>

              {/* Stamp column */}
              <div
                className="flex flex-col gap-3 md:pt-2 shrink-0"
                aria-hidden="true"
              >
                <Stamp value="OCT 2017" variant="date" />
                <Stamp value="RILEY COUNTY" variant="county" />
                <Stamp value="FOUNDER" />
                <Stamp value="MANHATTAN, KS" />
              </div>
            </div>
          </Container>
        </Section>

        {/* ── 5. ON-HOME FAQ ────────────────────────────────────────────────── */}
        <Section bg="paper-3" aria-label="Frequently asked questions">
          <PaperGrain />
          <Container variant="narrow">
            <div className="flex items-center gap-4 mb-10">
              <Rule weight="hair" className="flex-1" />
              <Heading as="h2" size="display-sm" className="shrink-0">
                FREQUENTLY ASKED QUESTIONS
              </Heading>
              <Rule weight="hair" className="flex-1" />
            </div>

            <div className="flex flex-col">
              {homeFaqs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="font-mono text-mono-xs tracking-[0.04em] uppercase
                  text-[var(--color-ink-quiet)] hover:text-[var(--color-accent)]
                  transition-colors duration-200"
              >
                MORE QUESTIONS → /FAQ
              </Link>
            </div>
          </Container>
        </Section>

        {/* ── 6. LATEST FROM THE JOURNAL ────────────────────────────────────── */}
        <Section bg="paper-2" aria-label="Latest from the journal">
          <PaperGrain />
          <HairlineRules />
          <Container>
            <div className="flex items-center gap-4 mb-12">
              <Rule weight="hair" className="flex-1" />
              <Heading as="h2" size="display-sm" className="shrink-0">
                FROM THE JOURNAL
              </Heading>
              <Rule weight="hair" className="flex-1" />
            </div>

            {/* Three-card row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentJournal.map((entry) => (
                <article
                  key={entry.slug}
                  className={cn(
                    'group flex flex-col',
                    'border border-[var(--color-rule)] bg-[var(--color-paper-3)]',
                    'hover:border-[var(--color-ink)] hover:-translate-y-1',
                    'transition-all duration-200',
                  )}
                >
                  {/* Cover image — <picture> with AVIF/WebP sources for optimized delivery */}
                  {entry.coverImage && (
                    <a
                      href={`/journal/${entry.slug}`}
                      className="block overflow-hidden aspect-video"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <picture>
                        {/* AVIF variant — swap extension for .avif counterpart */}
                        <source
                          srcSet={entry.coverImage.replace(/\.webp$/, '.avif')}
                          type="image/avif"
                        />
                        {/* WebP fallback */}
                        <source srcSet={entry.coverImage} type="image/webp" />
                        <img
                          src={entry.coverImage}
                          alt={`Cover image for ${entry.title}`}
                          width={640}
                          height={360}
                          className="w-full h-full object-cover transition-transform duration-300
                            group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </picture>
                    </a>
                  )}

                  {/* Card body */}
                  <div className="flex flex-col gap-2 p-5 flex-1">
                    {/* Stamp row */}
                    <div className="flex flex-wrap gap-2" aria-hidden="true">
                      <Stamp value={entry.date} variant="date" />
                      <Stamp value={entry.county} variant="county" />
                      <Stamp value={entry.season.toUpperCase()} />
                      {entry.wind && <Stamp value={entry.wind} variant="wind" />}
                    </div>

                    {/* Title */}
                    <Heading as="h3" size="display-sm" className="mt-1">
                      <a
                        href={`/journal/${entry.slug}`}
                        className="hover:text-[var(--color-accent)] transition-colors duration-200
                          line-clamp-2"
                      >
                        {entry.title}
                      </a>
                    </Heading>

                    {/* Dek — DM Serif Display */}
                    <Text
                      variant="body-sm"
                      className="text-[var(--color-ink-muted)] leading-[1.4] line-clamp-3 mt-1"
                    >
                      {entry.dek}
                    </Text>

                    {/* Read time */}
                    <p
                      className="mt-auto pt-3 font-mono text-mono-xs tracking-[0.04em] uppercase
                        text-[var(--color-ink-quiet)]"
                    >
                      {entry.readMinutes} MIN READ
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Journal CTA */}
            <div className="mt-10 flex justify-center">
              <Button as="a" href="/journal" variant="secondary">
                ALL JOURNAL ENTRIES →
              </Button>
            </div>
          </Container>
        </Section>

        {/* ── 7. NEWSLETTER FORM ───────────────────────────────────────────── */}
        <Section bg="paper" aria-label="Sign up for GB Feeds Field Notes">
          <PaperGrain />
          <Container variant="narrow">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              {/* Copy */}
              <div className="flex-1">
                <Stamp value="FIELD NOTES" className="mb-4" />
                <Heading as="h2" size="display-md" className="mb-3">
                  HUNT SMARTER.
                  <br />
                  FEED BETTER.
                </Heading>
                <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.4]">
                  Greg sends field notes on deer nutrition, antler development, and
                  what&apos;s working right here in Kansas. No spam. Just results.
                </Text>
              </div>

              {/* Form */}
              <div className="flex-1 w-full">
                <NewsletterForm />
              </div>
            </div>
          </Container>
        </Section>

      </main>
    </>
  );
}
