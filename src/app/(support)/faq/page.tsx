// src/app/(support)/faq/page.tsx
// RSC — no 'use client'.
// 4 verbatim FAQs + CTA. JSON-LD: FAQPage.

import type { Metadata } from 'next';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { faqs } from '@/data/faq';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { FAQItem } from '@/components/composite/FAQItem';

export const metadata: Metadata = buildMetadata({
  title: 'Frequently Asked Questions | GB Feeds',
  description:
    'Answers to the most common questions about GB Feeds products: Buck Chow protein content, Corn Candy coverage, feeder compatibility, and US shipping.',
  canonical: '/faq',
  ogImage: '/og/faq.png',
});

export default function FAQPage() {
  const faqLd = faqSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <main id="main-content">

        {/* ── PAGE HERO ──────────────────────────────────────────────────── */}
        <section
          className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
          aria-label="FAQ page header"
        >
          <HairlineRules />
          <PaperGrain />
          <Container>
            <div className="py-14 md:py-20">
              <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
                QUICK ANSWERS / MANHATTAN, KS
              </p>
              <Heading as="h1" size="display-lg">
                Frequently Asked Questions
              </Heading>
              <Text variant="body-lg" className="mt-4 max-w-xl text-[var(--color-ink-muted)]">
                The most common questions. Straight answers.
              </Text>
            </div>
          </Container>
        </section>

        {/* ── FAQ LIST ─────────────────────────────────────────────────────── */}
        <Section bg="paper">
          <PaperGrain />
          <Container variant="narrow">
            <div
              aria-label="Frequently asked questions"
            >
              {faqs.map((faq, i) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  defaultOpen={i === 0}
                />
              ))}
            </div>

            <Rule weight="hair" className="my-10" />

            {/* More questions CTA */}
            <div className="text-center">
              <Text variant="body-md" className="text-[var(--color-ink-muted)] mb-4">
                More questions?
              </Text>
              <Heading as="h2" size="display-md" className="mb-6">
                CALL (620) 639-3337
              </Heading>
              <Text variant="body-sm" className="text-[var(--color-ink-muted)] mb-6">
                Greg picks up. That&apos;s the whole point.
              </Text>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="tel:+16206393337"
                  className="inline-flex items-center justify-center px-8 py-3
                    font-display uppercase tracking-[0.02em] text-body-md
                    bg-[var(--color-ink)] text-[var(--color-paper)]
                    border border-[var(--color-ink)]
                    hover:bg-[var(--color-gray-900)] transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                >
                  Call Now
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3
                    font-display uppercase tracking-[0.02em] text-body-md
                    bg-transparent text-[var(--color-ink)]
                    border border-[var(--color-rule)]
                    hover:border-[var(--color-ink)] transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                >
                  Send a Message
                </a>
              </div>
            </div>
          </Container>
        </Section>

      </main>
    </>
  );
}
