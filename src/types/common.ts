// src/types/common.ts
// Shared utility types used across the GB Feeds rebuild.
// RSC-import-safe: no client-only imports.

// ─── Branded types ──────────────────────────────────────────────────────────

/**
 * Branded string type for URL slugs.
 * Prevents accidental use of arbitrary strings where a well-formed slug is expected.
 * Usage: const slug: Slug = 'buck-chow' as Slug;
 */
export type Slug = string & { readonly __brand: 'Slug' };

/**
 * Branded type for SKU codes (e.g., "BC-40LB-2023").
 * Preserves original OLS SKU format verbatim.
 */
export type SkuCode = string & { readonly __brand: 'SkuCode' };

/**
 * Branded type for FIPS county codes (5-digit, e.g., "20161").
 */
export type FipsCode = string & { readonly __brand: 'FipsCode' };

// ─── Utility types ──────────────────────────────────────────────────────────

/**
 * Makes all properties of T deeply readonly.
 * Used to lock data-layer exports against mutation.
 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/**
 * Extracts the value type from a Record.
 */
export type ValueOf<T extends Record<string, unknown>> = T[keyof T];

/**
 * Non-nullable version — strips null and undefined.
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

// ─── Page / routing ─────────────────────────────────────────────────────────

/**
 * Props shape for Next.js static route pages with a [slug] segment.
 * Usage: export default function Page({ params }: SlugPageProps) {}
 */
export interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Props shape for Next.js static route pages with a [phase] segment.
 */
export interface PhasePageProps {
  params: Promise<{ phase: string }>;
}

// ─── Component utilities ────────────────────────────────────────────────────

/**
 * Standard props for polymorphic components (e.g., <Button as="a">).
 */
export interface PolymorphicProps<T extends React.ElementType = 'div'> {
  as?: T;
}

/**
 * Children prop shorthand.
 */
export interface WithChildren {
  children: React.ReactNode;
}

/**
 * Optional children.
 */
export interface WithOptionalChildren {
  children?: React.ReactNode;
}

/**
 * Class name override prop.
 */
export interface WithClassName {
  className?: string;
}
