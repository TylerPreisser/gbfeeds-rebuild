'use client';
// src/hooks/useScrollProgress.ts
// Returns scroll progress 0–1 for a given target ref.
// Implemented with raw RAF + getBoundingClientRect — no framer-motion dependency.
// Dropping the framer-motion import saves ~25 KB gz on PDP (chunk 471).

import { useRef, useState, useEffect, type RefObject } from 'react';

interface ScrollProgressOptions {
  /** Offset behaviour. Default: element enters viewport bottom → exits viewport top. */
  offset?: [string, string];
}

interface ScrollProgressResult {
  /** Attach to the scrollable element you want to track. */
  ref: RefObject<HTMLDivElement | null>;
  /**
   * Plain number 0–1. 0 = top of element at viewport bottom.
   * 1 = bottom of element at viewport top.
   * Replaces the former MotionValue — consumers must read via React state,
   * not style={{ opacity: scrollYProgress }} (which required MotionValue).
   * BagTagTriptych passes this as a plain prop; AntlerInchesCounter receives it.
   */
  scrollYProgress: number;
  /** Identity alias — same value. Kept for API compatibility. */
  progress: number;
}

/**
 * Hook that returns a ref and a 0–1 scroll progress number
 * for the element attached to that ref.
 *
 * Replaces the former framer-motion useScroll/useTransform implementation
 * to eliminate the ~25 KB gz framer-motion chunk from PDP routes.
 *
 * @example
 * const { ref, scrollYProgress } = useScrollProgress();
 * // Pass scrollYProgress as a plain number prop to child components.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useScrollProgress(_options?: ScrollProgressOptions): ScrollProgressResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    function update() {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const elH = rect.height;

      // progress = 0 when el top === vh (entering from bottom)
      // progress = 1 when el bottom === 0 (exiting at top)
      const total = vh + elH;
      const done = vh - rect.top;
      const raw = Math.min(Math.max(done / total, 0), 1);

      setProgress(raw);
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // initial calculation

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { ref, scrollYProgress: progress, progress };
}
