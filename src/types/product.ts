// src/types/product.ts
// Product domain types — sourced from src/data/products.live.json.
// RSC-import-safe: no client-only imports.

// ─── Discriminated enums ────────────────────────────────────────────────────

/** Geographic target market for wizard filtering */
export type Region = 'kansas' | 'midwest' | 'plains' | 'south';

/** Whitetail feeding season phase for wizard filtering */
export type Season = 'pre-rut' | 'rut' | 'post-rut' | 'antler-growth';

/** Customer hunting goal for wizard filtering */
export type Goal = 'trophy' | 'health' | 'density';

/**
 * Product category — drives filter URLs (?cat=deer-feed) and navigation.
 * Note: architecture doc uses 'deer-feeders' in some places; using 'feeder'
 * to match live_products.json source.
 */
export type Category = 'deer-feed' | 'deer-feeders' | 'apparel' | 'tactacam';

// ─── Bag-tag triptych stat ──────────────────────────────────────────────────

/**
 * One stat in the BagTagTriptych (three-panel display on PDPs).
 * Feed products: { Protein / Fat / Calcium }
 * Non-feed products: { Weight / Capacity / Runtime }
 */
export interface BagTagStat {
  /** The primary large number/value displayed (e.g., "20%", "40", "3 MILES") */
  value: string;
  /** Bold label below the value (e.g., "PROTEIN", "WEIGHT", "RUNTIME") */
  label: string;
  /** Optional sub-label for unit or qualifier (e.g., "LBS", "MAX", "HOURS") */
  unit?: string;
}

// ─── Product image ──────────────────────────────────────────────────────────

export interface ProductImage {
  /** Path under /products/<sku>/ (e.g., "buck-chow-hero-1024.avif") */
  src: string;
  /** Required alt text — enforced at type level */
  alt: string;
}

// ─── Core product interface ─────────────────────────────────────────────────

/**
 * Full product shape. Sourced from src/data/products.live.json.
 * Zod schema at src/data/products.ts validates every field at build time.
 */
export interface Product {
  /** Numeric ID from the original OLS system — preserved for inventory continuity */
  id: number;
  /** Original OLS SKU code (e.g., "BC-40LB-2023") — preserved verbatim */
  sku: string;
  /** SEO-clean URL slug (e.g., "buck-chow") — new rebuild field */
  slug: string;
  /** Original OLS URL slug for _redirects mapping (e.g., "buckchow") */
  legacyOlsSlug: string;
  /** Title Case display name (e.g., "Buck Chow High Protein Feed — 40LB") */
  displayName: string;
  /** Product category for filter URLs and navigation */
  category: Category;
  /** Price in USD as a string to avoid float precision issues (e.g., "19.99") */
  priceUsd: string;
  /** Sale price in USD (null if not on sale) */
  salePriceUsd: string | null;
  /** Whether this product is currently on sale */
  onSale: boolean;
  /** Whether this product is in stock */
  available: boolean;
  /** One-sentence marketing description for product cards and OG tags */
  shortDescription: string;
  /** Full formatted description (may contain HTML/markdown) for PDP */
  descriptionFormatted: string;
  /** Primary image path under /products/<slug>/ */
  primaryImage: string;
  /** All product images */
  images: ProductImage[];
  /**
   * Stripe Payment Link URL (https://buy.stripe.com/<id>).
   * Placeholder during build: "about:blank#TODO-create-stripe-link-<sku>".
   * Phase 8 replaces placeholders with real URLs. validate-products.ts
   * fails production builds with placeholder URLs.
   */
  paymentLinkUrl: string;
  /**
   * Three-stat bag-tag triptych. Exactly 3 stats per product.
   * Feed: [Protein, Fat, Calcium]. Non-feed: product-specific stats.
   */
  bagTag: [BagTagStat, BagTagStat, BagTagStat];
  /** Physical shipping weight (e.g., "40 LBS") — optional, used for feeders */
  weight?: string;
}

// ─── Composite types ────────────────────────────────────────────────────────

/**
 * Feed-program bundle: one resolved output from the wizard (region + season + goal).
 * 48 bundles total (4 regions × 4 seasons × 3 goals).
 */
export interface Bundle {
  region: Region;
  season: Season;
  goal: Goal;
  /** 2–3 product slugs in recommended application order */
  skus: string[];
  /** One-line "WHY THIS COMBINATION" rationale shown on the PrescriptionPad */
  rationale: string;
  /**
   * Bundle Stripe Payment Link URL.
   * Placeholder format: "about:blank#TODO-bundle-<region>-<season>-<goal>".
   */
  paymentLinkUrl: string;
}

/**
 * Why-GB-Feeds four-pillar block. Numbered 01–04.
 */
export interface Pillar {
  number: '01' | '02' | '03' | '04';
  eyebrow: string;
  heading: string;
  body: string;
}

/**
 * Customer testimonial — verbatim, first-name only, no avatars.
 * All 22 testimonials from CONTENT_INVENTORY.md § /customer-reviews.
 */
export interface Testimonial {
  /** Slug-style ID (e.g., "nathan-buck-chow-1") */
  id: string;
  /** Verbatim quote — no editing */
  quote: string;
  /** First name only (e.g., "Nathan") */
  attribution: string;
  /** Product mentioned, inferred for filtering */
  productMentioned?: 'buck-chow' | 'corn-candy' | null;
  /** ISO 8601 date if known */
  date?: string | null;
}

/**
 * One FAQ entry — verbatim from CONTENT_INVENTORY.md § FAQ.
 * All 4 entries ship on home AND /faq.
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

/**
 * Journal article metadata — frontmatter from src/content/journal/*.mdx.
 */
export interface JournalEntry {
  slug: string;
  title: string;
  /** ISO 8601 date (e.g., "2024-10-08") */
  date: string;
  /** Kansas county where the entry was set */
  county: string;
  season: Season;
  weather: string;
  wind: string;
  /** Deer activity score 1–5 */
  activityScore: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  /** Path under /photos/ for the cover image */
  coverImage: string;
  /** Estimated reading time in minutes */
  readMinutes: number;
  /** 1–2 sentence deck/teaser copy */
  dek: string;
  /**
   * When true: article is agent-authored and pending Greg's review.
   * Adds noindex + DRAFT banner. Phase 8 removes after approval.
   */
  draft?: boolean;
}

/**
 * Season metadata for /season/[phase] pages.
 */
export interface SeasonMeta {
  phase: Season;
  /** Display name (e.g., "Pre-Rut") */
  displayName: string;
  /** Human-readable date range (e.g., "Late September → Mid-October") */
  dateRange: string;
  /** Serif dek copy for season hero */
  description: string;
  /** 2-paragraph essay on nutritional priorities during this phase */
  nutritionalPriority: string;
  /** Optional CSS color modifier token for season accent */
  accentModifier?: string;
}
