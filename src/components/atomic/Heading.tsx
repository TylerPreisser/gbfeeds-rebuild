// src/components/atomic/Heading.tsx
// RSC — no 'use client'. Polymorphic heading using Bebas Neue display face.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

type HeadingSize =
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  | 'counter';

interface HeadingProps {
  /** HTML element to render */
  as?: HeadingLevel;
  /** Type-scale token. Defaults to size appropriate for the `as` level. */
  size?: HeadingSize;
  /** Optional id for aria-labelledby pairing */
  id?: string;
  className?: string;
  children: React.ReactNode;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

/**
 * Default size per heading level — matches design brief type hierarchy.
 * Overridable via the `size` prop when you need an h3 at display-lg scale.
 */
const defaultSizes: Record<HeadingLevel, HeadingSize> = {
  h1: 'display-lg',
  h2: 'display-md',
  h3: 'display-sm',
  h4: 'display-sm',
};

/**
 * Tailwind type-scale utilities that map to Tailwind v4 @theme tokens.
 * These utility names are generated from --text-* tokens in tokens.css.
 */
const sizeStyles: Record<HeadingSize, string> = {
  'display-xl': 'text-display-xl leading-[1.0]',
  'display-lg': 'text-display-lg leading-[1.0]',
  'display-md': 'text-display-md leading-[1.0]',
  'display-sm': 'text-display-sm leading-[1.05]',
  counter: 'text-counter leading-[1.0] tracking-[0em]', // at counter scale, no tracking
};

// Base: Bebas Neue, uppercase, 0.02em tracking per design brief
const baseStyles = 'font-display uppercase tracking-[0.02em] text-[var(--color-ink)]';

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Heading> — polymorphic heading component.
 *
 * Always renders in Bebas Neue (--font-display), uppercase, 0.02em tracking.
 * The `as` prop controls the semantic HTML element (h1–h4).
 * The `size` prop controls the type scale — overrides the default for that level.
 *
 * @example
 * <Heading as="h1">A SMALL BATCH DEER FEED COMPANY</Heading>
 * <Heading as="h2" size="display-sm">THE GB FEEDS DIFFERENCE</Heading>
 * <Heading as="h1" size="counter">7,500</Heading>
 */
export function Heading({ as: Tag = 'h2', size, id, className, children }: HeadingProps) {
  const resolvedSize = size ?? defaultSizes[Tag];
  return (
    <Tag id={id} className={cn(baseStyles, sizeStyles[resolvedSize], className)}>
      {children}
    </Tag>
  );
}
