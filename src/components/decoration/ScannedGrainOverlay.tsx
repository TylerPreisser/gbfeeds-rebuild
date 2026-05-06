// src/components/decoration/ScannedGrainOverlay.tsx
// RSC — no 'use client'. Scanned-grain overlay for hero image plates.
// The CSS class .scanned-grain is defined in src/styles/atmosphere.css.
// This component is aria-hidden — purely decorative.

import { cn } from '@/lib/cn';

interface ScannedGrainOverlayProps {
  className?: string;
}

/**
 * <ScannedGrainOverlay> — 20% opacity scanned-grain overlay on hero plates.
 *
 * Renders an absolute-positioned <div> with the .scanned-grain CSS class:
 *   - background-image: url('/textures/scanned-grain.webp')
 *   - background-size: 512px 512px (tile)
 *   - opacity: 0.10
 *   - mix-blend-mode: multiply
 *   - position: absolute, inset-0
 *   - pointer-events: none
 *   - z-index: 10 (above the photo, below text)
 *
 * Place inside any hero <figure> or image-containing <div>:
 *   - Parent must have position: relative and overflow: hidden.
 *   - Sits above the <Image> but below all text / CTA overlays.
 *
 * @example
 * <figure className="relative overflow-hidden">
 *   <Image src="..." alt="..." fill />
 *   <ScannedGrainOverlay />
 * </figure>
 */
export function ScannedGrainOverlay({ className }: ScannedGrainOverlayProps) {
  return (
    <div
      className={cn('scanned-grain', className)}
      aria-hidden="true"
    />
  );
}
