// src/app/(shop)/feed-program/page.tsx
// RSC shell — server-rendered intro + dynamic <WizardClient />.

import type { Metadata } from 'next';
import { buildMetadata, feedProgramSchema } from '@/lib/seo';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { WizardDynamic } from '@/components/page/WizardDynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Build Your Feed Program — Personalized Deer Feed Prescription | GB Feeds',
  description:
    "Tell us your region, season, and goal — we'll build you a personalized GB Feeds deer feed program. Takes 60 seconds.",
  canonical: '/feed-program',
  ogImage: '/og/feed-program.png',
});

export default function FeedProgramPage() {
  const schema = feedProgramSchema();
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
    <main id="main-content">

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
        aria-label="Feed program wizard"
      >
        <HairlineRules />
        <PaperGrain />
        <Container>
          <div className="py-14 md:py-20">
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
              STEP-BY-STEP / PERSONALIZED / KANSAS-PROVEN
            </p>
            <Heading as="h1" size="display-lg" className="mb-4">
              Build Your Program
            </Heading>
            <Text variant="body-lg" className="max-w-xl text-[var(--color-ink-muted)]">
              Four questions. One prescription. Tell us your region, your season, and your goal — we&apos;ll build the right program for your property.
            </Text>
          </div>
        </Container>
      </section>

      {/* ── WIZARD ───────────────────────────────────────────────────────── */}
      <div className="bg-[var(--color-paper)] py-12 md:py-20">
        <Container variant="narrow">
          <WizardDynamic />
        </Container>
      </div>

    </main>
    </>
  );
}
