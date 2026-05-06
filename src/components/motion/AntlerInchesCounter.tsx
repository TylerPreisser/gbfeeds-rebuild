'use client';
// src/components/motion/AntlerInchesCounter.tsx
// 'use client'. The 240px Bebas Neue antler-inches counter.
// Counts up from 0 to total proportional to scrollProgress (0–1).
// Reduced-motion: shows total immediately.
// Does NOT import GSAP — the tween is JavaScript-only (requestAnimationFrame),
// driven by the scrollProgress prop passed from SignatureMove.tsx.
// GSAP timeline calls setScrollProgress; this component is display-only.
// aria-live="polite" + aria-atomic="true" for SR.
// Boundary: imports only atomic/ + hooks/.

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface AntlerInchesCounterProps {
  /** The canonical total antler inches from harvests.json */
  total: number;
  /** 0–1 scroll progress from SignatureMove GSAP timeline */
  scrollProgress?: number;
  /** AS OF stamp date (harvests.json last_updated) */
  asOf?: string;
  className?: string;
}

function formatInches(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

/**
 * <AntlerInchesCounter> — the 240px Bebas counter at the heart of the home page.
 * Receives scrollProgress from <SignatureMove> (GSAP drives that).
 * This component only displays + formats — no GSAP import.
 * Reduced-motion: renders total immediately.
 */
export function AntlerInchesCounter({
  total,
  scrollProgress,
  asOf,
  className,
}: AntlerInchesCounterProps) {
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(reducedMotion ? total : 0);
  const prevProgressRef = useRef<number>(0);

  // When reducedMotion flips to true, jump to final value
  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(total);
    }
  }, [reducedMotion, total]);

  // When scrollProgress updates, interpolate the count
  useEffect(() => {
    if (reducedMotion || scrollProgress === undefined) return;

    // Direct mapping: scrollProgress 0→1 = count 0→total
    const target = Math.round(scrollProgress * total);
    setDisplayValue(target);
    prevProgressRef.current = scrollProgress;
  }, [scrollProgress, total, reducedMotion]);

  return (
    <div
      className={cn('flex flex-col items-center gap-4', className)}
      role="img"
      aria-label={`${formatInches(displayValue)} antler inches harvested using GB Feeds products`}
    >
      {/* Giant counter */}
      <div className="flex flex-col items-center gap-0">
        <span
          className="font-display uppercase leading-[1.0] text-[var(--color-accent)]"
          style={{ fontSize: 'clamp(8rem, 6.4rem + 8vw, 15rem)', letterSpacing: '0em' }}
          aria-live="polite"
          aria-atomic="true"
          aria-label={`${formatInches(displayValue)} antler inches`}
        >
          {formatInches(displayValue)}
        </span>

        {/* INCHES unit */}
        <span
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
        >
          Antler Inches Harvested
        </span>
      </div>

      {/* AS OF stamp */}
      {asOf && (
        <span
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]
            border border-[var(--color-rule)] px-2 py-0.5"
        >
          As of {asOf}
        </span>
      )}
    </div>
  );
}
