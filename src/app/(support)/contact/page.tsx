// src/app/(support)/contact/page.tsx
// RSC — no 'use client'.
// Contact form + side panel. JSON-LD: contactPoint.

import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { Stamp } from '@/components/atomic/Stamp';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { ContactForm } from '@/components/composite/ContactForm';

export const metadata: Metadata = buildMetadata({
  title: 'Contact GB Feeds — (620) 639-3337 | GB Feeds',
  description:
    'Contact Greg and the GB Feeds team. Call (620) 639-3337 or send a message. Based in Manhattan, KS. Replies usually within 24 hours.',
  canonical: '/contact',
  ogImage: '/og/contact.png',
});

const contactPointSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GB Feeds',
  url: 'https://gbfeeds.com',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-620-639-3337',
    contactType: 'customer service',
    availableLanguage: 'English',
    contactOption: 'TollFree',
    areaServed: 'US',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Manhattan',
    addressRegion: 'KS',
    addressCountry: 'US',
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPointSchema) }}
      />

      <main id="main-content">

        {/* ── PAGE HERO ──────────────────────────────────────────────────── */}
        <section
          className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
          aria-label="Contact page header"
        >
          <HairlineRules />
          <PaperGrain />
          <Container>
            <div className="py-14 md:py-20">
              <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
                MANHATTAN, KS / EST. 2017
              </p>
              <Heading as="h1" size="display-lg">
                Contact Us
              </Heading>
              <Text variant="body-lg" className="mt-4 max-w-xl text-[var(--color-ink-muted)]">
                Drop us a line!
              </Text>
            </div>
          </Container>
        </section>

        {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
        <Section bg="paper">
          <PaperGrain />
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

              {/* LEFT: Contact form */}
              <div>
                <Heading as="h2" size="display-sm" className="mb-6">
                  Send a Message
                </Heading>
                <ContactForm />
              </div>

              {/* RIGHT: Contact info panel */}
              <div className="flex flex-col gap-8">
                <div>
                  <Heading as="h2" size="display-sm" className="mb-6">
                    Better yet, give us a call!
                  </Heading>

                  {/* Phone */}
                  <div className="flex flex-col gap-2 mb-6">
                    <Stamp value="PHONE" />
                    <a
                      href="tel:+16206393337"
                      className="font-display uppercase tracking-[0.02em] text-display-md
                        text-[var(--color-ink)] hover:text-[var(--color-accent)]
                        transition-colors duration-200
                        focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                      aria-label="Call GB Feeds at (620) 639-3337"
                    >
                      (620) 639-3337
                    </a>
                  </div>

                  {/* Response time stamp */}
                  <div className="border border-[var(--color-rule)] bg-[var(--color-paper-3)] px-5 py-4 mb-6">
                    <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                      Replies usually within 24h.
                    </p>
                  </div>

                  <Rule weight="hair" className="mb-6" />

                  {/* Location */}
                  <div className="flex flex-col gap-2">
                    <Stamp variant="county" value="Manhattan, KS" />
                    <Text variant="body-sm" className="text-[var(--color-ink-muted)]">
                      GB Feeds products are tested, mixed, and shipped from Manhattan, Kansas — right in the heart of the best whitetail country in the country.
                    </Text>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="border-t border-[var(--color-rule)] pt-6">
                  <div className="flex flex-wrap gap-2">
                    <Stamp value="Kansas-Made" />
                    <Stamp value="Founder Direct" />
                    <Stamp value="Est. 2017" />
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </Section>

      </main>
    </>
  );
}
