// src/components/atomic/StockBadge.tsx
// RSC — no 'use client'. Stock status badge composing <Stamp>.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { Stamp } from './Stamp';
import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type StockState = 'in-stock' | 'low-stock' | 'sold-out';

interface StockBadgeProps {
  /**
   * Stock state. If not provided, the badge renders nothing.
   * This is the "hidden if no stock prop" behavior per the manifest.
   */
  stock?: StockState | null;
  className?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function deriveStockState(available: boolean, totalOnHand: number | null): StockState {
  if (!available || totalOnHand === 0) return 'sold-out';
  if (totalOnHand !== null && totalOnHand <= 3) return 'low-stock';
  return 'in-stock';
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const stateConfig: Record<StockState, { label: string; color: string }> = {
  'in-stock': {
    label: 'IN STOCK',
    // --success: #5B6E3D (moss/olive)
    color: 'border-[var(--color-success)] text-[var(--color-success)]',
  },
  'low-stock': {
    label: 'LOW STOCK',
    // --warn: #C99A3D (wheat/amber)
    color: 'border-[var(--color-warn)] text-[var(--color-warn)]',
  },
  'sold-out': {
    label: 'SOLD OUT',
    // --danger: #6E2310 (deep oxblood-noir)
    color: 'border-[var(--color-danger)] text-[var(--color-danger)]',
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <StockBadge> — stock status indicator composing <Stamp>.
 *
 * Renders nothing if `stock` prop is undefined or null.
 * Colors from state token vars:
 *   IN STOCK  → --success (#5B6E3D moss)
 *   LOW STOCK → --warn    (#C99A3D wheat)
 *   SOLD OUT  → --danger  (#6E2310 dark oxblood)
 *
 * @example
 * <StockBadge stock="in-stock" />
 * <StockBadge stock="low-stock" />
 * <StockBadge stock="sold-out" />
 * <StockBadge stock={null} /> {/* renders nothing *\/}
 */
export function StockBadge({ stock, className }: StockBadgeProps) {
  if (!stock) return null;

  const { label, color } = stateConfig[stock];

  return (
    <Stamp
      value={label}
      className={cn(
        // Override Stamp's default border/text color with state color
        'border',
        color,
        className,
      )}
    />
  );
}

// ─── Helper export for PDP usage ─────────────────────────────────────────────

/**
 * Derives a StockState from raw product availability data.
 * Use in data layer to compute the stock prop before rendering.
 */
export { deriveStockState };
