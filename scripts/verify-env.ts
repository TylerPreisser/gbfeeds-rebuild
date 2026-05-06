#!/usr/bin/env tsx
// scripts/verify-env.ts — GB Feeds build env verification
//
// Contract from .context/05_architecture.md § Env Var Taxonomy F.
// Runs as the first step of `npm run build` before next build.
//
// Behavior matrix:
//   DEV mode (no CF_PAGES_BRANCH set): warn-but-allow unset REQUIRED vars
//   PROD mode (CF_PAGES_BRANCH === 'main'): hard-fail on unset REQUIRED + PROD_REQUIRED vars
//   FORBIDDEN vars: throw immediately regardless of mode
//   OPTIONAL_VALIDATED: validate format when present, warn on invalid format

const isProd = process.env['CF_PAGES_BRANCH'] === 'main';
const mode = isProd ? 'PRODUCTION' : 'DEV';

// ─── FORBIDDEN — hard-fail immediately if present ──────────────────────────
// These belong in the Cloudflare Worker only, not in the Next.js build env.
const FORBIDDEN = ['RESEND_API_KEY', 'TURNSTILE_SECRET_KEY'] as const;

for (const name of FORBIDDEN) {
  if (process.env[name] !== undefined) {
    console.error(
      `\n[verify-env] FATAL: Forbidden env var "${name}" detected in the Next.js build environment.\n` +
        `  This key belongs in the Cloudflare Worker ONLY (set via \`wrangler secret put ${name}\`).\n` +
        `  It must NEVER appear in the Pages build environment — it is a P0 security incident.\n` +
        `  Rotate this secret immediately if it was exposed.\n`,
    );
    process.exit(1);
  }
}

// ─── REQUIRED — hard-fail in prod, warn in dev ─────────────────────────────
interface RequiredVar {
  name: string;
  validator: (v: string) => boolean;
  hint: string;
}

const REQUIRED: RequiredVar[] = [
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    validator: (v) => /^https?:\/\/[^\s]+$/.test(v),
    hint: 'Must be a full URL with protocol, e.g. https://gbfeeds.com',
  },
  {
    name: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
    validator: (v) => v.startsWith('0x') && v.length >= 20,
    hint: 'Cloudflare Turnstile site keys start with 0x and are >=20 chars',
  },
  {
    name: 'NEXT_PUBLIC_FORM_ENDPOINT',
    validator: (v) => /^https:\/\/[^\s]+\/contact$/.test(v),
    hint: 'Must be HTTPS Worker URL ending in /contact',
  },
];

const requiredFailures: string[] = [];

for (const { name, validator, hint } of REQUIRED) {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    if (isProd) {
      requiredFailures.push(`  • ${name}: MISSING — ${hint}`);
    } else {
      console.warn(`[verify-env] WARN: ${name} is not set. ${hint}`);
    }
  } else if (!validator(value)) {
    if (isProd) {
      requiredFailures.push(`  • ${name}: INVALID value "${value}" — ${hint}`);
    } else {
      console.warn(`[verify-env] WARN: ${name} has invalid format. ${hint}`);
    }
  }
}

// ─── PROD_REQUIRED — required only in production ───────────────────────────
const PROD_REQUIRED = ['NEXT_PUBLIC_GA_ID'] as const;

if (isProd) {
  for (const name of PROD_REQUIRED) {
    const value = process.env[name];
    if (!value || value.trim() === '') {
      requiredFailures.push(
        `  • ${name}: MISSING in production — GA4 measurement ID required on main branch`,
      );
    }
  }
}

if (requiredFailures.length > 0) {
  console.error(
    `\n[verify-env] BUILD FAILED (${mode}): Missing or invalid required env vars:\n` +
      requiredFailures.join('\n') +
      `\n\n  Set these in:\n` +
      `    Local dev: .env.local\n` +
      `    Production: Cloudflare Pages dashboard → Environment variables\n`,
  );
  process.exit(1);
}

// ─── OPTIONAL_VALIDATED — validate format when present ────────────────────
interface OptionalVar {
  name: string;
  validator: (v: string) => boolean;
  hint: string;
}

const OPTIONAL_VALIDATED: OptionalVar[] = [
  {
    name: 'NEXT_PUBLIC_GA_ID',
    validator: (v) => /^G-[A-Z0-9]{10}$/.test(v),
    hint: "GA4 IDs match G-XXXXXXXXXX (10 alphanumerics). Live ID: G-BF2FDR6KMM",
  },
  {
    name: 'NEXT_PUBLIC_GTM_ID',
    validator: (v) => /^GTM-[A-Z0-9]+$/.test(v),
    hint: 'GTM IDs match GTM-XXXXXX',
  },
  {
    name: 'NEXT_PUBLIC_FEATURE_FIELD_CLUB',
    validator: (v) => v === 'true' || v === 'false',
    hint: 'Must be the literal string "true" or "false"',
  },
];

for (const { name, validator, hint } of OPTIONAL_VALIDATED) {
  const value = process.env[name];
  if (value !== undefined && value.trim() !== '' && !validator(value)) {
    // Optional vars with bad format get a warning (not a failure)
    console.warn(`[verify-env] WARN: ${name} has invalid format. ${hint}`);
  }
}

// ─── All checks passed ─────────────────────────────────────────────────────
console.log(`[verify-env] OK (${mode}) — env taxonomy verified.`);
