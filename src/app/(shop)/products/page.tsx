// src/app/(shop)/products/page.tsx
// RSC shell — /products index page.
// Static export: all 16 product cards render as static HTML.
// Category filtering is handled client-side by ProductFilterChips (useSearchParams)
// which is scoped in a Suspense boundary inside ProductsIndex — does NOT bail out
// the entire page's static render.

import type { Metadata } from 'next';
import { ProductsIndex } from '@/components/page/ProductsIndex';
import { buildMetadata, breadcrumbSchema, itemListSchema } from '@/lib/seo';
import { getAllProducts } from '@/data/products';

export const metadata: Metadata = buildMetadata({
  title: 'Products — Buck Chow, Corn Candy & More | GB Feeds',
  description:
    'Shop GB Feeds deer feed products: Buck Chow high protein feed, Corn Candy attractant, Tactacam trail cameras, Texas Wildlife Supply feeders, and GB Feeds apparel.',
  canonical: '/products',
  ogImage: '/og/default.png',
});

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
  ]);
  const itemList = itemListSchema(
    allProducts.map((p) => ({ name: p.displayName, url: `/products/${p.slug}/` })),
    'GB Feeds Product Catalog',
    '/products',
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      {/* RSC renders directly — Suspense is scoped INSIDE ProductsIndex to wrap
          only <ProductFilterChips> which calls useSearchParams().
          The product grid (all 16 cards) is outside the Suspense boundary,
          so it renders as static HTML for crawlers and non-JS users. */}
      <ProductsIndex products={allProducts} />
    </>
  );
}
