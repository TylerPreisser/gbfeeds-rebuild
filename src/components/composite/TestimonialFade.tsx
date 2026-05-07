'use client';
// src/components/composite/TestimonialFade.tsx
// Directional testimonial overlay for the Kansas signature.
// Important: only one quote is mounted at a time. The current quote exits fully,
// then the next quote mounts and enters, so the texts never overlap.

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { testimonials } from '@/data/testimonials';

// Pick the strongest 8 testimonials — short, punchy, from real first-name customers.
// All verbatim from gbfeeds.com /customer-reviews.
const FEATURED_IDS = [
  'aaron-1',    // "Let me tell you this stuff works! Thanks GB Feeds!"
  'jerry-1',    // "My bucks are loving this feed, antler growth is fantastsic"
  'jon-1',      // "DUDE this stuff is fire!"
  'andy-1',     // "7 hours after putting a bag out, they are showing up non-stop"
  'dylan-1',    // "This tall 8 missing since September, put out Buck Chow and he shows up!"
  'nathan-1',   // "I'm SOLD! Will be buying more, same day results!!!"
  'wayne-1',    // "These deer are loving the Buck Chow"
  'seth-1',     // "Put the camera up at new location at 7:20PM, bucks there at 8:15!"
] as const;

const FEATURED_TESTIMONIALS = FEATURED_IDS
  .map((id) => testimonials.find((t) => t.id === id))
  .filter((t): t is (typeof testimonials)[number] => t !== undefined);

const HOLD_MS = 3500;
const TRANSITION_MS = 1250;

interface TestimonialFadeProps {
  className?: string;
  variant?: 'default' | 'kansas';
}

/**
 * <TestimonialFade> — text testimonials crossfading in sync with photo cycle.
 *
 * Each cycle: one quote + attribution slides up + fades in over 1s,
 * holds for 2.5s, then slides up + fades out over 1s as the next one rises.
 *
 * Layout: a fixed-height block (160px desktop / 220px mobile) with absolute-
 * positioned testimonial cards stacked. Only one is opacity:1 at a time.
 *
 * Use this BELOW the Kansas SVG inside the SignatureMove section to give the
 * "voices from inside Kansas" effect Tyler asked for.
 */
export function TestimonialFade({ className, variant = 'default' }: TestimonialFadeProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'exiting' | 'entering'>('idle');
  const [animationKey, setAnimationKey] = useState(0);
  const exitTimeoutRef = useRef<number | null>(null);
  const enterTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % FEATURED_TESTIMONIALS.length;
        setPhase('exiting');
        setAnimationKey((key) => key + 1);

        if (exitTimeoutRef.current) window.clearTimeout(exitTimeoutRef.current);
        if (enterTimeoutRef.current) window.clearTimeout(enterTimeoutRef.current);

        exitTimeoutRef.current = window.setTimeout(() => {
          setActiveIndex(next);
          setPhase('entering');
          setAnimationKey((key) => key + 1);

          enterTimeoutRef.current = window.setTimeout(() => {
            setPhase('idle');
          }, TRANSITION_MS);
        }, TRANSITION_MS);

        return prev;
      });
    }, HOLD_MS);
    return () => {
      clearInterval(id);
      if (exitTimeoutRef.current) window.clearTimeout(exitTimeoutRef.current);
      if (enterTimeoutRef.current) window.clearTimeout(enterTimeoutRef.current);
    };
  }, [reducedMotion]);

  if (FEATURED_TESTIMONIALS.length === 0) return null;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: variant === 'kansas' ? '56rem' : '48rem',
        margin: '0 auto',
        height: variant === 'kansas'
          ? 'clamp(160px, 18vh, 210px)'
          : 'clamp(140px, 16vh, 172px)',
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <style>{`
        @keyframes kansasQuoteIn {
          0% {
            opacity: 0;
            transform: translate3d(42%, 0, 0) skewX(-2deg) scale(0.965);
            clip-path: inset(0 100% 0 0);
            filter: blur(10px);
          }
          42% {
            opacity: 1;
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) skewX(0deg) scale(1);
            clip-path: inset(0 0 0 0);
            filter: blur(0);
          }
        }
        @keyframes kansasQuoteOut {
          0% {
            opacity: 1;
            transform: translate3d(0, 0, 0) skewX(0deg) scale(1);
            clip-path: inset(0 0 0 0);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translate3d(-46%, 0, 0) skewX(-2deg) scale(0.975);
            clip-path: inset(0 0 0 100%);
            filter: blur(8px);
          }
        }
        .kansas-quote-enter {
          animation: kansasQuoteIn ${TRANSITION_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .kansas-quote-exit {
          animation: kansasQuoteOut ${TRANSITION_MS}ms cubic-bezier(0.7, 0, 0.2, 1) both;
        }
      `}</style>

      {(() => {
        const t = FEATURED_TESTIMONIALS[activeIndex] ?? FEATURED_TESTIMONIALS[0];
        if (!t) return null;
        return (
          <figure
            key={`active-${t.id}-${animationKey}`}
            className={[
              'absolute inset-0 flex flex-col items-center justify-center text-center px-4 will-change-transform',
              phase === 'exiting' && !reducedMotion ? 'kansas-quote-exit' : '',
              phase === 'entering' && !reducedMotion ? 'kansas-quote-enter' : '',
            ].join(' ')}
          >
            <blockquote
              className={[
                'font-body italic text-[var(--color-ink)] leading-[1.35]',
                variant === 'kansas'
                  ? 'text-[clamp(1.375rem,1rem+1.6vw,2.75rem)] max-w-4xl'
                  : 'text-body-md sm:text-body-lg max-w-2xl',
              ].join(' ')}
              style={{ textWrap: 'balance' as const }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption
              className="mt-4 font-mono text-mono-xs tracking-[0.08em] uppercase text-[var(--color-ink-quiet)]"
            >
              — {t.attribution}
            </figcaption>
          </figure>
        );
      })()}
    </div>
  );
}
