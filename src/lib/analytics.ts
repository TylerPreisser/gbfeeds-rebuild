// src/lib/analytics.ts
// GA4 helpers — gated by NEXT_PUBLIC_GA_ID. No-ops if env not set.
// This file is safe to import in RSC (no window refs at module level).
// The window.gtag calls only execute in browser context.

// ─── gtag type declaration ────────────────────────────────────────────────────

// Extend Window to include the gtag global loaded by GA4 <Script>.
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const GA_ID = process.env['NEXT_PUBLIC_GA_ID'];

/**
 * Returns true if GA4 is configured and we're in the browser.
 */
function isEnabled(): boolean {
  return Boolean(GA_ID) && typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Track a page view. Called by <RouteChangeTracker> on pathname changes.
 * No-op if GA_ID is not set or we're on the server.
 *
 * @param path - The page path (e.g., '/products/buck-chow')
 */
export function trackPageView(path: string): void {
  if (!isEnabled() || !GA_ID) return;
  window.gtag?.('config', GA_ID, {
    page_path: path,
  });
}

/**
 * Track a custom GA4 event.
 * No-op if GA_ID is not set or we're on the server.
 *
 * @param name - GA4 event name (snake_case per GA4 convention)
 * @param params - Optional event parameters
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!isEnabled() || !GA_ID) return;
  window.gtag?.('event', name, params);
}

/**
 * Returns the GA4 measurement ID if configured, or null.
 * Used by <Script> in layout.tsx to conditionally render the gtag script.
 */
export function getGaId(): string | null {
  return GA_ID ?? null;
}

// ─── Event names (type-safe constants) ───────────────────────────────────────

export const GA_EVENTS = {
  /** User clicks a Stripe Payment Link CTA */
  PURCHASE_INTENT: 'purchase_intent',
  /** User submits the contact form */
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  /** User submits the newsletter form */
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  /** User submits the Field Club waitlist form */
  FIELD_CLUB_WAITLIST: 'field_club_waitlist',
  /** User completes the wizard and sees a bundle */
  WIZARD_COMPLETE: 'wizard_complete',
  /** User scrolls past the AntlerInchesCounter pin section */
  COUNTER_SEEN: 'counter_seen',
} as const;
