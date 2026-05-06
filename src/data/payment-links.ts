// src/data/payment-links.ts
// Central registry of all Stripe Payment Link URLs.
// Phase 8 replaces every about:blank#TODO placeholder with a real Stripe URL.
// RSC-only: no 'use client'.
//
// TODO (Phase 8): Replace all placeholders with real Stripe Payment Link URLs.
// validate-products.ts will fail production builds while placeholders remain.

/**
 * Product-level payment links keyed by SKU.
 * Values must match products.live.json paymentLinkUrl fields.
 */
export const productPaymentLinks: Record<string, string> = {
  'BC-40LB-2023': 'about:blank#TODO-create-stripe-link-BC-40LB-2023',
  'CC-7LB-2023': 'about:blank#TODO-create-stripe-link-CC-7LB-2023',
  'BC-2000LB-2023': 'about:blank#TODO-create-stripe-link-BC-2000LB-2023',
  'GB-CAMOHAT': 'about:blank#TODO-create-stripe-link-GB-CAMOHAT',
  'GB-BLKHAT': 'about:blank#TODO-create-stripe-link-GB-BLKHAT',
  'RVL-X': 'about:blank#TODO-create-stripe-link-RVL-X',
  'RVL-X-PRO': 'about:blank#TODO-create-stripe-link-RVL-X-PRO',
  'TCT-RVL-X-GEN': 'about:blank#TODO-create-stripe-link-TCT-RVL-X-GEN',
  '32G-SD-CRD': 'about:blank#TODO-create-stripe-link-32G-SD-CRD',
  'LTH-RCH-BTT-CRT': 'about:blank#TODO-create-stripe-link-LTH-RCH-BTT-CRT',
  'DJS-CMR-STK': 'about:blank#TODO-create-stripe-link-DJS-CMR-STK',
  'XTR-SLR-PNL': 'about:blank#TODO-create-stripe-link-XTR-SLR-PNL',
  'TXS-WLD-SPP-2': 'about:blank#TODO-create-stripe-link-TXS-WLD-SPP-2',
  'TXS-WLD-SPP-600': 'about:blank#TODO-create-stripe-link-TXS-WLD-SPP-600',
  'TXS-WLD-SPP-6001': 'about:blank#TODO-create-stripe-link-TXS-WLD-SPP-6001',
  'TXS-WLD-SPP-21': 'about:blank#TODO-create-stripe-link-TXS-WLD-SPP-21',
};

/**
 * Bundle-level payment links keyed by `${region}-${season}-${goal}`.
 * 48 bundles total — all placeholders until Phase 8.
 */
export const bundlePaymentLinks: Record<string, string> = {
  // Kansas
  'kansas-pre-rut-trophy': 'about:blank#TODO-bundle-kansas-pre-rut-trophy',
  'kansas-pre-rut-health': 'about:blank#TODO-bundle-kansas-pre-rut-health',
  'kansas-pre-rut-density': 'about:blank#TODO-bundle-kansas-pre-rut-density',
  'kansas-rut-trophy': 'about:blank#TODO-bundle-kansas-rut-trophy',
  'kansas-rut-health': 'about:blank#TODO-bundle-kansas-rut-health',
  'kansas-rut-density': 'about:blank#TODO-bundle-kansas-rut-density',
  'kansas-post-rut-trophy': 'about:blank#TODO-bundle-kansas-post-rut-trophy',
  'kansas-post-rut-health': 'about:blank#TODO-bundle-kansas-post-rut-health',
  'kansas-post-rut-density': 'about:blank#TODO-bundle-kansas-post-rut-density',
  'kansas-antler-growth-trophy': 'about:blank#TODO-bundle-kansas-antler-growth-trophy',
  'kansas-antler-growth-health': 'about:blank#TODO-bundle-kansas-antler-growth-health',
  'kansas-antler-growth-density': 'about:blank#TODO-bundle-kansas-antler-growth-density',
  // Midwest
  'midwest-pre-rut-trophy': 'about:blank#TODO-bundle-midwest-pre-rut-trophy',
  'midwest-pre-rut-health': 'about:blank#TODO-bundle-midwest-pre-rut-health',
  'midwest-pre-rut-density': 'about:blank#TODO-bundle-midwest-pre-rut-density',
  'midwest-rut-trophy': 'about:blank#TODO-bundle-midwest-rut-trophy',
  'midwest-rut-health': 'about:blank#TODO-bundle-midwest-rut-health',
  'midwest-rut-density': 'about:blank#TODO-bundle-midwest-rut-density',
  'midwest-post-rut-trophy': 'about:blank#TODO-bundle-midwest-post-rut-trophy',
  'midwest-post-rut-health': 'about:blank#TODO-bundle-midwest-post-rut-health',
  'midwest-post-rut-density': 'about:blank#TODO-bundle-midwest-post-rut-density',
  'midwest-antler-growth-trophy': 'about:blank#TODO-bundle-midwest-antler-growth-trophy',
  'midwest-antler-growth-health': 'about:blank#TODO-bundle-midwest-antler-growth-health',
  'midwest-antler-growth-density': 'about:blank#TODO-bundle-midwest-antler-growth-density',
  // Plains
  'plains-pre-rut-trophy': 'about:blank#TODO-bundle-plains-pre-rut-trophy',
  'plains-pre-rut-health': 'about:blank#TODO-bundle-plains-pre-rut-health',
  'plains-pre-rut-density': 'about:blank#TODO-bundle-plains-pre-rut-density',
  'plains-rut-trophy': 'about:blank#TODO-bundle-plains-rut-trophy',
  'plains-rut-health': 'about:blank#TODO-bundle-plains-rut-health',
  'plains-rut-density': 'about:blank#TODO-bundle-plains-rut-density',
  'plains-post-rut-trophy': 'about:blank#TODO-bundle-plains-post-rut-trophy',
  'plains-post-rut-health': 'about:blank#TODO-bundle-plains-post-rut-health',
  'plains-post-rut-density': 'about:blank#TODO-bundle-plains-post-rut-density',
  'plains-antler-growth-trophy': 'about:blank#TODO-bundle-plains-antler-growth-trophy',
  'plains-antler-growth-health': 'about:blank#TODO-bundle-plains-antler-growth-health',
  'plains-antler-growth-density': 'about:blank#TODO-bundle-plains-antler-growth-density',
  // South
  'south-pre-rut-trophy': 'about:blank#TODO-bundle-south-pre-rut-trophy',
  'south-pre-rut-health': 'about:blank#TODO-bundle-south-pre-rut-health',
  'south-pre-rut-density': 'about:blank#TODO-bundle-south-pre-rut-density',
  'south-rut-trophy': 'about:blank#TODO-bundle-south-rut-trophy',
  'south-rut-health': 'about:blank#TODO-bundle-south-rut-health',
  'south-rut-density': 'about:blank#TODO-bundle-south-rut-density',
  'south-post-rut-trophy': 'about:blank#TODO-bundle-south-post-rut-trophy',
  'south-post-rut-health': 'about:blank#TODO-bundle-south-post-rut-health',
  'south-post-rut-density': 'about:blank#TODO-bundle-south-post-rut-density',
  'south-antler-growth-trophy': 'about:blank#TODO-bundle-south-antler-growth-trophy',
  'south-antler-growth-health': 'about:blank#TODO-bundle-south-antler-growth-health',
  'south-antler-growth-density': 'about:blank#TODO-bundle-south-antler-growth-density',
};

/**
 * Check if a payment link is still a placeholder.
 * Used by PDP + PrescriptionPad to show phone-fallback CTA.
 */
export function isPlaceholderLink(url: string): boolean {
  return url.startsWith('about:blank#TODO');
}

/** Phone fallback copy for placeholder CTAs */
export const PHONE_FALLBACK_COPY = 'CALL (620) 639-3337 TO ORDER';
export const PHONE_FALLBACK_HREF = 'tel:6206393337';
