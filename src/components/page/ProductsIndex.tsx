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
        <Container>
          <div className="py-14 md:py-20">
            {/* Monospace eyebrow */}
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
              MANHATTAN, KS / EST. 2017 / ALL PRODUCTS
            </p>
            <Heading as="h1" size="display-lg" className="mb-4">
              Products
            </Heading>
            <Text variant="body-lg" className="max-w-2xl text-[var(--color-ink-muted)]">
              Buck Chow. Corn Candy. Trail cameras. Feeders. Everything we carry
              is tested right here in Kansas.
            </Text>
          </div>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── FILTER CHIPS + STATIC PRODUCT GRID ──────────────────────────── */}
      <Section bg="paper">
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
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
