import { describe, it, expect } from 'vitest';
import { harvestsFileSchema } from '@/lib/validators';

describe('harvestsFileSchema', () => {
  const validFixture = {
    updated_at: '2026-05-06',
    total_inches: 7500,
    pins: [
      {
        id: 'riley-2024-01',
        first_name: 'Tyler',
        county: 'Riley',
        fips: '20161',
        date: '2024-10-08',
        inches: 162.5,
        sku: 'BC-40LB-2023',
      },
    ],
  };

  it('parses a valid HarvestsFile', () => {
    const result = harvestsFileSchema.safeParse(validFixture);
    expect(result.success).toBe(true);
  });

  it('accepts a file with zero pins', () => {
    const result = harvestsFileSchema.safeParse({
      ...validFixture,
      pins: [],
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing total_inches', () => {
    const { total_inches: _omit, ...rest } = validFixture;
    const result = harvestsFileSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejects a pin with a malformed FIPS code (non-digits)', () => {
    const result = harvestsFileSchema.safeParse({
      ...validFixture,
      pins: [{ ...validFixture.pins[0], fips: '2016X' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a pin with a FIPS code that is too short', () => {
    const result = harvestsFileSchema.safeParse({
      ...validFixture,
      pins: [{ ...validFixture.pins[0], fips: '2016' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a negative antler score', () => {
    const result = harvestsFileSchema.safeParse({
      ...validFixture,
      pins: [{ ...validFixture.pins[0], inches: -5 }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects an absurdly large antler score (> 300)', () => {
    const result = harvestsFileSchema.safeParse({
      ...validFixture,
      pins: [{ ...validFixture.pins[0], inches: 999 }],
    });
    expect(result.success).toBe(false);
  });
});
