'use client';
// src/components/composite/StickyAddToCartPlaceholder.tsx
// 'use client' — required for onClick handler.
// Used in the mobile sticky bar within ProductDetail (RSC) when paymentLinkUrl
// is a placeholder. Shows "ADD TO CART" that alerts on click.
// Boundary: no imports from @/data/*.

interface StickyAddToCartPlaceholderProps {
  productName: string;
}

/**
 * <StickyAddToCartPlaceholder> — mobile sticky bar ADD TO CART (placeholder state).
 */
export function StickyAddToCartPlaceholder({ productName }: StickyAddToCartPlaceholderProps) {
  function handleClick() {
    alert(
      'Online checkout coming soon — call (620) 639-3337 to order.',
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center px-4 py-2 shrink-0
        font-display uppercase tracking-[0.02em] text-body-sm leading-none
        bg-[var(--color-ink)] border border-[var(--color-ink)]
        hover:bg-[var(--color-gray-900)] transition-colors duration-200"
      aria-label={`Add ${productName} to cart`}
      style={{ color: '#ffffff' }}
    >
      ADD TO CART
    </button>
  );
}
