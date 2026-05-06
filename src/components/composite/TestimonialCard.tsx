// src/components/composite/TestimonialCard.tsx
// RSC — no 'use client'.
// DM Serif Display italic quote + JetBrains Mono attribution.
// Boundary: imports only atomic/ + types/.

import type { Testimonial } from '@/types/product';
import { Stamp } from '@/components/atomic/Stamp';
import { cn } from '@/lib/cn';

type TestimonialVariant = 'default' | 'pull';

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: TestimonialVariant;
  className?: string;
}

/**
 * <TestimonialCard> — verbatim customer testimonial.
 * 'default': bordered card with quote + attribution.
 * 'pull': large pull-quote treatment, no border, accent left border.
 * No avatar. No invented last name. Minimalism is the authenticity signal.
 */
export function TestimonialCard({
  testimonial,
  variant = 'default',
  className,
}: TestimonialCardProps) {
  const isPull = variant === 'pull';

  return (
    <figure
      className={cn(
        'flex flex-col gap-3',
        isPull
          ? 'border-l-2 border-[var(--color-accent)] pl-5 py-1'
          : 'border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-5',
        className,
      )}
    >
      {/* Quote mark */}
      <span
        className={cn(
          'font-body text-[var(--color-ink-quiet)] leading-none select-none',
          isPull ? 'text-display-md' : 'text-display-sm',
        )}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote body — DM Serif Display italic */}
      <blockquote>
        <p
          className={cn(
            'font-body italic text-[var(--color-ink-muted)]',
            isPull ? 'text-body-lg leading-[1.2]' : 'text-body-md leading-[1.4]',
          )}
        >
          {testimonial.quote}
        </p>
      </blockquote>

      {/* Attribution — JetBrains Mono */}
      <figcaption className="flex items-center gap-2 mt-1">
        <span
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
        >
          — {testimonial.attribution}
        </span>
        {testimonial.productMentioned && (
          <Stamp
            value={
              testimonial.productMentioned === 'buck-chow' ? 'Buck Chow' : 'Corn Candy'
            }
          />
        )}
        {testimonial.date && (
          <Stamp variant="date" value={testimonial.date} />
        )}
      </figcaption>

      {/* Hairline rule */}
      {!isPull && (
        <hr className="border-t border-[var(--color-rule)] mt-1" aria-hidden="true" />
      )}
    </figure>
  );
}
