// src/components/atomic/Image.tsx
// RSC — no 'use client'.
// BOUNDARY RULE: This is the ONLY file in the codebase allowed to import next/image.
// All other components must import <Image> from here, never from 'next/image' directly.

import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageProps extends Omit<NextImageProps, 'alt'> {
  /**
   * REQUIRED alt text. Enforced at the type level.
   * Per WCAG 2.1 SC 1.1.1: all meaningful images must have descriptive alt text.
   * For decorative images, pass alt="" explicitly.
   */
  alt: string;
  /**
   * LCP-critical images (e.g., hero plate) should pass priority={true}.
   * All other images default to loading="lazy".
   */
  priority?: boolean;
  className?: string;
  /**
   * Optional wrapper div className for aspect-ratio / overflow containers.
   * If not provided, NextImage renders inline.
   */
  containerClassName?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * <Image> — next/image wrapper. The ONLY allowed next/image import site.
 *
 * - `alt` is required (type-enforced) — no optional alt.
 * - Defaults to `loading="lazy"` for all non-priority images.
 * - Pass `priority={true}` for LCP-critical images (Buck Chow hero on home page).
 * - `unoptimized` is inherited globally from next.config.ts (static export).
 * - Optionally wrap in an aspect-ratio container via `containerClassName`.
 *
 * @example
 * // LCP hero
 * <Image
 *   src="/products/buck-chow/buck-chow-hero-1024.avif"
 *   alt="Buck Chow 40lb bag in a Kansas field"
 *   width={1024}
 *   height={1365}
 *   priority
 * />
 *
 * // Lazy product thumbnail
 * <Image
 *   src="/products/corn-candy/corn-candy-hero-640.avif"
 *   alt="Corn Candy Flavored Attractant 7lb bag"
 *   width={640}
 *   height={640}
 * />
 */
export function Image({
  alt,
  priority = false,
  className,
  containerClassName,
  ...rest
}: ImageProps) {
  const img = (
    <NextImage
      alt={alt}
      loading={priority ? undefined : 'lazy'}
      priority={priority}
      className={cn('max-w-full', className)}
      {...rest}
    />
  );

  if (containerClassName) {
    return <div className={containerClassName}>{img}</div>;
  }

  return img;
}
