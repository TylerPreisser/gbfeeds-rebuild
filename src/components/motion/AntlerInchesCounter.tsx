'use client';
// src/components/motion/AntlerInchesCounter.tsx
// Self-driven IntersectionObserver one-shot tween.
// When the element enters the viewport (threshold 0.3), tweens 0→total over 2s.
// No GSAP dependency. No scrollProgress prop needed.
// Reduced-motion: renders total immediately, no animation.
// aria-live="polite" + aria-atomic="true" for screen readers.
// Boundary: imports only atomic/ + hooks/.

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface AntlerInchesCounterProps {
  /** The canonical total antler inches from harvests.json */
  total: number;
  /** AS OF stamp date (harvests.json last_updated) */
  asOf?: string;
  /** scrollProgress — kept for API compatibility but no longer used */
  scrollProgress?: number;
  className?: string;
}

function formatInches(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

/**
 * <AntlerInchesCounter> — the big Bebas counter at the heart of the home page.
 * Drives its own count-up animation via IntersectionObserver + rAF.
 * When the span enters the viewport (threshold 0.3), tweens 0→total over 2s
 * with cubic ease-out. Fires once then disconnects the observer.
 * Reduced-motion: shows total immediately with no animation.
 */
export function AntlerInchesCounter({
  total,
  asOf,
  className,
}: AntlerInchesCounterProps) {
  const reducedMotion = useReducedMotion();
  // SSR + first paint: render the FINAL value so crawlers + non-JS users see
  // the real number AND so the screenshot/initial-paint state isn't a flash of 0.
  // After mount: if motion is allowed AND we haven't animated yet, drop to 0
  // then start the IO-driven tween up. The mid-flight transition uses a single
  // rAF tick so users perceive an "engaging count-up", not a stuttering reset.
  const [displayValue, setDisplayValue] = useState<number>(total);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);
  const hasMounted = useRef(false);

  // When reducedMotion flips true (e.g. system pref change), jump to final value
  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(total);
    }
  }, [reducedMotion, total]);

  // IO-driven one-shot tween. Drops to 0 immediately on mount (in motion mode)
  // so the IO can drive the count-up from a clean start once we scroll into view.
  useEffect(() => {
    if (reducedMotion) return;
    const el = spanRef.current;
    if (!el) return;

    // Reset to 0 only once on first client mount (post-SSR) — this is the
    // moment the user's browser takes over from the server-rendered HTML.
    if (!hasMounted.current) {
      hasMounted.current = true;
      setDisplayValue(0);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          obs.disconnect();

          const duration = 2000; // ms
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            // Cubic ease-out: deceleration feels satisfying for a counter
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplayValue(Math.round(eased * total));
            if (t < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [total, reducedMotion]);

  return (
    <div
      className={cn('flex flex-col items-center gap-4', className)}
      role="img"
      aria-label={`${formatInches(total)} antler inches harvested using GB Feeds products`}
    >
      {/* Giant counter */}
      <div className="flex flex-col items-center gap-0">
        <span
          ref={spanRef}
          className="font-display uppercase leading-[1.0] text-[var(--color-accent)]"
          style={{ fontSize: 'clamp(8rem, 6.4rem + 8vw, 15rem)', letterSpacing: '0em' }}
          aria-live="polite"
          aria-atomic="true"
          aria-label={`${formatInches(displayValue)} antler inches`}
        >
          {formatInches(displayValue)}
        </span>

        {/* INCHES unit */}
        <span
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]"
        >
          Antler Inches Harvested
        </span>
      </div>

      {/* AS OF stamp */}
      {asOf && (
        <span
          className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]
            border border-[var(--color-rule)] px-2 py-0.5"
        >
          As of {asOf}
        </span>
      )}
    </div>
  );
}
