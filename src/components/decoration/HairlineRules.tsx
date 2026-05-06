// src/components/decoration/HairlineRules.tsx
// RSC — no 'use client'. 24px-pitch ruled-paper background.
// The CSS class .hairlines is defined in src/styles/atmosphere.css.
// This component is aria-hidden — purely decorative.

import { cn } from '@/lib/cn';

interface HairlineRulesProps {
  /**
   * Hairline pitch in pixels. Governs the background-size of the SVG tile.
   * Default: 24px (the logbook baseline grid).
   * Options: 12px (tight), 24px (logbook standard), 48px (loose editorial).
   */
  density?: 12 | 24 | 48;
  className?: string;
}

const densityStyles: Record<12 | 24 | 48, string> = {
  12: 'hairlines hairlines--12',
  24: 'hairlines',
  48: 'hairlines hairlines--48',
};

/**
 * <HairlineRules> — 24px-pitch horizontal ruled-paper background layer.
 *
 * Renders an absolute-positioned <div> with the .hairlines CSS class which applies:
 *   - background-image: url('/textures/ruled.svg')
 *   - background-size: 100% 24px (one line per 24px)
 *   - opacity: 0.18
 *   - position: absolute, inset-0
 *   - pointer-events: none
 *
 * Opt-in per section — typically used on:
 *   /our-story, /journal/[slug], /customer-reviews, /why-gb-feeds
 *
 * Parent must have position: relative.
 *
 * @example
 * <section className="relative">
 *   <HairlineRules />
 *   <Container>...</Container>
 * </section>
 *
 * <section className="relative">
 *   <HairlineRules density={12} />
 *   ...
 * </section>
 */
export function HairlineRules({ density = 24, className }: HairlineRulesProps) {
  return (
    <div
      className={cn(densityStyles[density], className)}
      aria-hidden="true"
    />
  );
}
