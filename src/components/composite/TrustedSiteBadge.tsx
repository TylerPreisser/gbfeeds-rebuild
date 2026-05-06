'use client';
// src/components/composite/TrustedSiteBadge.tsx
// 'use client' — uses useTrustedSiteBadge hook + mounts next/script.
// Renders nothing if NEXT_PUBLIC_TRUSTEDSITE_ID is unset (zero network calls).
// Phase 6E.2 wires into root layout.
// Boundary: imports only hooks/.

import Script from 'next/script';
import { useTrustedSiteBadge } from '@/hooks/useTrustedSiteBadge';

/**
 * <TrustedSiteBadge> — env-gated TrustedSite script mount.
 * Positioned bottom-left (handled by the TrustedSite snippet itself).
 * Phase 6E.2 gate: without NEXT_PUBLIC_TRUSTEDSITE_ID, zero network calls.
 */
export function TrustedSiteBadge() {
  const { enabled, scriptSrc } = useTrustedSiteBadge();

  if (!enabled || !scriptSrc) return null;

  return (
    <Script
      src={scriptSrc}
      strategy="lazyOnload"
      id="trustedsite-badge"
      data-cf-beacon=""
    />
  );
}
