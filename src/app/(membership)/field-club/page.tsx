// src/app/(membership)/field-club/page.tsx
// RSC — no 'use client'.
// Field Club marketing page + waitlist form.
// NEXT_PUBLIC_FEATURE_FIELD_CLUB=true → "Join Now"; false → waitlist.

import type { Metadata } from 'next';
import { buildMetadata, serviceSchema } from '@/lib/seo';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { Stamp } from '@/components/atomic/Stamp';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { FieldClubWaitlistForm } from '@/components/composite/FieldClubWaitlistForm';
import { testimonials } from '@/data/testimonials';
import { TestimonialCard } from '@/components/composite/TestimonialCard';
import { isPlaceholderLink, PHONE_FALLBACK_COPY, PHONE_FALLBACK_HREF } from '@/data/payment-links';

export const metadata: Metadata = buildMetadata({
  title: 'The Field Club — Member-Only Kansas Blend | GB Feeds',
  description:
    'The GB Feeds Field Club: member-only seasonal blend shipped to your door before the season starts. No hunting store. No retail markup. Kansas-made, hunter-direct.',
  canonical: '/field-club',
  ogImage: '/og/field-club.png',
});

const FEATURE_FIELD_CLUB = process.env['NEXT_PUBLIC_FEATURE_FIELD_CLUB'] === 'true';

// Phase 8: replace with real Stripe Payment Link URL when Field Club launches.
const FIELD_CLUB_PAYMENT_LINK = 'about:blank#TODO-stripe-field-club';
const FIELD_CLUB_IS_PLACEHOLDER = isPlaceholderLink(FIELD_CLUB_PAYMENT_LINK);

const BENEFITS = [
  {
    title: 'Member-Only Kansas Blend',
    body: 'A private-label Buck Chow formula available exclusively to Field Club members. Higher mineral density, same 20% protein. Not available anywhere else.',
  },
  {
    title: 'Seasonal Shipment, Pre-Timed',
    body: 'Your first bag ships 30 days before the start of your selected feeding season. No remembering to reorder. No running out at the wrong time.',
  },
  {
    title: 'Priority Phone Access',
    body: 'Field Club members get Greg\'s direct line. Questions about a specific property, a specific deer, or a specific problem — call it in.',
  },
  {
    title: 'No Retail Markup, Ever',
    body: 'Direct from the mixer to your property. Field Club pricing is the lowest we offer, period. Our margins stay razor-thin so yours can be high.',
  },
];

const SEASONAL_CADENCE = [
  { month: 'MAR', label: 'Spring Shipment', body: 'Antler-growth formula arrives' },
  { month: 'AUG', label: 'Pre-Season Shipment', body: 'Pre-rut formula arrives' },
  { month: 'OCT', label: 'Peak Season Shipment', body: 'Rut formula arrives' },
  { month: 'DEC', label: 'Winter Shipment', body: 'Post-rut recovery formula arrives' },
];

// Pick testimonials that mention subscriber-adjacent themes (all-day results, coming back)
const SUBSCRIBER_TESTIMONIALS = testimonials
  .filter((t) => ['andy-1', 'dylan-1', 'mason-1', 'jerry-1'].includes(t.id))
  .slice(0, 3);

export default function FieldClubPage() {
  const service = serviceSchema();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
    <main id="main-content">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[var(--color-ink)] overflow-hidden"
        aria-label="Field Club hero"
      >
        <PaperGrain />
        <Container>
          <div className="py-16 md:py-24">
            <div className="flex flex-wrap items-start gap-3 mb-6">
              <Stamp value="MEMBERS ONLY" />
              <Stamp value="KANSAS BLEND" />
              {FEATURE_FIELD_CLUB ? (
                <Stamp value="OPEN" />
              ) : (
                <Stamp value="WAITLIST OPEN" />
              )}
            </div>

            <Heading as="h1" size="display-lg" className="text-[var(--color-paper)] mb-4">
              The Field Club
            </Heading>
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-gray-500)] mb-6">
              MEMBER-ONLY KANSAS BLEND · HUNTER-DIRECT · SEASONAL DELIVERY
            </p>

            <Text variant="body-lg" className="max-w-xl text-[var(--color-gray-300)] mb-8">
              A private-label seasonal blend — designed for serious Kansas and Midwest properties — shipped to your door before the season starts. No hunting store. No retail markup.
            </Text>

            {FEATURE_FIELD_CLUB ? (
              FIELD_CLUB_IS_PLACEHOLDER ? (
                // Stripe link not yet provisioned — show phone-fallback (safe visible failure mode).
                <a
                  href={PHONE_FALLBACK_HREF}
                  className="inline-flex items-center justify-center px-8 py-3
                    font-display uppercase tracking-[0.02em] text-body-md
                    bg-[var(--color-paper)] text-[var(--color-ink)]
                    border border-[var(--color-paper)]
                    hover:bg-[var(--color-paper-2)] transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  aria-label="Join the Field Club — call to order"
                >
                  {PHONE_FALLBACK_COPY}
                </a>
              ) : (
                <a
                  href={FIELD_CLUB_PAYMENT_LINK}
                  className="inline-flex items-center justify-center px-8 py-3
                    font-display uppercase tracking-[0.02em] text-body-md
                    bg-[var(--color-accent)] text-[var(--color-paper)]
                    border border-[var(--color-accent)]
                    hover:bg-[var(--color-accent-2)] transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-[var(--color-paper)]"
                  aria-label="Join the Field Club — opens checkout"
                >
                  Join Now
                </a>
              )
            ) : (
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center px-8 py-3
                  font-display uppercase tracking-[0.02em] text-body-md
                  bg-[var(--color-paper)] text-[var(--color-ink)]
                  border border-[var(--color-paper)]
                  hover:bg-[var(--color-paper-2)] transition-colors duration-200
                  focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                Save My Spot →
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────────────── */}
      <Section bg="paper">
        <PaperGrain />
        <HairlineRules />
        <Container>
          <Heading as="h2" size="display-md" className="mb-10 text-center">
            What Members Get
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-6"
              >
                <Stamp value={`0${i + 1}`} />
                <Heading as="h3" size="display-sm">
                  {benefit.title}
                </Heading>
                <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                  {benefit.body}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── SEASONAL CADENCE ─────────────────────────────────────────────── */}
      <Section bg="paper-2">
        <PaperGrain />
        <Container>
          <Heading as="h2" size="display-md" className="mb-8 text-center">
            Seasonal Cadence
          </Heading>

          <div className="flex flex-col md:flex-row gap-0 md:gap-0">
            {SEASONAL_CADENCE.map((item, i) => (
              <div
                key={i}
                className="flex-1 border border-[var(--color-rule)] p-6 md:border-r-0 last:border-r"
              >
                <p className="font-display uppercase tracking-[0.02em] text-[5rem] leading-none text-[var(--color-gray-100)] select-none" aria-hidden="true">
                  {item.month}
                </p>
                <Heading as="h3" size="display-sm" className="mt-2 mb-2">
                  {item.label}
                </Heading>
                <Text variant="body-sm" className="text-[var(--color-ink-muted)]">
                  {item.body}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── WAITLIST FORM ─────────────────────────────────────────────────── */}
      <Section bg="paper" id="waitlist">
        <PaperGrain />
        <Container variant="narrow">
          <Rule weight="strong" className="mb-8" />

          {FEATURE_FIELD_CLUB ? (
            <div className="text-center">
              <Heading as="h2" size="display-md" className="mb-4">
                Join the Field Club
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] mb-6">
                Membership is open. First shipment timed to your selected season.
              </Text>
              {FIELD_CLUB_IS_PLACEHOLDER ? (
                // Stripe link not yet provisioned — show phone-fallback (safe visible failure mode).
                <a
                  href={PHONE_FALLBACK_HREF}
                  className="inline-flex items-center justify-center px-8 py-3
                    font-display uppercase tracking-[0.02em] text-body-md
                    bg-[var(--color-ink)] text-[var(--color-paper)]
                    border border-[var(--color-ink)]
                    hover:bg-[var(--color-ink-muted)] transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                  aria-label="Join the Field Club — call to order"
                >
                  {PHONE_FALLBACK_COPY}
                </a>
              ) : (
                <a
                  href={FIELD_CLUB_PAYMENT_LINK}
                  className="inline-flex items-center justify-center px-8 py-3
                    font-display uppercase tracking-[0.02em] text-body-md
                    bg-[var(--color-accent)] text-[var(--color-paper)]
                    border border-[var(--color-accent)]
                    hover:bg-[var(--color-accent-2)] transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
                  aria-label="Join the Field Club — opens checkout"
                >
                  {/* TODO Phase 8: add membership price after Stripe link provisioned */}
                  Join Now
                </a>
              )}
            </div>
          ) : (
            <div>
              <Heading as="h2" size="display-md" className="mb-4">
                Save Your Spot
              </Heading>
              <Text variant="body-md" className="text-[var(--color-ink-muted)] mb-6">
                Field Club launches when Greg is ready to take on new members. Drop your email and you&apos;ll be first to know.
              </Text>
              <FieldClubWaitlistForm />
            </div>
          )}

          <Rule weight="strong" className="mt-8" />
        </Container>
      </Section>

      {/* ── SUBSCRIBER TESTIMONIALS ──────────────────────────────────────── */}
      <Section bg="paper-2">
        <PaperGrain />
        <Container variant="narrow">
          <Heading as="h2" size="display-sm" className="mb-6 text-center">
            What Members Are Saying
          </Heading>
          <div className="flex flex-col gap-4">
            {SUBSCRIBER_TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </Container>
      </Section>

    </main>
    </>
  );
}
