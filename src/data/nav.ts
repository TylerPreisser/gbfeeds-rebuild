// src/data/nav.ts
// Single source of truth for navigation structure.
// Used by NavBar, Footer, sitemap.ts, and routes.ts.
// RSC-only: no 'use client'.

export interface NavItem {
  label: string;
  href: string;
  /** Optional stamp text shown on hover (nav variant hover pattern) */
  stamp?: string;
}

export const nav = {
  primary: [
    { label: 'Shop', href: '/products', stamp: '16 ITEMS' },
    { label: 'Feed Program', href: '/feed-program', stamp: 'RX FOR SEASON' },
    { label: 'Field Club', href: '/field-club', stamp: 'MEMBERS ONLY' },
    { label: 'Journal', href: '/journal', stamp: 'FIELD NOTES' },
    { label: 'Our Story', href: '/our-story', stamp: 'EST. 2017 KS' },
  ] as NavItem[],

  secondary: [
    { label: 'Why GB Feeds', href: '/why-gb-feeds' },
    { label: 'Reviews', href: '/customer-reviews' },
    { label: 'Photos', href: '/photo-gallery' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ] as NavItem[],

  seasons: [
    { label: 'Pre-Rut', href: '/season/pre-rut', stamp: 'SEPT–OCT' },
    { label: 'Rut', href: '/season/rut', stamp: 'OCT–NOV' },
    { label: 'Post-Rut', href: '/season/post-rut', stamp: 'NOV–JAN' },
    { label: 'Antler Growth', href: '/season/antler-growth', stamp: 'APR–AUG' },
  ] as NavItem[],

  legal: [
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
  ] as NavItem[],
} as const;

/** Flat array of all nav items (useful for sitemap and routes.ts) */
export const allNavItems: NavItem[] = [
  ...nav.primary,
  ...nav.secondary,
  ...nav.seasons,
  ...nav.legal,
];
