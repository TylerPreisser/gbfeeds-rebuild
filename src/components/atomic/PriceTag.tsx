// src/components/atomic/PriceTag.tsx
// RSC — no 'use client'. Displays product price with optional MSRP strikethrough.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type PriceTagSize = 'sm' | 'lg';

interface PriceTagProps {
  /** Regular price as string (e.g., "19.99") */
  priceRegular: string;
  /** Sale price as string — if provided, shows MSRP struck through */
  priceSale?: string | null;
  /** 'sm' for product cards, 'lg' for PDP hero */
  size?: PriceTagSize;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Split a price string "19.99" into ["19", "99"].
 * Returns ["0", "00"] as fallback.
 */
function splitPrice(price: string): [string, string] {
  const [dollars = '0', cents = '00'] = price.split('.');
  return [dollars, cents.padEnd(2, '0').slice(0, 2)];
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const sizeConfig: Record<PriceTagSize, { dollars: string; cents: string; msrp: string }> = {
  sm: {
    dollars: 'font-mono text-body-md font-medium text-[var(--color-ink)]',
    cents: 'font-mono text-mono-xs text-[var(--color-ink-muted)] self-start mt-1',
    msrp: 'font-mono text-mono-xs text-[var(--color-ink-quiet)] line-through',
  },
  lg: {
    dollars: 'font-mono text-display-sm font-medium text-[var(--color-ink)]',
    cents: 'font-mono text-body-sm text-[var(--color-ink-muted)] self-start mt-2',
    msrp: 'font-mono text-body-sm text-[var(--color-ink-quiet)] line-through',
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <PriceTag> — product price display with optional MSRP strikethrough.
 *
 * Mono-style numerals (JetBrains Mono).
 * When priceSale < priceRegular, shows:
 *   - Sale price prominently (accent color)
 *   - Regular price struck-through in muted ink
 *
 * size="sm" — product cards
 * size="lg" — PDP hero, sticky mobile bar
 *
 * @example
 * <PriceTag priceRegular="19.99" />
 * <PriceTag priceRegular="999.99" priceSale="949.99" size="lg" />
 */
export function PriceTag({ priceRegular, priceSale, size = 'sm', className }: PriceTagProps) {
  const onSale = priceSale !== null && priceSale !== undefined && priceSale !== priceRegular;
  const displayPrice = onSale ? priceSale! : priceRegular;
  const [dollars, cents] = splitPrice(displayPrice);
  const { dollars: dollarClass, cents: centsClass, msrp: msrpClass } = sizeConfig[size];

  return (
    <div className={cn('flex flex-col gap-0.5', className)} aria-label={`Price: $${displayPrice}`}>
      {onSale && (
        <span className={cn(msrpClass, 'decoration-[var(--color-accent)]')}>
          ${priceRegular}
        </span>
      )}
      <div className="flex items-baseline gap-0">
        <span className="font-mono text-mono-xs text-[var(--color-ink-quiet)] self-start mt-1 mr-0.5">
          $
        </span>
        <span
          className={cn(dollarClass, onSale ? 'text-[var(--color-accent)]' : '')}
        >
          {dollars}
        </span>
        <span className={cn(centsClass, 'mx-px', onSale ? 'text-[var(--color-accent)]' : '')}>
          .
        </span>
        <span className={cn(centsClass, onSale ? 'text-[var(--color-accent)]' : '')}>
          {cents}
        </span>
      </div>
    </div>
  );
}
