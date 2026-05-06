import { describe, it, expect } from 'vitest';
import { getBundle, getAllBundles } from '@/data/feed-program-map';

describe('feed-program-map', () => {
  it('returns a non-null Bundle for kansas / rut / trophy', () => {
    const bundle = getBundle('kansas', 'rut', 'trophy');
    expect(bundle).not.toBeNull();
  });

  it('kansas / rut / trophy bundle has at least 1 SKU', () => {
    const bundle = getBundle('kansas', 'rut', 'trophy');
    expect(bundle.skus.length).toBeGreaterThanOrEqual(1);
  });

  it('bundle includes region, season, and goal fields matching the request', () => {
    const bundle = getBundle('kansas', 'rut', 'trophy');
    expect(bundle.region).toBe('kansas');
    expect(bundle.season).toBe('rut');
    expect(bundle.goal).toBe('trophy');
  });

  it('returns a non-null Bundle for south / antler-growth / density', () => {
    const bundle = getBundle('south', 'antler-growth', 'density');
    expect(bundle).not.toBeNull();
    expect(bundle.skus.length).toBeGreaterThanOrEqual(1);
  });

  it('returns exactly 48 bundles in getAllBundles()', () => {
    expect(getAllBundles()).toHaveLength(48);
  });

  it('every bundle has a rationale string', () => {
    const bundles = getAllBundles();
    for (const bundle of bundles) {
      expect(typeof bundle.rationale).toBe('string');
      expect(bundle.rationale.length).toBeGreaterThan(0);
    }
  });

  it('every bundle has a paymentLinkUrl string', () => {
    const bundles = getAllBundles();
    for (const bundle of bundles) {
      expect(typeof bundle.paymentLinkUrl).toBe('string');
    }
  });
});
