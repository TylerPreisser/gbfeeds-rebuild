// src/app/(editorial)/season/[phase]/page.tsx
// RSC — no 'use client'.
// 4 season pages: pre-rut, rut, post-rut, antler-growth.
// Each has: hero monospace stamp, season description, nutritional priority, calendar strip,
// and a curated grid of ProductCards.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSeasonByPhase, getAllSeasonPhases } from '@/data/seasons';
import { getSkusForSeason } from '@/data/season-skus';
import { getProductBySlug } from '@/data/products';
import type { Product } from '@/types/product';
import { buildMetadata, breadcrumbSchema, itemListSchema } from '@/lib/seo';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { Stamp } from '@/components/atomic/Stamp';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { ProductCard } from '@/components/composite/ProductCard';

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams(): { phase: string }[] {
  return getAllSeasonPhases().map((phase) => ({ phase }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>;
}): Promise<Metadata> {
  const { phase } = await params;
  const season = getSeasonByPhase(phase);
  if (!season) return {};

  return buildMetadata({
    title: `${season.displayName} Feed Program — ${season.dateRange} | GB Feeds`,
    description: season.description,
    canonical: `/season/${phase}`,
    ogImage: `/og/season-${phase}.png`,
  });
}

// ─── Calendar strip months ────────────────────────────────────────────────────

const SEASON_MONTHS: Record<string, string[]> = {
  'pre-rut': ['SEP', 'OCT'],
  rut: ['OCT', 'NOV'],
  'post-rut': ['NOV', 'DEC', 'JAN'],
  'antler-growth': ['APR', 'MAY', 'JUN', 'JUL', 'AUG'],
};

const ALL_MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SeasonPage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const { phase } = await params;
  const season = getSeasonByPhase(phase);

  if (!season) {
    notFound();
  }

  // Get curated products for this season (filter out missing slugs gracefully)
  const skus = getSkusForSeason(season.phase);
  const products: Product[] = skus
    .map((slug) => {
      // Normalize: 'reveal-x-20' is stored in data as 'reveal-x' in products.live.json
      const normalizedSlug = slug === 'reveal-x-20' ? 'reveal-x' : slug;
      return getProductBySlug(normalizedSlug);
    })
    .filter((p): p is Product => p !== null);

  const activeMonths = SEASON_MONTHS[phase] ?? [];

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Season', href: '/season/pre-rut' },
    { name: season.displayName, href: `/season/${phase}` },
  ]);

  const itemList =
    products.length > 0
      ? itemListSchema(
          products.map((p) => ({ name: p.displayName, url: `/products/${p.slug}/` })),
          `${season.displayName} Feed Program`,
          `/season/${phase}`,
        )
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {itemList && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      )}

      <main id="main-content">

        {/* ── HERO HEADER ──────────────────────────────────────────────────── */}
        <section
          className="relative bg-[var(--color-ink)] overflow-hidden"
          aria-label={`${season.displayName} season page`}
        >
          <PaperGrain />

          <Container>
            <div className="py-16 md:py-24">
              {/* Monospace phase stamp */}
              <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-gray-500)] mb-4">
                PHASE: {season.phase.toUpperCase().replace(/-/g, ' ')} / PRIORITY: {
                  phase === 'pre-rut' ? 'PROTEIN-BUILD' :
                  phase === 'rut' ? 'ENERGY + ATTRACTION' :
                  phase === 'post-rut' ? 'RECOVERY NUTRITION' :
                  'MINERAL MASS'
                }
              </p>

              <Heading as="h1" size="display-lg" className="text-[var(--color-paper)] mb-4">
                {season.displayName}
              </Heading>

              <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-gray-500)] mb-6">
                {season.dateRange}
              </p>

              <Text variant="body-lg" className="max-w-2xl text-[var(--color-gray-300)] font-body italic">
                {season.description}
              </Text>
            </div>
          </Container>
        </section>

        {/* ── CALENDAR STRIP ───────────────────────────────────────────────── */}
        <div
          className="bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-x-auto"
          aria-label={`${season.displayName} calendar — active months: ${activeMonths.join(', ')}`}
        >
          <Container>
            <div className="py-4 flex items-center gap-2 min-w-max mx-auto justify-center">
              {ALL_MONTHS.map((month, index) => {
                const isActive = activeMonths.includes(month);
                return (
                  <div
                    key={month}
                    className={`flex flex-col items-center gap-1 calendar-month-${index}`}
                    style={{
                      // CSS scroll-timeline fade: active months fade in as user scrolls
                      animationDelay: `${index * 60}ms`,
                    }}
                  >
                    <div
                      className={`w-8 h-1.5 rounded-none transition-colors duration-300 ${
                        isActive
                          ? 'bg-[var(--color-accent)]'
                          : 'bg-[var(--color-rule)]'
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`font-mono text-mono-xs tracking-[0.04em] uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-[var(--color-ink)]'
                          : 'text-[var(--color-ink-quiet)]'
                      }`}
                    >
                      {month}
                    </span>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>

        {/* ── NUTRITIONAL PRIORITY ─────────────────────────────────────────── */}
        <Section bg="paper">
          <PaperGrain />
          <HairlineRules />
          <Container>
            <div className="flex gap-8 lg:gap-16">
              {/* Left stamp */}
              <div className="hidden md:flex flex-col gap-2 shrink-0">
                <Stamp value="FIELD NOTES" />
                <Stamp variant="county" value="Manhattan, KS" />
              </div>

              {/* Content */}
              <div className="flex-1 max-w-2xl">
                <Heading as="h2" size="display-md" className="mb-6">
                  Nutritional Priority
                </Heading>

                <div className="flex flex-col gap-4">
                  {season.nutritionalPriority.split('\n\n').map((paragraph, i) => (
                    <Text
                      key={i}
                      variant="body-md"
                      className="leading-[1.5] text-[var(--color-ink-muted)]"
                    >
                      {paragraph}
                    </Text>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ── CURATED PRODUCTS ─────────────────────────────────────────────── */}
        {products.length > 0 && (
          <Section bg="paper-2">
            <PaperGrain />
            <Container>
              <div className="flex items-center gap-4 mb-10">
                <Rule weight="hair" className="flex-1" />
                <Heading as="h2" size="display-sm" className="shrink-0">
                  {season.displayName} Program
                </Heading>
                <Rule weight="hair" className="flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, i) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    priority={i < 4}
                  />
                ))}
              </div>

              <div className="mt-10 text-center">
                <a
                  href="/feed-program"
                  className="inline-flex items-center justify-center px-8 py-3
                    font-display uppercase tracking-[0.02em] text-body-md
                    bg-[var(--color-accent)] text-[var(--color-paper)]
                    border border-[var(--color-accent)]
                    hover:bg-[var(--color-accent-2)] transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
                >
                  Build Your {season.displayName} Program →
                </a>
              </div>
            </Container>
          </Section>
        )}

        {/* ── SEASON NAV ───────────────────────────────────────────────────── */}
        <div className="bg-[var(--color-paper)] border-t border-[var(--color-rule)]">
          <Container>
            <nav aria-label="Navigate between seasons" className="py-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {['pre-rut', 'rut', 'post-rut', 'antler-growth'].map((p) => (
                  <a
                    key={p}
                    href={`/season/${p}`}
                    className={`font-mono text-mono-xs tracking-[0.04em] uppercase px-4 py-2 border transition-colors duration-150
                      focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]
                      ${p === phase
                        ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]'
                        : 'border-[var(--color-rule)] text-[var(--color-ink-quiet)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]'
                      }`}
                    aria-current={p === phase ? 'page' : undefined}
                  >
                    {p.replace(/-/g, ' ')}
                  </a>
                ))}
              </div>
            </nav>
          </Container>
        </div>

      </main>
    </>
  );
}
