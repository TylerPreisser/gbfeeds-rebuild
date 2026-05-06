// src/components/atomic/Text.tsx
// RSC — no 'use client'. Polymorphic body text using DM Serif Display face.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type TextVariant = 'body-md' | 'body-lg' | 'body-sm' | 'mono-xs';
type TextElement = 'p' | 'span' | 'div';

interface TextProps {
  /** Render target element. Defaults to 'p'. */
  as?: TextElement;
  /** Typography variant. Defaults to 'body-md'. */
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const variantStyles: Record<TextVariant, string> = {
  /** body-md: 16→18px, DM Serif Display, leading 1.4 — primary body copy */
  'body-md': 'font-body text-body-md leading-[1.4] text-[var(--color-ink)]',
  /** body-lg: 20→24px, DM Serif Display — lede / hero paragraphs */
  'body-lg': 'font-body text-body-lg leading-[1.4] text-[var(--color-ink)]',
  /** body-sm: 14→16px, DM Serif Display — captions, FAQ answers, fine print */
  'body-sm': 'font-body text-body-sm leading-[1.5] text-[var(--color-ink-muted)]',
  /**
   * mono-xs: 11→12px, JetBrains Mono, 0.04em tracking (letterpressed feel)
   * Used for: date/county/wind stamps, SKU codes, lot stamps, fine print footer.
   */
  'mono-xs':
    'font-mono text-mono-xs leading-[1.2] tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]',
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Text> — polymorphic body text primitive.
 *
 * Uses DM Serif Display for body variants; JetBrains Mono for mono-xs.
 *
 * @example
 * <Text>A deer feed company founded for hunters, by hunters.</Text>
 * <Text variant="body-lg">Hero lede paragraph.</Text>
 * <Text variant="mono-xs">RILEY COUNTY / OCT 08 2024</Text>
 * <Text as="span" variant="body-sm">Fine print caption.</Text>
 */
export function Text({ as: Tag = 'p', variant = 'body-md', className, children }: TextProps) {
  return (
    <Tag className={cn(variantStyles[variant], className)}>
      {children}
    </Tag>
  );
}
