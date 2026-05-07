// src/components/atomic/PriceTag.tsx
// RSC — no 'use client'. Displays product price with optional MSRP strikethrough.
// Tyler R10: numbers were rendering with mono font ($19 split with mono cents) and
// looked "freaking weird." Switched to Bebas Neue display digits, single-string
// price ("$24.99"), with a smaller msrp strike for sale items. Clean, ecommerce-standard.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type PriceTagSize = 'xs' | 'sm' | 'lg';

interface PriceTagProps {
  /** Regular price as string (e.g., "19.99") */
  priceRegular: string;
  /** Sale price as string — if provided, shows MSRP struck through */
  priceSale?: string | null;
  /** 'sm' for product cards, 'lg' for PDP hero */
  size?: PriceTagSize;
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const sizeConfig: Record<PriceTagSize, { price: string; msrp: string }> = {
  xs: {
    price:
      'font-display tracking-[0.01em] text-[clamp(1rem,0.95rem+0.25vw,1.25rem)] text-[var(--color-ink)] leading-none',
    msrp:
      'font-display tracking-[0.01em] text-[clamp(0.75rem,0.7rem+0.15vw,0.875rem)] text-[var(--color-ink-quiet)] line-through leading-none',
  },
  sm: {
    price:
      'font-display tracking-[0.01em] text-[clamp(1.25rem,1.05rem+0.6vw,1.625rem)] text-[var(--color-ink)] leading-none',
    msrp:
      'font-display tracking-[0.01em] text-[clamp(0.875rem,0.8rem+0.2vw,1rem)] text-[var(--color-ink-quiet)] line-through leading-none',
  },
  lg: {
    price:
      'font-display tracking-[0.01em] text-[clamp(2rem,1.6rem+1.5vw,3rem)] text-[var(--color-ink)] leading-none',
    msrp:
      'font-display tracking-[0.01em] text-[clamp(1rem,0.9rem+0.4vw,1.25rem)] text-[var(--color-ink-quiet)] line-through leading-none',
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <PriceTag> — product price display.
 * Bebas Neue digits, dollar-prefix glyph, optional MSRP strikethrough.
 * size="sm" — product cards
 * size="lg" — PDP hero
 */
export function PriceTag({
  priceRegular,
  priceSale,
  size = 'sm',
  className,
}: PriceTagProps) {
  const onSale =
    priceSale !== null && priceSale !== undefined && priceSale !== priceRegular;
  const displayPrice = onSale ? priceSale! : priceRegular;
  const { price: priceClass, msrp: msrpClass } = sizeConfig[size];

  return (
    <div
      className={cn('flex items-baseline gap-3', className)}
      aria-label={`Price: $${displayPrice}`}
    >
      <span className={cn(priceClass, onSale && 'text-[var(--color-accent)]')}>
        ${displayPrice}
      </span>
      {onSale && <span className={msrpClass}>${priceRegular}</span>}
    </div>
  );
}
