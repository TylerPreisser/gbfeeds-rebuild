// src/components/atomic/Button.tsx
// RSC — no 'use client'. Hover underline is CSS-only (220ms, no JS).
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ──────────────────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'disabled';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

// When as="button"
type ButtonAsButtonProps = ButtonBaseProps & { as?: 'button' } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonBaseProps
  >;

// When as="a"
type ButtonAsAnchorProps = ButtonBaseProps & { as: 'a' } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonBaseProps
  >;

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

// ─── Styles ──────────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-ink)] text-[var(--color-paper)] border border-[var(--color-ink)] ' +
    'hover:bg-[var(--color-gray-900)]',
  secondary:
    'bg-transparent text-[var(--color-ink)] border border-[var(--color-ink)] ' +
    'hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]',
  ghost:
    'bg-transparent text-[var(--color-ink)] border border-transparent ' +
    'hover:border-[var(--color-rule)]',
  disabled:
    'bg-[var(--color-gray-100)] text-[var(--color-ink-quiet)] border border-[var(--color-rule)] ' +
    'cursor-not-allowed select-none',
};

const baseStyles = [
  // Shape — sharp 0px radius per design brief
  'inline-flex items-center justify-center gap-2',
  'rounded-none',
  // Padding: 12px × 35px (design brief spec)
  'px-3 py-[0.21875rem]',
  // Typography — Bebas Neue uppercase
  'font-display uppercase tracking-[0.02em] text-body-sm leading-none',
  // Transition for bg/color
  'transition-colors duration-200',
  // Underline animation layer (CSS-only, 220ms easeOutQuint)
  'relative overflow-hidden',
  // Underline pseudo-element via CSS class
  'btn-underline',
].join(' ');

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Button> — polymorphic button / anchor.
 * CSS-only hover underline: 1px accent-colored line animates 0%→100% in 220ms.
 * Disabled variant shows phone-fallback copy when used as a SKU placeholder.
 *
 * @example
 * <Button variant="primary">Shop Buck Chow</Button>
 * <Button as="a" href="/products" variant="secondary">Browse All Products</Button>
 * <Button variant="disabled">CALL (620) 639-3337 TO ORDER</Button>
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, as, ...rest } = props;

  const classes = cn(baseStyles, variantStyles[variant], className);

  if (as === 'a') {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={classes}
      disabled={variant === 'disabled' || buttonProps.disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

/**
 * <ButtonAsLink> — convenience wrapper that always renders as <a>.
 * Use for navigation CTAs where semantic anchor is required.
 */
export function ButtonAsLink({
  href,
  variant = 'primary',
  className,
  children,
  ...rest
}: Omit<ButtonAsAnchorProps, 'as'> & { href: string }) {
  return (
    <Button as="a" href={href} variant={variant} className={className} {...rest}>
      {children}
    </Button>
  );
}
