// src/components/composite/ProductCard.tsx
// RSC — no 'use client'. Pure CSS group-hover animations.
// Used in /products grid, season pages, cross-sell sections.
// Per ORIGINAL_TRUTH § 3.3: card = image + name + price. No IN STOCK pill. No VIEW button.
// The whole card is a link to the PDP.
// Boundary: imports only atomic/ + types/.

import type { Product } from '@/types/product';
import { Image } from '@/components/atomic/Image';
import { Heading } from '@/components/atomic/Heading';
import { PriceTag } from '@/components/atomic/PriceTag';
import { Stamp } from '@/components/atomic/Stamp';
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
  const imageSrc = product.primaryImage;

  return (
    <article
      className={cn(
        'group relative flex flex-col h-full',
        'bg-[var(--color-paper-3)]',
        'border border-[var(--color-rule)]',
        'hover:border-[var(--color-ink)]',
        'transition-colors duration-200',
        'hover:-translate-y-1',
        className,
      )}
    >
      {/* Image container with overflow-hidden for scale clip */}
      <a
        href={href}
        className="block overflow-hidden aspect-[4/5] relative bg-[var(--color-paper)]"
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

      {/* Card body — name + price only, per ORIGINAL_TRUTH § 3.3.
          Body uses flex-1 so cards stretch to equal heights in a grid;
          min-h on the heading keeps 1-line and 2-line titles producing same card height. */}
      <div className="flex flex-1 flex-col gap-2 p-4 border-t border-[var(--color-rule)]">
        <Heading
          as="h3"
          size="display-sm"
          className="line-clamp-3 text-[clamp(1.125rem,0.95rem+0.55vw,1.5rem)] tracking-[0.01em] min-h-[3em] flex-1 leading-[1.05]"
        >
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
      </div>
    </article>
  );
}
