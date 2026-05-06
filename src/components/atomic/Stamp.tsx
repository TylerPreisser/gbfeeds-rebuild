// src/components/atomic/Stamp.tsx
// RSC — no 'use client'. Monospace date/county/wind/weight chip.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type StampVariant = 'date' | 'county' | 'wind' | 'weight' | 'default';

interface StampProps {
  /** Primary value displayed (e.g., "OCT 08 2024", "RILEY", "NW 9", "40 LB") */
  value: string;
  /** Optional label prefix — rendered in a slightly muted tone before the value */
  label?: string;
  /** Optional unit suffix (e.g., "MPH", "LB", "IN") */
  unit?: string;
  variant?: StampVariant;
  className?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const variantStyles: Record<StampVariant, string> = {
  date: 'text-[var(--color-ink-quiet)]',
  county: 'text-[var(--color-ink-muted)]',
  wind: 'text-[var(--color-ink-quiet)]',
  weight: 'text-[var(--color-ink-muted)]',
  default: 'text-[var(--color-ink-quiet)]',
};

// Base: JetBrains Mono, 11→12px, 0.04em tracking (letterpressed), uppercase
const baseStyles = [
  'inline-flex items-center gap-1',
  'font-mono text-mono-xs tracking-[0.04em] uppercase leading-[1.2]',
  'border border-[var(--color-rule)] px-1 py-0.5',
].join(' ');

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Stamp> — monospace chip for logbook metadata.
 *
 * Used for: date, county, wind direction, weight, SKU code, lot stamp,
 * bag-label simulation, photo caption subscripts.
 *
 * Composes <Text variant="mono-xs"> semantically, but renders as a single
 * inline <span> for direct use in Marker, StockBadge, etc.
 *
 * @example
 * <Stamp variant="date" value="OCT 08 2024" />
 * <Stamp variant="county" label="COUNTY" value="RILEY" />
 * <Stamp variant="wind" label="WIND" value="NW 9" unit="MPH" />
 * <Stamp value="BC-40LB-2023" />
 */
export function Stamp({ value, label, unit, variant = 'default', className }: StampProps) {
  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {label && (
        <span className="text-[var(--color-ink-quiet)] mr-0.5">{label}</span>
      )}
      <span>{value}</span>
      {unit && (
        <span className="text-[var(--color-ink-quiet)] ml-0.5">{unit}</span>
      )}
    </span>
  );
}
