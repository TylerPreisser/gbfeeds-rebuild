# GB Feeds — Operations Runbook

> Audience: Tyler (operator) + Greg (content owner). Author: documentation-specialist (Phase 8). Date: 2026-05-06.
> This is the day-to-day manual for running, updating, and maintaining the live site. For the build plan, see `.context/05_architecture.md`. For deploy-time integration setup, see `.context/08_integrations.md`.

---

## Table of contents

1. [Updating product data](#1-updating-product-data)
2. [Adding a journal article](#2-adding-a-journal-article)
3. [Updating the harvest counter](#3-updating-the-harvest-counter)
4. [Updating brand colors / fonts](#4-updating-brand-colors--fonts)
5. [Editing legal pages](#5-editing-legal-pages)
6. [Deploying](#6-deploying)
7. [Setting env vars + secrets](#7-setting-env-vars--secrets)
8. [TrustedSite badge re-attachment](#8-trustedsite-badge-re-attachment)
9. [Rotating GA4 / Stripe / Resend / Turnstile keys](#9-rotating-ga4--stripe--resend--turnstile-keys)
10. [Monitoring](#10-monitoring)
11. [Reamaze re-attachment (post-launch optional)](#11-reamaze-re-attachment)
12. [Common failure modes + recovery](#12-common-failure-modes--recovery)

---

## 1. Updating product data

**File:** `src/data/products.live.json`

The **single source of truth** for the 16-SKU catalog. Each product entry conforms to the `ProductSchema` zod schema in `src/types/product.ts` and is validated pre-build by `scripts/validate-products.ts`.

### Editing a SKU (price, copy, image, weight, etc.)

1. Open `src/data/products.live.json` in an editor.
2. Locate the SKU (entries are an array under the `products` key, each with a `sku` field — e.g. `"sku": "buck-chow-40lb"`).
3. Edit the field. Common fields:
   - `displayName` — what appears in nav, OG cards, and PDP `<h1>`.
   - `slug` — used in the URL `/products/<slug>/`. **Changing this requires adding a `_redirects` entry from the old slug to the new one** (see § 12).
   - `priceCents` — integer, US cents. Display formatting handled by `src/lib/seo.ts` (Product `Offer` JSON-LD reads this directly).
   - `description` — used in `<meta name="description">` + `Product` JSON-LD `description`.
   - `bagTag.weight`, `bagTag.protein`, `bagTag.fat` — values that appear in the `<BagTagTriptych>` on the PDP.
   - `image` — relative path under `public/products/` (omit the leading slash). The build expects AVIF + WebP + JPEG variants at 5 widths (320/640/1024/1600/2400). `validate-images.ts` checks each.
4. Run `npm run build` locally — `validate-products.ts` will reject malformed shape.
5. Commit + push to `main`. Cloudflare Pages CI rebuilds + deploys.

### Adding a Stripe Payment Link

For each SKU, the `paymentLinkUrl` field initially contains an `about:blank#TODO-create-stripe-link-<sku>` placeholder. The `<ProductDetail>` page detects placeholders via `isPlaceholderLink()` and swaps the BUY button for a `tel:+16206393337` phone-fallback CTA.

1. In the **Stripe dashboard** → Payment Links → Create. Set: product price (USD, fixed), one-time payment, no shipping rules required (Greg can configure shipping in Stripe directly), `success_url` = `https://gbfeeds.com/`, `cancel_url` = `https://gbfeeds.com/products/<slug>/`.
2. Copy the resulting URL (format: `https://buy.stripe.com/<id>`).
3. Edit `src/data/products.live.json`: replace `"paymentLinkUrl": "about:blank#TODO-..."` with the real URL.
4. Edit `src/data/payment-links.ts`: replace the matching entry in `productPaymentLinks` (per-SKU) with the same URL.
5. (Bundle Payment Links go in `bundlePaymentLinks` of the same file — 48 region/season/goal combinations.)
6. Run `npm run build`. In production mode (`NODE_ENV=production`), `validate-products.ts` fails the build if any `about:blank#TODO-` placeholder remains. In dev mode it warns only.
7. Commit + push.

### Updating prices

Prices live ONLY in `priceCents` in `products.live.json`. Stripe Payment Link prices are pinned at the URL level (the URL itself encodes the price); to change a price, **create a new Payment Link in Stripe**, update both `priceCents` AND `paymentLinkUrl` in the JSON, and ship them together. Mismatch between the displayed price and the Payment Link price will be confusing for customers; the `<Product> + <Offer>` JSON-LD reads only from `priceCents`.

---

## 2. Adding a journal article

**Files:**
- Body MDX: `src/content/journal/<slug>.mdx`
- Frontmatter index: `src/data/journal-index.ts`

The site uses `next-mdx-remote` v6 to render journal articles at build time. `generateStaticParams` in `src/app/(editorial)/journal/[slug]/page.tsx` reads the directory via `readdirSync` to enumerate the slugs.

### Creating a new article

1. **Body** — Create `src/content/journal/<slug>.mdx`. The MDX file may use any standard markdown plus the `<Stamp>` and `<Pull>` components exposed via `mdx-components.tsx`. Example skeleton:
   ```mdx
   The first paragraph appears as the article lede in larger DM Serif Display.

   ## Section heading

   Body paragraphs in DM Serif Display.

   <Stamp date="2024-10-08" county="Riley" />

   <Pull>A pull-quote line that should ring loud.</Pull>
   ```

2. **Frontmatter** — Add an entry to the `journalIndex` array in `src/data/journal-index.ts`. Required fields per the `JournalEntry` type:
   ```ts
   {
     slug: 'my-new-article-slug',         // matches the .mdx filename (no extension)
     title: 'Stand 7B, Riley County: …',  // used as <h1> + OG card + JSON-LD headline
     date: '2024-10-08',                  // ISO date, used for sitemap lastmod + Article datePublished
     county: 'Riley',                     // optional — appears in the dateline stamp
     season: 'pre-rut',                   // 'pre-rut' | 'rut' | 'post-rut' | 'antler-growth'
     weather: 'Overcast, 54°F',           // optional dateline detail
     wind: 'NW 9',                        // optional dateline detail
     activityScore: 4,                    // 1–5 — drives the "deer-activity" stamp
     tags: ['pre-rut', 'feeders', 'riley-county'],
     coverImage: '/photos/lifestyle/lifestyle-img-3622-640w.webp',
     readMinutes: 7,                      // round up
     dek: 'A one-paragraph teaser used in /journal index card + meta description.',
     draft: true,                         // gate — see below
   }
   ```

3. **Draft gate** — While `draft: true`, the article:
   - is excluded from `/sitemap.xml`
   - is excluded from `/journal` (the index page filters drafts)
   - is excluded from `generateStaticParams` (no static page is generated)
   - effectively does not exist on the public site

   To publish: change `draft: false` AND ensure the page-level metadata (`src/app/(editorial)/journal/[slug]/page.tsx`) does not force `noindex`. (At launch, all 3 articles ship as `draft: true` per Phase 8 carry-forward.)

4. **OG card** — `image-editor-pro` generates `public/og/journal-<slug>.png` (1200×630 PNG) at build time. If a new article needs a bespoke card, drop it into `public/og/` manually with the matching filename, OR run `image-editor-pro` to regenerate (instructions in `.context/06_build_journal.md` § 6B).

5. **Build + publish** — `npm run build && git push` once `draft: false` is set. CI rebuilds the static export with the new article live + indexed.

---

## 3. Updating the harvest counter

**File:** `public/data/harvests.json`

The "X inches harvested" counter on the home page is hydrated at build time from this single JSON file. There is no runtime database, no admin UI, no Worker — Greg edits, commits, pushes, and Cloudflare Pages CI rebuilds.

### Schema (`src/types/harvests.ts` zod)

```json
{
  "updated_at": "2026-05-06",        // ISO date string — drives sitemap lastmod for /
  "total_inches": 7500,              // integer — the headline number
  "pins": [                          // optional array of per-harvest pins for the Kansas county map
    {
      "id": "h-001",                 // unique per pin
      "county": "Riley",             // must match `src/data/kansas-counties.ts`
      "inches": 168,
      "date": "2024-10-12",
      "stand": "Stand 7B"            // optional — appears in tooltip
    }
  ]
}
```

### Updating

1. Edit the file. Bump `total_inches`. Append to `pins[]` if you want a new dot on the map.
2. Run `npm run build` locally — `scripts/validate-harvests.ts` will fail loudly on shape mismatch (`total_inches` not int, `county` not in the canonical list, missing `id`, etc.).
3. Commit. Push. CF Pages CI rebuilds. New count is live within ~3 minutes.

### Cache behavior

`/data/*` is served with `Cache-Control: public, max-age=300, must-revalidate` (per `public/_headers`) — Cloudflare's edge revalidates every 5 minutes. Combined with the build-time bake, the counter never goes stale by more than (rebuild time + 5 min).

### Validation rules

- `total_inches` >= sum of `pins[].inches` is NOT enforced (Greg can over-state when a harvest is pending pin entry).
- All `county` values are checked against `kansas-counties.ts` (105 Kansas counties).
- `pins[].id` must be unique (zod `.refine()` rule).

---

## 4. Updating brand colors / fonts

**File:** `src/styles/tokens.css`

The design system is locked at **bone paper #EDE7D9 + loam ink #0F0E0B + oxblood brick #B33A1A** with **Bebas Neue (display) + DM Serif Display (body) + JetBrains Mono (stamps)**. Changing any of these is a brand-level decision — coordinate with the design lead before touching tokens.

### Swapping a CSS variable safely

```css
/* tokens.css — example */
:root {
  --paper: #EDE7D9;          /* bone paper canvas */
  --ink: #0F0E0B;            /* loam ink */
  --accent: #B33A1A;         /* oxblood brick */
  --paper-deep: #E5DCC9;     /* shadow / tint of paper */
  --ink-soft: #2A2620;       /* secondary text */
  /* … */
}
```

Rule: **change the variable, not the call site**. All component-level color references go through `var(--paper)`, `var(--ink)`, etc. — never hex literals.

After any token change, run:
1. `npm run build` — confirms no Tailwind v4 compile errors (the design tokens flow into Tailwind via `@theme` in `globals.css`).
2. Manual contrast check at https://webaim.org/resources/contrastchecker/ — ink-on-paper currently passes AAA (17.2:1); accent-on-paper passes AA normal text + AAA large text (5.8:1). Any new combo MUST pass AA at minimum.
3. `manifest.webmanifest` — `theme_color` and `background_color` are duplicated in `src/app/manifest.ts`. Update them to match.

### Fonts

Three Google Fonts are wired via `next/font/google` in `src/app/layout.tsx`:
- `Bebas Neue` — `--font-display`, weight 400, `preload: true`
- `DM Serif Display` — `--font-serif`, weights 400, normal+italic, `preload: false`
- `JetBrains Mono` — `--font-mono`, weights 400+500, `preload: false`

Adding a font means: import in `layout.tsx`, expose a CSS variable via `variable: '--font-…'`, register in Tailwind via `--font-family-…` in `globals.css`. **Self-hosted fonts are NOT supported** by the current CSP `font-src` directive without an additional allowance.

---

## 5. Editing legal pages

**Files:**
- `src/app/(legal)/terms/page.tsx`
- `src/app/(legal)/privacy/page.tsx`

Both pages currently ship with placeholder copy and `metadata.robots.index = false` (they are NOT in the sitemap, NOT crawled). Phase 8 carry-forward: real legal copy needs to land before launch (or shortly after). Q9 in STATE.md flagged that the original `/privacy-policy` was a generic GoDaddy template that never disclosed GA4, Cloudflare, Reamaze, etc.

### Editing terms or privacy

1. Open the relevant `page.tsx`. The body is a plain RSC component returning JSX with semantic HTML (`<section>`, `<h2>`, `<p>`, `<ol>`).
2. Replace the body content with the new copy.
3. **When the copy is finalized and Tyler approves it for the public crawler:**
   - Locate `metadata.robots` in the same file (or in `buildMetadata()` call).
   - Remove `index: false` (or set `index: true`).
   - Verify `src/lib/routes.ts` has the legal route marked `indexable: true` so it lands in the sitemap.
4. `npm run build && git push`.

### Privacy policy disclosure checklist

When refreshing `/privacy`, the policy MUST disclose every third-party that touches a visitor:
- Google Analytics 4 (GA4 measurement ID `G-BF2FDR6KMM`)
- Cloudflare (CDN + Pages + Worker — DDoS / WAF / edge-routing)
- Cloudflare Turnstile (anti-bot challenge on forms)
- Resend (form-submission email transport)
- Stripe (Payment Link click-through; commerce data is not stored on `gbfeeds.com`)
- TrustedSite (when active — visitor scoring)
- Cookies set by GA4 (`_ga`, `_gid`)

The legal-template repo or Tyler's standard privacy policy is the right starting point. Final copy needs Tyler review for state-specific disclosures (Kansas residency does not require CCPA, but the brand reaches CA visitors).

---

## 6. Deploying

> The full Phase 9 deploy checklist (with env-var setup) is in `.context/08_integrations.md` § B. This section assumes those steps are done — repeat-deploy operator manual.

### Standard cycle (after first deploy)

```bash
# 1. Worker first (only when cloudflare-worker/ source has changed)
cd cloudflare-worker
wrangler deploy
# → returns deployed URL; verify it matches NEXT_PUBLIC_FORM_ENDPOINT in CF Pages env

# 2. Pages — push to main
cd ..
git add -A
git commit -m "your change description"
git push origin main
# → CF Pages CI runs npm ci && npm run build && deploys out/
```

CI logs are at: https://dash.cloudflare.com/<account>/pages/view/gbfeeds-rebuild/

### Worker deploys independently of Pages

The Worker (`cloudflare-worker/`) is a separate deploy unit. A Worker hotfix ships without rebuilding the static site; a Pages content update ships without redeploying the Worker. This is intentional — see `.context/05_architecture.md` § 12 for rationale.

### Rollback

**Pages rollback** (instantaneous; reverts all 38 routes + `_headers` + `_redirects` simultaneously):
1. Cloudflare Dashboard → Workers & Pages → `gbfeeds-rebuild` → Deployments.
2. Locate the last known-good deployment.
3. Click `…` → **Rollback to this deployment**.
4. Confirm. Live in ~30s.

**Worker rollback** (separate from Pages — does NOT affect site HTML):
1. Cloudflare Dashboard → Workers & Pages → `gbfeeds-forms` → Deployments.
2. Same process as above, OR run `wrangler rollback` in `cloudflare-worker/` for the previous version.
3. Worker rollback can also be done via `wrangler deployments list` then `wrangler rollback <deployment-id>`.

**There is no shared state between Pages and Worker** — rollback risk is low.

### Pre-deploy checklist (for non-trivial changes)

- [ ] `npm run lint` exit 0
- [ ] `npm run type-check` exit 0
- [ ] `npm run test:unit` exit 0
- [ ] `npm run build` exit 0 (verifies env, validates data, builds static export)
- [ ] Manually click through the changed routes in `npx serve -s out -p 4173`
- [ ] Spot-check OG card if route content changed materially (`public/og/<route>.png`)

---

## 7. Setting env vars + secrets

> **Hard rule**: secrets NEVER live in `.env`, `.env.local`, `.env.example`, `wrangler.toml`, or any committed file. They live exclusively in:
> - Cloudflare Pages dashboard env vars (build-time public vars only — `NEXT_PUBLIC_*`)
> - `wrangler secret put` (Worker-runtime secrets)
> - GitHub Actions secrets (CI auth tokens)

### Public, build-time (Cloudflare Pages dashboard)

Path: `dash.cloudflare.com → Workers & Pages → gbfeeds-rebuild → Settings → Environment variables`.

Set both **Production** and **Preview** environments:

| Variable | Production value | Preview value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://gbfeeds.com` | `https://<branch>.gbfeeds-rebuild.pages.dev` |
| `NEXT_PUBLIC_GA_ID` | `G-BF2FDR6KMM` | (omit — analytics off in preview) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | (Tyler's site key from CF Turnstile) | (preview-mode site key OR same prod key — Turnstile handles `*.pages.dev`) |
| `NEXT_PUBLIC_FORM_ENDPOINT` | `https://forms.gbfeeds.com` (custom Worker domain) OR `https://gbfeeds-forms.<account>.workers.dev` | same — Worker handles preview origins via `ALLOWED_ORIGINS` |
| `NEXT_PUBLIC_TRUSTEDSITE_ID` | (Tyler's customer ID) | (omit — badge off in preview) |
| `NEXT_PUBLIC_FEATURE_FIELD_CLUB` | `false` (default) → `live` once subscription Stripe link exists | `false` |

Save → trigger a redeploy (Pages auto-redeploys on env-var change).

### Worker-runtime secrets (Wrangler CLI only)

```bash
cd cloudflare-worker
wrangler secret put RESEND_API_KEY
# → paste Resend API key when prompted; secret is stored encrypted in CF
wrangler secret put TURNSTILE_SECRET_KEY
# → paste Turnstile secret key
```

These secrets are reachable ONLY from Worker code, NEVER from the Pages bundle. To rotate, simply re-run `wrangler secret put` with the new value (CF replaces atomically) and revoke the old value at the issuer.

To list current Worker secrets:
```bash
wrangler secret list
```
(Returns names only — values are not retrievable.)

### CI secrets (GitHub Actions)

Path: `github.com/<org>/gbfeeds-rebuild → Settings → Secrets and variables → Actions`.

Required for the deploy workflow:
- `CLOUDFLARE_API_TOKEN` — scope: `Cloudflare Pages:Edit` + `Workers Scripts:Edit`. Do NOT use the global API key.
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID.
- All `NEXT_PUBLIC_*` build-time vars (mirrored from Pages dashboard for consistency between CF-side rebuilds and GH-Actions rebuilds).

NEVER add `RESEND_API_KEY` or `TURNSTILE_SECRET_KEY` to GitHub Secrets — those are Worker-runtime only.

---

## 8. TrustedSite badge re-attachment

The badge is scaffolded but inactive at launch (Q7 in STATE.md — Tyler needs to recover the customer ID from McAfee Secure dashboard, OR provision a fresh TrustedSite account).

### Steps

1. Log in to **TrustedSite (formerly McAfee SECURE)** dashboard.
2. Locate the **Site ID** for `gbfeeds.com` — typically a short numeric or alphanumeric identifier specific to GB Feeds (NOT the segment ID `205` seen in the legacy URL — that's McAfee's segment marker, not the customer ID).
3. In Cloudflare Pages → `gbfeeds-rebuild` → Settings → Environment variables, set `NEXT_PUBLIC_TRUSTEDSITE_ID` = `<the customer ID>` for both Production and Preview.
4. Trigger a Pages redeploy (any push to `main` works, or use the dashboard "Retry deployment" option).
5. Verify: load `https://gbfeeds.com/` in a browser — the TrustedSite badge appears bottom-left with 15px offset.

The component (`src/components/composite/TrustedSiteBadge.tsx`) is gated by the env var via `useTrustedSiteBadge()` — when the var is absent, the component returns `null` (graceful no-op, no flicker, no console error).

---

## 9. Rotating GA4 / Stripe / Resend / Turnstile keys

### GA4

GA4 measurement IDs are **public client identifiers** (analogous to Stripe publishable keys) — they cannot send data on someone else's behalf. Rotation is rare. If needed:

1. Create a new GA4 property in the Google Analytics dashboard. Copy the new ID (`G-XXXXX`).
2. Update `NEXT_PUBLIC_GA_ID` in CF Pages env (Production + Preview).
3. Update fixture references in any test mocks.
4. Trigger a redeploy. Old data lives in the old property; consider linking the new property to retain historical context, OR keep the old ID indefinitely if continuity matters.

### Stripe Payment Links

Payment Link URLs encode the price + product. To rotate (e.g., archive an old SKU):
1. Stripe dashboard → Payment Links → archive the old link (does NOT break in-flight checkout sessions).
2. Create a new link.
3. Update `paymentLinkUrl` for the SKU in `src/data/products.live.json` AND the matching entry in `src/data/payment-links.ts`.
4. Commit + push.

### Resend API key

If a Resend key is ever leaked or appears in a log:
1. Resend dashboard → API keys → revoke the leaked key immediately.
2. Generate a new key.
3. `wrangler secret put RESEND_API_KEY` (Worker secret) — paste new key.
4. (Worker has no separate redeploy step — secret update propagates within seconds.)
5. Audit Resend logs for unauthorized sends during the leak window.

### Turnstile secret key

If a Turnstile secret is ever leaked:
1. Cloudflare dashboard → Turnstile → site → rotate secret key.
2. `wrangler secret put TURNSTILE_SECRET_KEY` — paste new secret.
3. The site key (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`) does NOT need to change — only the secret is sensitive.

---

## 10. Monitoring

### Where to watch what

| Surface | Where | Cadence |
|---|---|---|
| Site uptime + edge metrics | Cloudflare Pages → `gbfeeds-rebuild` → Analytics | Daily glance; alarms on >1% error rate |
| Site traffic + conversion | Google Analytics 4 → Reports | Weekly |
| Form submissions | Resend dashboard → Logs (delivered / bounced / spam-flagged) | Per-event email forward to Greg |
| Worker errors + invocations | Cloudflare Workers → `gbfeeds-forms` → Logs / Metrics | Per-incident |
| Live Worker tail | `cd cloudflare-worker && wrangler tail` | On-demand debugging |
| Stripe payments | Stripe dashboard → Payments | Per-event email |
| Search ranking + index | Google Search Console (`gbfeeds.com` property) | Weekly |
| Lighthouse score regression | CF Pages preview deploy → Lighthouse extension OR `npm run lighthouse` | Per-deploy |
| Build-failure alerts | Cloudflare Pages → Notifications (email on failure) | Per-event |

### Worker live tail (for incident debugging)

```bash
cd cloudflare-worker
wrangler tail
# → streams Worker invocations + console.log + errors in real-time
# → CTRL-C to exit
# → safe to run while Worker is serving production traffic
```

### What to grep when forms are silent

- `wrangler tail` output → look for `400`, `403`, `429`, `500` responses
- Resend logs → look for `bounced`, `complained`, `delivery_delayed`
- Browser DevTools network panel → confirm form POST goes to `NEXT_PUBLIC_FORM_ENDPOINT` (NOT `gbfeeds.com/api/...`); confirm Turnstile token is in the payload
- Cloudflare KV → `RATE_LIMIT_KV` namespace contains keys per-IP per-endpoint (TTL 60s) — if the same IP is rate-limited, that's working as designed

---

## 11. Reamaze re-attachment

> Currently DROPPED at launch. Documented here for the post-launch decision.

If Tyler wants chat back:

1. **Reamaze dashboard** → confirm the brand UUID (visible in any embed snippet they generate).
2. **Set env var**: `NEXT_PUBLIC_REAMAZE_BRAND_UUID` = `<uuid>` in CF Pages dashboard.
3. **Component**: Currently unwired. Add `src/components/composite/ReamazeChat.tsx` (`'use client'`) that mounts `<Script src="https://cdn.reamaze.com/assets/reamaze.js" strategy="afterInteractive">` when the env var is set; otherwise returns null.
4. **Layout mount**: Import + render `<ReamazeChat />` in `src/app/layout.tsx` (alongside `<TrustedSiteBadge />`).
5. **CSP allowance**: Edit `public/_headers` — add `https://cdn.reamaze.com` to `script-src` and `https://<account>.reamaze.com` to `connect-src` + `frame-src`.
6. **Privacy policy**: Update `/privacy` to disclose Reamaze (visitor profile + email capture).
7. Commit + push. Pages CI rebuilds with chat live.

The legacy GoDaddy bridge endpoint at `/m/api/reamaze/v2/...` is permanently dead — DO NOT attempt to recreate it.

---

## 12. Common failure modes + recovery

### "Forms POST returns CORS error"

- Cause: `NEXT_PUBLIC_FORM_ENDPOINT` points at a Worker URL that's not in the Worker's `ALLOWED_ORIGINS` env (in `cloudflare-worker/wrangler.toml`).
- Fix: Edit `wrangler.toml`, add the calling origin (e.g. add `https://forms.gbfeeds.com` or the custom domain or the new preview pattern), `wrangler deploy`.

### "Forms POST returns 403"

- Cause: Turnstile token validation failed. Either `TURNSTILE_SECRET_KEY` Worker secret is missing/wrong, OR the user did not complete the Turnstile challenge before submitting.
- Fix: Worker side — `wrangler secret put TURNSTILE_SECRET_KEY` (verify key matches the site in CF Turnstile dashboard). Client side — confirm `NEXT_PUBLIC_TURNSTILE_SITE_KEY` matches the same site, and the Turnstile script (`challenges.cloudflare.com/turnstile/v0/api.js`) is loading (check Network panel).

### "Forms POST returns 429"

- Cause: Rate limit hit (1 req/60s per IP per endpoint via `RATE_LIMIT_KV`). Working as designed.
- Fix: None needed. Wait 60 seconds. If a legit user is being throttled accidentally, the rate-limit window can be relaxed in `cloudflare-worker/index.ts` (constant `RATE_LIMIT_WINDOW_SECONDS`).

### "Build fails on `validate-products.ts`: placeholder Payment Link"

- Cause: Production build (CI) detected an `about:blank#TODO-` Stripe link still in `products.live.json`.
- Fix: Either (a) replace with a real Stripe Payment Link URL (see § 1), or (b) if you intentionally want to ship without a Payment Link for that SKU, delete the SKU from `products.live.json` AND from `src/data/payment-links.ts::productPaymentLinks`.

### "PDP shows 'CALL (620) 639-3337 TO ORDER' instead of BUY button"

- Cause: That SKU's `paymentLinkUrl` is still a placeholder. Working as designed (graceful fallback).
- Fix: Replace placeholder with real Stripe Payment Link.

### "Counter on home shows 0 / NaN"

- Cause: `public/data/harvests.json` is malformed (`total_inches` not int, or file missing).
- Fix: Validate the JSON shape against the schema in § 3. `npm run build` will fail loudly.

### "TrustedSite badge not showing"

- Cause: `NEXT_PUBLIC_TRUSTEDSITE_ID` env var unset OR wrong customer ID.
- Fix: See § 8. Component returns null when env var is absent — no error, just no badge.

### "GA4 not tracking page views"

- Cause: `NEXT_PUBLIC_GA_ID` unset (Pages env), OR `RouteChangeTracker` not mounted (architectural regression — should not happen).
- Fix: Verify env var. Verify `<RouteChangeTracker />` is rendered inside `<MotionProvider>` in `src/app/layout.tsx`. Test in production (GA4 has up to 24h reporting lag for new properties).

### "Legacy URL returns 404 instead of redirecting"

- Cause: `public/_redirects` rule missing or malformed, OR rule order is wrong (more-specific must precede less-specific).
- Fix: Verify the rule exists in `public/_redirects` (and after build, in `out/_redirects`). CF Pages applies these at the edge — local `npx serve` does NOT honor `_redirects`. Test against the deployed URL: `curl -I https://gbfeeds.com/<old-url>`.

### "Sitemap missing a route"

- Cause: Route is marked `indexable: false` in `src/lib/routes.ts`, OR is a `draft: true` journal article, OR the route's `metadata.robots.index = false`.
- Fix: Audit the relevant flag. `src/app/sitemap.ts` only emits routes that are discoverable + indexable.

### "CSP blocks a third-party script"

- Cause: Browser console shows `Refused to load the script '...' because it violates the following Content Security Policy directive: 'script-src ...'`.
- Fix: Edit `public/_headers` — add the offending origin to `script-src` (and `connect-src` if it makes XHR calls, `frame-src` if it embeds an iframe). Commit + push. The default policy is intentionally strict; every new third-party requires an explicit allowance + a privacy-policy update.

---

*Operations manual closes here. For build-time architecture questions, route to `.context/05_architecture.md`. For deploy-time integration setup, route to `.context/08_integrations.md`.*
