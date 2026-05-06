// src/components/composite/EyebrowStripe.tsx
// RSC — no 'use client'. CSS-only marquee rotation.
// Thin top strip: FREE SHIPPING line + contact/CTA rotating via CSS animation.
// Boundary: imports only atomic/ + data/.

import { cn } from '@/lib/cn';

interface EyebrowStripeProps {
  className?: string;
}

/**
 * <EyebrowStripe> — always-visible top strip.
 * Bone-paper bg with loam-ink mono text.
 * Two messages alternate via CSS animation.
 * Screen readers see both (aria-hidden="true" on the animation wrapper,
 * visually-hidden static text for SR).
 */
export function EyebrowStripe({ className }: EyebrowStripeProps) {
  return (
    <div
      className={cn(
        'w-full bg-[var(--color-ink)] text-[var(--color-paper)]',
        'font-mono text-mono-xs tracking-[0.04em] uppercase',
        'h-8 flex items-center justify-center overflow-hidden relative',
        className,
      )}
      role="banner"
      aria-label="Site announcement strip"
    >
      {/* Screen-reader accessible static content */}
      <span className="sr-only">
        Free shipping on orders over $99. Kansas-Made. Call (620) 639-3337.
      </span>

      {/* CSS-only marquee — two slides alternating on 6s loop */}
      <div className="eyebrow-ticker" aria-hidden="true">
        <span className="eyebrow-slide eyebrow-slide--1">
          FREE SHIPPING ON ORDERS OVER $99&nbsp;&nbsp;·&nbsp;&nbsp;KANSAS-MADE
        </span>
        <span className="eyebrow-slide eyebrow-slide--2">
          (620) 639-3337&nbsp;&nbsp;·&nbsp;&nbsp;BUILD YOUR FEED PROGRAM →
        </span>
      </div>

      {/* Inline styles for the CSS animation (no Tailwind needed — keyframes live in atmosphere.css) */}
      <style>{`
        .eyebrow-ticker {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .eyebrow-slide {
          position: absolute;
          white-space: nowrap;
          opacity: 0;
          animation: eyebrowCycle 8s ease-in-out infinite;
        }
        .eyebrow-slide--2 {
          animation-delay: 4s;
        }
        @keyframes eyebrowCycle {
          0%   { opacity: 0; transform: translateY(4px); }
          8%   { opacity: 1; transform: translateY(0); }
          42%  { opacity: 1; transform: translateY(0); }
          50%  { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 0; transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .eyebrow-slide--1 { opacity: 1; transform: none; animation: none; }
          .eyebrow-slide--2 { opacity: 0; animation: none; }
        }
      `}</style>
    </div>
  );
}
