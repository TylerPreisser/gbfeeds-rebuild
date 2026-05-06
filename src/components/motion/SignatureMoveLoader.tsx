'use client';
// src/components/motion/SignatureMoveLoader.tsx
// 'use client' — required because dynamic() with ssr:false can only live in a Client Component.
// This thin wrapper owns the dynamic import boundary so HomePage.tsx (RSC) can stay RSC.
// GSAP is still isolated: it only enters the bundle via SignatureMove.tsx (the dynamic target).

import dynamic from 'next/dynamic';
import type { Harvest } from '@/types/harvests';

// ─── Dynamic import — ssr:false isolates GSAP to its own lazy chunk ──────────
const SignatureMove = dynamic(
  () => import('@/components/motion/SignatureMove').then((m) => m.SignatureMove),
  {
    ssr: false,
    // Loading state: match the section's min-height to prevent CLS
    loading: () => (
      // 100svh (small viewport height) avoids iOS Safari chrome clipping the CLS guard
      <div
        className="w-full bg-[var(--color-paper)]"
        style={{ minHeight: '100svh' }}
        aria-hidden="true"
      />
    ),
  },
);

interface SignatureMoveLoaderProps {
  total: number;
  asOf: string;
  pins: Harvest[];
}

/**
 * <SignatureMoveLoader> — client boundary + dynamic import wrapper.
 * Used by HomePage (RSC) to incorporate SignatureMove without violating the
 * "ssr:false only in Client Components" App Router rule.
 */
export function SignatureMoveLoader({ total, asOf, pins }: SignatureMoveLoaderProps) {
  return <SignatureMove total={total} asOf={asOf} pins={pins} />;
}
