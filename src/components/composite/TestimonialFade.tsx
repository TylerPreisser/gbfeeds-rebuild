'use client';
// src/components/composite/TestimonialFade.tsx
// Crossfading text-testimonial overlay paired with the Kansas photo fade.
// Reads from testimonials.ts (22 verbatim entries from CONTENT_INVENTORY).
// Cycles through 6-8 strong quotes, each on screen for ~3.5s with a 1s crossfade.
// Reduced-motion: shows testimonial[0] statically, no rotation.

import { useState, useEffect } from 'react';
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
const FADE_MS = 1000;

interface TestimonialFadeProps {
  className?: string;
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
export function TestimonialFade({ className }: TestimonialFadeProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_TESTIMONIALS.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  if (FEATURED_TESTIMONIALS.length === 0) return null;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '48rem',
        margin: '0 auto',
        height: 'clamp(140px, 16vh, 172px)',
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {FEATURED_TESTIMONIALS.map((t, i) => {
        const isActive = i === activeIndex;
        const slideOffset = isActive ? '0' : '12px';
        return (
          <figure
            key={t.id}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            style={{
              opacity: isActive ? 1 : 0,
              transform: `translateY(${slideOffset})`,
              transition: `opacity ${FADE_MS}ms ease-in-out, transform ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              pointerEvents: isActive ? 'auto' : 'none',
            }}
            aria-hidden={!isActive}
          >
            <blockquote
              className="font-body italic text-body-md sm:text-body-lg text-[var(--color-ink)] leading-[1.45] max-w-2xl"
              style={{ textWrap: 'balance' as const }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption
              className="mt-3 font-mono text-mono-xs tracking-[0.08em] uppercase text-[var(--color-ink-quiet)]"
            >
              — {t.attribution}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
