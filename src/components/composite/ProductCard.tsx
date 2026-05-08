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
import { cn } from '@/lib/cn';
import { withBasePath } from '@/lib/basePath';

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Priority loading for above-the-fold cards (first 3 on /products) */
  priority?: boolean;
  density?: 'default' | 'compact';
}

/**
 * <ProductCard> — hairline-bordered product card.
 * Hover: border thickens 1px→2px, card translates -4px up, image scales 1.02.
 * All hover effects are pure CSS — no JS.
 */
export function ProductCard({
  product,
  className,
  priority = false,
  density = 'default',
}: ProductCardProps) {
  const href = withBasePath(`/products/${product.slug}/`);
  const imageAlt = product.images[0]?.alt ?? product.displayName;
  const imageSrc = withBasePath(product.primaryImage);
  const isCompact = density === 'compact';
  const cardTitle = getCardTitle(product);

  return (
    <article
      className={cn(
        'premium-card group relative flex flex-col h-full',
        'bg-[var(--color-paper-3)]',
        'border border-[var(--color-rule)]',
        /* hover:border and hover:-translate-y-1 intentionally removed here —
           they are reinstated via @media (hover: hover) and (pointer: fine) in
           globals.css so they only fire on real cursor devices, not touch taps. */
        'transition-colors duration-200',
        className,
      )}
    >
      {/* Image container with overflow-hidden for scale clip */}
      <a
        href={href}
        className={cn(
          'premium-media block overflow-hidden relative bg-[var(--color-paper)]',
          /* compact (carousel): portrait on mobile so cards are taller and more
             visually present; landscape on md+ to match the desktop grid look. */
          isCompact ? 'aspect-[3/4] md:aspect-[4/3]' : 'aspect-[4/5]',
        )}
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={600}
          className={cn(
            'w-full h-full object-cover origin-bottom',
            /* transition-transform kept so the scale eases in on desktop.
               group-hover:scale-[1.02] removed — reinstated via CSS media query
               in globals.css to prevent the flash-scale on touch taps. */
            'transition-transform duration-200 ease-out',
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

      </a>

      {/* Card body — name + price only, per ORIGINAL_TRUTH § 3.3.
          Body uses flex-1 so cards stretch to equal heights in a grid;
          min-h on the heading keeps 1-line and 2-line titles producing same card height. */}
      <div className={cn(
        'flex flex-1 flex-col border-t border-[var(--color-rule)]',
        isCompact ? 'gap-1.5 p-3 sm:p-4' : 'gap-2 p-3 md:p-4',
      )}>
        <Heading
          as="h3"
          size="display-sm"
          className={cn(
            'line-clamp-3 tracking-[0.01em] flex-1 leading-[1.05]',
            isCompact
              ? 'text-[clamp(0.9375rem,0.88rem+0.25vw,1.125rem)] min-h-[2.25em]'
              : 'text-[clamp(0.875rem,0.8rem+0.4vw,1.5rem)] min-h-[2.5em] md:min-h-[3em]',
          )}
        >
          <a
            href={href}
            className="hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            {cardTitle}
          </a>
        </Heading>

        <PriceTag
          priceRegular={product.priceUsd}
          priceSale={product.salePriceUsd}
          size={isCompact ? 'xs' : 'sm'}
        />
      </div>
    </article>
  );
}

function getCardTitle(product: Product): string {
  const shortNames: Record<string, string> = {
    'buck-chow-40lb': 'Buck Chow 40LB',
    'corn-candy-7lb': 'Corn Candy 7LB',
    'buck-chow-2000lb-pallet': 'Buck Chow 2,000LB Pallet',
    'tactacam-reveal-bundle': 'Tactacam Reveal Bundle',
    'lithium-battery': 'Lithium Battery Cartridge',
    'tws-2000lb-gravity-feeder': 'TWS 2,000LB Gravity Feeder',
    'tws-600lb-gravity-feeder': 'TWS 600LB Gravity Feeder',
    'tws-600lb-lucky-buck-spin': 'TWS 600LB Spin Feeder',
    'tws-2000lb-spin-feeder': 'TWS 2,000LB Spin Feeder',
  };

  return shortNames[product.slug] ?? product.displayName;
}
