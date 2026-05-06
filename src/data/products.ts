// src/data/products.ts
// Typed wrapper for products.live.json — validates with Zod at build time.
// RSC-only: no 'use client'. Do not import from client components.

import productsJson from './products.live.json';
import { z } from 'zod';
import type { Product, Category } from '@/types/product';

// ─── Zod schema ──────────────────────────────────────────────────────────────

const BagTagStatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().nullable().optional(),
});

export const ProductSchema = z.object({
  id: z.number(),
  sku: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
  legacyOlsSlug: z.string().min(1),
  displayName: z.string().min(1),
  category: z.enum(['deer-feed', 'deer-feeders', 'apparel', 'tactacam']),
  priceUsd: z.string().regex(/^\d+\.\d{2}$/, 'priceUsd must be X.XX format'),
  salePriceUsd: z.string().nullable(),
  onSale: z.boolean(),
  available: z.boolean(),
  shortDescription: z.string(),
  descriptionFormatted: z.string(),
  primaryImage: z.string().startsWith('/products/'),
  images: z.array(
    z.object({
      src: z.string().startsWith('/products/'),
      alt: z.string().min(1, 'alt text is required on all product images'),
    }),
  ),
  paymentLinkUrl: z.string().min(1),
  bagTag: z.tuple([BagTagStatSchema, BagTagStatSchema, BagTagStatSchema]),
  weight: z.string().optional(),
});

// ─── Validated array ──────────────────────────────────────────────────────────

/**
 * All 16 products — Zod-validated at module load time.
 * Build fails at validate-products.ts if any entry is malformed.
 */
const { products: rawProducts } = productsJson as { products: unknown[] };

export const products: Product[] = rawProducts.map((p, i) => {
  const result = ProductSchema.safeParse(p);
  if (!result.success) {
    throw new Error(
      `products.live.json entry[${i}] failed validation:\n${result.error.message}`,
    );
  }
  return result.data as Product;
});

// ─── Query helpers ────────────────────────────────────────────────────────────

/** Get all 16 products */
export function getAllProducts(): Product[] {
  return products;
}

/** Get a single product by slug. Returns null if not found. */
export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

/** Get products filtered by category */
export function getProductsByCategory(cat: Category): Product[] {
  return products.filter((p) => p.category === cat);
}

/** Get products in a specific order: deer-feed first, then feeders, then cams, then apparel */
export function getProductsSorted(): Product[] {
  const order: Category[] = ['deer-feed', 'deer-feeders', 'tactacam', 'apparel'];
  return [...products].sort(
    (a, b) => order.indexOf(a.category) - order.indexOf(b.category),
  );
}

/** Get all product slugs for generateStaticParams */
export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
