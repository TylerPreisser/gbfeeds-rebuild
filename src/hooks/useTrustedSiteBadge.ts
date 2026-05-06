'use client';
// src/hooks/useTrustedSiteBadge.ts
// Returns TrustedSite badge configuration based on NEXT_PUBLIC_TRUSTEDSITE_ID env var.
// If the env var is not set, returns { enabled: false, scriptSrc: null }.

interface TrustedSiteBadgeConfig {
  /** Whether TrustedSite is configured — false if NEXT_PUBLIC_TRUSTEDSITE_ID is unset */
  enabled: boolean;
  /** Full script src URL, or null if not enabled */
  scriptSrc: string | null;
}

const TRUSTEDSITE_ID = process.env['NEXT_PUBLIC_TRUSTEDSITE_ID'];

/**
 * Returns TrustedSite badge configuration.
 *
 * Gate logic:
 *   - If NEXT_PUBLIC_TRUSTEDSITE_ID is set → enabled: true, scriptSrc with the ID
 *   - If not set → enabled: false, scriptSrc: null (renders nothing, zero network calls)
 *
 * Used by <TrustedSiteBadge> composite component (Phase 6D.1).
 * Per 6E.2 gate: without ID, zero network calls to trustedsite.com.
 *
 * @example
 * const { enabled, scriptSrc } = useTrustedSiteBadge();
 * if (!enabled) return null;
 * return <Script src={scriptSrc} />;
 */
export function useTrustedSiteBadge(): TrustedSiteBadgeConfig {
  if (!TRUSTEDSITE_ID) {
    return { enabled: false, scriptSrc: null };
  }

  return {
    enabled: true,
    scriptSrc: `https://cdn.ywxi.net/js/1.js`,
  };
}
