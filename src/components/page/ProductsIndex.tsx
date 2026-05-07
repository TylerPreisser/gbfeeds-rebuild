// src/components/page/ProductsIndex.tsx
// RSC shell for /products page.
// Layout matches gbfeeds.com original:
//   1. Slim banner image at the top (no oversized hero, no centered headline block)
//   2. Page heading + product count stamp
//   3. Two-column on lg+: left = vertical filter rail | right = product grid
//      Mobile: filter rail collapses to a horizontal-scroll chip strip above the grid
//
// All 16 product cards render as static HTML — fully crawlable.
// Only the filter rail's active state is in a Suspense boundary (uses useSearchParams).
// Boundary: page/ imports composite/ + atomic/ + decoration/ + lib/ + types/.

import { Suspense } from 'react';
import type { Product, Category } from '@/types/product';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { ProductFilterRail } from '@/components/composite/ProductFilterRail';
import { ProductCard } from '@/components/composite/ProductCard';

interface ProductsIndexProps {
  products: Product[];
}

const CATEGORY_LABELS: Record<Category, string> = {
  'deer-feed': 'Deer Feed',
  'deer-feeders': 'Feeders',
  apparel: 'Apparel',
  tactacam: 'Tactacam Reveal',
};

const CATEGORIES: Category[] = ['deer-feed', 'deer-feeders', 'tactacam', 'apparel'];

/** Stable DOM id used to link the filter island to the static product grid. */
const PRODUCT_GRID_ID = 'product-grid';

export function ProductsIndex({ products }: ProductsIndexProps) {
  const categoryItems = CATEGORIES.map((cat) => ({
    value: cat,
    label: CATEGORY_LABELS[cat],
    count: products.filter((p) => p.category === cat).length,
  }));

  return (
    <main id="main-content" className="bg-[var(--color-paper)]">
      <PaperGrain />

      {/* ── 1. SLIM PAGE BANNER ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[var(--color-ink)]"
        aria-label="Products page banner"
        style={{ height: 'clamp(180px, 28vh, 320px)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/lifestyle/lifestyle-img-3622.webp"
          alt=""
          width={1919}
          height={2560}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,14,11,0.35) 0%, rgba(15,14,11,0.55) 100%)',
          }}
        />
        <Container>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center pt-16 pb-12">
            <p className="font-mono text-mono-xs tracking-[0.06em] uppercase text-white/80 mb-3">
              Manhattan, KS · Est. 2017 · Field-Tested
            </p>
            <Heading
              as="h1"
              size="display-lg"
              className="text-white"
            >
              All Products
            </Heading>
          </div>
        </Container>
      </section>

      <Rule weight="hair" />

      {/* ── 2. CATALOG ──────────────────────────────────────────────────── */}
      <Section bg="paper" className="py-12 md:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* LEFT — vertical filter rail (lg+); horizontal scroll chip strip on <lg */}
            <aside
              className="lg:col-span-3"
              aria-label="Filter products by category"
            >
              <Suspense
                fallback={
                  <div className="h-12 lg:h-80" aria-hidden="true" />
                }
              >
                <ProductFilterRail
                  items={categoryItems}
                  totalCount={products.length}
                  gridId={PRODUCT_GRID_ID}
                />
              </Suspense>
            </aside>

            {/* RIGHT — static product grid (always 16 cards in HTML) */}
            <div className="lg:col-span-9">
              <div
                id={PRODUCT_GRID_ID}
                className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                data-active-cat="all"
                aria-label="Products"
              >
                {products.map((product, i) => (
                  <div
                    key={product.slug}
                    data-cat={product.category}
                    className="h-full"
                  >
                    <ProductCard product={product} priority={i < 3} />
                  </div>
                ))}
              </div>

              {/* Empty-state hint (only shown when filter hides every card) */}
              <Text
                variant="body-md"
                className="mt-12 hidden text-center text-[var(--color-ink-quiet)] empty-state"
                aria-hidden="true"
              >
                No products in this category right now — check back soon.
              </Text>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
