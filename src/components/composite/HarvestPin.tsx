// src/components/composite/HarvestPin.tsx
// RSC — no 'use client'. Pure SVG circle with CSS-only tooltip.
// Renders one harvest pin: brick-red circle with loam-ink ring.
// Tooltip on :hover via CSS-only — no JS.
// Boundary: imports only atomic/ + types/.

import type { Harvest } from '@/types/harvests';
import { cn } from '@/lib/cn';

interface HarvestPinProps {
  harvest: Harvest;
  /** x% position in the SVG viewBox */
  cx: number;
  /** y% position in the SVG viewBox */
  cy: number;
  /** SVG viewBox width (for converting % to absolute coords) */
  viewBoxWidth?: number;
  /** SVG viewBox height */
  viewBoxHeight?: number;
  className?: string;
}

/**
 * <HarvestPin> — one harvest pin on the Kansas map.
 * 6px brick-red circle with thin loam-ink ring.
 * CSS-only :hover tooltip shows: first_name · county · date · inches.
 * For use inside the Kansas counties SVG.
 */
export function HarvestPin({
  harvest,
  cx,
  cy,
  viewBoxWidth = 800,
  viewBoxHeight = 414,
  className,
}: HarvestPinProps) {
  // Convert % coordinates to absolute SVG coordinates
  const x = (cx / 100) * viewBoxWidth;
  const y = (cy / 100) * viewBoxHeight;

  const ariaLabel = `${harvest.first_name}, ${harvest.county} County, ${harvest.date}, ${harvest.inches} inches`;

  const tooltipText = [
    harvest.first_name,
    harvest.county,
    harvest.date,
    `${harvest.inches}"`,
  ].join(' · ');

  return (
    <g
      className={cn('harvest-pin-group', className)}
      role="img"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {/* Outer ring — loam-ink */}
      <circle
        cx={x}
        cy={y}
        r={5}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={1}
        opacity={0.5}
      />

      {/* Inner filled dot — brick-red accent */}
      <circle
        cx={x}
        cy={y}
        r={3}
        fill="var(--color-accent)"
        className="harvest-pin-dot"
      />

      {/* CSS-only tooltip — foreignObject for rich text rendering */}
      <foreignObject
        x={x + 8}
        y={y - 20}
        width={200}
        height={40}
        className="harvest-pin-tooltip pointer-events-none"
        overflow="visible"
      >
        {/* xhtml: namespace is implicit inside foreignObject — no xmlns attr needed in JSX */}
        <div
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            background: 'var(--color-paper)',
            border: '1px solid var(--color-rule)',
            padding: '3px 6px',
            whiteSpace: 'nowrap',
            lineHeight: '1.2',
            pointerEvents: 'none',
          }}
        >
          {tooltipText}
        </div>
      </foreignObject>

      {/* Inline tooltip visibility styles */}
      <style>{`
        .harvest-pin-tooltip { opacity: 0; transition: opacity 150ms ease; }
        .harvest-pin-group:hover .harvest-pin-tooltip,
        .harvest-pin-group:focus .harvest-pin-tooltip { opacity: 1; }
        .harvest-pin-group:hover .harvest-pin-dot { fill: var(--color-accent-2); }
        .harvest-pin-group:focus .harvest-pin-dot { fill: var(--color-accent-2); }
        @media (prefers-reduced-motion: reduce) {
          .harvest-pin-tooltip { transition: none; }
        }
      `}</style>
    </g>
  );
}
