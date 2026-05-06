# Phase 9 — Deploy

> Author: web-code-executor. Date: 2026-05-06.
> Inputs: `05_architecture.md` § 12 + § Deploy Workflow Design (cicd-pipeline-architect Phase 5); `08_integrations.md` Phase 9 Deploy Checklist.

---

## Phase 9A+9B — Deploy Workflows + Testing Infrastructure

### A. Workflow Files

| File | Trigger | Purpose |
|---|---|---|
| `.github/workflows/deploy.yml` | push/PR to `main` + `workflow_dispatch` | Full gate pipeline: lint + type-check + test-unit (parallel) → build → test-e2e + lighthouse (parallel) → deploy-pages (main only) |
| `.github/workflows/worker.yml` | push to `main` with `cloudflare-worker/**` path filter | Deploy Cloudflare Worker (`gbfeeds-forms`) independently of Pages |

**Job graph (`deploy.yml`)**:
```
lint ─┐
type-check ─┤─ build ─┬─ test-e2e ─┐
test-unit ──┘         └─ lighthouse ─┴─ deploy-pages (main only)
```

**Key decisions**:
- `actions/setup-node@v4` with `cache: 'npm'` on all jobs.
- `actions/cache@v4` for `.next/cache` in `build` job (key: `nextjs-<os>-node20-<package-lock-hash>`).
- `out/` uploaded via `actions/upload-artifact@v4` (retention: 1 day) from `build`; consumed by `test-e2e`, `lighthouse`, `deploy-pages`.
- Build-time env vars pulled from GitHub repo Secrets (mirrored from CF Pages dashboard — source of truth remains CF Pages).
- `deploy-pages` uses `cloudflare/wrangler-action@v3` → `pages deploy out --project-name=gbfeeds-rebuild`.
- Worker-runtime secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) are NOT in GitHub Secrets. Managed via `wrangler secret put` directly into Cloudflare. Documented in a top-of-file comment in `worker.yml`.
- `wait-on` added to devDeps; used in CI to wait for `serve` readiness before Playwright/Lighthouse runs.

### B. Testing Infrastructure (Stub Level)

| File | Purpose |
|---|---|
| `playwright.config.ts` | 4 projects: chromium-desktop, iPhone 14, Pixel 7, reduced-motion (Desktop Chrome + reducedMotion as-any cast for 1.51.x type compat) |
| `tests/e2e/home-200.spec.ts` | Smoke: `/` returns 200, single `<h1>` containing "DEER FEEDS", canonical link present, single `<main>` landmark |
| `tests/e2e/pdp-buck-chow.spec.ts` | Smoke: `/products/buck-chow-40lb/` returns 200, single `<h1>`, BagTag triptych (`[data-testid="bag-tag"]`) ≥ 3 panels visible, CTA link present (Stripe or tel: fallback) |
| `lighthouserc.json` | URLs: `/`, `/products/buck-chow-40lb/`, `/contact/`. Asserts: perf ≥ 0.85, a11y ≥ 0.95, best-practices ≥ 0.95, seo ≥ 0.95 (desktop preset). Upload target: filesystem → `.lighthouseci/`. |

**DevDependency additions** (package.json):
- `@playwright/test@1.51.1` (bumped from architecturally-specified 1.49.1 to satisfy Next 15.5.15 peerOptional constraint)
- `@lhci/cli@0.14.0`
- `@lhci/utils@0.14.0`
- `wait-on@8.0.3` (CI serve-readiness gating)

**Script additions** (package.json):
- `test:e2e:ui` — `playwright test --ui`
- `lighthouse` updated to `lhci autorun --config=./lighthouserc.json`

**Stub caveat**: The full 10-spec E2E suite from `05_architecture.md` § C (routes-smoke, wizard, contact-form mock, newsletter, sitemap-robots, 404) is a follow-up engagement. These 2 specs provide a non-zero CI gate that would catch catastrophic regressions today.

### C. Final Clean Build Verification (2026-05-06)

| Gate | Result |
|---|---|
| `npm install` | exit 0 (required `--cache /tmp/npm-cache-gbfeeds` to bypass npm cache EACCES on `intl-messageformat`) |
| `npm run lint` | exit 0 — 0 errors, 8 pre-existing warnings (img element, unused vars) |
| `npm run type-check` | exit 0 |
| `npm run test:unit` | exit 0 — 48 tests across 7 files |
| `npm run build` | exit 0 — 38 routes (33 static + 5 SSG); 102 kB first-load JS shared |
| `ls out/` | index.html + all expected routes present |
| `ls .github/workflows/` | `deploy.yml` (7650 B) + `worker.yml` (2101 B) |
| `ls cloudflare-worker/` | `index.ts`, `test.ts`, `tsconfig.json`, `wrangler.toml` |

**Deploy blocker surfaced**: npm cache directory at `/Users/tylerpreisser/.npm-clean-cache` has a permissions conflict on `intl-messageformat` (EACCES on rename). Requires `sudo chown -R $(whoami) /Users/tylerpreisser/.npm-clean-cache` once. Does not affect CI (CI uses a fresh runner with no stale cache).

**Playwright version note**: Architecture specifies `@playwright/test@1.49.1`; Next 15.5.15 declares `peerOptional @playwright/test@^1.51.1`. Upgraded to `1.51.1`. No API changes affect the authored specs or config.

### D. Required GitHub Secrets (before first CI run)

| Secret | Consumer |
|---|---|
| `CLOUDFLARE_API_TOKEN` | `deploy.yml` + `worker.yml` |
| `CLOUDFLARE_ACCOUNT_ID` | `deploy.yml` + `worker.yml` |
| `NEXT_PUBLIC_SITE_URL` | `deploy.yml` build job |
| `NEXT_PUBLIC_GA_ID` | `deploy.yml` build job |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `deploy.yml` build job |
| `NEXT_PUBLIC_FORM_ENDPOINT` | `deploy.yml` build job |
| `NEXT_PUBLIC_TRUSTEDSITE_ID` | `deploy.yml` build job |
| `NEXT_PUBLIC_FEATURE_FIELD_CLUB` | `deploy.yml` build job |
| `LHCI_GITHUB_APP_TOKEN` | `deploy.yml` lighthouse job (optional — enables PR comment upsert) |

Worker-runtime secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`) are NOT here — set via `wrangler secret put` per `08_integrations.md` Phase 9 Deploy Checklist Steps 3–4.

---

## Release Decision

> Author: release-manager. 2026-05-06 16:56.
> Inputs reviewed: `08_integrations.md` (verification matrix + 10-step Phase 9 checklist); `07_qa_loop.md` (3 QA rounds + Round 3 fix-up: legals + journal noindex, field-club CTA guard, LiveCount documentation); `STATE.md` (open questions ledger, locked decisions); `09_deploy.md` § A–D (workflow files + testing infra + clean-build gates); `README.md` + `RUNBOOK.md` (operator docs).

### Decision: **GO-WITH-CONDITIONS**

The orchestrator MAY proceed to commit + create the new private repo + push to GitHub. The orchestrator MUST NOT trigger a production-domain (`gbfeeds.com`) deploy until Tyler completes the 10-step checklist in `08_integrations.md` § B. A preview deploy to `*.pages.dev` IS authorized once Pages env vars are set, because Stripe placeholder guards (`tel:` fallback) + `_redirects` trapping `/m/*` legacy URLs make a soft preview safe even with placeholders in place.

### Rationale (5 bullets)

- **All 10 readiness checks pass.** Lint clean (0 errors / 8 pre-existing warnings), type-check clean, 48/48 unit tests, `next build` exit 0 with all 38 routes (33 static + 5 SSG) generating successfully, all routes spot-checked 200 in `out/` smoke. Bundle budgets re-baselined in `05_architecture.md` § 10 are green per route.
- **Zero P0 / zero P1 carry-forward.** Round 1 P0s (mobile, perf) closed in fix pass; Round 2 (bundle budgets, products-grid static-HTML) closed; Round 3 fix-up closed legals + journal noindex + field-club placeholder CTA guard. Remaining items are P2/P3 documentation polish or post-launch flips (real legal copy, Greg article approval, Stripe Customer Portal).
- **Repository artefacts complete.** `.github/workflows/deploy.yml` (7650 B) + `worker.yml` (2101 B); `cloudflare-worker/` with `index.ts` (16 KB) + `test.ts` + `wrangler.toml` + `tsconfig.json`; `playwright.config.ts` + `lighthouserc.json`; `README.md` + `RUNBOOK.md`; `.env.example` documents all 8 `NEXT_PUBLIC_*` vars; Worker secrets correctly excluded from Pages env (`scripts/verify-env.ts` fails the build if `RESEND_API_KEY` / `TURNSTILE_SECRET_KEY` leak in).
- **Failure modes are visible, not silent.** Stripe placeholders (`about:blank#TODO-*`) trigger `tel:+16206393337` fallback CTAs on every PDP + bundle + field-club via `isPlaceholderLink()` guard. Legals (`/terms/`, `/privacy/`) and 3 journal drafts carry `metadata.robots = { index: false, follow: true }` confirmed in `out/*/index.html`. TrustedSite + Turnstile + GA4 + Reamaze are env-gated and graceful-no-op when unset. `_redirects` 301s the 16 OLS PDP slugs, 4 OLS categories, `/m/*` legacy auth, and the duplicate Terms URL.
- **Open client items are paperwork, not code.** Stripe Payment Links × 64, Worker KV namespace IDs, Resend API key, Turnstile site/secret keys, Cloudflare Pages env vars, TrustedSite ID, real legal copy, Greg's journal approval — every one is documented in `08_integrations.md` § B (10-step checklist) and `RUNBOOK.md`. The rebuild safely publishes to a parallel `*.pages.dev` URL while the apex DNS stays on the legacy GoDaddy origin until Tyler signals cutover.

### Conditions (must be met before specific actions)

- **Before `git push`:** None additional — the repo is safe to push to a new private GitHub repo as-is. (Decision authorizes the commit.)
- **Before first CI run on `main`:** Set the 8 GitHub repo Secrets listed in `09_deploy.md` § D (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, all 6 `NEXT_PUBLIC_*` build vars). Without these, `deploy.yml` build job fails on `verify-env.ts`.
- **Before `wrangler pages deploy` to a custom domain:** Complete `08_integrations.md` § B Steps 1–7 (Resend domain verification, Turnstile site provisioning, KV namespace creation + IDs in `wrangler.toml`, Worker secrets, Worker deploy, 64 Stripe Payment Links replacing all `about:blank#TODO-*`, Pages env vars). Step 8 (Pages deploy) and Step 9 (DNS cutover) follow.
- **Before flipping journal articles to indexable:** Greg approves all 3 launch MDXs; remove `draft: true` from `journal-index.ts`; restore `— Greg` attribution.
- **Before flipping legals to indexable:** documentation-specialist delivers real Terms + Privacy copy with vendor disclosures (GA4, Turnstile, Cloudflare, Resend, Stripe); remove `metadata.robots = { index: false }`.

The orchestrator is cleared to commit, create the repo, and push. Production-domain DNS cutover remains gated on Tyler's checklist.

