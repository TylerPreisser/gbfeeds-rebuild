// src/components/page/ProductDetail.tsx
// RSC — no 'use client'.
// Shared PDP template. Every SKU uses this component — parameterized via `product` prop.
// 6D.4 fan-out: 16 slugs from generateStaticParams, this file unchanged.
// Boundary: page/ imports composite/ + atomic/ + decoration/ + data/ + lib/.

import Link from 'next/link';
import type { Product } from '@/types/product';
import { getCrossSells } from '@/data/cross-sell-map';
import { getProductBySlug } from '@/data/products';
import { productSchema } from '@/lib/seo';
import { Button } from '@/components/atomic/Button';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Stamp } from '@/components/atomic/Stamp';
import { PriceTag } from '@/components/atomic/PriceTag';
import { StockBadge, deriveStockState } from '@/components/atomic/StockBadge';
import { Rule } from '@/components/atomic/Rule';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { PaperGrain } from '@/components/decoration/PaperGrain';
// BagTagTriptychLoader: progressive enhancement wrapper.
// Renders BagTagTriptychStatic (RSC, no framer-motion) on server + first paint.
// After hydration, dynamically loads BagTagTriptychAnimated (ssr:false) to
// defer the framer-motion chunk (~25 KB gz) off the PDP critical path.
// See BagTagTriptychLoader.tsx for full rationale.
import { BagTagTriptychLoader } from '@/components/composite/BagTagTriptychLoader';
import { ProductCard } from '@/components/composite/ProductCard';
import { AddToCartPlaceholder } from '@/components/composite/AddToCartPlaceholder';
import { StickyAddToCartPlaceholder } from '@/components/composite/StickyAddToCartPlaceholder';
import { cn } from '@/lib/cn';

// ─── Payment Link helper ──────────────────────────────────────────────────────

/**
 * Returns true if the paymentLinkUrl is still a placeholder.
 * Per 6E.5 spec: placeholders start with "about:blank#TODO-".
 */
function isPlaceholderLink(url: string): boolean {
  return url.startsWith('about:blank#TODO-');
}

const PHONE_FALLBACK_HREF = 'tel:+16206393337';

// ─── Props ────────────────────────────────────────────────────────────────────

interface ProductDetailProps {
  product: Product;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ProductDetail({ product }: ProductDetailProps) {
  const crossSellSlugs = getCrossSells(product.slug);
  const crossSellProducts = crossSellSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== null);

  const stockState = deriveStockState(product.available, null);
  const isPlaceholder = isPlaceholderLink(product.paymentLinkUrl);

  return (
    <>
      {/* JSON-LD Product schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(product)) }}
      />

      <main id="main-content">

        {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="bg-[var(--color-paper-2)] border-b border-[var(--color-rule)]"
        >
          <Container>
            <ol
              className="flex items-center gap-2 py-3 font-mono text-mono-xs
                tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
            >
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--color-ink)] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-[var(--color-ink)] transition-colors duration-200"
                >
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                aria-current="page"
                className="text-[var(--color-ink)] truncate max-w-[200px] sm:max-w-none"
              >
                {product.displayName}
              </li>
            </ol>
          </Container>
        </nav>

        {/* ── 1. HERO BLOCK — split: left image / right details ───────────── */}
        <section
          className="relative bg-[var(--color-paper)]"
          aria-label={`${product.displayName} product detail`}
        >
          <PaperGrain />
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-20">

              {/* LEFT: product hero image — col-span-5 of 12 (was 1/2 = 6/12) */}
              <div className="relative lg:col-span-5">
                <picture>
                  {/* AVIF source */}
                  <source
                    type="image/avif"
                    srcSet={[320, 640, 1024, 1600].map(
                      (w) =>
                        `/products/${product.slug}/${product.slug}-hero-${w}.avif ${w}w`,
                    ).join(', ')}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* WebP source */}
                  <source
                    type="image/webp"
                    srcSet={[320, 640, 1024, 1600].map(
                      (w) =>
                        `/products/${product.slug}/${product.slug}-hero-${w}.webp ${w}w`,
                    ).join(', ')}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* JPEG fallback — priority for LCP */}
                  <img
                    src={`/products/${product.slug}/${product.slug}-hero-1024.jpg`}
                    alt={product.images[0]?.alt ?? product.displayName}
                    width={1024}
                    height={1024}
                    className="w-full aspect-square object-cover border border-[var(--color-rule)]"
                    fetchPriority="high"
                    loading="eager"
                  />
                </picture>

                {/* Sale badge */}
                {product.onSale && (
                  <span
                    className="absolute top-4 right-4 font-mono text-mono-xs tracking-[0.04em]
                      uppercase bg-[var(--color-accent)] text-[var(--color-paper)] px-2 py-1"
                  >
                    SALE
                  </span>
                )}
              </div>

              {/* RIGHT: product details — col-span-7 of 12 (was 1/2 = 6/12; widened so PDP title fits 1-2 lines) */}
              <div className="flex flex-col gap-6 lg:col-span-7">
                {/* Category stamp */}
                <Stamp value={product.category.replace(/-/g, ' ').toUpperCase()} />

                {/* Product name — display-md keeps 1-2 lines in the right column */}
                <Heading as="h1" size="display-md">
                  {product.displayName}
                </Heading>

                {/* Price + stock */}
                <div className="flex items-center gap-4">
                  <PriceTag
                    priceRegular={product.priceUsd}
                    priceSale={product.salePriceUsd}
                    size="lg"
                  />
                  <StockBadge stock={stockState} />
                </div>

                {/* Short description */}
                <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.4]">
                  {product.shortDescription}
                </Text>

                <Rule weight="hair" />

                {/* Commerce buttons — per ORIGINAL_TRUTH § 7B */}
                <div className="flex flex-col gap-3">

                  {/* Quantity stepper — static, visual-only (RSC-safe, no JS state) */}
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor={`qty-${product.slug}`}
                      className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
                    >
                      Quantity
                    </label>
                    <input
                      id={`qty-${product.slug}`}
                      type="number"
                      name="quantity"
                      min={1}
                      max={99}
                      defaultValue={1}
                      className="w-16 text-center border border-[var(--color-rule)]
                        bg-transparent font-body text-body-sm text-[var(--color-ink)]
                        py-1.5 px-2 focus:outline-none focus:border-[var(--color-ink)]"
                      aria-label="Product quantity"
                    />
                  </div>

                  {/* ADD TO CART + G Pay — placeholder-aware client components */}
                  {isPlaceholder ? (
                    <AddToCartPlaceholder productName={product.displayName} />
                  ) : (
                    <>
                      <Button
                        as="a"
                        href={product.paymentLinkUrl}
                        variant="primary"
                        className="w-full justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Add ${product.displayName} to cart — opens Stripe checkout`}
                      >
                        ADD TO CART
                      </Button>

                      {/* G Pay visual — disabled until real Stripe Checkout */}
                      <button
                        type="button"
                        disabled
                        aria-label="Buy with Google Pay — coming soon"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3
                          bg-[var(--color-ink)] border border-[var(--color-ink)]
                          opacity-60 cursor-not-allowed
                          font-body text-body-sm leading-none"
                        style={{ color: '#ffffff' }}
                      >
                        Buy with G Pay
                      </button>

                      {/* Phone fallback */}
                      <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] text-center">
                        Questions?{' '}
                        <a
                          href={PHONE_FALLBACK_HREF}
                          className="hover:text-[var(--color-accent)] transition-colors duration-200"
                        >
                          (620) 639-3337
                        </a>
                      </p>
                    </>
                  )}
                </div>

                {/* SKU + weight stamps */}
                <div className="flex flex-wrap gap-2 pt-2" aria-label="Product identifiers">
                  <Stamp value={product.sku} />
                  {product.weight && <Stamp value={product.weight} variant="weight" />}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── 2. BAG-TAG TRIPTYCH ──────────────────────────────────────────── */}
        <Section bg="paper-2" aria-label="Guaranteed analysis">
          <PaperGrain />
          <Container variant="narrow">
            <BagTagTriptychLoader stats={product.bagTag} />
          </Container>
        </Section>

        {/* ── 3. DESCRIPTION ───────────────────────────────────────────────── */}
        <Section bg="paper" aria-label="Product description">
          <PaperGrain />
          <Container variant="narrow">
            <Heading as="h2" size="display-sm" className="mb-6">
              ABOUT THIS PRODUCT
            </Heading>
            {/* Render multi-line formatted description */}
            <div className="flex flex-col gap-3">
              {product.descriptionFormatted.split('\n').map((line, i) => {
                if (!line.trim()) return null;
                // Bullet points
                if (line.startsWith('- ')) {
                  return (
                    <div
                      key={i}
                      className={cn(
                        'flex gap-3 items-start',
                        'font-body text-body-md text-[var(--color-ink-muted)] leading-[1.4]',
                      )}
                    >
                      <span
                        className="shrink-0 mt-1 w-4 h-px bg-[var(--color-accent)] self-center"
                        aria-hidden="true"
                      />
                      <span>{line.slice(2)}</span>
                    </div>
                  );
                }
                // Bold opening headline (first line)
                if (i === 0) {
                  return (
                    <p
                      key={i}
                      className="font-display uppercase tracking-[0.02em] text-display-sm
                        text-[var(--color-ink)] mb-2"
                    >
                      {line}
                    </p>
                  );
                }
                return (
                  <p
                    key={i}
                    className="font-body text-body-md text-[var(--color-ink-muted)] leading-[1.4]"
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* ── 4. CROSS-SELL ROW — "You May Also Like" per ORIGINAL_TRUTH § 7B ── */}
        {crossSellProducts.length > 0 && (
          <Section bg="paper-2" aria-label="You may also like">
            <PaperGrain />
            <Container>
              <div className="flex items-center gap-4 mb-10">
                <Rule weight="hair" className="flex-1" />
                <Heading as="h2" size="display-sm" className="shrink-0">
                  YOU MAY ALSO LIKE
                </Heading>
                <Rule weight="hair" className="flex-1" />
              </div>

              <div
                className={cn(
                  'grid gap-6',
                  crossSellProducts.length === 1 && 'grid-cols-1 max-w-sm',
                  crossSellProducts.length === 2 && 'grid-cols-1 sm:grid-cols-2',
                  crossSellProducts.length >= 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                )}
              >
                {crossSellProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* ── STICKY ADD-TO-CART BAR (mobile only, lg:hidden) ─────────────── */}
        {/* pb-[env(safe-area-inset-bottom)] clears the home indicator (~34px) on
            iPhone X and later. Requires viewport-fit=cover in layout.tsx (P0-F). */}
        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40
            bg-[var(--color-paper)] border-t border-[var(--color-rule)]
            px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]
            flex items-center justify-between gap-3"
          aria-label="Add to cart"
        >
          <div className="flex flex-col">
            <span className="font-display uppercase tracking-[0.02em] text-body-sm text-[var(--color-ink)] truncate max-w-[160px]">
              {product.displayName}
            </span>
            <PriceTag
              priceRegular={product.priceUsd}
              priceSale={product.salePriceUsd}
              size="sm"
            />
          </div>

          {isPlaceholder ? (
            <StickyAddToCartPlaceholder productName={product.displayName} />
          ) : (
            <Button
              as="a"
              href={product.paymentLinkUrl}
              variant="primary"
              className="shrink-0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Add ${product.displayName} to cart`}
            >
              ADD TO CART
            </Button>
          )}
        </div>

        {/* Spacer so sticky bar doesn't overlap last section on mobile */}
        <div className="lg:hidden h-20" aria-hidden="true" />

      </main>
    </>
  );
}
