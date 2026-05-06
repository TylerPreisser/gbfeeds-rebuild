'use client';
// src/components/composite/KansasMap.tsx
// 'use client' — pin drop animation driven by scroll progress.
// Renders <KansasMapSVG> base + <HarvestPin> instances at county centroids.
// Animation: pins drop in over scroll progress (IntersectionObserver fallback for mobile).
// Reduced-motion: all pins visible from first paint.
// Boundary: imports only atomic/ + composite/ + data/ + types/ + hooks/.
// DOES NOT import GSAP or ScrollTrigger — those live only in SignatureMove.tsx.

import { useEffect, useRef, useState } from 'react';
import type { Harvest } from '@/types/harvests';
import { KANSAS_COUNTIES } from '@/data/kansas-counties';
import { HarvestPin } from './HarvestPin';
import { KansasMapSVG } from './KansasMapSVG';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

interface KansasMapProps {
  pins: Harvest[];
  /** 0–1 scroll progress from parent <SignatureMove>. When provided, pins drop at progress thresholds. */
  scrollProgress?: number;
  className?: string;
}

// SVG viewBox dimensions (must match public/textures/kansas-counties.svg)
const VIEW_BOX_W = 800;
const VIEW_BOX_H = 414;

/**
 * <KansasMap> — animated Kansas county map with harvest pins.
 * Pins drop in sequentially as scrollProgress increases from 0→1.
 * Reduced-motion: all pins immediately visible.
 * Mobile (< 768px, no GSAP parent): pins drop via IntersectionObserver, 80ms stagger.
 */
export function KansasMap({ pins, scrollProgress, className }: KansasMapProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(
    reducedMotion ? pins.length : 0,
  );
  const [intersected, setIntersected] = useState(false);

  // IntersectionObserver fallback (used when no scrollProgress prop — mobile/fallback)
  useEffect(() => {
    if (reducedMotion || scrollProgress !== undefined) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !intersected) {
          setIntersected(true);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, scrollProgress, intersected]);

  // When intersected (mobile/fallback), stagger pin drops at 80ms each
  useEffect(() => {
    if (!intersected || scrollProgress !== undefined || reducedMotion) return;

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= pins.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [intersected, pins.length, scrollProgress, reducedMotion]);

  // When scrollProgress prop is provided (driven by SignatureMove GSAP timeline)
  useEffect(() => {
    if (scrollProgress === undefined || reducedMotion) return;
    const count = Math.round(scrollProgress * pins.length);
    setVisibleCount(count);
  }, [scrollProgress, pins.length, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      role="img"
      aria-label={`Kansas harvest map — ${pins.length} harvest pins across Kansas counties`}
    >
      {/* Base map */}
      <KansasMapSVG />

      {/* Pin overlay SVG — same viewBox as kansas-counties.svg */}
      <svg
        viewBox={`0 0 ${VIEW_BOX_W} ${VIEW_BOX_H}`}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        {pins.slice(0, visibleCount).map((harvest) => {
          // Look up centroid for this pin's FIPS code
          const county = KANSAS_COUNTIES.find((c) => c.fips === harvest.fips);
          if (!county) return null;

          return (
            <HarvestPin
              key={harvest.id}
              harvest={harvest}
              cx={county.cx}
              cy={county.cy}
              viewBoxWidth={VIEW_BOX_W}
              viewBoxHeight={VIEW_BOX_H}
            />
          );
        })}
      </svg>

      {/* Summary stats below map */}
      <div className="flex gap-6 mt-4" aria-live="polite" aria-atomic="true">
        <div className="flex flex-col gap-0.5">
          <span
            className="font-display uppercase tracking-[0.02em] text-display-sm text-[var(--color-ink)]"
          >
            {visibleCount}
          </span>
          <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
            Harvests
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span
            className="font-display uppercase tracking-[0.02em] text-display-sm text-[var(--color-ink)]"
          >
            {new Set(
              pins
                .slice(0, visibleCount)
                .map((p) => p.county),
            ).size}
          </span>
          <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
            Counties
          </span>
        </div>
      </div>
    </div>
  );
}
