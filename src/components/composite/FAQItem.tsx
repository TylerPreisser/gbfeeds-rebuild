'use client';
// src/components/composite/FAQItem.tsx
// 'use client' — disclosure toggle state.
// Bebas Neue uppercase question; DM Serif Display answer.
// Uses <details>/<summary> for accessibility (native disclosure semantics).
// Boundary: imports only atomic/ + types/.

import { cn } from '@/lib/cn';
import type { FAQ } from '@/types/product';

interface FAQItemProps {
  faq: FAQ;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * <FAQItem> — accordion disclosure.
 * Native <details>/<summary> provides SR accessibility for free.
 * Hairline 24px rule below each item.
 * CSS-only animation: the rule slides right-to-left as answer reveals.
 */
export function FAQItem({ faq, defaultOpen = false, className }: FAQItemProps) {
  return (
    <details
      open={defaultOpen}
      className={cn('group border-b border-[var(--color-rule)] py-4', className)}
    >
      {/* Question — Bebas Neue uppercase */}
      {/* Native <details>/<summary> manages open/closed state natively for AT.
          Do NOT add aria-expanded — a static "false" overrides browser semantics
          and permanently announces the item as collapsed even when open. */}
      <summary
        className="flex items-center justify-between cursor-pointer list-none
          font-display uppercase tracking-[0.02em] text-display-sm text-[var(--color-ink)]
          hover:text-[var(--color-accent)] transition-colors duration-200
          [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        <span>{faq.question}</span>
        {/* Chevron icon — rotates on open */}
        <span
          className="ml-4 shrink-0 text-[var(--color-ink-quiet)] transition-transform duration-200
            group-open:rotate-180"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </summary>

      {/* Answer — DM Serif Display */}
      <div className="pt-3 pb-1">
        <p
          className="font-body text-body-md text-[var(--color-ink-muted)] leading-[1.4]
            max-w-2xl"
        >
          {faq.answer}
        </p>
        {/* Sliding hairline that draws on as the answer reveals */}
        <div
          className="mt-3 h-px bg-[var(--color-rule)] origin-left
            scale-x-0 group-open:scale-x-100
            transition-transform duration-300 ease-out"
          aria-hidden="true"
        />
      </div>
    </details>
  );
}
