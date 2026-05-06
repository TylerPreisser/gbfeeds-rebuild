import { describe, it, expect } from 'vitest';
import { canonical } from '@/lib/seo';

// NEXT_PUBLIC_SITE_URL is set to 'https://gbfeeds.com' via vitest.config.ts env

describe('canonical()', () => {
  it('appends trailing slash to a bare path', () => {
    expect(canonical('/products/buck-chow')).toBe('https://gbfeeds.com/products/buck-chow/');
  });

  it('does not double-append a trailing slash', () => {
    expect(canonical('/products/buck-chow/')).toBe('https://gbfeeds.com/products/buck-chow/');
  });

  it('handles the home path', () => {
    expect(canonical('/')).toBe('https://gbfeeds.com/');
  });

  it('prepends a slash if the path does not start with one', () => {
    expect(canonical('products/buck-chow')).toBe('https://gbfeeds.com/products/buck-chow/');
  });

  it('works for journal paths', () => {
    expect(canonical('/journal/stand-7b-riley')).toBe(
      'https://gbfeeds.com/journal/stand-7b-riley/',
    );
  });
});
