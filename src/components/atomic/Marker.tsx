// src/components/atomic/Marker.tsx
// RSC — no 'use client'. Inch-wide left-margin logbook marker block.
// Composes <Stamp>. Boundary rule: may import from atomic/ only.

import { Stamp } from './Stamp';
import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

interface MarkerProps {
  date?: string;
  county?: string;
  wind?: string;
  weight?: string;
  /** Additional custom stamps beyond the standard four */
  extra?: Array<{ label?: string; value: string; unit?: string }>;
  className?: string;
  /** aria-label for the marker landmark */
  'aria-label'?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Marker> — inch-wide left-margin logbook metadata column.
 *
 * Renders a vertically stacked column of <Stamp> chips:
 *   DATE / COUNTY / WIND / WEIGHT + optional extra stamps.
 *
 * Positioned via parent layout — Marker is always floated or
 * absolutely positioned on the left edge of its containing section.
 *
 * @example
 * <Marker
 *   date="OCT 08 2024"
 *   county="RILEY"
 *   wind="NW 9"
 *   weight="40 LB"
 * />
 */
export function Marker({
  date,
  county,
  wind,
  weight,
  extra,
  className,
  'aria-label': ariaLabel = 'Field logbook metadata',
}: MarkerProps) {
  return (
    <aside
      aria-label={ariaLabel}
      className={cn(
        // Vertical stack of stamps, narrow column
        'flex flex-col gap-1',
        // The inch-wide left-margin treatment — ~1in at 96dpi
        'w-[clamp(4rem,6vw,6rem)]',
        className,
      )}
    >
      {date && <Stamp variant="date" label="DATE" value={date} />}
      {county && <Stamp variant="county" label="CNTY" value={county} />}
      {wind && <Stamp variant="wind" label="WIND" value={wind} />}
      {weight && <Stamp variant="weight" label="WGT" value={weight} />}
      {extra?.map((stamp, i) => (
        <Stamp
          key={i}
          value={stamp.value}
          label={stamp.label}
          unit={stamp.unit}
        />
      ))}
    </aside>
  );
}
