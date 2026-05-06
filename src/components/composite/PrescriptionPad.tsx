// src/components/composite/PrescriptionPad.tsx
// RSC — no 'use client'. Wizard output card.
// Styled like a folded prescription pad with ruled paper background.
// Boundary: imports only atomic/ + types/ + lib/payment-links.

import type { Bundle } from '@/types/product';
import { Stamp } from '@/components/atomic/Stamp';
import { Heading } from '@/components/atomic/Heading';
import { Button } from '@/components/atomic/Button';
import { isPlaceholderLink, PHONE_FALLBACK_COPY, PHONE_FALLBACK_HREF } from '@/data/payment-links';
import { cn } from '@/lib/cn';

interface PrescriptionPadProps {
  bundle: Bundle;
  /** Product display names for each SKU — keyed by slug */
  productNames: Record<string, string>;
  /** Product prices for each SKU — keyed by slug */
  productPrices: Record<string, string>;
  className?: string;
}

/**
 * <PrescriptionPad> — wizard output card.
 * Styled like a prescription pad: mono header, ruled-paper bg, SKU line items.
 * CTA: "GO TO CHECKOUT" links to bundle.paymentLinkUrl if real, else phone fallback.
 */
export function PrescriptionPad({
  bundle,
  productNames,
  productPrices,
  className,
}: PrescriptionPadProps) {
  const isPlaceholder = isPlaceholderLink(bundle.paymentLinkUrl);

  const regionLabel = bundle.region.toUpperCase();
  const seasonLabel = bundle.season.toUpperCase().replace(/-/g, ' ');
  const goalLabel = bundle.goal.toUpperCase();

  return (
    <div
      className={cn(
        'relative border border-[var(--color-rule)]',
        'bg-[var(--color-paper-3)]',
        // Ruled paper background — 24px pitch via atmosphere.css class
        'hairlines',
        className,
      )}
      role="region"
      aria-label="Your feed program recommendation"
    >
      {/* Header strip */}
      <div className="px-6 py-4 border-b-2 border-[var(--color-ink)] bg-[var(--color-ink)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-paper)] opacity-60">
              Feed Program RX
            </p>
            <Heading as="h3" size="display-sm" className="text-[var(--color-paper)] mt-1">
              RX For {seasonLabel}
            </Heading>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <Stamp value={regionLabel} />
            <Stamp value={goalLabel} />
          </div>
        </div>
      </div>

      {/* SKU line items — ruled paper feel */}
      <div className="px-6 py-6 flex flex-col gap-0">
        <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
          Recommended Bundle
        </p>

        {bundle.skus.map((slug, i) => {
          const name = productNames[slug] ?? slug;
          const price = productPrices[slug];

          return (
            <div
              key={slug}
              className="flex items-baseline justify-between gap-4 py-2 border-b border-[var(--color-rule)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display uppercase tracking-[0.02em] text-body-md text-[var(--color-ink)]">
                  {name}
                </span>
              </div>
              {price && (
                <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-muted)] shrink-0">
                  ${price}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Rationale */}
      <div className="px-6 pb-6">
        <p className="font-body italic text-body-sm text-[var(--color-ink-muted)] leading-[1.4]">
          {bundle.rationale}
        </p>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        {isPlaceholder ? (
          <Button
            as="a"
            href={PHONE_FALLBACK_HREF}
            variant="primary"
            className="w-full justify-center"
          >
            {PHONE_FALLBACK_COPY}
          </Button>
        ) : (
          <Button
            as="a"
            href={bundle.paymentLinkUrl}
            variant="primary"
            className="w-full justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Checkout
          </Button>
        )}
      </div>

      {/* Bottom stamp */}
      <div className="px-6 pb-4 flex justify-between items-center border-t border-[var(--color-rule)]">
        <Stamp value="GB Feeds" label="Signed" />
        <Stamp value="Manhattan, KS" variant="county" />
      </div>
    </div>
  );
}
