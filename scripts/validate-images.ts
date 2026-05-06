#!/usr/bin/env tsx
// scripts/validate-images.ts — GB Feeds image budget enforcer
//
// Walks public/products/ and public/og/ and enforces per-image budget rules
// from .context/05_architecture.md § 10 Performance Budgets (Risk 3).
//
// Budget table (AVIF):
//   320w  ≤  22 KB
//   640w  ≤  45 KB
//   1024w ≤  80 KB  ← LCP gate
//   1600w ≤ 130 KB
//   2400w ≤ 200 KB
//
// OG cards: every PNG in public/og/ ≤ 200 KB
//
// Total public/products/ budget: ≤ 28 MB
//
// If public/products/ does not exist yet (Phase 6B pending), skips with a warning.

import { existsSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

// ─── Budget definitions ────────────────────────────────────────────────────

const AVIF_BUDGETS: Record<string, number> = {
  '320': 22 * 1024,
  '640': 45 * 1024,
  '1024': 80 * 1024,
  '1600': 130 * 1024,
  '2400': 200 * 1024,
};

const WEBP_BUDGETS: Record<string, number> = {
  '320': 32 * 1024,
  '640': 65 * 1024,
  '1024': 120 * 1024,
  '1600': 200 * 1024,
  '2400': 300 * 1024,
};

const JPEG_BUDGETS: Record<string, number> = {
  '320': 50 * 1024,
  '640': 110 * 1024,
  '1024': 200 * 1024,
  '1600': 320 * 1024,
  '2400': 480 * 1024,
};

const OG_BUDGET = 200 * 1024; // 200 KB per OG card
const PRODUCTS_TOTAL_BUDGET = 28 * 1024 * 1024; // 28 MB

// ─── Helpers ──────────────────────────────────────────────────────────────

function walkDir(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Extract the width in pixels from a filename like:
 *   buck-chow-hero-1024.avif → 1024
 *   bc-40lb-2023-alt-1-640.webp → 640
 */
function extractWidth(filename: string): string | null {
  // Pattern: ends with -<width>.<ext>
  const match = /[-_](\d+)\.(avif|webp|jpe?g)$/i.exec(filename);
  return match?.[1] ?? null;
}

// ─── Validate public/products/ ────────────────────────────────────────────

const productsDir = join(process.cwd(), 'public', 'products');
const violations: string[] = [];

if (!existsSync(productsDir)) {
  console.warn(
    `[validate-images] WARN: public/products/ not found — skipping product image validation. ` +
      `Phase 6B creates this directory.`,
  );
} else {
  const productFiles = walkDir(productsDir);
  let totalProductSize = 0;

  for (const filePath of productFiles) {
    const stat = statSync(filePath);
    const size = stat.size;
    totalProductSize += size;

    const filename = basename(filePath);
    const ext = extname(filename).toLowerCase().replace('.', '');
    const widthStr = extractWidth(filename);

    if (!widthStr) continue; // skip files without width in name

    let budget: number | undefined;

    if (ext === 'avif') {
      budget = AVIF_BUDGETS[widthStr];
    } else if (ext === 'webp') {
      budget = WEBP_BUDGETS[widthStr];
    } else if (ext === 'jpg' || ext === 'jpeg') {
      budget = JPEG_BUDGETS[widthStr];
    }

    if (budget !== undefined && size > budget) {
      const relative = filePath.replace(process.cwd() + '/', '');
      violations.push(
        `  • ${relative}: ${(size / 1024).toFixed(1)} KB > ${(budget / 1024).toFixed(0)} KB budget (${widthStr}w ${ext.toUpperCase()})`,
      );
    }
  }

  // Total budget check
  if (totalProductSize > PRODUCTS_TOTAL_BUDGET) {
    const totalMB = (totalProductSize / (1024 * 1024)).toFixed(1);
    violations.push(
      `  • public/products/ total: ${totalMB} MB > ${PRODUCTS_TOTAL_BUDGET / (1024 * 1024)} MB budget`,
    );
  }

  if (violations.length === 0) {
    const totalMB = (totalProductSize / (1024 * 1024)).toFixed(1);
    console.log(
      `[validate-images] OK — ${productFiles.length} product images under budget. ` +
        `Total: ${totalMB} MB / 28 MB.`,
    );
  }
}

// ─── Validate public/og/ ──────────────────────────────────────────────────

const ogDir = join(process.cwd(), 'public', 'og');

if (!existsSync(ogDir)) {
  console.warn(
    `[validate-images] WARN: public/og/ not found — skipping OG card validation. ` +
      `Phase 6B creates this directory.`,
  );
} else {
  const ogFiles = walkDir(ogDir).filter((f) => f.endsWith('.png'));
  const ogViolations: string[] = [];

  for (const filePath of ogFiles) {
    const size = statSync(filePath).size;
    if (size > OG_BUDGET) {
      const relative = filePath.replace(process.cwd() + '/', '');
      ogViolations.push(
        `  • ${relative}: ${(size / 1024).toFixed(1)} KB > 200 KB budget`,
      );
    }
  }

  if (ogViolations.length > 0) {
    violations.push(...ogViolations);
  } else {
    console.log(
      `[validate-images] OK — ${ogFiles.length} OG cards under 200 KB budget.`,
    );
  }
}

// ─── Report ───────────────────────────────────────────────────────────────

if (violations.length > 0) {
  console.error(
    `\n[validate-images] BUILD FAILED: Image budget violations detected:\n` +
      violations.join('\n') +
      `\n\n  Fix: re-encode at lower quality, or use a smaller source image.\n` +
      `  Budget table: AVIF 1024w ≤ 80 KB, total public/products/ ≤ 28 MB, OG ≤ 200 KB.\n`,
  );
  process.exit(1);
}
