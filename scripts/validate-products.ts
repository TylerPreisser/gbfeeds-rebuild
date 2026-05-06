#!/usr/bin/env tsx
// scripts/validate-products.ts — GB Feeds product data validator
//
// Reads src/data/products.live.json (when it exists) and validates every entry
// against the Product zod schema.
// Runs as part of `npm run build` before next build.
//
// Behavior:
//   - If products.live.json does not exist: warn and skip (Phase 6C.7 creates it)
//   - If it exists: validate all entries; fail if any placeholder paymentLinkUrls
//     in production (NODE_ENV === 'production')

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

// ─── Zod schema ──────────────────────────────────────────────────────────────
// Mirrors src/types/product.ts Product interface.
// Must be kept in sync with the full ProductSchema in src/data/products.ts.

const BagTagStatSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  unit: z.string().optional(),
});

const ProductImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1, 'alt text is required on all product images'),
});

const CategorySchema = z.enum(['deer-feed', 'deer-feeders', 'apparel', 'tactacam']);

const ProductSchema = z.object({
  id: z.number().int().positive(),
  sku: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'slug must be lowercase kebab-case'),
  legacyOlsSlug: z.string().min(1),
  displayName: z.string().min(1),
  category: CategorySchema,
  priceUsd: z.string().regex(/^\d+\.\d{2}$/, 'priceUsd must be "XX.XX" format'),
  salePriceUsd: z
    .string()
    .regex(/^\d+\.\d{2}$/, 'salePriceUsd must be "XX.XX" format')
    .nullable(),
  onSale: z.boolean(),
  available: z.boolean(),
  shortDescription: z.string().min(1),
  descriptionFormatted: z.string().min(1),
  primaryImage: z.string().min(1),
  images: z.array(ProductImageSchema).min(1),
  paymentLinkUrl: z.string().url('paymentLinkUrl must be a valid URL'),
  bagTag: z.tuple([BagTagStatSchema, BagTagStatSchema, BagTagStatSchema]),
  weight: z.string().optional(),
});

const ProductsFileSchema = z.object({
  products: z.array(ProductSchema),
});

// ─── Read and validate ─────────────────────────────────────────────────────

const productsPath = join(process.cwd(), 'src', 'data', 'products.live.json');

if (!existsSync(productsPath)) {
  // Phase 6C.7 creates this file. Until then, skip gracefully.
  console.warn(
    `[validate-products] WARN: src/data/products.live.json not found — skipping validation. ` +
      `Phase 6C.7 creates this file.`,
  );
  process.exit(0);
}

let raw: unknown;
try {
  const fileContent = readFileSync(productsPath, 'utf-8');
  raw = JSON.parse(fileContent);
} catch (err) {
  console.error(
    `\n[validate-products] ERROR: Could not parse src/data/products.live.json\n` +
      `  Error: ${err instanceof Error ? err.message : String(err)}\n`,
  );
  process.exit(1);
}

const result = ProductsFileSchema.safeParse(raw);

if (!result.success) {
  const issues = result.error.issues
    .map((issue) => `  • ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');

  console.error(
    `\n[validate-products] VALIDATION FAILED: src/data/products.live.json has invalid shape.\n` +
      `  Issues:\n${issues}\n`,
  );
  process.exit(1);
}

const { products } = result.data;

// ─── Placeholder payment link check ───────────────────────────────────────
// In production, any placeholder paymentLinkUrl aborts the build.
// In dev/preview, warn only.

const placeholders = products.filter((p) =>
  p.paymentLinkUrl.startsWith('about:blank#TODO-'),
);

if (placeholders.length > 0) {
  const slugList = placeholders.map((p) => `  • ${p.slug} (${p.sku})`).join('\n');
  const isProduction = process.env['NODE_ENV'] === 'production';

  if (isProduction) {
    console.error(
      `\n[validate-products] BUILD FAILED: ${placeholders.length} product(s) have placeholder ` +
        `paymentLinkUrls in a production build.\n` +
        `  Affected products:\n${slugList}\n\n` +
        `  Create real Stripe Payment Links in Phase 8 and update products.live.json.\n`,
    );
    process.exit(1);
  } else {
    console.warn(
      `[validate-products] WARN: ${placeholders.length} product(s) have placeholder paymentLinkUrls ` +
        `(OK in dev/preview — Phase 8 will create real Stripe Payment Links):\n${slugList}`,
    );
  }
}

console.log(
  `[validate-products] OK — ${products.length} products validated. ` +
    `${placeholders.length} placeholder payment links (Phase 8 pending).`,
);
