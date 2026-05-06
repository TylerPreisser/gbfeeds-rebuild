// src/types/harvests.ts
// Harvest pin data types — sourced from public/data/harvests.json.
// RSC-import-safe: no client-only imports.

/**
 * A single harvest pin submitted by a GB Feeds customer.
 * Greg edits harvests.json to add entries; build validates via validate-harvests.ts.
 */
export interface Harvest {
  /** Unique identifier for this harvest pin (e.g., "riley-2024-01") */
  id: string;
  /** Customer first name only — displayed in hover tooltip */
  first_name: string;
  /** Kansas county name (e.g., "Riley") */
  county: string;
  /** 5-digit FIPS code matching kansas-counties.ts entries (e.g., "20161") */
  fips: string;
  /** Harvest date in ISO 8601 format (YYYY-MM-DD) */
  date: string;
  /** Antler score in inches (e.g., 162.5) */
  inches: number;
  /** Optional GPS latitude for precise pin placement */
  lat?: number;
  /** Optional GPS longitude for precise pin placement */
  lng?: number;
  /** Optional SKU of the GB Feeds product used (e.g., "BC-40LB-2023") */
  sku?: string;
}

/**
 * Shape of public/data/harvests.json — the live counter source of truth.
 * Greg edits this file and commits; Cloudflare Pages auto-rebuilds.
 */
export interface HarvestsFile {
  /** ISO 8601 timestamp of last Greg-edit (e.g., "2026-05-06") */
  updated_at: string;
  /** Canonical total antler inches — the SINGLE stat used by <AntlerInchesCounter>.
   *  Replaces the three inconsistent stats (5,000 / 7,500 / 10,000) from the legacy site. */
  total_inches: number;
  /** All individual harvest pins shown on the Kansas county map */
  pins: Harvest[];
}
