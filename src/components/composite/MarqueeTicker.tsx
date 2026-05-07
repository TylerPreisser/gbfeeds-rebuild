'use client';
// src/components/composite/MarqueeTicker.tsx
// 'use client' — needed for client-side aria-live after first scroll.
// CSS-only marquee animation. Pause on hover.
// Reduced-motion: static row, no animation.
// Boundary: imports only composite/TestimonialCard + types/.

import type { Testimonial } from '@/types/product';
import { cn } from '@/lib/cn';
import { withBasePath } from '@/lib/basePath';

interface MarqueeTickerProps {
  testimonials: Testimonial[];
  className?: string;
}

/**
 * <MarqueeTicker> — continuous left-scrolling testimonial strip.
 * Pure CSS @keyframes translateX. Paused on hover.
 * Reduced-motion: static stacked column with first 3 testimonials + "View all" link.
 * Screen readers: first cycle is aria-live="polite", then aria-hidden.
 */
export function MarqueeTicker({ testimonials, className }: MarqueeTickerProps) {
  // Duplicate the testimonials so the marquee loops seamlessly
  const doubled = [...testimonials, ...testimonials];

  return (
    <div
      className={cn('w-full overflow-hidden relative', className)}
      aria-label="Customer testimonials"
    >
      {/* Reduced-motion: static column */}
      <div className="motion-reduce:block hidden">
        <div className="flex flex-col gap-4 max-w-2xl mx-auto py-6">
          {testimonials.slice(0, 3).map((t) => (
            <blockquote
              key={t.id}
              className="font-body italic text-body-md text-[var(--color-ink-muted)] leading-[1.4]"
            >
              <p>&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-1 font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                — {t.attribution}
              </footer>
            </blockquote>
          ))}
          <a
            href={withBasePath('/customer-reviews/')}
            className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-accent)]
              hover:text-[var(--color-accent-2)] transition-colors duration-200"
          >
            View All Reviews →
          </a>
        </div>
      </div>

      {/* Animated marquee — hidden when prefers-reduced-motion */}
      <div
        className="motion-reduce:hidden"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="marquee-track flex gap-12 w-max">
          {doubled.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="shrink-0 max-w-[320px] flex flex-col gap-2 py-4"
              aria-hidden={i >= testimonials.length ? 'true' : undefined}
            >
              {/* CB-radio transmission style */}
              <div className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                {t.date ?? '––'} · {t.attribution}
              </div>
              <p className="font-body italic text-body-sm text-[var(--color-ink-muted)] leading-[1.2]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee CSS */}
      <style>{`
        .marquee-track {
          animation: marqueeTick 60s linear infinite;
        }
        .marquee-track:hover,
        .marquee-track:focus-within {
          animation-play-state: paused;
        }
        @keyframes marqueeTick {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
