// src/components/composite/SeasonChip.tsx
// RSC — no 'use client'. Pill chip showing season name.
// Bebas Neue uppercase + small mono-stamp for nutritional priority hint.
// Color modifier per season meta.
// Boundary: imports only types/.

import type { Season } from '@/types/product';
import { cn } from '@/lib/cn';

interface SeasonChipProps {
  season: Season;
  /** Whether this chip represents the currently active/selected season */
  active?: boolean;
  /** Optional override display name */
  displayName?: string;
  /** Optional priority hint below the name (e.g., "PRIORITY: PROTEIN-BUILD") */
  priority?: string;
  className?: string;
  /** When true, renders as a link anchor */
  href?: string;
}

// Season display labels
const SEASON_LABELS: Record<Season, string> = {
  'pre-rut': 'Pre-Rut',
  rut: 'Rut',
  'post-rut': 'Post-Rut',
  'antler-growth': 'Antler Growth',
};

const SEASON_PRIORITY: Record<Season, string> = {
  'pre-rut': 'PRIORITY: MINERAL LOAD',
  rut: 'PRIORITY: HIGH ENERGY',
  'post-rut': 'PRIORITY: RECOVERY',
  'antler-growth': 'PRIORITY: PROTEIN BUILD',
};

/**
 * <SeasonChip> — pill chip for season phase.
 * Active state: --accent border + ink background.
 * Inactive: rule border + paper-3 background.
 */
export function SeasonChip({
  season,
  active = false,
  displayName,
  priority,
  className,
  href,
}: SeasonChipProps) {
  const label = displayName ?? SEASON_LABELS[season];
  const hint = priority ?? SEASON_PRIORITY[season];

  const baseClasses = cn(
    'inline-flex flex-col items-center gap-1',
    'px-4 py-2',
    'border transition-colors duration-200',
    active
      ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-paper)]'
      : 'border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink)] hover:border-[var(--color-accent)]',
    className,
  );

  const content = (
    <>
      <span className="font-display uppercase tracking-[0.02em] text-body-sm leading-none">
        {label}
      </span>
      <span
        className={cn(
          'font-mono text-mono-xs tracking-[0.04em] uppercase leading-none',
          active ? 'opacity-75' : 'text-[var(--color-ink-quiet)]',
        )}
      >
        {hint}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} aria-current={active ? 'page' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <span className={baseClasses} aria-pressed={active} role={active ? 'status' : undefined}>
      {content}
    </span>
  );
}
