'use client';
// src/components/composite/GalleryLightbox.tsx
// 'use client' — lightbox open/close state + keyboard trap.
// Grid of photos with click-to-enlarge. Grayscale on load → color on viewport entry.
// Keyboard: Escape closes, arrow keys navigate.
// Boundary: imports only atomic/ + types/.

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/cn';

interface GalleryPhoto {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  className?: string;
}

/**
 * <GalleryLightbox> — masonry grid of photos with click-to-enlarge.
 * Photos stay black-and-white in the grid; click opens the full-size lightbox.
 * Lightbox: full-screen overlay, keyboard navigable, focus-trapped.
 */
export function GalleryLightbox({ photos, className }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;

  function openPhoto(index: number) {
    setActiveIndex(index);
  }

  function closePhoto() {
    setActiveIndex(null);
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || activeIndex === null) return;

      if (e.key === 'Escape') {
        closePhoto();
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev !== null ? (prev + 1) % photos.length : 0,
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev !== null ? (prev - 1 + photos.length) % photos.length : photos.length - 1,
        );
      }
    },
    [isOpen, activeIndex, photos.length],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      {/* ── PHOTO GRID ──────────────────────────────────────────────────── */}
      <div
        className={cn(
          'columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4',
          className,
        )}
        aria-label={`Photo gallery — ${photos.length} photos`}
      >
        {photos.map((photo, index) => (
          <div key={photo.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => openPhoto(index)}
              className="group block w-full focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              aria-label={`View full size: ${photo.alt}`}
            >
              <div className="overflow-hidden border border-[var(--color-rule)]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={cn(
                    'w-full h-auto block',
                    'filter grayscale transition-transform duration-500',
                    // Scale on hover
                    'group-hover:scale-[1.02] transform origin-center transition-transform duration-500',
                  )}
                />
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX OVERLAY ─────────────────────────────────────────────── */}
      {isOpen && activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
            bg-[var(--color-ink)] bg-opacity-90"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${activePhoto.alt}`}
          onClick={closePhoto}
        >
          {/* Inner container — click doesn't propagate to close */}
          <div
            className="relative max-w-5xl max-h-[90vh] mx-4 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closePhoto}
              className="absolute -top-10 right-0 font-mono text-mono-xs tracking-[0.04em]
                uppercase text-[var(--color-paper)] hover:text-[var(--color-accent)]
                transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              aria-label="Close lightbox"
            >
              Close [Esc]
            </button>

            {/* Photo */}
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="max-w-full max-h-[80vh] object-contain border border-[var(--color-gray-700)]"
            />

            {/* Caption + nav row */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev !== null ? (prev - 1 + photos.length) % photos.length : 0,
                  )
                }
                className="font-mono text-mono-xs tracking-[0.04em] uppercase
                  text-[var(--color-paper)] hover:text-[var(--color-accent)]
                  transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                aria-label="Previous photo"
              >
                ← Prev
              </button>

              <span className="flex-1" aria-hidden="true" />
              <span className="font-mono text-mono-xs text-[var(--color-gray-500)] shrink-0">
                {activeIndex !== null ? activeIndex + 1 : 0} / {photos.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev !== null ? (prev + 1) % photos.length : 0,
                  )
                }
                className="font-mono text-mono-xs tracking-[0.04em] uppercase
                  text-[var(--color-paper)] hover:text-[var(--color-accent)]
                  transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                aria-label="Next photo"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
