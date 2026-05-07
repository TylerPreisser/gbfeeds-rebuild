// src/components/atomic/Section.tsx
// RSC — no 'use client'. Semantic <section> with consistent vertical rhythm.
// Boundary rule: does NOT import from composite/, page/, motion/, decoration/.

import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

type SectionBg = 'paper' | 'paper-2' | 'paper-3';

interface SectionProps {
  /** Background surface token. Defaults to 'paper' (#EDE7D9). */
  bg?: SectionBg;
  /** Optional id for deep-linking (e.g., id="counter") */
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** aria-label for landmark accessibility */
  'aria-label'?: string;
  /** aria-labelledby pointing to the section heading's id */
  'aria-labelledby'?: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const bgStyles: Record<SectionBg, string> = {
  paper: 'bg-[var(--color-paper)]',
  'paper-2': 'bg-[var(--color-paper-2)]',
  'paper-3': 'bg-[var(--color-paper-3)]',
};

// Vertical rhythm: py-32 large desktop (8rem), py-24 tablet (6rem), py-20 mobile (5rem)
const baseStyles = 'py-20 sm:py-24 lg:py-32';

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Section> — semantic <section> with GB Feeds vertical rhythm.
 *
 * Desktop: py-24 (6rem). Mobile: py-16 (4rem).
 * Background defaults to paper (#EDE7D9); alternating sections use paper-2 / paper-3.
 *
 * @example
 * <Section bg="paper-2" aria-labelledby="pillars-heading">
 *   <Heading as="h2" id="pillars-heading">THE GB FEEDS DIFFERENCE</Heading>
 * </Section>
 */
export function Section({
  bg = 'paper',
  id,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(baseStyles, bgStyles[bg], className)}
    >
      {children}
    </section>
  );
}
