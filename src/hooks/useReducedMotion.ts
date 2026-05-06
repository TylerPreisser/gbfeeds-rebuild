'use client';
// src/hooks/useReducedMotion.ts
// Returns true if user has prefers-reduced-motion: reduce set.
// SSR-safe: returns false on server (no window). React re-renders when media query changes.

import { useEffect, useState } from 'react';

/**
 * Returns whether the user prefers reduced motion.
 *
 * Server renders as false (no window) — client hydrates to the real value.
 * Subscribes to media query changes so if the user toggles their OS setting
 * during a session, the value updates without a page reload.
 *
 * @example
 * const reducedMotion = useReducedMotion();
 * // In SignatureMove: skip GSAP tween and show final value instantly
 * if (reducedMotion) { setCount(totalInches); return; }
 */
export function useReducedMotion(): boolean {
  // SSR-safe initial state: false (no window on server)
  const [prefersReduced, setPrefersReduced] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value from the current OS setting
    setPrefersReduced(mediaQuery.matches);

    // Subscribe to changes (user toggles accessibility setting mid-session)
    const handler = (event: MediaQueryListEvent): void => {
      setPrefersReduced(event.matches);
    };

    // Use addEventListener with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // Safari < 14 fallback
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  return prefersReduced;
}
