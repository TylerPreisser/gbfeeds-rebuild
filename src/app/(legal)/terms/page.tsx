// src/app/(legal)/terms/page.tsx
// RSC — no 'use client'.
// TODO (Phase 8): Replace placeholder copy with complete terms drafted by
// a documentation-specialist. Current content is a logbook-voice placeholder.

import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { Stamp } from '@/components/atomic/Stamp';
import { PaperGrain } from '@/components/decoration/PaperGrain';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Terms and Conditions | GB Feeds',
    description: 'GB Feeds terms and conditions of sale and use.',
    canonical: '/terms',
  }),
  // Noindex until Phase 8 documentation-specialist delivers full legal copy.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main id="main-content">

      {/* No eyebrow stripe per 6D.12 spec (intentional) */}
      <Section bg="paper">
        <PaperGrain />
        <Container variant="narrow">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Stamp value="LEGAL" />
            <Stamp variant="date" value="2026-05-06" />
            {/* TODO Phase 8: update effective date */}
          </div>

          <Heading as="h1" size="display-lg" className="mb-6">
            Terms and Conditions
          </Heading>

          {/* Phase 8: replace this banner with full legal copy and remove noindex from metadata */}
          <div className="mb-6 border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-4">
            <Text variant="body-md">
              Our terms and conditions are being updated. For inquiries about your order or our policies, contact us at{' '}
              <a
                href="mailto:hello@gbfeeds.com"
                className="text-[var(--color-ink)] underline decoration-[var(--color-rule)] hover:decoration-[var(--color-accent)] transition-colors duration-200"
              >
                hello@gbfeeds.com
              </a>{' '}
              or call{' '}
              <a
                href="tel:+16206393337"
                className="text-[var(--color-ink)] underline decoration-[var(--color-rule)] hover:decoration-[var(--color-accent)] transition-colors duration-200"
              >
                (620) 639-3337
              </a>.
            </Text>
            <p className="mt-3 font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
              Last updated: [pending]
            </p>
          </div>

          <Rule weight="hair" className="mb-8" />

          <div className="flex flex-col gap-6">
            <section aria-label="Acceptance">
              <Heading as="h2" size="display-sm" className="mb-3">
                Acceptance of Terms
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                By accessing gbfeeds.com and purchasing GB Feeds products, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, do not use this site or purchase products.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Products and purchases">
              <Heading as="h2" size="display-sm" className="mb-3">
                Products and Purchases
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                All products are sold subject to availability. Prices are listed in USD and are subject to change without notice. GB Feeds reserves the right to refuse or cancel any order. Payment processing is handled by Stripe — by completing a purchase you agree to Stripe&apos;s terms of service.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Shipping">
              <Heading as="h2" size="display-sm" className="mb-3">
                Shipping
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                Corn Candy ships to all 50 US states with no minimum order. Buck Chow pallet orders (minimum 25 bags) ship to the contiguous US. Delivery times vary by location and carrier availability. Risk of loss passes to the buyer upon delivery to the carrier.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Returns">
              <Heading as="h2" size="display-sm" className="mb-3">
                Returns and Refunds
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                {/* TODO Phase 8: Define return policy terms */}
                If you are not satisfied with your GB Feeds product, contact us at (620) 639-3337 within 30 days of receipt. We will make it right. Full return policy to be defined in Phase 8.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Limitation of liability">
              <Heading as="h2" size="display-sm" className="mb-3">
                Limitation of Liability
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                {/* TODO Phase 8: Full limitation of liability language */}
                To the fullest extent permitted by law, GB Feeds shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. See Phase 8 for complete language.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Governing law">
              <Heading as="h2" size="display-sm" className="mb-3">
                Governing Law
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                These terms are governed by the laws of the State of Kansas. Any disputes shall be resolved in the courts of Riley County, Kansas.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Contact">
              <Heading as="h2" size="display-sm" className="mb-3">
                Contact
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                Questions about these Terms? Call (620) 639-3337 or{' '}
                <a
                  href="/contact"
                  className="text-[var(--color-ink)] underline decoration-[var(--color-rule)] hover:decoration-[var(--color-accent)] transition-colors duration-200"
                >
                  send a message
                </a>.
              </Text>
            </section>
          </div>

          <Rule weight="hair" className="mt-8" />

          <p className="mt-4 font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
            Copyright © {new Date().getFullYear()} GB Feeds — All Rights Reserved.
          </p>
        </Container>
      </Section>

    </main>
  );
}
