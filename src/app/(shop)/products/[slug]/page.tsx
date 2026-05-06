// src/app/(shop)/products/[slug]/page.tsx
// RSC — no 'use client'.
// Dynamic PDP route. Statically exports all 16 SKU pages via generateStaticParams.
// Template: <ProductDetail> is shared across all 16 slugs; this file never needs
// editing when Phase 6D.4 fans out the remaining 15 PDPs.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/page/ProductDetail';
import { getAllProducts, getProductBySlug } from '@/data/products';
import { buildMetadata } from '@/lib/seo';

// ─── Static params ────────────────────────────────────────────────────────────

/**
 * Generates static pages for ALL 16 SKUs at build time.
 * Buck Chow is the first one verified; no per-SKU config needed.
 */
export function generateStaticParams(): { slug: string }[] {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return buildMetadata({
    title: `${product.displayName} — GB Feeds`,
    description: product.shortDescription,
    canonical: `/products/${slug}`,
    ogImage: `/og/products-${slug}.png`,
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
