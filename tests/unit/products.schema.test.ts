import { describe, it, expect } from 'vitest';
import { productSchema } from '@/lib/validators';

describe('productSchema', () => {
  const validProduct = {
    id: 2,
    sku: 'BC-40LB-2023',
    slug: 'buck-chow',
    legacyOlsSlug: 'buckchow',
    displayName: 'Buck Chow High Protein Feed — 40LB',
    category: 'deer-feed',
    priceUsd: '19.99',
    salePriceUsd: null,
    onSale: false,
    available: true,
    shortDescription: 'The perfect balance of attraction and nutrition.',
    descriptionFormatted: '"Extra Inches Aren\'t An Accident"\nFull description here.',
    primaryImage: '/products/buck-chow/buck-chow-hero-1024.avif',
    images: [
      { src: '/products/buck-chow/buck-chow-hero-1024.avif', alt: 'Buck Chow bag in field' },
    ],
    paymentLinkUrl: 'about:blank#TODO-create-stripe-link-BC-40LB-2023',
    bagTag: [
      { label: 'PROTEIN', value: '20', unit: '%' },
      { label: 'FAT', value: '4', unit: '%' },
      { label: 'FIBER', value: '8', unit: '%' },
    ],
    weight: '40 LB',
  };

  it('parses a valid product', () => {
    const result = productSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it('accepts a product without weight', () => {
    const { weight: _omit, ...rest } = validProduct;
    const result = productSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it('accepts a product with a sale price', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      priceUsd: '999.99',
      salePriceUsd: '949.99',
      onSale: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects a slug with uppercase letters', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      slug: 'Buck-Chow',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a priceUsd missing cents', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      priceUsd: '19',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a primaryImage not starting with /products/', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      primaryImage: '/og/buck-chow.png',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an image with empty alt text', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      images: [{ src: '/products/buck-chow/hero.avif', alt: '' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a bagTag with fewer than 3 stats', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      bagTag: [
        { label: 'PROTEIN', value: '20', unit: '%' },
        { label: 'FAT', value: '4', unit: '%' },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid category', () => {
    const result = productSchema.safeParse({
      ...validProduct,
      category: 'clothing', // not in enum
    });
    expect(result.success).toBe(false);
  });
});
