#!/usr/bin/env tsx
// scripts/validate-harvests.ts — GB Feeds harvest data validator
//
// Reads public/data/harvests.json and validates against the HarvestsFile zod schema.
// Runs as part of `npm run build` before next build.
// Throws with a helpful error message if the shape is invalid.

import { readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

// ─── Zod schema for HarvestsFile ──────────────────────────────────────────
// Mirrors src/types/harvests.ts — kept in sync manually.
// Phase 6C.11 Vitest tests validate this schema against fixtures.

const HarvestSchema = z.object({
  id: z.string().min(1, 'Harvest id must be a non-empty string'),
  first_name: z.string().min(1, 'first_name must be a non-empty string'),
  county: z.string().min(1, 'county must be a non-empty string'),
  fips: z
    .string()
    .regex(/^\d{5}$/, 'fips must be a 5-digit string (e.g., "20161")'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be ISO 8601 (YYYY-MM-DD)'),
  inches: z.number().positive('inches must be a positive number'),
  lat: z.number().optional(),
  lng: z.number().optional(),
  sku: z.string().optional(),
});

const HarvestsFileSchema = z.object({
  updated_at: z
    .string()
    .min(1, 'updated_at is required (ISO 8601 date or datetime)'),
  total_inches: z
    .number()
    .positive('total_inches must be a positive number'),
  pins: z.array(HarvestSchema),
});

// ─── Read and validate ─────────────────────────────────────────────────────

const harvestsPath = join(process.cwd(), 'public', 'data', 'harvests.json');

let raw: unknown;
try {
  const fileContent = readFileSync(harvestsPath, 'utf-8');
  raw = JSON.parse(fileContent);
} catch (err) {
  console.error(
    `\n[validate-harvests] ERROR: Could not read public/data/harvests.json\n` +
      `  Path: ${harvestsPath}\n` +
      `  Error: ${err instanceof Error ? err.message : String(err)}\n` +
      `  Ensure the file exists with the seed shape:\n` +
      `    { "updated_at": "YYYY-MM-DD", "total_inches": 7500, "pins": [] }\n`,
  );
  process.exit(1);
}

const result = HarvestsFileSchema.safeParse(raw);

if (!result.success) {
  const issues = result.error.issues
    .map((issue) => `  • ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');

  console.error(
    `\n[validate-harvests] VALIDATION FAILED: public/data/harvests.json has invalid shape.\n` +
      `  Issues:\n${issues}\n\n` +
      `  Greg: check .context/harvests-schema.md for the correct format.\n`,
  );
  process.exit(1);
}

const { total_inches, pins } = result.data;

// Sanity-check: total_inches should be >= sum of pin inches (Greg may set it higher
// for marketing reasons, but it should never be lower than the sum of real pins)
if (pins.length > 0) {
  const sumOfPins = pins.reduce((acc, pin) => acc + pin.inches, 0);
  if (total_inches < sumOfPins) {
    console.warn(
      `[validate-harvests] WARN: total_inches (${total_inches}) is less than the ` +
        `sum of all pin inches (${sumOfPins.toFixed(1)}). ` +
        `If all pins are included in total_inches, this is a data inconsistency.`,
    );
  }
}

console.log(
  `[validate-harvests] OK — ${pins.length} pins validated. total_inches: ${total_inches}.`,
);
