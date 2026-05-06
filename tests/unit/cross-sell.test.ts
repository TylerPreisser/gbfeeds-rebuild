import { describe, it, expect } from 'vitest';
import { crossSellMap, getCrossSells } from '@/data/cross-sell-map';
import { getAllProductSlugs } from '@/data/products';

describe('cross-sell-map', () => {
  it('every key in crossSellMap is a valid product slug', () => {
    const validSlugs = new Set(getAllProductSlugs());
    for (const key of Object.keys(crossSellMap)) {
      expect(validSlugs.has(key), `"${key}" is not a valid product slug`).toBe(true);
    }
  });

  it('every suggested slug in crossSellMap is a valid product slug', () => {
    const validSlugs = new Set(getAllProductSlugs());
    for (const [key, suggestions] of Object.entries(crossSellMap)) {
      for (const slug of suggestions) {
        expect(
          validSlugs.has(slug),
          `crossSellMap["${key}"] contains invalid slug "${slug}"`,
        ).toBe(true);
      }
    }
  });

  it('getCrossSells returns at most 3 items', () => {
    for (const slug of Object.keys(crossSellMap)) {
      expect(getCrossSells(slug).length).toBeLessThanOrEqual(3);
    }
  });

  it('getCrossSells returns [] for an unknown slug', () => {
    expect(getCrossSells('nonexistent-product')).toEqual([]);
  });

  it('buck-chow-40lb cross-sells include corn-candy-7lb', () => {
    // Slugs updated in 6D.2 slug reconciliation to match 6B.2 public/products/ folder names
    expect(getCrossSells('buck-chow-40lb')).toContain('corn-candy-7lb');
  });
});
