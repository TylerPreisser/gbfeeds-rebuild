// src/components/composite/BagTagTriptychStatic.tsx
// RSC — no 'use client'. No framer-motion.
// Server-rendered guaranteed-analysis triptych.
// Renders 3 numerals + labels in plain HTML — zero JS payload.
// Used by ProductDetail.tsx as the SSR layer; BagTagTriptychAnimated
// (dynamic ssr:false) progressively enhances on hydration.
//
// Non-JS crawlers and reduced-motion users see this component only.
// Boundary: imports only atomic/ + types/.

import type { BagTagStat } from '@/types/product';
import { Stamp } from '@/components/atomic/Stamp';
import { cn } from '@/lib/cn';

interface BagTagTriptychStaticProps {
  stats: [BagTagStat, BagTagStat, BagTagStat];
  /** Optional lot-stamp text — defaults to "LOT 2024-09 / MANHATTAN, KS" */
  lotStamp?: string;
  className?: string;
}

/**
 * <BagTagTriptychStatic> — server-rendered guaranteed-analysis triptych.
 *
 * Three oversized stat squares on PDP hero: giant Bebas Neue value + Stamp label.
 * No animation — pure HTML. Used as the SSR layer under BagTagTriptychAnimated.
 *
 * Reduced-motion users and non-JS crawlers always see this component.
 * The data-bagtag-static attribute is a progressive-enhancement marker so
 * BagTagTriptychAnimated can replace rather than double-render on hydration.
 */
export function BagTagTriptychStatic({
  stats,
  lotStamp = 'LOT 2024-09 / MANHATTAN, KS',
  className,
}: BagTagTriptychStaticProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-0 border border-[var(--color-rule)]',
        'bg-[var(--color-paper-3)]',
        className,
      )}
      role="group"
      aria-label="Guaranteed analysis"
      data-bagtag-static="true"
    >
      {/* Header strip */}
      <div className="px-4 py-2 border-b border-[var(--color-rule)] bg-[var(--color-ink)]">
        <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-paper)]">
          Guaranteed Analysis
        </span>
      </div>

      {/* Three stat panels — plain HTML, no animation */}
      <div className="grid grid-cols-3 divide-x divide-[var(--color-rule)]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            data-testid="bag-tag"
            className="flex flex-col items-center justify-center gap-2 px-4 py-6"
          >
            {/* Giant value — same clamp as animated version */}
            <span
              className="font-display uppercase tracking-[0em] leading-[1.0] text-[var(--color-ink)]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
              aria-label={`${stat.value} ${stat.label}`}
            >
              {stat.value}
            </span>

            {/* Label stamp */}
            <Stamp value={stat.label} />

            {/* Optional unit sub-label */}
            {stat.unit && (
              <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                {stat.unit}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Lot stamp footer */}
      <div className="px-4 py-2 border-t border-[var(--color-rule)] flex justify-end">
        <Stamp value={lotStamp} />
      </div>
    </div>
  );
}
