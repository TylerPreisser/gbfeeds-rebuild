// src/components/composite/ProductFilterClient.tsx
// RSC — NO 'use client'. Receives active category via prop (from page searchParams).
// Renders category chip links as plain <Link> elements pointing to /products?cat=<cat>.
// No useSearchParams, no Suspense needed — full static HTML output.
// Boundary: composite/ imports atomic/ + lib/ + types/ only.

import type { Category } from '@/types/product';
import { cn } from '@/lib/cn';
import { withBasePath } from '@/lib/basePath';

interface CategoryChip {
  value: Category;
  label: string;
}

interface ProductFilterClientProps {
  categoryChips: CategoryChip[];
  /** The currently active category derived from searchParams.cat (passed by page RSC). */
  activeCategory: Category | null;
}

/**
 * <ProductFilterClient> — RSC category chip nav. No client JS required.
 * Each chip is a <Link> to /products?cat=<value> (or /products/ for "All").
 * Active state is set via aria-current and CSS styling — derived from the
 * activeCategory prop which the page RSC reads from searchParams.
 */
export function ProductFilterClient({ categoryChips, activeCategory }: ProductFilterClientProps) {
  return (
    <nav aria-label="Filter products by category" className="mb-8">
      <ul className="flex flex-wrap gap-2" role="list">
        {/* "All" chip */}
        <li>
          <a
            href={withBasePath('/products/')}
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
          </a>
        </li>

        {categoryChips.map((chip) => (
          <li key={chip.value}>
            <a
              href={withBasePath(`/products/?cat=${chip.value}`)}
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
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
