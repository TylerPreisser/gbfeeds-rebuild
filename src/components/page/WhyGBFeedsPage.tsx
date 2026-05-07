// src/components/page/WhyGBFeedsPage.tsx
// RSC — no 'use client'.
// Four alternating image+text rows per ORIGINAL_TRUTH.md § 5.1.
// Verbatim copy from § 5.2. No invented CTA. No stamps. No ghost numerals.
// Boundary: page/ imports atomic/ + data/.

import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Rule } from '@/components/atomic/Rule';

/**
 * <WhyGBFeedsPage> — four alternating image+text pillar rows.
 * Per ORIGINAL_TRUTH.md § 5.1 and § 5.2.
 * Image alternates left/right: row 1 left, row 2 right, row 3 left, row 4 right.
 * No CTA section. No stamps. White background.
 */
export function WhyGBFeedsPage() {
  return (
    <main id="main-content">

      {/* ── PAGE TITLE ────────────────────────────────────────────────────── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Why GB Feeds page header"
      >
        <Container variant="narrow">
          <Heading as="h1" size="display-lg" className="text-center tracking-[0.03em]">
            WHY GB FEEDS
          </Heading>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── ROW 1: Proven Results — Image LEFT, text RIGHT ─────────────── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Proven Results"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — original customer harvest collage image */}
            <div className="overflow-hidden aspect-[4/3] bg-[var(--color-paper-3)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/gallery/blob-478b3b7.webp"
                alt="Customer trophy buck collage"
                width={960}
                height={720}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Right — Proven Results text */}
            <div className="text-center lg:text-left">
              <Heading as="h2" size="display-md" className="mb-6">
                Proven Results
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6]">
                When we say we help hunters create their once in a lifetime story, we mean it.
                It&apos;s the foundation of our company and it&apos;s who we are. In 2023 and 2024,
                our customers harvested over 7,500 inches of antler using GB Feeds products right
                here in Kansas.
              </Text>
            </div>
          </div>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── ROW 2: Quality Products — Image RIGHT, text LEFT ───────────── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Quality Products"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text (on mobile goes first; on desktop shows left) */}
            <div className="text-center lg:text-left lg:order-1">
              <Heading as="h2" size="display-md" className="mb-6">
                Quality Products
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6]">
                Every component that goes into a Bag of Buck Chow or a Bag of Corn Candy has a
                &ldquo;reason to be&rdquo;. It&apos;s simple, if it doesn&apos;t increase the nutrition, attraction,
                antler growth or herd health, it doesn&apos;t make the cut. Innovation and quality are
                all we know and cutting corners will never be an option.
              </Text>
            </div>

            {/* Right — Buck Chow on truck lifestyle photo */}
            <div className="overflow-hidden aspect-[4/3] lg:order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/lifestyle/lifestyle-img-4439.webp"
                alt="Bag of Buck Chow on a truck tailgate in the field"
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

      {/* ── ROW 3: Unmatched Value — Image LEFT, text RIGHT ────────────── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Unmatched Value"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — Buck Chow grain blend macro */}
            <div className="overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/lifestyle/lifestyle-a733367.webp"
                alt="Close-up of the Buck Chow grain blend — GB Feeds quality ingredients"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Right — Unmatched Value text */}
            <div className="text-center lg:text-left">
              <Heading as="h2" size="display-md" className="mb-6">
                Unmatched Value
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6]">
                We offer our products directly to you, which eliminates the retail markup and
                allows us to increase the quality of the components that go into every bag of
                Buck Chow or bag of Corn Candy. This means better components, higher protein
                contents, increased nutritional values and more pounds of product for your money.
              </Text>
            </div>
          </div>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── ROW 4: Superior Customer Service — Image RIGHT, text LEFT ──── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Superior Customer Service"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — text */}
            <div className="text-center lg:text-left lg:order-1">
              <Heading as="h2" size="display-md" className="mb-6">
                Superior Customer Service
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.6]">
                Customer service is our thing. If you&apos;re not totally satisfied with your
                purchase, just pick up the phone or send us a message on social media and
                we&apos;ll make it right. We also love your feedback, love your trail camera and
                harvest photos, and are just a phone call away if you need advice on how to put
                our products to work for you on your hunting property.
              </Text>
            </div>

            {/* Right — handwritten customer thank-you note on a Buck Chow bag */}
            <div className="overflow-hidden aspect-[4/3] lg:order-2 bg-[var(--color-paper-3)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/gallery/blob-b7a2223.webp"
                alt="Handwritten thank-you note from GB Feeds tied to a Buck Chow bag"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
