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

  // Fade-in the section content as it enters the viewport
  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner || reducedMotion || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

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
        style={{ opacity: reducedMotion || isMobile ? 1 : 0 }}
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
