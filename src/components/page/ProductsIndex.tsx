// src/components/page/ProductsIndex.tsx
// RSC shell for /products page.
// All 16 product cards render as static HTML — fully crawlable.
// Only the filter chips are in a Suspense boundary (they call useSearchParams).
// Boundary: page/ imports composite/ + atomic/ + decoration/ + lib/ + types/.

import { Suspense } from 'react';
import type { Product, Category } from '@/types/product';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { Image } from '@/components/atomic/Image';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { ProductFilterChips } from '@/components/composite/ProductFilterChips';
import { ProductCard } from '@/components/composite/ProductCard';

interface ProductsIndexProps {
  products: Product[];
}

const CATEGORY_LABELS: Record<Category, string> = {
  'deer-feed': 'Deer Feed',
  'deer-feeders': 'Feeders',
  apparel: 'Apparel',
  tactacam: 'Tactacam',
};

const CATEGORIES: Category[] = ['deer-feed', 'deer-feeders', 'tactacam', 'apparel'];

/** Stable DOM id used to link the chips client island to the static product grid. */
const PRODUCT_GRID_ID = 'product-grid';

/**
 * <ProductsIndex> — RSC shell for the /products page.
 *
 * Architecture:
 *   - All 16 product cards are static RSC HTML (crawlable, no JS required).
 *   - <ProductFilterChips> is a thin client island (useSearchParams) in a
 *     Suspense boundary — Suspense wraps ONLY the chips, not the product grid.
 *   - On hydration, ProductFilterChips reads ?cat= and sets data-active-cat
 *     on the grid div; CSS rules in product-filter.css hide non-matching cards.
 *   - Without JS, all 16 cards are visible (no-JS graceful degradation).
 *   - With JS, category chips filter the visible cards via CSS only (no re-render).
 */
export function ProductsIndex({ products }: ProductsIndexProps) {
  const categoryChips = CATEGORIES.map((cat) => ({
    value: cat,
    label: CATEGORY_LABELS[cat],
  }));

  return (
    <main id="main-content" className="bg-[var(--color-paper)]">
      <PaperGrain />

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
        aria-label="Products page header"
      >
        <HairlineRules />
        <PaperGrain />
        <Container>
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 py-12 text-center md:py-18">
            <div className="max-w-3xl">
              <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
                MANHATTAN, KS / EST. 2017 / ALL PRODUCTS
              </p>
              <Heading as="h1" size="display-lg" className="mb-4">
                Products
              </Heading>
              <Text variant="body-lg" className="mx-auto max-w-2xl text-[var(--color-ink-muted)]">
                Buck Chow. Corn Candy. Trail cameras. Feeders. Everything we carry
                is tested right here in Kansas.
              </Text>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-px bg-[var(--color-rule)] font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-muted)]">
                <span className="bg-[var(--color-paper)] px-3 py-3">16 SKUs</span>
                <span className="bg-[var(--color-paper)] px-3 py-3">20% Protein</span>
                <span className="bg-[var(--color-paper)] px-3 py-3">Ships US</span>
              </div>
            </div>

            <div className="grid w-full max-w-3xl grid-cols-2 gap-4">
              <figure className="overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-3)]">
                <Image
                  src="/products/buck-chow-40lb/buck-chow-40lb-hero-1024.webp"
                  alt="Buck Chow High Protein Feed bag"
                  width={1024}
                  height={1247}
                  className="h-64 w-full object-contain p-6 md:h-80"
                  priority
                />
              </figure>
              <figure className="overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-3)]">
                <Image
                  src="/products/corn-candy-7lb/corn-candy-7lb-hero-1024.webp"
                  alt="Corn Candy Flavored Attractant bag"
                  width={1024}
                  height={1612}
                  className="h-64 w-full object-contain p-6 md:h-80"
                  priority
                />
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── FILTER CHIPS + STATIC PRODUCT GRID ──────────────────────────── */}
      <Section bg="paper" className="py-10 md:py-16">
        <Container>
          {/* Suspense wraps ONLY the chips island (useSearchParams).
              The static product grid below is outside this boundary. */}
          <Suspense fallback={<div className="mb-8 h-10" aria-hidden="true" />}>
            <ProductFilterChips
              categoryChips={categoryChips}
              gridId={PRODUCT_GRID_ID}
            />
          </Suspense>

          <Rule weight="hair" className="mb-8" />

          {/* Static product grid — all 16 cards always in HTML.
              data-active-cat is set to "all" by default; the chips client island
              updates it via useEffect when ?cat= changes.
              CSS in product-filter.css hides [data-cat] children that don't match. */}
          <div
            id={PRODUCT_GRID_ID}
            className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            data-active-cat="all"
            aria-label="Products"
          >
            {products.map((product, i) => (
              <div key={product.slug} data-cat={product.category}>
                <ProductCard
                  product={product}
                  priority={i < 4}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
