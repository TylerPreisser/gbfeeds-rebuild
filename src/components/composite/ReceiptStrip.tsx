// src/components/composite/ReceiptStrip.tsx
// RSC — no 'use client'. NEVER calls usePathname() — parent passes showStrip prop.
// Editorial strip: build date + harvests total_inches + last_updated stamp.
// Visible on most routes; hidden on /contact and legals (parent passes false).
// Boundary: imports only types/ + public data.

import harvestsJson from '../../../public/data/harvests.json';
import { cn } from '@/lib/cn';

interface ReceiptStripProps {
  /** When false, renders nothing — parent controls visibility, not usePathname() */
  showStrip: boolean;
  className?: string;
}

// Build-time values — baked at compile time
const TOTAL_INCHES = harvestsJson.total_inches;
const LAST_UPDATED = harvestsJson.updated_at;
const BUILD_YEAR = new Date().getFullYear();

function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

/**
 * <ReceiptStrip> — bottom-of-page editorial strip.
 * Shows: build date + total_inches counter (static version) + last_updated stamp.
 * Styled like a receipt: perforated edges (CSS mask-image dashed border simulation),
 * monospace dot-matrix numerals, slight rotation.
 *
 * DO NOT add usePathname() here — parent decides showStrip.
 */
export function ReceiptStrip({ showStrip, className }: ReceiptStripProps) {
  if (!showStrip) return null;

  return (
    <div
      className={cn(
        'w-full flex justify-center py-6',
        className,
      )}
      aria-label="Site statistics strip"
    >
      <div
        className={cn(
          'inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-2',
          'font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]',
          'border-t border-b border-dashed border-[var(--color-rule)]',
          'px-8 py-3',
          // Slight rotation for receipt-tape feel
          'rotate-[0.3deg]',
        )}
      >
        <span>
          {formatCount(TOTAL_INCHES)} inches harvested
        </span>
        <span className="opacity-40" aria-hidden="true">·</span>
        <span>
          Updated {LAST_UPDATED}
        </span>
        <span className="opacity-40" aria-hidden="true">·</span>
        <span>
          &copy; {BUILD_YEAR} GB Feeds · Manhattan, KS
        </span>
      </div>
    </div>
  );
}
