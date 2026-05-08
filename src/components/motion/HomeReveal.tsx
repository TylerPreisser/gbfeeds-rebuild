'use client';
// src/components/motion/HomeReveal.tsx
// Scroll-triggered fade-up reveal for home page sections.
// Uses IntersectionObserver (no GSAP dependency) so it doesn't conflict with
// the existing Lenis + ScrollTrigger setup in SignatureMove.tsx.
//
// Each wrapped section starts invisible (opacity:0, translateY:30px) and
// transitions to visible when it enters the viewport.
//
// - Respects prefers-reduced-motion: skips the animation, renders visible immediately.
// - Uses CSS transitions (transform + opacity only — no layout-triggering props).
// - Adds will-change: transform,opacity only while animating, removes after done.
// - Works on all viewports (mobile and desktop both benefit from the reveal).
// - Children can opt-in to stagger via the `stagger` prop (CSS delay on nth-child).

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface HomeRevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Delay before the transition starts (ms). Useful for staggering sibling reveals.
   * Default: 0.
   */
  delay?: number;
  /**
   * How far into the viewport the element must scroll before revealing (0–1).
   * Default: 0.12 (starts revealing as soon as 12% of the element is visible).
   */
  threshold?: number;
}

/**
 * <HomeReveal> — wraps a home page section or block and fades it up when
 * it enters the viewport.
 *
 * Usage:
 *   <HomeReveal>
 *     <section ...>...</section>
 *   </HomeReveal>
 *
 * For staggered children, wrap each child individually with increasing delay:
 *   <HomeReveal delay={0}>   <Card /> </HomeReveal>
 *   <HomeReveal delay={100}> <Card /> </HomeReveal>
 *   <HomeReveal delay={200}> <Card /> </HomeReveal>
 */
export function HomeReveal({
  children,
  className,
  delay = 0,
  threshold = 0.12,
}: HomeRevealProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    // Reduced-motion: skip entirely — element is immediately visible
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !fired.current) {
          fired.current = true;
          obs.disconnect();
          // Mark as animating to apply will-change for GPU layer
          setAnimating(true);
          setVisible(true);
        }
      },
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion, threshold]);

  // Remove will-change after the transition completes (600ms + delay + buffer)
  useEffect(() => {
    if (!animating) return;
    const id = setTimeout(() => setAnimating(false), 700 + delay);
    return () => clearTimeout(id);
  }, [animating, delay]);

  // SSR: render as visible so non-JS users and crawlers see content immediately.
  // The 'use client' boundary means we only run JS after hydration.
  // Before hydration the element is visible; the IO sets the initial state.
  // We apply the hidden state only after mount via the `mounted` pattern below.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const shouldHide = mounted && !reducedMotion && !visible;

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        // Only apply transform/opacity if mounted (avoids FOUC on SSR)
        opacity: shouldHide ? 0 : 1,
        transform: shouldHide ? 'translateY(30px)' : 'translateY(0)',
        transition: shouldHide
          ? 'none'
          : `opacity 0.75s ease-out ${delay}ms, transform 0.75s ease-out ${delay}ms`,
        // will-change only while transitioning — GPU compositing layer
        // iOS Safari fix: forces compositing layer for smooth transform animation
        willChange: animating ? 'transform, opacity' : 'auto',
      }}
    >
      {children}
    </div>
  );
}
