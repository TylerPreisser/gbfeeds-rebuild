// src/components/composite/KansasMapSVG.tsx
// RSC — no 'use client'. Pure SVG fallback render of the Kansas counties map.
// Used by KansasMap as static SSR state and reduced-motion / mobile bailout.
// Loads the pre-generated kansas-counties.svg inline via dangerouslySetInnerHTML.
// Boundary: imports only types/.

import { cn } from '@/lib/cn';

interface KansasMapSVGProps {
  /** Additional CSS classes */
  className?: string;
  /** Reserved for future use — full-pin display variant */
  showAllPins?: boolean;
}

/**
 * <KansasMapSVG> — pure RSC wrapper around the kansas-counties.svg.
 * Uses an inline <img> pointing to the public asset rather than
 * dangerouslySetInnerHTML (which would require reading the file at build time
 * in a way that the static export wouldn't tree-shake).
 *
 * For the animated interactive variant, <KansasMap> overlays SVG pin elements
 * on top of this base map via absolute positioning + the same viewBox.
 */
export function KansasMapSVG({ className, showAllPins = false }: KansasMapSVGProps) {
  void showAllPins; // Reserved prop — consumed by parent logic in future phases
  return (
    <div
      className={cn('relative w-full', className)}
      role="img"
      aria-label="Kansas county map"
    >
      {/* Base map SVG — served from public/textures/ */}
      {/* Using <img> keeps the SVG out of the HTML parse tree (avoids 12KB inline bloat). */}
      {/* KansasMap (client) overlays an SVG with identical viewBox for pin placement. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/textures/kansas-counties.svg"
        alt="Kansas county map showing 105 counties"
        className="w-full h-auto"
        loading="lazy"
        style={{
          filter:
            'brightness(0) saturate(100%) opacity(0.15)',
          // Renders the path fills as ink-quiet lines on bone paper
        }}
      />
    </div>
  );
}
