// src/components/atomic/Container.tsx
// RSC — no 'use client'. Max-width constrained centered wrapper.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type ContainerVariant = 'default' | 'narrow' | 'wide';

interface ContainerProps {
  variant?: ContainerVariant;
  className?: string;
  children: React.ReactNode;
  /** Optional element override — defaults to <div> */
  as?: React.ElementType;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const variantStyles: Record<ContainerVariant, string> = {
  /** default: max-w-7xl — main content width for all standard pages */
  default: 'max-w-7xl',
  /** narrow: max-w-3xl — editorial / founder-narrative / journal article body */
  narrow: 'max-w-3xl',
  /** wide: max-w-screen-2xl — products grid, photo gallery, map section */
  wide: 'max-w-screen-2xl',
};

const baseStyles =
  'mx-auto w-full px-[clamp(1rem,4vw,2.5rem)]';

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Container> — max-width constrained, fluid-padding centered wrapper.
 *
 * Variants:
 * - default (max-w-7xl)      — standard page content
 * - narrow  (max-w-3xl)      — editorial, founder narrative, journal article
 * - wide    (max-w-screen-2xl) — product grids, photo galleries, map sections
 *
 * @example
 * <Container>...</Container>
 * <Container variant="narrow">
 *   <p>Founder narrative copy</p>
 * </Container>
 */
export function Container({ variant = 'default', className, children, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
