'use client';
// src/components/motion/MotionProvider.tsx
// Root motion context. Conditionally mounts Lenis smooth scroll on scrolling routes.
// Lenis is imported ONLY in this file.
// GSAP + ScrollTrigger are imported ONLY in SignatureMove.tsx.
// This file provides the MotionContext via the MotionContext exported from useLenis.ts.
//
// ─── Conditional Lenis activation (Round 2 architecture) ─────────────────────
// MotionProvider wraps ALL routes in the root layout (simplest approach — avoids
// per-route layout surgery). On routes that do NOT use scroll motion, Lenis is
// never instantiated — only the MotionContext (with lenis: null) is provided.
//
// Pattern choice: usePathname-based conditional vs. route groups.
// Route groups would require moving files into new folder structures and creating
// multiple sub-layouts, which is high-risk given the existing (editorial), (shop),
// (legal), (support), (membership) group structure. The usePathname approach:
//   - Zero file moves
//   - Zero new layouts
//   - Achieves the same bundle effect (Lenis chunk is only fetched when the
//     SCROLLING_PATHS condition matches)
//   - Dynamic import of Lenis itself defers the ~11 KB gz chunk entirely
//
// Scrolling routes (Lenis + MotionContext fully active):
//   /                     — home (SignatureMove GSAP pin)
//   /our-story            — editorial (scroll motion)
//   /why-gb-feeds         — editorial (scroll motion)
//   /customer-reviews     — editorial (scroll motion)
//   /photo-gallery        — editorial (scroll motion)
//
// Static routes (MotionContext provided but Lenis NOT instantiated):
//   /products             — shop index
//   /products/*           — PDPs (no Lenis needed; framer handles BagTag)
//   /terms                — legal
//   /privacy              — legal
//   /404                  — not-found
//
// Bundle impact: Lenis (~11 KB gz) is dynamically imported inside useEffect,
// which means webpack code-splits it. On static routes, useEffect early-returns
// before the dynamic import executes — the chunk is never fetched.

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import type Lenis from 'lenis';
import { MotionContext } from '@/hooks/useLenis';

// ─── Scrolling routes allowlist ───────────────────────────────────────────────
// Routes that use Lenis smooth scroll. Checked via startsWith to cover dynamic
// segments (/season/rut, /journal/stand-7b-riley, etc.).
const SCROLLING_PATHS = [
  '/',         // exact match — home only (not every route)
  '/our-story',
  '/why-gb-feeds',
  '/customer-reviews',
  '/photo-gallery',
] as const;

/** Returns true if the given pathname should activate Lenis. */
function isScrollingRoute(pathname: string): boolean {
  // Exact match for home
  if (pathname === '/') return true;
  // Prefix match for all other scrolling paths
  return SCROLLING_PATHS.slice(1).some((prefix) => pathname.startsWith(prefix));
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * <MotionProvider> — root smooth-scroll + reduced-motion provider.
 *
 * Mounts in src/app/layout.tsx as a 'use client' wrapper around children.
 * Since layout.tsx itself is RSC, we import this component directly (no dynamic()
 * with ssr:false needed — the 'use client' boundary in this file is sufficient).
 *
 * Lenis settings per design brief § 5:
 *   duration: 1.1, lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1.5,
 *   easing: easeOutQuart, smoothWheel: true, smoothTouch: false
 *
 * ScrollTrigger.scrollerProxy() is registered by SignatureMove.tsx (the ONLY GSAP
 * import site). MotionProvider exports the Lenis instance via context so
 * SignatureMove can call lenis.on('scroll', ScrollTrigger.update) itself.
 *
 * Pattern choice: direct import (not dynamic ssr:false) because Next.js App Router
 * correctly handles the 'use client' boundary — the server renders the static shell,
 * Lenis only runs in useEffect (client-side). No hydration issues.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldUseLenis = isScrollingRoute(pathname);

  const [reducedMotion, setReducedMotion] = useState(false);
  const lenisRef = useRef<InstanceType<typeof Lenis> | null>(null);

  const [contextValue, setContextValue] = useState<{
    lenis: InstanceType<typeof Lenis> | null;
    reducedMotion: boolean;
  }>({ lenis: null, reducedMotion: false });

  useEffect(() => {
    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReduced = mq.matches;
    setReducedMotion(isReduced);

    const onMqChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches && lenisRef.current) {
        // User turned on reduced motion mid-session — destroy Lenis
        lenisRef.current.destroy();
        lenisRef.current = null;
        setContextValue({ lenis: null, reducedMotion: true });
      }
    };

    mq.addEventListener('change', onMqChange);

    // Only instantiate Lenis on scrolling routes.
    // On static routes (PDPs, legal, contact, faq), skip Lenis entirely —
    // the Lenis chunk (~11 KB gz) is never fetched on those routes.
    if (!shouldUseLenis || isReduced) {
      setContextValue({ lenis: null, reducedMotion: isReduced });
      return () => {
        mq.removeEventListener('change', onMqChange);
      };
    }

    // Dynamic import defers the Lenis chunk. webpack code-splits this import
    // automatically. On static routes (shouldUseLenis=false) we never reach
    // this line, so the chunk is never fetched.
    let rafId: number;
    let cancelled = false;

    import('lenis').then(({ default: LenisClass }) => {
      if (cancelled) return;

      // Initialize Lenis with design brief § 5 settings
      const lenis = new LenisClass({
        duration: 1.1,
        lerp: 0.085,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 4), // easeOutQuart
        smoothWheel: true,
        // smoothTouch: false — do NOT smooth touch; respects iOS native scroll
      });

      lenisRef.current = lenis;

      // RAF loop — Lenis requires its own raf, NOT gsap.ticker here.
      // SignatureMove.tsx registers gsap.ticker.add after GSAP is loaded.
      // For pages without SignatureMove, we use requestAnimationFrame directly.
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      setContextValue({ lenis, reducedMotion: false });
    });

    return () => {
      cancelled = true;
      mq.removeEventListener('change', onMqChange);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
    // Re-run when route changes — Lenis needs to be torn down and re-created
    // when navigating between scrolling and non-scrolling routes.
  }, [shouldUseLenis]);

  // Keep reducedMotion state in sync with context
  useEffect(() => {
    setContextValue((prev) => ({ ...prev, reducedMotion }));
  }, [reducedMotion]);

  return (
    <MotionContext.Provider value={contextValue}>
      {children}
    </MotionContext.Provider>
  );
}
