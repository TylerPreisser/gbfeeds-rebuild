'use client';
// src/components/motion/SignatureMove.tsx
// ── THE ONLY GSAP + ScrollTrigger IMPORT SITE ──────────────────────────────
// ESLint boundaries rule: GSAP/ScrollTrigger must ONLY appear in this file.
// Any other file importing GSAP will fail the lint gate.
//
// The Kansas-fade signature: oxblood 7,500 counter above + Kansas state
// with customer quotes fading over the state silhouette below.
//
// Desktop: slight parallax via ScrollTrigger.
// Mobile: static, no pin.
// Reduced-motion: static, single quote.
// Boundary: imports motion/ + composite/ + hooks/.

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AntlerInchesCounter } from './AntlerInchesCounter';
import { KansasPhotoFade } from '@/components/composite/KansasPhotoFade';
import { useLenis } from '@/hooks/useLenis';
import type { Harvest } from '@/types/harvests';
import { cn } from '@/lib/cn';

// Register GSAP plugin — ONLY done here
gsap.registerPlugin(ScrollTrigger);

interface SignatureMoveProps {
  total: number;
  asOf: string;
  pins: Harvest[];
  className?: string;
}

/**
 * <SignatureMove> — home-page Kansas-fade signature moment.
 *
 * Layout (vertically centered, bone-paper background):
 *   [Big oxblood 7,500 counter — Bebas Neue, clamp(8rem,12vw,14rem)]
 *   [ANTLER INCHES HARVESTED WITH GB FEEDS — mono stamp]
 *   [Kansas state silhouette — customer quotes fade over outline]
 *
 * Desktop: GSAP ScrollTrigger fade-in on scroll. No pin (keeps natural flow).
 * Mobile: static fallback.
 * Reduced-motion: no cycling, single quote shown.
 */
export function SignatureMove({
  total,
  asOf,
  pins: _pins, // eslint-disable-line @typescript-eslint/no-unused-vars
  className,
}: SignatureMoveProps) {
  const { lenis } = useLenis();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Lenis + ScrollTrigger sync
  useEffect(() => {
    if (!lenis) return;

    function onLenisTick(time: number) {
      lenis?.raf(time * 1000);
    }
    gsap.ticker.add(onLenisTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onLenisTick);
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  // NOTE: The opacity fade-in was removed. The counter's own IntersectionObserver
  // (in AntlerInchesCounter.tsx) drives the entrance animation (0→total tween).
  // Keeping the GSAP ScrollTrigger opacity-0 wrapper caused the IO to never fire
  // under Lenis-managed scroll (Lenis translate3d moves the body, not the viewport,
  // so IO entry events never triggered while the element was opacity:0).
  // Removing the opacity wrapper lets the counter IO fire reliably.

  return (
    <section
      ref={sectionRef}
      id="counter"
      className={cn(
        'relative w-full bg-[var(--color-paper)] overflow-hidden',
        'py-8 sm:py-10 lg:py-12',
        className,
      )}
      aria-label="Antler inches harvested — GB Feeds Kansas signature"
    >
      <div
        ref={innerRef}
        className="flex flex-col items-center gap-6 sm:gap-8 px-4 sm:px-8"
      >
        {/* Big oxblood counter — self-driven via IntersectionObserver one-shot tween */}
        <AntlerInchesCounter
          total={total}
          asOf={asOf}
          showMeta={false}
        />

        {/* Kansas state with crossfading customer quotes over it */}
        <div className="w-full max-w-4xl mx-auto mt-2 sm:mt-3">
          <KansasPhotoFade />
        </div>
      </div>
    </section>
  );
}
