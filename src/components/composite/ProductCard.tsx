// src/components/composite/ProductCard.tsx
// RSC — no 'use client'. Pure CSS group-hover animations.
// Used in /products grid, season pages, cross-sell sections.
// Boundary: imports only atomic/ + types/.

import type { Product } from '@/types/product';
import { Image } from '@/components/atomic/Image';
import { Heading } from '@/components/atomic/Heading';
import { PriceTag } from '@/components/atomic/PriceTag';
import { StockBadge } from '@/components/atomic/StockBadge';
import { Button } from '@/components/atomic/Button';
import { Stamp } from '@/components/atomic/Stamp';
import { deriveStockState } from '@/components/atomic/StockBadge';
import { cn } from '@/lib/cn';

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Priority loading for above-the-fold cards (first 3 on /products) */
  priority?: boolean;
}

/**
 * <ProductCard> — hairline-bordered product card.
 * Hover: border thickens 1px→2px, card translates -4px up, image scales 1.02.
 * SKU stamp in lower-left fades in on hover.
 * All hover effects are pure CSS — no JS.
 */
export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const imageAlt = product.images[0]?.alt ?? product.displayName;
  const imageSrc = `/products/${product.slug}/${product.primaryImage}`;

  return (
    <article
      className={cn(
        'group relative flex flex-col',
        'bg-[var(--color-paper-3)]',
        'border border-[var(--color-rule)]',
        // Hover: border thickens + upward translate
        'hover:border-2 hover:border-[var(--color-ink)]',
        'transition-all duration-200',
        'hover:-translate-y-1',
        className,
      )}
    >
      {/* Image container with overflow-hidden for scale clip */}
      <a
        href={href}
        className="block overflow-hidden aspect-square relative"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={600}
          className={cn(
            'w-full h-full object-cover',
            // Hover: scale 1.02 with transform-origin bottom
            'transition-transform duration-200 ease-out',
            'group-hover:scale-[1.02] origin-bottom',
          )}
          priority={priority}
        />

        {/* Sale badge */}
        {product.onSale && (
          <span
            className="absolute top-2 right-2 font-mono text-mono-xs tracking-[0.04em] uppercase
              bg-[var(--color-accent)] text-[var(--color-paper)] px-2 py-0.5"
          >
            Sale
          </span>
        )}

        {/* SKU stamp in lower-left — fades in on hover */}
        <span
          className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-hidden="true"
        >
          <Stamp value={product.sku} />
        </span>
      </a>

      {/* Card body */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <Heading as="h3" size="display-sm" className="line-clamp-2">
          <a
            href={href}
            className="hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            {product.displayName}
          </a>
        </Heading>

        <PriceTag
          priceRegular={product.priceUsd}
          priceSale={product.salePriceUsd}
          size="sm"
        />

        <StockBadge stock={deriveStockState(product.available, null)} />

        {/* CTA */}
        <div className="mt-auto pt-3">
          <Button
            as="a"
            href={href}
            variant="secondary"
            className="w-full text-center"
          >
            View
          </Button>
        </div>
      </div>
    </article>
  );
}
