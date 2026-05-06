// src/components/atomic/Link.tsx
// RSC — no 'use client'. Wraps Next.js Link with brand hover-underline pattern.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import NextLink from 'next/link';
import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type LinkVariant = 'inline' | 'nav';

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: LinkVariant;
  className?: string;
  children: React.ReactNode;
  /** Pass prefetch={false} for external or large-target links */
  prefetch?: boolean;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const variantStyles: Record<LinkVariant, string> = {
  /**
   * inline: body link with subtle underline in --rule color always present;
   * hover swaps underline to --accent.
   */
  inline:
    'underline decoration-[var(--color-rule)] underline-offset-2 ' +
    'hover:decoration-[var(--color-accent)] transition-[text-decoration-color] duration-[220ms]',
  /**
   * nav: nav anchor with hidden mono-stamp that slides up 4px with 240ms fade on hover.
   * The stamp itself is a child element appended by NavBar composite.
   * At the Link level, we just supply the hover trigger class.
   */
  nav:
    'relative font-display uppercase tracking-[0.02em] text-body-sm ' +
    'text-[var(--color-ink)] no-underline group',
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Link> — Next.js Link wrapper with GB Feeds brand hover-underline pattern.
 *
 * variant="inline" — body copy link, subtle underline always-on, accent on hover.
 * variant="nav"    — nav anchor with `group` class for stamp slide-up animation
 *                    (the stamp element itself lives in <NavBar>).
 *
 * @example
 * <Link href="/our-story" variant="inline">Read Greg's Story</Link>
 * <Link href="/products" variant="nav">Shop</Link>
 */
export function Link({ href, variant = 'inline', className, children, prefetch, ...rest }: LinkProps) {
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      className={cn(variantStyles[variant], className)}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
