'use client';
// src/components/composite/ProductFilterChips.tsx
// Thin client island — ONLY the category filter chips.
// Reads ?cat= via useSearchParams and sets data-active-cat on the product grid.
// Must be wrapped in <Suspense> (required for static export with useSearchParams).
// The product card grid is NOT inside this component — it is static RSC HTML.
// Boundary: composite/ imports atomic/ + lib/ + types/ only.

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import type { Category } from '@/types/product';
import { cn } from '@/lib/cn';

interface CategoryChip {
  value: Category;
  label: string;
}

interface ProductFilterChipsProps {
  categoryChips: CategoryChip[];
  /** DOM id of the product grid wrapper to set data-active-cat on. */
  gridId: string;
}

/**
 * <ProductFilterChips> — client island for category chip navigation.
 * Reads ?cat= from the URL via useSearchParams.
 * On mount and on URL change, updates data-active-cat on the static product
 * grid (identified by gridId) so the CSS filter rules show/hide cards.
 * Chips use anchor links (/products/?cat=<value>) — no router.push needed.
 */
export function ProductFilterChips({ categoryChips, gridId }: ProductFilterChipsProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('cat') as Category | null;

  // Sync active category to the static product grid via data attribute.
  // The grid is rendered by the RSC and identified by a stable id.
  // CSS rules in product-filter.css use [data-active-cat] to hide non-matching cards.
  useEffect(() => {
    const grid = document.getElementById(gridId);
    if (grid) {
      grid.dataset.activeCat = activeCategory ?? 'all';
    }
  }, [activeCategory, gridId]);

  return (
    <nav aria-label="Filter products by category" className="mb-8">
      <ul className="flex flex-wrap justify-center gap-2" role="list">
        {/* "All" chip */}
        <li>
          <Link
            href="/products/"
            aria-current={activeCategory === null ? 'page' : undefined}
            className={cn(
              'font-mono text-mono-xs tracking-[0.04em] uppercase px-4 py-2',
              'border transition-all duration-150 inline-block',
              'hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]',
              'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]',
              activeCategory === null
                ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]'
                : 'border-[var(--color-rule)] text-[var(--color-ink-quiet)]',
            )}
          >
            All
          </Link>
        </li>

        {categoryChips.map((chip) => (
          <li key={chip.value}>
            <Link
              href={`/products/?cat=${chip.value}`}
              aria-current={activeCategory === chip.value ? 'page' : undefined}
              className={cn(
                'font-mono text-mono-xs tracking-[0.04em] uppercase px-4 py-2',
                'border transition-all duration-150 inline-block',
                'hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]',
                activeCategory === chip.value
                  ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]'
                  : 'border-[var(--color-rule)] text-[var(--color-ink-quiet)]',
              )}
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
