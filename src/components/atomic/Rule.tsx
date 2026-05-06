// src/components/atomic/Rule.tsx
// RSC — no 'use client'. 24px ruled hairline divider.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type RuleVariant = 'horizontal' | 'vertical';
type RuleWeight = 'hair' | 'strong';

interface RuleProps {
  variant?: RuleVariant;
  weight?: RuleWeight;
  className?: string;
  /** aria-hidden defaults to true — decorative in most contexts */
  'aria-hidden'?: boolean;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const weightColors: Record<RuleWeight, string> = {
  hair: 'border-[var(--color-rule)]',
  strong: 'border-[var(--color-rule-strong)]',
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Rule> — 1px hairline divider.
 *
 * horizontal (default): full-width <hr>; height matches the 24px logbook grid.
 * vertical: <div> with explicit height from parent, used in the left-margin marker.
 *
 * Color from --rule token (warm parchment hairline #BDB29C),
 * or --rule-strong (#9C9079) for section dividers above footer.
 *
 * @example
 * <Rule />
 * <Rule weight="strong" />
 * <Rule variant="vertical" className="h-full" />
 */
export function Rule({
  variant = 'horizontal',
  weight = 'hair',
  className,
  'aria-hidden': ariaHidden = true,
}: RuleProps) {
  if (variant === 'vertical') {
    return (
      <div
        aria-hidden={ariaHidden}
        className={cn(
          'w-px border-l',
          weightColors[weight],
          className,
        )}
      />
    );
  }

  return (
    <hr
      aria-hidden={ariaHidden}
      className={cn(
        'border-t',
        weightColors[weight],
        'my-0 w-full',
        className,
      )}
    />
  );
}
