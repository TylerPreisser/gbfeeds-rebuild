import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn()', () => {
  it('deduplicates conflicting Tailwind classes (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('deduplicates px vs p', () => {
    // tailwind-merge: px-4 is more specific in the x-axis, p-2 sets all axes
    // p-2 px-4 → px-4 overrides the x-axis of p-2
    const result = cn('p-2', 'px-4');
    expect(result).toContain('px-4');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, null as unknown as string, 'bar')).toBe('foo bar');
  });

  it('handles conditional objects (clsx behavior)', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500');
  });

  it('merges non-conflicting classes', () => {
    expect(cn('flex', 'items-center', 'gap-4')).toBe('flex items-center gap-4');
  });

  it('handles bg + text class combinations', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });
});
