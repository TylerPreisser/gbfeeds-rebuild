'use client';
// src/hooks/useLenis.ts
// Accesses the Lenis instance from <MotionProvider> context (built in 6D.1).
// Returns { lenis: LenisInstance | null, reducedMotion: boolean }.
//
// Phase 6D.1 creates the MotionContext and MotionProvider.
// For now, this hook declares the expected interface and throws a clear error
// if used outside the provider (which doesn't exist yet).

import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

// ─── Context shape ────────────────────────────────────────────────────────────

export interface MotionContextValue {
  /** Lenis smooth-scroll instance — null before provider mounts or on server */
  lenis: InstanceType<typeof Lenis> | null;
  /** Cached prefers-reduced-motion value from the provider */
  reducedMotion: boolean;
}

/**
 * MotionContext — provided by <MotionProvider> (Phase 6D.1).
 * null sentinel means we're outside the provider tree.
 */
export const MotionContext = createContext<MotionContextValue | null>(null);

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Accesses the Lenis smooth-scroll instance and reduced-motion state
 * from the nearest <MotionProvider> ancestor.
 *
 * MUST be used inside <MotionProvider>.
 * Phase 6D.1 implements the provider. This hook is the consumer interface.
 *
 * @throws Error if called outside a <MotionProvider> tree.
 *
 * @example
 * const { lenis, reducedMotion } = useLenis();
 * // Scroll to an element
 * lenis?.scrollTo('#counter');
 */
export function useLenis(): MotionContextValue {
  const ctx = useContext(MotionContext);

  if (ctx === null) {
    throw new Error(
      'useLenis() must be called inside a <MotionProvider>.\n' +
        'Make sure <MotionProvider> wraps your component tree in the root layout.\n' +
        'Phase 6D.1 implements <MotionProvider>.',
    );
  }

  return ctx;
}
