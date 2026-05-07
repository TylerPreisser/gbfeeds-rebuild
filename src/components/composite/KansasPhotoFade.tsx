'use client';
// src/components/composite/KansasPhotoFade.tsx
// Kansas state outline with customer photos that crossfade INSIDE the state silhouette.
// Photos are ONLY visible within the Kansas outline — clipPath masks everything outside.
// Photos rotate every 3.5 seconds with a 1 second crossfade.
// Reduced-motion: first photo shown statically, no cycling.
// No GSAP dependency — pure React + CSS transitions.

import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Kansas state outline path — clean 11-vertex approximation of the state border.
// viewBox 0 0 800 414. Kansas is nearly rectangular with two key border features:
//   1. The NE corner has a small Missouri River notch (~37px wide, 28px tall)
//      starting at x≈706 along the top edge.
//   2. The south border is dead straight (Missouri Compromise line 37°N).
//   3. The west border is dead straight.
//   4. The east border jogs slightly: straight from SE corner up to the notch,
//      then the notch cuts inward, then continues to the true NE corner.
// This gives a recognizable, iconic Kansas silhouette with correct proportions.
const KANSAS_PATH =
  'M 8,8 L 706,8 L 706,36 L 743,36 L 743,8 L 792,8 L 792,406 L 8,406 Z';

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
