// src/lib/cn.ts
// Utility: merge Tailwind CSS class names with clsx + tailwind-merge.
// Every component in the design system imports this as its single class-name helper.
//
// - clsx handles conditional/array/object class inputs
// - twMerge deduplicates conflicting Tailwind utility classes (last one wins)
//   e.g., cn('p-2', 'p-4') → 'p-4' (not 'p-2 p-4')

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes intelligently.
 *
 * @example
 * cn('p-2', 'p-4')              // → 'p-4'
 * cn('text-ink', isActive && 'text-accent')  // conditional
 * cn({ 'opacity-50': disabled }) // object syntax
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
