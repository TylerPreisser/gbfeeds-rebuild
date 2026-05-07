'use client';
// src/components/motion/SignatureMove.tsx
// ── THE ONLY GSAP + ScrollTrigger IMPORT SITE ──────────────────────────────
// ESLint boundaries rule: GSAP/ScrollTrigger must ONLY appear in this file.
// Any other file importing GSAP will fail the lint gate.
//
// The Kansas-fade signature: oxblood 7,500 counter above + Kansas state
// with customer photos crossfading INSIDE the state silhouette below.
//
// Desktop: slight parallax via ScrollTrigger.
// Mobile: static, no pin.
// Reduced-motion: static, single photo.
// Boundary: imports motion/ + composite/ + hooks/.

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AntlerInchesCounter } from './AntlerInchesCounter';
import { KansasPhotoFade } from '@/components/composite/KansasPhotoFade';
import { useReducedMotion } from '@/hooks/useReducedMotion';
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
 *   [Kansas state silhouette — customer photos fade inside outline]
 *
 * Desktop: GSAP ScrollTrigger fade-in on scroll. No pin (keeps natural flow).
 * Mobile: static fallback.
 * Reduced-motion: no cycling, single photo shown.
 */
export function SignatureMove({
  total,
  asOf,
  pins: _pins, // eslint-disable-line @typescript-eslint/no-unused-vars
  className,
}: SignatureMoveProps) {
  const reducedMotion = useReducedMotion();
  const { lenis } = useLenis();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        'py-20 sm:py-24 lg:py-32',
        className,
      )}
      aria-label="Antler inches harvested — GB Feeds Kansas signature"
    >
      <div
        ref={innerRef}
        className="flex flex-col items-center gap-8 px-4 sm:px-8"
      >
        {/* Big oxblood counter — self-driven via IntersectionObserver one-shot tween */}
        <AntlerInchesCounter
          total={total}
          asOf={asOf}
        />

        {/* Kansas state with crossfading customer photos inside */}
        <div className="w-full max-w-3xl mx-auto">
          <KansasPhotoFade />
        </div>

        {/* Mono subtext below */}
        <p
          className="font-mono text-mono-xs tracking-[0.06em] uppercase text-[var(--color-ink-quiet)] text-center"
          aria-label="Over 7,500 antler inches harvested by Kansas hunters using GB Feeds"
        >
          Antler inches harvested by GB Feeds customers · Kansas-made since 2017
        </p>
      </div>
    </section>
  );
}
