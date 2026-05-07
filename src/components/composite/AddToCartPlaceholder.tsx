'use client';
// src/components/composite/AddToCartPlaceholder.tsx
// 'use client' — required for the onClick alert handler.
// Used by ProductDetail (RSC) when paymentLinkUrl is still a placeholder.
// Renders ADD TO CART button that shows a "coming soon" alert when clicked.
// Boundary: no imports from @/data/*.

interface AddToCartPlaceholderProps {
  productName: string;
}

const PHONE_FALLBACK_HREF = 'tel:+16206393337';

/**
 * <AddToCartPlaceholder> — client-only ADD TO CART when Stripe link not wired.
 * Shows a friendly alert on click instead of navigating to about:blank#TODO-.
 */
export function AddToCartPlaceholder({ productName }: AddToCartPlaceholderProps) {
  function handleClick() {
    alert(
      `Online checkout coming soon — call (620) 639-3337 to order ${productName}, ` +
      'or scroll down for more details.',
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleClick}
        className="w-full inline-flex min-h-14 items-center justify-center px-6 py-4
          font-display uppercase tracking-[0.035em] text-[clamp(1.1rem,1rem+0.3vw,1.3rem)] leading-none
          bg-[var(--color-ink)] border border-[var(--color-ink)]
          hover:bg-[var(--color-gray-900)] transition-colors duration-200
          focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
        aria-label={`Add ${productName} to cart`}
        style={{ color: '#ffffff' }}
      >
        ADD TO CART
      </button>

      {/* Buy with G Pay — visual per ORIGINAL_TRUTH § 7B; disabled until Stripe wired */}
      <button
        type="button"
        disabled
        aria-label="Buy with Google Pay (coming soon)"
        className="w-full inline-flex min-h-14 items-center justify-center gap-2 px-6 py-4
          bg-[var(--color-ink)] border border-[var(--color-ink)]
          opacity-60 cursor-not-allowed
          font-body text-body-md leading-none"
        style={{ color: '#ffffff' }}
      >
        <svg width="20" height="12" viewBox="0 0 56 30" fill="none" aria-hidden="true">
          <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="500" fill="white">G Pay</text>
        </svg>
        Buy with G Pay
      </button>

      {/* Phone fallback — quiet secondary */}
      <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] text-center">
        Questions?{' '}
        <a
          href={PHONE_FALLBACK_HREF}
          className="hover:text-[var(--color-accent)] transition-colors duration-200"
        >
          (620) 639-3337
        </a>
      </p>
    </div>
  );
}
