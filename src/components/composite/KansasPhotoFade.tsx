'use client';
// src/components/composite/KansasPhotoFade.tsx
// Kansas state outline with customer quotes fading over the state silhouette.

import { TestimonialFade } from './TestimonialFade';

// Kansas state outline — generated from us-atlas/states-10m.json (US Census Bureau
// cartographic boundary file, 1:10m scale) via mapshaper Douglas-Peucker simplification
// at 15% tolerance. ViewBox 0 0 800 325. 14 vertices.
//
// The path captures the iconic Kansas silhouette:
//   1. Mostly straight north edge (40°N parallel)
//   2. The NE Missouri-River notch — Atchison/Doniphan/Leavenworth counties cut in
//      following the actual river boundary (sequence: 740.66 14.5 → 762.92 13.22 →
//      768.68 30.12 → 744.11 51.25 → 772.9 84.97 → 799 91.67)
//   3. Straight east, south, and west edges — exactly how Kansas looks on a map
const KANSAS_PATH =
  'M 1 1 345.3 1.09 722.23 1.28 740.66 14.5 762.92 13.22 768.68 30.12 744.11 51.25 772.9 84.97 799 91.67 795.93 322.26 396.74 322.35 2.15 322.9 1 1 Z';
const KANSAS_VIEWBOX = '0 0 800 325';

interface KansasPhotoFadeProps {
  className?: string;
}

/**
 * <KansasPhotoFade> — customer quotes fading over a Kansas state silhouette.
 */
export function KansasPhotoFade({ className }: KansasPhotoFadeProps) {
  return (
    <div
      className={['relative aspect-[800/325]', className].filter(Boolean).join(' ')}
      aria-label="Customer testimonials over Kansas state outline"
    >
      <svg
        viewBox={KANSAS_VIEWBOX}
        className="absolute inset-0 h-full w-full origin-center scale-y-[1.24]"
        role="img"
        aria-label="Kansas state silhouette"
      >
        <path
          d={KANSAS_PATH}
          fill="var(--color-paper-3)"
          stroke="none"
        />
        <path
          d={KANSAS_PATH}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      <div className="absolute inset-x-[7%] inset-y-[8%] z-10 flex items-center justify-center">
        <TestimonialFade className="kansas-quote-fade" />
      </div>
    </div>
  );
}
