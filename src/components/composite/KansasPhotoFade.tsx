'use client';
// src/components/composite/KansasPhotoFade.tsx
// Kansas state outline with customer photos that crossfade INSIDE the state silhouette.
// Photos are ONLY visible within the Kansas outline — clipPath masks everything outside.
// Photos rotate every 3.5 seconds with a 1 second crossfade.
// Reduced-motion: first photo shown statically, no cycling.
// No GSAP dependency — pure React + CSS transitions.

import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Kansas state outline path — traced from the bounding box of kansas-counties.svg
// which has viewBox="0 0 800 414". This is the outer hull of all 105 county paths.
// Simplified to a clean state-border-only polygon.
const KANSAS_PATH =
  'M 17.8 1 84.0 3.8 92.8 4.0 153.1 6.1 209.4 7.8 267.8 8.9 314.1 9.6 325.5 9.7 360.7 10.1 383.6 10.2 407.3 10.2 442.5 10.4 454 10.4 500.6 10.2 547.2 9.8 558.7 9.7 593.8 9.2 617.2 8.9 640.5 8.4 663.4 7.8 709.6 6.6 713.0 6.5 731.3 22.5 746.0 19.2 758.2 29.1 740.9 57.3 750.7 83.3 771.9 111.9 790.1 116.7 789.5 122.8 789.9 132.2 790.9 158.5 791.4 173.1 792.3 208.1 792.8 220.0 794.4 264.0 794.5 267.0 795.6 315.8 796.1 318.5 797.5 357.3 797.6 360.7 798.7 398.4 799 406.2 757.3 407.5 750.3 407.8 714.1 408.9 701.7 409.2 673.6 409.9 654.3 410.5 650.4 410.6 594.1 411.7 569.8 412.0 527.3 412.5 493.3 412.8 456.7 412.9 423.5 413.0 398.0 413.0 376.8 412.8 327.8 412.2 278.8 411.6 269.9 411.4 220.1 410.2 210.8 409.9 152.6 408.7 119.0 407.9 105.9 407.5 53.4 405.9 2.5 404.1 1 404.1 3.3 351.0 4.8 316.9 5.4 304.2 8.1 234.0 10.2 186.8 10.7 175.7 13.3 117.4 12.8 129.0 15.6 59.2 15.6 58.4 17.8 1 Z';

// Customer photos for the Kansas fade — pull from gallery (harvest/buck shots)
const KANSAS_PHOTOS = [
  { src: '/photos/gallery/blob-16f87b2.webp', alt: 'Customer harvest photo — KB Feeds' },
  { src: '/photos/gallery/blob-478b3b7.webp', alt: 'Buck at GB Feeds station' },
  { src: '/photos/gallery/blob-8085ecb.webp', alt: 'Hunter with harvested deer' },
  { src: '/photos/gallery/blob-93bef42.webp', alt: 'Trail cam deer photo' },
  { src: '/photos/gallery/blob-b7a2223.webp', alt: 'Customer with trophy buck' },
  { src: '/photos/gallery/blob-de1da36.webp', alt: 'Big buck at GB Feeds' },
  { src: '/photos/lifestyle/lifestyle-img-4172.webp', alt: 'Hunter with harvested whitetail' },
  { src: '/photos/lifestyle/lifestyle-20231008-234054.webp', alt: 'Greg with harvested whitetail' },
];

const HOLD_MS = 3500; // how long each photo shows
const FADE_MS = 1000; // CSS transition duration

interface KansasPhotoFadeProps {
  className?: string;
}

/**
 * <KansasPhotoFade> — customer photos cycling inside a Kansas state SVG clipPath.
 * Photos are 100% clipped by the Kansas outline — nothing shows outside the state.
 * Above the SVG: the big "7,500" counter lives in SignatureMove.tsx (unchanged).
 * This component is ONLY the photo-fading Kansas silhouette.
 */
export function KansasPhotoFade({ className }: KansasPhotoFadeProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % KANSAS_PHOTOS.length);
    }, HOLD_MS);

    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className={className} aria-label="Customer harvest photos inside Kansas state outline">
      <svg
        viewBox="0 0 800 414"
        className="w-full h-auto"
        role="img"
        aria-label="Kansas state silhouette with customer harvest photos"
      >
        <defs>
          {/* ClipPath using the Kansas state outline */}
          <clipPath id="ks-state-clip">
            <path d={KANSAS_PATH} />
          </clipPath>
        </defs>

        {/* Photos clipped by Kansas outline — only visible inside the state */}
        <g clipPath="url(#ks-state-clip)">
          {KANSAS_PHOTOS.map((photo, i) => (
              <image
              key={photo.src}
              href={photo.src}
              x="0"
              y="0"
              width="800"
              height="414"
              preserveAspectRatio="xMidYMid slice"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease-in-out`,
              }}
              aria-hidden={i !== activeIndex}
            />
          ))}

          {/* Subtle dark overlay inside state for depth */}
          <rect
            x="0"
            y="0"
            width="800"
            height="414"
            fill="rgba(0,0,0,0.12)"
          />
        </g>

        {/* Kansas state border outline — visible on top of photos */}
        <path
          d={KANSAS_PATH}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
