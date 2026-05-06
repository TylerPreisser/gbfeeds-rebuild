// src/components/composite/LiveCount.tsx
// RSC — no 'use client'. Reads harvests.json at build time, renders total_inches.
// Used inline in copy to replace the inconsistent 5,000/7,500/10,000 stats.
// Boundary: imports only public/data/harvests.json.

import harvestsJson from '../../../public/data/harvests.json';
import { cn } from '@/lib/cn';

interface LiveCountProps {
  /** Suffix after the number (e.g., "inches", "harvests") */
  suffix?: string;
  /** Optional CSS classes */
  className?: string;
  /** Rendering style: 'inline' = small text, 'display' = large Bebas Neue */
  variant?: 'inline' | 'display';
  /**
   * When true, renders a monospace "AS OF YYYY-MM-DD" stamp below the number.
   * Only applies to the 'display' variant.
   */
  showDate?: boolean;
}

const TOTAL_INCHES = harvestsJson.total_inches;
const UPDATED_AT = harvestsJson.updated_at;

function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

/**
 * <LiveCount> — renders total_inches from harvests.json at build time.
 * Use inline in copy: "Over <LiveCount /> inches harvested using GB Feeds products."
 * 'display' variant: giant Bebas Neue numeral for stat sections.
 * 'inline' variant: styled to match surrounding body text.
 * showDate: adds "AS OF YYYY-MM-DD" stamp — signals live-data nature to visitors.
 */
export function LiveCount({
  suffix = 'inches',
  className,
  variant = 'inline',
  showDate = false,
}: LiveCountProps) {
  if (variant === 'display') {
    return (
      <span className={cn('inline-flex flex-col items-start gap-1', className)}>
        <span
          className="font-display uppercase tracking-[0.02em] text-[var(--color-accent)] text-display-md"
          aria-label={`${formatCount(TOTAL_INCHES)} ${suffix}`}
        >
          {formatCount(TOTAL_INCHES)}
          {suffix && (
            <span className="ml-2 font-mono text-mono-xs tracking-[0.04em] text-[var(--color-ink-quiet)]">
              {suffix}
            </span>
          )}
        </span>
        {showDate && (
          <span
            className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
            aria-label={`As of ${UPDATED_AT}`}
          >
            AS OF {UPDATED_AT}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'font-display uppercase tracking-[0.02em] text-[var(--color-accent)]',
        className,
      )}
      aria-label={`${formatCount(TOTAL_INCHES)} ${suffix}`}
    >
      {formatCount(TOTAL_INCHES)}
      {suffix && ` ${suffix}`}
    </span>
  );
}
