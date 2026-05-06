'use client';
// src/components/motion/SignatureMove.tsx
// ── THE ONLY GSAP + ScrollTrigger IMPORT SITE ──────────────────────────────
// ESLint boundaries rule: GSAP/ScrollTrigger must ONLY appear in this file.
// Any other file importing GSAP will fail the lint gate.
//
// Composes: <AntlerInchesCounter> + <KansasMap> + trail-cam cross-fade.
// Pin via ScrollTrigger: 3 viewport heights of scroll buffer.
// Mobile (< 768px): static fallback, no pin. iOS Safari: detected, bailout.
// Reduced-motion: static final state from first paint.
// Boundary: imports motion/ + composite/ + hooks/.

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AntlerInchesCounter } from './AntlerInchesCounter';
import { KansasMap } from '@/components/composite/KansasMap';
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
  /** Path to the trail-cam plate (cross-fades grayscale → color) */
  trailCamSrc?: string;
  className?: string;
}

/**
 * <SignatureMove> — the home-page scroll-pinned signature moment.
 *
 * Desktop: 3 viewport heights of scroll (≈ 30 seconds at typical wheel speed).
 *   - Counter ticks 0 → total_inches
 *   - Trail-cam image cross-fades grayscale(1) → grayscale(0)
 *   - Kansas map pins drop sequentially
 *
 * Mobile (< 768px): static fallback with IntersectionObserver pin drops.
 * iOS Safari: detected via CSS.supports('-webkit-touch-callout', 'none') — bailout.
 * Reduced-motion: all elements at final state from first paint.
 *
 * Lenis sync: when Lenis is active, we register a scroll listener that calls
 * ScrollTrigger.update() on each scroll event (required for Lenis + ScrollTrigger).
 * We also hand the gsap.ticker off to Lenis raf to avoid double RAF.
 */
export function SignatureMove({
  total,
  asOf,
  pins,
  trailCamSrc = '/photos/lifestyle/lifestyle-img-3622-640w.webp',
  className,
}: SignatureMoveProps) {
  const reducedMotion = useReducedMotion();
  const { lenis } = useLenis();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(reducedMotion ? 1 : 0);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOSSafari, setIsIOSSafari] = useState(false);

  // Detect mobile + iOS Safari (CSS.supports detection)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // iOS Safari detection: CSS.supports('-webkit-touch-callout', 'none')
    if (typeof CSS !== 'undefined' && CSS.supports('-webkit-touch-callout', 'none')) {
      setIsIOSSafari(true);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lenis + ScrollTrigger sync
  useEffect(() => {
    if (!lenis) return;

    // Hand GSAP ticker to Lenis raf — prevents double RAF loop
    function onLenisTick(time: number) {
      lenis?.raf(time * 1000);
    }
    gsap.ticker.add(onLenisTick);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onLenisTick);
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  // Mount GSAP ScrollTrigger pin + timeline
  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || reducedMotion || isMobile || isIOSSafari) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=3000',
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // Trail-cam cross-fade: grayscale(1) → grayscale(0)
      if (image) {
        tl.fromTo(
          image,
          { filter: 'grayscale(1) brightness(0.8)' },
          { filter: 'grayscale(0) brightness(1)', ease: 'none' },
          0,
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, isMobile, isIOSSafari]);

  // Static fallback: show final state for reduced-motion, mobile, iOS Safari
  const showStatic = reducedMotion || isMobile || isIOSSafari;

  return (
    <section
      ref={sectionRef}
      id="counter"
      className={cn(
        'relative w-full bg-[var(--color-paper)] overflow-hidden',
        // min-h-[100svh]: small viewport height accounts for iOS Safari chrome
        // min-h-[70svh]: static fallback uses svh for same iOS compatibility
        showStatic ? 'min-h-[70svh]' : 'min-h-[100svh]',
        className,
      )}
      aria-label="Antler inches harvested — GB Feeds counter"
    >
      {/* Trail-cam background plate — <picture> with AVIF/WebP sources.
          imageRef attaches to the inner <img> so GSAP can animate the filter
          directly on the element that receives the CSS property. */}
      <picture className="absolute inset-0 w-full h-full">
        {/* AVIF variant — same path with .avif extension */}
        <source
          srcSet={trailCamSrc.replace(/\.webp$/, '.avif')}
          type="image/avif"
        />
        {/* WebP fallback */}
        <source srcSet={trailCamSrc} type="image/webp" />
        <img
          ref={imageRef}
          src={trailCamSrc}
          alt="Kansas trail cam photograph"
          className="w-full h-full object-cover"
          style={{
            // Static: full color. Animated: starts grayscale (GSAP overrides).
            filter: showStatic ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.8)',
            opacity: 0.25,
          }}
          loading="lazy"
        />
      </picture>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-[var(--color-paper)] opacity-70" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 min-h-[inherit] px-6 py-16">

        {/* Counter */}
        <AntlerInchesCounter
          total={total}
          scrollProgress={showStatic ? undefined : scrollProgress}
          asOf={asOf}
        />

        {/* Kansas map */}
        <div className="w-full max-w-2xl">
          <KansasMap
            pins={pins}
            scrollProgress={showStatic ? undefined : scrollProgress}
          />
        </div>

        {/* Mobile static stats */}
        {showStatic && pins.length === 0 && (
          <div className="flex gap-8 font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
            <span>{total.toLocaleString('en-US')} Inches</span>
            <span>Kansas-Made</span>
            <span>Since 2017</span>
          </div>
        )}
      </div>
    </section>
  );
}
