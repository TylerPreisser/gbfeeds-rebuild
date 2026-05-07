#!/usr/bin/env tsx
// scripts/validate-client-data-boundary.ts
// Enforces the architectural rule: no file with 'use client' may import from @/data/*,
// unless explicitly documented in the APPROVED_EXCEPTIONS allowlist below.
//
// Run automatically as part of the build via package.json or manually:
//   npx tsx scripts/validate-client-data-boundary.ts

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';

const SRC_DIR = join(process.cwd(), 'src');

// ─── Approved exceptions ─────────────────────────────────────────────────────
// These client components MUST import from @/data/ because the data is needed
// at runtime for interactivity (not just at render time). Each exception must
// document WHY it cannot be converted to receive props from an RSC parent.
// Any NEW violation must be added here with justification before the build will pass.
const APPROVED_EXCEPTIONS = new Set([
  // NavMobileDrawer uses useState for toggle — cannot be RSC. Nav data is tiny
  // (< 1 KB) and serializable; acceptable client bundle contribution.
  'components/composite/NavMobileDrawer.tsx',
  // KansasMap renders interactive pin overlays that respond to scrollProgress prop.
  // County GeoJSON is read at render time. Refactoring to receive pre-filtered data
  // as props is tracked as a Round 2 optimization (reduces client bundle).
  'components/composite/KansasMap.tsx',
  // WizardClient is the feed program wizard — inherently interactive (useState for
  // step progression). Product and bundle data is needed client-side for step
  // matching. Phase 8 will move data fetching to the RSC shell (WizardDynamic).
  'components/page/WizardClient.tsx',
  // TestimonialFade crossfades testimonial text inside the home Kansas signature.
  // Reads testimonials.ts directly because the cycling state (useState +
  // setInterval) is purely client-side and the data is small (~22 short quotes,
  // ~3 KB serialized). Refactoring to receive an array prop adds zero value.
  'components/composite/TestimonialFade.tsx',
]);

// ─── File walker ─────────────────────────────────────────────────────────────

function walkSync(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkSync(full));
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      results.push(full);
    }
  }
  return results;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const files = walkSync(SRC_DIR);
const violations: string[] = [];

for (const file of files) {
  const content = readFileSync(file, 'utf-8');

  // Detect 'use client' directive at top of file
  const firstChars = content.trimStart().slice(0, 14);
  const isClientComponent = firstChars.startsWith("'use client'") || firstChars.startsWith('"use client"');

  if (!isClientComponent) continue;

  // Check for @/data/* imports
  const dataImportRegex = /from\s+['"]@\/data\//g;
  if (!dataImportRegex.test(content)) continue;

  const relPath = relative(SRC_DIR, file);
  if (!APPROVED_EXCEPTIONS.has(relPath)) {
    violations.push(relPath);
  }
}

if (violations.length > 0) {
  console.error('[validate-client-data-boundary] FAIL — unapproved client components importing from @/data/:');
  for (const v of violations) {
    console.error(`  src/${v}`);
  }
  console.error('');
  console.error('  Rule: @/data/* modules are RSC-only. Either:');
  console.error('  (a) Move data reads to the RSC parent and pass data as props, OR');
  console.error('  (b) Add to APPROVED_EXCEPTIONS with written justification.');
  process.exit(1);
} else {
  const exceptionCount = APPROVED_EXCEPTIONS.size;
  console.log(`[validate-client-data-boundary] OK — ${exceptionCount} approved exception(s), 0 unapproved violations.`);
}
