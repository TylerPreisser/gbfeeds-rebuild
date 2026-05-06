// src/lib/format.ts
// Small formatting helpers for display rendering.
// RSC-safe: no 'use client'. Used by PriceTag, Stamp, and LiveCount.

// ─── Price formatting ─────────────────────────────────────────────────────────

/**
 * Formats a price string "19.99" → "$19.99"
 * Accepts either a number (treated as dollars) or a string.
 * Preserves the string format from products.live.json (avoids float precision issues).
 *
 * @example
 * formatPrice("19.99")  → "$19.99"
 * formatPrice("999.99") → "$999.99"
 * formatPrice(19.99)    → "$19.99"
 */
export function formatPrice(price: string | number): string {
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  }
  // Already formatted as "X.XX" from products.live.json
  return `$${price}`;
}

/**
 * Splits a price string into [dollars, cents] tuple.
 *
 * @example
 * splitPrice("19.99")  → ["19", "99"]
 * splitPrice("999.99") → ["999", "99"]
 */
export function splitPrice(price: string): [string, string] {
  const [dollars = '0', cents = '00'] = price.split('.');
  return [dollars, cents.padEnd(2, '0').slice(0, 2)];
}

// ─── Antler measurement ───────────────────────────────────────────────────────

/**
 * Formats an antler score in whole inches.
 * Used by AntlerInchesCounter and harvest tooltips.
 *
 * @example
 * formatInches(162)   → "162 INCHES"
 * formatInches(7500)  → "7,500 INCHES"
 */
export function formatInches(n: number): string {
  return `${n.toLocaleString('en-US')} INCHES`;
}

/**
 * Formats a number with comma separators.
 * Used by the antler counter display.
 *
 * @example
 * formatCount(7500)  → "7,500"
 * formatCount(162)   → "162"
 */
export function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

// ─── Date formatting ──────────────────────────────────────────────────────────

/**
 * Formats an ISO 8601 date string to a logbook-style stamp.
 *
 * @example
 * formatDate("2024-10-08") → "OCT 08 2024"
 */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`); // force UTC to avoid tz shift
  return date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .toUpperCase()
    .replace(',', '');
}

/**
 * Formats an ISO date to a short readable form.
 *
 * @example
 * formatDateShort("2024-10-08") → "Oct 8, 2024"
 */
export function formatDateShort(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
