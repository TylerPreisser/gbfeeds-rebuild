// src/app/(legal)/privacy/page.tsx
// RSC — no 'use client'.
// TODO (Phase 8): Replace placeholder copy with complete privacy policy drafted by
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
    title: 'Privacy Policy | GB Feeds',
    description: 'GB Feeds privacy policy — how we collect, use, and protect your information.',
    canonical: '/privacy',
  }),
  // Noindex until Phase 8 documentation-specialist delivers full legal copy.
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
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
            Privacy Policy
          </Heading>

          {/* Phase 8: replace this banner with full legal copy and remove noindex from metadata */}
          <div className="mb-6 border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-4">
            <Text variant="body-md">
              Our privacy policy is being updated. For inquiries about your order or our policies, contact us at{' '}
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
            <section aria-label="Information we collect">
              <Heading as="h2" size="display-sm" className="mb-3">
                Information We Collect
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                GB Feeds collects information you provide directly — including name, email address, and messages submitted through our contact form. If you make a purchase, payment information is processed by Stripe and is not stored on our servers. We also collect standard analytics data (page views, referrers, browser type) via Google Analytics when you browse gbfeeds.com.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="How we use your information">
              <Heading as="h2" size="display-sm" className="mb-3">
                How We Use Your Information
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                We use contact information to respond to your inquiries and process orders. Email addresses submitted to the Field Club waitlist or newsletter are used to send updates about GB Feeds products and programs. We do not sell or share your personal information with third parties for marketing purposes.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Cookies">
              <Heading as="h2" size="display-sm" className="mb-3">
                Cookies and Analytics
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                {/* TODO Phase 8: Full cookie disclosure */}
                gbfeeds.com uses Google Analytics for site usage analytics and Cloudflare Turnstile for form protection. These services may set cookies on your device. Full cookie disclosure in Phase 8.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Data retention">
              <Heading as="h2" size="display-sm" className="mb-3">
                Data Retention
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                {/* TODO Phase 8: Define data retention policy */}
                Contact form submissions are retained in Resend for a period not exceeding 12 months. Analytics data is subject to Google Analytics&apos; standard retention settings. Full data retention policy to be defined in Phase 8.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Your rights">
              <Heading as="h2" size="display-sm" className="mb-3">
                Your Rights
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                You may request deletion of your personal data at any time by calling (620) 639-3337 or{' '}
                <a
                  href="/contact"
                  className="text-[var(--color-ink)] underline decoration-[var(--color-rule)] hover:decoration-[var(--color-accent)] transition-colors duration-200"
                >
                  sending a message
                </a>. We will process deletion requests within 30 days.
              </Text>
            </section>

            <Rule weight="hair" />

            <section aria-label="Contact">
              <Heading as="h2" size="display-sm" className="mb-3">
                Contact
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                Privacy questions? Call (620) 639-3337 or{' '}
                <a
                  href="/contact"
                  className="text-[var(--color-ink)] underline decoration-[var(--color-rule)] hover:decoration-[var(--color-accent)] transition-colors duration-200"
                >
                  contact us
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
