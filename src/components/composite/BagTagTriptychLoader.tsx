'use client';
// src/components/composite/BagTagTriptychLoader.tsx
// Thin client boundary for progressive BagTag enhancement.
// Renders <BagTagTriptychStatic> immediately (SSR pass-through via props),
// then replaces it with the animated version after hydration via dynamic(ssr:false).
//
// Why dynamic(ssr:false) here:
//   BagTagTriptych.tsx uses LazyMotion + domAnimation from framer-motion.
//   The framer-motion chunk (~25 KB gz) is eagerly pulled into the PDP bundle
//   because the import exists at the module level. Wrapping with dynamic(ssr:false)
//   defers the chunk to after hydration, removing it from the critical-path
//   bundle that the browser parses before first paint.
//
// Reduced-motion: BagTagTriptych internally checks useReducedMotion() and
//   renders staticVariants (opacity-only, no Y-flip). This component does not
//   need to know about reduced-motion — it always loads the animated version,
//   which self-guards.
//
// Boundary: composite/ may import composite/. This file imports BagTagTriptychStatic
//   (composite/) and dynamically imports BagTagTriptych (composite/).

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { BagTagTriptychStatic } from '@/components/composite/BagTagTriptychStatic';
import type { BagTagStat } from '@/types/product';

// Dynamic import — defers framer-motion chunk off the PDP critical path.
// ssr:false: framer-motion requires browser APIs (matchMedia) that cause
// hydration mismatches when rendered on the server.
// loading: render a hidden placeholder div that matches the static version's
// layout so there is zero CLS when the animated version swaps in.
const BagTagTriptychAnimated = dynamic(
  () =>
    import('@/components/composite/BagTagTriptych').then(
      (m) => m.BagTagTriptych,
    ),
  {
    ssr: false,
    loading: () => <div className="bag-tag-placeholder" aria-hidden="true" />,
  },
);

interface BagTagTriptychLoaderProps {
  stats: [BagTagStat, BagTagStat, BagTagStat];
  lotStamp?: string;
  className?: string;
}

/**
 * <BagTagTriptychLoader> — progressive enhancement wrapper.
 *
 * SSR / non-JS crawlers: renders <BagTagTriptychStatic> (plain HTML, no framer).
 * After hydration: swaps to <BagTagTriptychAnimated> (Y-axis flip via framer-motion).
 *
 * Uses a mounted flag so the swap happens cleanly without a double-render flash.
 */
export function BagTagTriptychLoader({
  stats,
  lotStamp,
  className,
}: BagTagTriptychLoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Server render + first client paint: show static markup.
    // This is identical to what ProductDetail.tsx server-rendered, so
    // hydration matches perfectly — no CLS.
    return (
      <BagTagTriptychStatic
        stats={stats}
        lotStamp={lotStamp}
        className={className}
      />
    );
  }

  // After hydration: render the animated version.
  // BagTagTriptychAnimated is dynamic(ssr:false) so it loads after hydration.
  return (
    <BagTagTriptychAnimated
      stats={stats}
      lotStamp={lotStamp}
      className={className}
    />
  );
}
