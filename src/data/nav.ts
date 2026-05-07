// src/data/nav.ts
// Single source of truth for navigation structure.
// Matches ORIGINAL_TRUTH.md § 1 exactly — hamburger-only, single drawer, 6 items.
// RSC-only: no 'use client'.

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Six-item drawer nav in the exact order from the original gbfeeds.com.
 * Per ORIGINAL_TRUTH.md § 1: Home / Products / Why GB Feeds / Our Story / Customer Reviews / Photo Gallery
 */
export const drawerNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Why GB Feeds', href: '/why-gb-feeds' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Customer Reviews', href: '/customer-reviews' },
  { label: 'Photo Gallery', href: '/photo-gallery' },
];

/** Legal links (footer only) */
export const legalNav: NavItem[] = [
  { label: 'Terms and Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

// Legacy named export to avoid breaking any remaining references
// (Footer.tsx uses nav.legal — update footer separately)
export const nav = {
  drawer: drawerNav,
  legal: legalNav,
} as const;
