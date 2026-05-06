// src/lib/validators.ts
// Zod schemas for runtime validation at form submission and data ingestion.
// RSC-safe: no 'use client'. Used in server actions, Worker, and build scripts.

import { z } from 'zod';

// ─── Form schemas ─────────────────────────────────────────────────────────────

/**
 * Contact form schema.
 * Submitted to Cloudflare Worker → Resend.
 * __hp_field is the honeypot — must be empty string on submission.
 * turnstileToken is validated server-side by Worker → Cloudflare Turnstile siteverify.
 */
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email address required').max(254),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  turnstileToken: z.string().min(1, 'Turnstile verification required'),
  /** Honeypot field — must be empty. Filled = bot. */
  __hp_field: z.literal('', { errorMap: () => ({ message: 'Bot detected' }) }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Newsletter signup form schema.
 * Used by <NewsletterForm> in Footer and <FieldClubWaitlistForm>.
 */
export const newsletterFormSchema = z.object({
  email: z.string().email('Valid email address required').max(254),
  turnstileToken: z.string().min(1, 'Turnstile verification required'),
  /** Honeypot — must be empty. */
  __hp_field: z.literal('', { errorMap: () => ({ message: 'Bot detected' }) }),
});

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

// ─── Data schemas ─────────────────────────────────────────────────────────────

/**
 * HarvestsFile schema — validates public/data/harvests.json at build time.
 * Matches HarvestsFile interface in src/types/harvests.ts.
 */
const HarvestSchema = z.object({
  id: z.string().min(1),
  first_name: z.string().min(1),
  county: z.string().min(1),
  fips: z.string().length(5).regex(/^\d{5}$/, 'FIPS must be 5 digits'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be ISO 8601 YYYY-MM-DD'),
  inches: z.number().positive().max(300, 'Antler score > 300 — verify data'),
  lat: z.number().optional(),
  lng: z.number().optional(),
  sku: z.string().optional(),
});

export const harvestsFileSchema = z.object({
  updated_at: z.string().min(1),
  total_inches: z.number().positive(),
  pins: z.array(HarvestSchema),
});

export type ValidatedHarvestsFile = z.infer<typeof harvestsFileSchema>;

/**
 * Product schema for build-time validation.
 * Mirrors ProductSchema in src/data/products.ts — keep in sync.
 */
const BagTagStatSchemaValidator = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().nullable().optional(),
});

export const productSchema = z.object({
  id: z.number(),
  sku: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  legacyOlsSlug: z.string().min(1),
  displayName: z.string().min(1),
  category: z.enum(['deer-feed', 'deer-feeders', 'apparel', 'tactacam']),
  priceUsd: z.string().regex(/^\d+\.\d{2}$/),
  salePriceUsd: z.string().nullable(),
  onSale: z.boolean(),
  available: z.boolean(),
  shortDescription: z.string(),
  descriptionFormatted: z.string(),
  primaryImage: z.string().startsWith('/products/'),
  images: z.array(
    z.object({
      src: z.string().startsWith('/products/'),
      alt: z.string().min(1),
    }),
  ),
  paymentLinkUrl: z.string().min(1),
  bagTag: z.tuple([BagTagStatSchemaValidator, BagTagStatSchemaValidator, BagTagStatSchemaValidator]),
  weight: z.string().optional(),
});

export type ValidatedProduct = z.infer<typeof productSchema>;

/**
 * Bundle schema for wizard output validation.
 */
export const bundleSchema = z.object({
  region: z.enum(['kansas', 'midwest', 'plains', 'south']),
  season: z.enum(['pre-rut', 'rut', 'post-rut', 'antler-growth']),
  goal: z.enum(['trophy', 'health', 'density']),
  skus: z.array(z.string()).min(1).max(4),
  rationale: z.string().min(1),
  paymentLinkUrl: z.string().min(1),
});

export type ValidatedBundle = z.infer<typeof bundleSchema>;
