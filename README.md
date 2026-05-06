# GB Feeds Website

Marketing + commerce site for **GB Feeds** — a small-batch specialty deer-feed brand from Kansas. Migration target: replace the legacy GoDaddy Website Builder 8 + Online Store mirror with a fast, SEO-clean, statically-exported Next.js 15 site deployed to Cloudflare Pages, with a separate Cloudflare Worker handling the contact / newsletter / waitlist forms.

Live origin: **https://gbfeeds.com** (post-deploy)

Aesthetic direction: "Kansas Field Logbook" — bone-paper canvas (`#EDE7D9`) + loam-ink (`#0F0E0B`) + oxblood-brick accent (`#B33A1A`). Editorial almanac, not orange-camo hunting catalog. See `.context/04_design_brief.md` for the full direction.

---

## Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router, `output: 'export'`) | 15.5.15 |
| UI runtime | React + React DOM | 19.2.6 |
| Language | TypeScript | 5.7.3 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) | 4.2.4 |
| Animation | Framer Motion (`m` + `LazyMotion`) | 11.18.2 |
| Animation | GSAP (+ `@gsap/react`) — home-only dynamic chunk | 3.15.0 / 2.1.2 |
| Smooth scroll | Lenis — route-conditional | 1.3.23 |
| Content | next-mdx-remote (3 launch journal articles) | 6.0.0 |
| Validation | Zod — pre-build data schemas | 3.25.76 |
| Icons | lucide-react | 0.469.0 |
| Util | clsx + tailwind-merge | 2.1.1 / 2.6.1 |
| Hosting | Cloudflare Pages (static) | — |
| Forms backend | Cloudflare Worker (`gbfeeds-forms`) — separate deploy unit | — |
| Email | Resend (Worker-only secret) | — |
| Bot defense | Cloudflare Turnstile | — |
| Commerce | Stripe Payment Links (zero JS bundle — pure `<a href>`) | — |

The site is a **fully static export** — no Node server runtime in production. All dynamic behavior (forms, payments, anti-bot) lives at the network edge: forms in the Worker, payments at Stripe-hosted URLs, Turnstile at Cloudflare's challenge endpoint.

---

## Setup

```bash
git clone <repo-url> gbfeeds-rebuild
cd gbfeeds-rebuild
npm install
cp .env.example .env.local
```

**Required:**
- Node ≥ 20.11.0 (matches `engines.node`).
- npm 10+. (We pin specific versions in `package.json`; `npm ci` is preferred in CI.)

**`.env.local` for local dev** — copy `.env.example` and fill the public keys you want to test against. None are strictly required for `npm run dev` to start; the build script (`scripts/verify-env.ts`) only enforces `NEXT_PUBLIC_SITE_URL` as REQUIRED. Forms will fail closed locally if Turnstile / Worker endpoint are unset (intentional: silent dev-mode posting to a real Worker would corrupt rate-limit data).

---

## Development

```bash
npm run dev
# → http://localhost:3000
```

Notes for full local feature parity (optional):

- `NEXT_PUBLIC_GA_ID` unset → analytics disabled (the `<Script>` tag for `gtag.js` doesn't render). Recommended for dev.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `NEXT_PUBLIC_FORM_ENDPOINT` unset → forms render but POST will fail. To exercise forms locally, either run the Worker via `wrangler dev` in `cloudflare-worker/` and point the env at `http://127.0.0.1:8787`, or use a staging Worker URL.
- `NEXT_PUBLIC_TRUSTEDSITE_ID` unset → badge component renders nothing (graceful).
- `NEXT_PUBLIC_FEATURE_FIELD_CLUB` defaults to `false` → `/field-club` shows the waitlist form (the launch behavior).

---

## Build

```bash
npm run build
```

The build chain runs in this order — any step's failure halts the build:

1. `tsx scripts/verify-env.ts` — enforces `NEXT_PUBLIC_SITE_URL`; warns on bad-format optional vars; FAILS on the presence of `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` (those are Worker-only secrets and must NEVER reach the Pages build environment — surfacing them is a P0 security incident).
2. `tsx scripts/validate-harvests.ts` — Zod-validates `public/data/harvests.json` shape.
3. `tsx scripts/validate-products.ts` — Zod-validates `src/data/products.live.json` (16 SKUs); production mode rejects `about:blank#TODO-` placeholder Payment Links.
4. `tsx scripts/validate-images.ts` — checks every `<Image>`-referenced asset exists at the expected width breakpoints (320/640/1024/1600/2400) in AVIF + WebP + JPEG.
5. `tsx scripts/validate-client-data-boundary.ts` — enforces architecture rule: data modules in `src/data/` are RSC-only; client components import data only via `'use server'`-style indirection or props.
6. `next build` — produces `out/` (38 routes, 33 static + 5 SSG, ~10s on a modern laptop).

Output: `out/` is the deploy artifact. Cloudflare Pages uploads this directory verbatim.

```bash
npm run build:analyze   # ANALYZE=true npm run build → opens .next/analyze/client.html
```

Bundle floor is ~102 KB gz (Next.js 15 + React 19 framework + reconciler — irreducible without switching runtimes). Per-route budgets are documented in `.context/05_architecture.md` § 10.

---

## Test

```bash
npm run lint           # ESLint v9 flat config (next/core-web-vitals + boundaries + a11y)
npm run type-check     # tsc --noEmit
npm run test:unit      # Vitest run (current: ~50 specs across 7 files)
```

Unit tests cover the pure data + lib boundary:
- `tests/unit/feed-program-map.test.ts` — region/season/goal → bundle resolution
- `tests/unit/cross-sell.test.ts` — PDP cross-sell map
- `tests/unit/products.schema.test.ts` — Zod schema for `products.live.json`
- `tests/unit/harvests.schema.test.ts` — Zod schema for `harvests.json`
- `tests/unit/seo.test.ts` — `buildMetadata()` + JSON-LD helpers
- `tests/unit/wizard-reducer.test.ts` — Feed Program Wizard state machine
- `tests/unit/cn.test.ts` — `cn()` className util

E2E + Lighthouse are scaffolded for Phase 9 — not part of the unit test gate.

---

## Deploy

Phase 9 will set up the CI/CD pipeline. Until then:

```bash
# Pages (static site)
npm run build
wrangler pages deploy out --project-name=gbfeeds-rebuild

# Worker (forms backend) — separate deploy
cd cloudflare-worker
wrangler deploy
```

**Push to `main` triggers CI** once `.github/workflows/deploy.yml` + `worker.yml` land in Phase 9. The Worker has its own workflow with a `paths: ['cloudflare-worker/**']` filter so a Worker hotfix never blocks on a Pages Lighthouse gate (and vice versa).

Required env vars + secrets for production deploy: see `RUNBOOK.md` § "Setting env vars + secrets" and `.context/08_integrations.md` § "Phase 9 Deploy Checklist."

---

## Editing content

| What | Where | Who edits |
|---|---|---|
| Product copy / SKUs / prices | `src/data/products.live.json` | Tyler / Greg |
| Stripe Payment Link URLs | `src/data/products.live.json::paymentLinkUrl` (per-SKU) + `src/data/payment-links.ts` (per-bundle) | Tyler |
| Journal articles | `src/content/journal/<slug>.mdx` + `src/data/journal-index.ts` | Greg (drafts) → Tyler (publish: flip `draft: false`, build, push) |
| FAQ items | `src/data/faq.ts` | Greg |
| Testimonials | `src/data/testimonials.ts` | Greg |
| Antler-inches counter | `public/data/harvests.json` (seed: 7,500) | Greg |
| Brand colors / fonts | `src/styles/tokens.css` | Tyler (any change requires QA pass) |
| Legal pages | `src/app/(legal)/terms/page.tsx`, `src/app/(legal)/privacy/page.tsx` | Tyler (privacy needs vendor disclosure refresh) |
| Photos / OG cards | `public/photos/`, `public/og/`, `public/products/` | image-editor-pro (Phase 6 baseline already shipped) |
| Redirects | `public/_redirects` (CF Pages format) | Tyler (legacy URL parity locked at 30 entries; only edit when adding new pages) |
| Security headers / CSP | `public/_headers` | Tyler (any third-party script add requires CSP `script-src` + `connect-src` review) |

Detailed how-to instructions live in `RUNBOOK.md`.

---

## Architecture overview

> Full canonical plan: `.context/05_architecture.md` (1,671 lines). The summary below is for fast onboarding.

The site is a **route-grouped Next.js App Router export** (`src/app/(shop)`, `(editorial)`, `(membership)`, `(support)`, `(legal)`) with **strict layer boundaries** enforced by `eslint-plugin-boundaries`:

```
atomic/     — leaf components (Image, Button, Stamp, Container) — no inward dependencies
composite/  — atomic + decoration combinations (PrescriptionPad, MarqueeTicker, BagTagTriptych)
decoration/ — pure visual flourishes (Stamp, RuledBackground, EyebrowStripe)
motion/     — the only files allowed to import from framer-motion / gsap / lenis
page/       — route-level shells (ProductDetail, Home, Journal)
data/       — RSC-only typed data modules (products, faq, testimonials, journal-index, …)
lib/        — cn, seo, routes, analytics, validators (no React)
hooks/      — client-only hooks
app/        — route segments + sitemap.ts + robots.ts + manifest.ts
```

**Data flow rule**: data flows inward (page → composite → atomic). The `'use client'` directive is allowed only on motion components, the 3 forms, the Wizard, the MarqueeTicker, and the RouteChangeTracker — enforced at file-name level by the ESLint config.

**Static export contract**: every dynamic segment uses `generateStaticParams()` exhaustively. There is no `revalidate`, no `'use server'`, no API route. All forms POST to the external Worker.

**Performance budget floor**: 102 KB gz (irreducible Next 15 + React 19 baseline). Re-baselined per-route budgets in § 10 of the architecture doc — all routes verified green in QA.

---

## Operating decisions / known limitations

These decisions are intentional and documented elsewhere; calling them out here so that future contributors don't accidentally re-litigate:

1. **Reamaze chat dropped at launch.** The legacy GoDaddy auth-bridge endpoint (`/m/api/reamaze/v2/...`) lives on retired infrastructure and dies with the rebuild. Re-attaching Reamaze post-launch is documented in `RUNBOOK.md` § "Reamaze re-attachment" — requires CSP allowance + privacy-policy update.

2. **GoDaddy OLS replaced by Stripe Payment Links.** Commerce is now `<a href="https://buy.stripe.com/...">` per SKU and per bundle — no Stripe.js bundle, zero PCI scope on `gbfeeds.com`. 16 SKU links + 48 bundle links must be created by Tyler in the Stripe dashboard before launch (see `.context/08_integrations.md`).

3. **Build-time `harvests.json` baking.** No admin UI, no DB, no Worker. Greg edits + commits + CF Pages CI rebuilds. This is the locked pattern for the live antler-inches counter; an admin-UI upgrade path via Cloudflare KV is documented but not implemented.

4. **Legals + journal currently `noindex`.** `/terms`, `/privacy`, and the 3 launch journal articles ship with `metadata.robots.index = false` and `draft: true` (journal) until copy is finalized. Removing the flag publishes them to the sitemap. Phase 8 / post-launch task.

5. **CSP carries `'unsafe-inline'` for `script-src`.** Required for the GA4 init snippet; tracked as P2 in the security audit. Post-launch tightening to nonce-based CSP is on the security backlog.

6. **38 routes, no admin surface.** The site has no auth, no user accounts, no per-user state. The legacy `/m/*` user-portal redirects all 301 to `/` — by design.

7. **Three brand stat numbers in original copy.** Live mirror had "7,500", "10,000", and "5,000" inches across three pages. The rebuild canonicalizes on **7,500** (driven by `harvests.json`). All other copy updated to match. (Q1 in STATE.md, resolved Phase 4.)

8. **Cloudflare Pages is the only hosting target.** The original Phase 0 plan was GitHub Pages; switched to Cloudflare in Phase 2 because the security audit flagged the lack of `_headers`-based CSP/HSTS as a P1. Same static export, same $0 cost, but full edge-header control.

---

## Project state

| Phase | Status |
|---|---|
| 0 — Bootstrap & Routing | Done |
| 1 — Cartography | Done |
| 2 — Live Recon & Industry Lock | Done |
| 3 — Competitor Intelligence (8 comps) | Done |
| 4 — Design Direction Brief | Done |
| 5 — Architecture & Plan | Done |
| 6 — Build Execution (6A–6E) | Done |
| 7 — Quality Loop (3 rounds) | Done |
| 8 — Integration Migration & Compliance | **In progress (this dispatch)** |
| 9 — Deploy | Pending |

See `.context/STATE.md` for the live engagement ledger and `.context/CHANGELOG.md` for the per-dispatch audit trail.

---

## Contact

Internal engagement — Tyler Preisser. Brand owner — Greg Brungardt (GB Feeds, Hays/Riley/Ellis County, Kansas).

---

*Built with restraint. Bone paper. Loam ink. Oxblood brick.*
