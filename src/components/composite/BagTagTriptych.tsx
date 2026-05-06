'use client';
// src/components/composite/BagTagTriptych.tsx
// 'use client' — Y-axis flip animation on hover/scroll entry.
// Three giant monospace numerals on PDP hero.
// Framer Motion LazyMotion + m (NEVER bare motion).
// Reduced-motion: static, no flip.
// Boundary: imports only atomic/ + types/.

import { LazyMotion, m, domAnimation } from 'framer-motion';
import type { BagTagStat } from '@/types/product';
import { Stamp } from '@/components/atomic/Stamp';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface BagTagTriptychProps {
  stats: [BagTagStat, BagTagStat, BagTagStat];
  /** Optional lot-stamp text — defaults to "LOT 2024-09 / MANHATTAN, KS" */
  lotStamp?: string;
  className?: string;
}

/**
 * <BagTagTriptych> — three oversized stat squares on PDP hero.
 * Each stat: giant Bebas Neue value + Stamp label below.
 * Flip animation: Y-axis flip from blank tag back → printed front, staggered 80ms.
 * Reduced-motion: static, no flip.
 */
export function BagTagTriptych({
  stats,
  lotStamp = 'LOT 2024-09 / MANHATTAN, KS',
  className,
}: BagTagTriptychProps) {
  const reducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          'flex flex-col gap-0 border border-[var(--color-rule)]',
          'bg-[var(--color-paper-3)]',
          className,
        )}
        role="group"
        aria-label="Guaranteed analysis"
      >
        {/* Header strip */}
        <div className="px-4 py-2 border-b border-[var(--color-rule)] bg-[var(--color-ink)]">
          <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-paper)]">
            Guaranteed Analysis
          </span>
        </div>

        {/* Three stat panels */}
        <div className="grid grid-cols-3 divide-x divide-[var(--color-rule)]">
          {stats.map((stat, index) => (
            <StatPanel
              key={stat.label}
              stat={stat}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Lot stamp footer */}
        <div className="px-4 py-2 border-t border-[var(--color-rule)] flex justify-end">
          <Stamp value={lotStamp} />
        </div>
      </div>
    </LazyMotion>
  );
}

// ─── Internal stat panel ──────────────────────────────────────────────────────

interface StatPanelProps {
  stat: BagTagStat;
  index: number;
  reducedMotion: boolean;
}

function StatPanel({ stat, index, reducedMotion }: StatPanelProps) {
  const flipVariants = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: {
      rotateY: 0,
      opacity: 1,
      transition: {
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as number[],
      },
    },
  };

  const staticVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  return (
    <m.div
      className="flex flex-col items-center justify-center gap-2 px-4 py-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={reducedMotion ? staticVariants : flipVariants}
      style={{ perspective: 800 }}
    >
      {/* Giant value — clamp 2.5rem → 8rem.
          Reduced from clamp(3rem, 4.8rem + 6vw, 8rem) which produced ~100px at 375–390px
          in a 3-col grid where each column is only ~93–98px wide — causing overflow.
          clamp(2.5rem, 8vw, 8rem) stays safely within the narrow column:
            375px → 30px (2.5rem floor), 390px → 31.2px, resolves above floor at ~450px. */}
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
    </m.div>
  );
}
