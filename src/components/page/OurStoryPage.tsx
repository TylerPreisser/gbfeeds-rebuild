// src/components/page/OurStoryPage.tsx
// RSC — no 'use client'.
// Greg's founder narrative. Verbatim from ORIGINAL_TRUTH.md § 4.2.
// Three alternating image+text rows per ORIGINAL_TRUTH.md § 4.1.
// No invented stamps. No hero image above the title. White background.
// Boundary: page/ imports atomic/.

import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Rule } from '@/components/atomic/Rule';

/**
 * <OurStoryPage> — Greg's founder narrative in three alternating image+text rows.
 * Per ORIGINAL_TRUTH.md § 4.1 and § 4.2.
 * Row 1: Image LEFT — Greg with mounted bucks | Text RIGHT — paragraphs 1+2
 * Row 2: Image RIGHT — trail-cam buck | Text LEFT — paragraph 3
 * Row 3: Image LEFT — Greg with harvested buck | Text RIGHT — paragraphs 4+5 + signature
 */
export function OurStoryPage() {
  return (
    <main id="main-content">

      {/* ── PAGE TITLE ──────────────────────────────────────────────────── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Our Story page header"
      >
        <Container variant="narrow">
          <Heading as="h1" size="display-lg" className="text-center tracking-[0.03em]">
            OUR STORY
          </Heading>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── ROW 1: Greg + mounted bucks (Image LEFT) ── paragraphs 1+2 ── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Our Story — Founder introduction"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — Greg standing with three mounted bucks */}
            <div className="overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/lifestyle/lifestyle-img-1091-1.webp"
                alt="Greg Brungardt standing in front of a wood shed with three mounted whitetail bucks"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Right — paragraphs 1 + 2 verbatim */}
            <div className="text-center lg:text-left">
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6] mb-6">
                Have you ever bought a deer feed product and been disappointed when it didn&apos;t work?
                Me too...
              </Text>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6]">
                In 2017, I began to envision a deer feed company unlike any other. A company with
                product tested right here in the Midwest with a proven track record of success.
                Five years later and after dozens of product testing sites, hundreds of component
                trials and nearly a million trail cam pictures, GB FEEDS WAS BORN!
              </Text>
            </div>
          </div>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── ROW 2: Trail-cam buck (Image RIGHT) ── paragraph 3 ──────────── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Our Story — Four pillars"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — paragraph 3 text */}
            <div className="text-center lg:text-left lg:order-1">
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6]">
                Being the biggest feed company has never been the goal, we want to be the BEST feed
                company. Our direct to consumer model is based on four pillars,{' '}
                <strong>Proven Results</strong>,{' '}
                <strong>Quality Products</strong>,{' '}
                <strong>Unmatched Value</strong>{' '}
                and{' '}
                <strong>Superior Customer Service</strong>. These pillars guide the company in every
                decision we make and serve as the foundation for all current and future products.
              </Text>
            </div>

            {/* Right — trail-cam still of giant whitetail */}
            <div className="overflow-hidden aspect-[4/3] lg:order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/lifestyle/lifestyle-07eb939d-6b5c-4f14-8c4b-a476a8c5b6b8.webp"
                alt="Customer with a Kansas whitetail at night"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── ROW 3: Greg + harvested buck (Image LEFT) ── paragraphs 4+5 */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Our Story — Welcome"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — Greg crouched in corn-stubble field with harvested buck */}
            <div className="overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/lifestyle/lifestyle-20231008-234054.webp"
                alt="Greg crouched in a corn-stubble field with a giant harvested whitetail buck"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Right — paragraphs 4 + 5 + text signature */}
            <div className="text-center lg:text-left">
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6] mb-6">
                If you&apos;re in the market for quality deer feed products, proven to help you develop
                and harvest bigger bucks, at a value you can afford, I would like to be the first to
                welcome you to the GB Feeds family.
              </Text>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6] mb-8">
                We&apos;re glad you&apos;re here!
              </Text>

              <Rule weight="hair" className="mb-6" />

              {/* Text signature only — no signature image. */}
              <div
                className="flex flex-col gap-2 items-center lg:items-start"
                aria-label="Signed by Greg Brungardt"
              >
                <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                  -Greg
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
