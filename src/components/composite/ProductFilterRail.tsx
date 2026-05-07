'use client';
// src/components/composite/ProductFilterRail.tsx
// Vertical filter rail (left rail on lg+, horizontal scroll chips on <lg).
// Reads ?cat= via useSearchParams + sets data-active-cat on the product grid.
// Boundary: composite/ imports atomic/ + lib/ + types/ only.

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import type { Category } from '@/types/product';
import { cn } from '@/lib/cn';

interface FilterItem {
  value: Category;
  label: string;
  count: number;
}

interface ProductFilterRailProps {
  items: FilterItem[];
  totalCount: number;
  /** DOM id of the product grid wrapper to set data-active-cat on. */
  gridId: string;
}

/**
 * <ProductFilterRail> — vertical filter rail with active state synced to ?cat= URL.
 *
 * Desktop (lg+): vertical stack of category links + count, sticky on scroll.
 * Mobile (<lg): horizontal scroll chip strip with snap-x for clean tabbing.
 */
export function ProductFilterRail({
  items,
  totalCount,
  gridId,
}: ProductFilterRailProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('cat') as Category | null;

  // Sync grid's data-active-cat when the URL changes.
  useEffect(() => {
    const grid = document.getElementById(gridId);
    if (grid) {
      grid.dataset.activeCat = activeCategory ?? 'all';
    }
  }, [activeCategory, gridId]);

  return (
    <>
      {/* DESKTOP — vertical rail */}
      <nav
        aria-label="Filter products by category (desktop)"
        className="hidden lg:block lg:sticky lg:top-32"
      >
        <p className="font-mono text-mono-xs tracking-[0.08em] uppercase text-[var(--color-ink-quiet)] mb-4">
          Browse
        </p>
        <ul className="flex flex-col" role="list">
          <li>
            <Link
              href="/products/"
              aria-current={activeCategory === null ? 'page' : undefined}
              className={cn(
                'group flex items-baseline justify-between gap-3 py-3',
                'border-b border-[var(--color-rule)]',
                'font-display uppercase tracking-[0.04em] text-body-md',
                'transition-colors duration-200',
                activeCategory === null
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-ink)] hover:text-[var(--color-accent)]',
              )}
            >
              <span>All Products</span>
              <span className="font-mono text-mono-xs text-[var(--color-ink-quiet)] group-hover:text-[var(--color-accent)]">
                {totalCount}
              </span>
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.value}>
              <Link
                href={`/products/?cat=${item.value}`}
                aria-current={activeCategory === item.value ? 'page' : undefined}
                className={cn(
                  'group flex items-baseline justify-between gap-3 py-3',
                  'border-b border-[var(--color-rule)]',
                  'font-display uppercase tracking-[0.04em] text-body-md',
                  'transition-colors duration-200',
                  activeCategory === item.value
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-ink)] hover:text-[var(--color-accent)]',
                )}
              >
                <span>{item.label}</span>
                <span className="font-mono text-mono-xs text-[var(--color-ink-quiet)] group-hover:text-[var(--color-accent)]">
                  {item.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* MOBILE / TABLET — horizontal scroll chip strip */}
      <nav
        aria-label="Filter products by category (mobile)"
        className="lg:hidden"
      >
        <ul
          className="flex gap-2 overflow-x-auto pb-3 snap-x snap-mandatory
            -mx-4 px-4 sm:-mx-6 sm:px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          role="list"
        >
          <li className="snap-start shrink-0">
            <Link
              href="/products/"
              aria-current={activeCategory === null ? 'page' : undefined}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2',
                'border font-mono text-mono-xs tracking-[0.04em] uppercase',
                'transition-all duration-150',
                activeCategory === null
                  ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]'
                  : 'border-[var(--color-rule)] text-[var(--color-ink)] hover:border-[var(--color-ink)]',
              )}
            >
              All <span className="opacity-60">{totalCount}</span>
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.value} className="snap-start shrink-0">
              <Link
                href={`/products/?cat=${item.value}`}
                aria-current={activeCategory === item.value ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2',
                  'border font-mono text-mono-xs tracking-[0.04em] uppercase',
                  'transition-all duration-150',
                  activeCategory === item.value
                    ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]'
                    : 'border-[var(--color-rule)] text-[var(--color-ink)] hover:border-[var(--color-ink)]',
                )}
              >
                {item.label} <span className="opacity-60">{item.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
