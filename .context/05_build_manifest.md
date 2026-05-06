# Build Manifest — GB Feeds Rebuild

> Phase 5 → Phase 6 handoff. Author: plan-consolidator. Date: 2026-05-06.
> Sources: `.context/05_architecture.md` (architect + 4 advisor sections), `.context/04_design_brief.md`, `.context/STATE.md`, `.context/ROUTING.md`, `.context/live_products.json`, `_inherited_assets/**`.
> Phase 6 builders execute this file step by step. Every task has a Gate. No task starts until the prior dependency is green.

---

## 0. Pre-flight

**Sub-phase order (locked):** **6A Scaffold → 6B Assets → 6C Foundation → 6D Pages → 6E Integrations.**

**No orchestrator code-touch rule.** The orchestrator only dispatches subagents (`web-code-executor`, `image-editor-pro`) via the Agent tool. It does not edit files itself. It reads STATE.md, dispatches the next task, reads the result, runs the gate, and updates STATE.md. Any deviation breaks the audit trail.

**Inputs the orchestrator hands every builder (always include):**
- `.context/05_architecture.md` (canonical plan, full file)
- `.context/05_build_manifest.md` (this file)
- `.context/04_design_brief.md` (tokens, components, page-by-page architecture)
- `.context/STATE.md` (locked decisions)
- `.context/ROUTING.md`
- `.context/CONTENT_INVENTORY.md`, `.context/ASSETS_INVENTORY.md`
- `.context/live_products.json` (SKU source of truth)
- The specific task block from this manifest (Task ID + Inputs + Outputs + Gate)

**Additional inputs for asset tasks (6B):**
- `_inherited_assets/from_live/products/` (57 product photos, 16 SKU folders)
- `_inherited_assets/from_live/branding/` (logo PNG, OG, manifest)
- `_inherited_assets/gbfeeds-isteam-assets/` (39 brand-owned files; 6 `reveal_*.webp` EXCLUDED)

**Subagent assignment:**
- `web-code-executor` — all code, config, tests, scripts, MDX
- `image-editor-pro` — all rasters, vectors, OG cards, favicons, textures, Kansas SVG

---

## 1. Step-by-step ordered tasks (48 total)

### Sub-phase 6A — Scaffold (7 tasks)

**6A.1 — Initialize npm project + write canonical `package.json`** · `web-code-executor` · Inputs: `.context/05_architecture.md` § 1 + § Dependency Review G · Outputs: `package.json` with locked versions (next 15.5.15, react 19.2.6, framer-motion 11.18.2, gsap 3.15.0, lenis 1.3.23, zod 3.25.76, next-mdx-remote 6.0.0, tailwindcss 4.2.4, wrangler 4.88.0, plus tsx 4.21.0, cross-env 10.1.0, serve 14.2.6, @playwright/test 1.49.1, @lhci/cli 0.14.0); `engines.node ">=20.11.0"`; build chain `tsx scripts/verify-env.ts && tsx scripts/validate-harvests.ts && tsx scripts/validate-products.ts && tsx scripts/validate-images.ts && next build`; package-lock.json. **Gate:** `npm install` 0; `npm ls` no unmet peers; `npm audit --omit=dev` 0 high+ advisories. **Parallelizable with:** none.

**6A.2 — Write `next.config.ts`** · `web-code-executor` · Outputs: `output:'export'`, `trailingSlash:true`, `reactStrictMode:true`, `productionBrowserSourceMaps:false`, `poweredByHeader:false`, `images.unoptimized:true`, `experimental.optimizePackageImports:['lucide-react','framer-motion']`. **Gate:** `tsc --noEmit next.config.ts` clean. **Parallelizable with:** 6A.3, 6A.4, 6A.5.

**6A.3 — Write `tsconfig.json` + path aliases** · `web-code-executor` · Outputs: strict, noUncheckedIndexedAccess, target ES2022, module esnext, moduleResolution bundler, jsx preserve, resolveJsonModule, paths `{ "@/*": ["./src/*"] }`. **Gate:** `npx tsc --noEmit` 0 against placeholder `src/`. **Parallelizable with:** 6A.2, 6A.4, 6A.5.

**6A.4 — Write `eslint.config.mjs` + boundary rules** · `web-code-executor` · Outputs: flat config + `eslint-config-next` + `eslint-plugin-boundaries`; layer-direction rules (atomic → composite/page/motion/decoration FORBIDDEN); `'use client'` allowlist; `src/data/*` RSC-only; `jsx-a11y/alt-text` + `jsx-a11y/label-has-associated-control`; `no-restricted-imports` blocking bare `framer-motion` `motion`. **Gate:** `npx eslint --print-config src/app/layout.tsx` resolves. **Parallelizable with:** 6A.2, 6A.3, 6A.5.

**6A.5 — Write `.prettierrc.json`, `.editorconfig`, `.gitignore`, `.env.example`** · `web-code-executor` · Inputs: `.context/05_architecture.md` § Env Var Taxonomy B verbatim · Outputs: `.prettierrc.json` (+ `prettier-plugin-tailwindcss`); `.editorconfig`; `.gitignore` (.env*, .dev.vars, .wrangler/, .next/, out/, node_modules/); `.env.example` per § B verbatim. **Gate:** `git status --ignored` shows .env.local would be ignored; prettier `--check .` passes. **Parallelizable with:** 6A.2, 6A.3, 6A.4.

**6A.6 — Write `wrangler.toml` (Pages + Worker skeleton)** · `web-code-executor` · Outputs: repo-root `wrangler.toml` (Pages); `cloudflare-worker/wrangler.toml` (Worker — name `gbfeeds-forms`, compatibility_date `2026-05-06`, KV binding `RATE_LIMIT_KV`, vars `ALLOWED_ORIGINS`). **Gate:** `npx wrangler pages dev --help` resolves the config. **Parallelizable with:** 6A.5.

**6A.7 — Verify hello-world build** · `web-code-executor` · Outputs: minimal `src/app/layout.tsx` + `src/app/page.tsx` (hello world); empty `globals.css`; placeholder `verify-env.ts` (final in 6C.10). **Gate:** `npm run lint` clean; `npm run type-check` clean; `npm run build` succeeds; `out/index.html` exists; `npx serve -s out -p 4173` returns 200 on `/`. **Parallelizable with:** none (closes 6A).

---

### Sub-phase 6B — Asset migration & production (7 tasks; image-editor-pro)

**6B.1 — Move `_inherited_assets/` content into `public/` per source-tree spec** · `image-editor-pro` (mechanical) + `web-code-executor` (verify) · Outputs: `public/brand/logo-1024.png`; `public/photos/lifestyle/` + `public/photos/gallery/` populated; EXCLUDE 6 `reveal_*.webp` files; discard `_inherited_assets/fonts*` (using `next/font/google`); `public/data/harvests.json` seed `{ total_inches: 7500, entries: [], last_updated: "2026-05-06" }`. **Gate:** every `public/` file traces to brand-owned source per ASSETS_INVENTORY; 6 `reveal_*.webp` ABSENT.

**6B.2 — Convert 57+ product photos to AVIF/WebP/JPEG at 5 widths** · `image-editor-pro` · Inputs: `_inherited_assets/from_live/products/<id>-<sku>/`; SKU folder map (bc-40lb-2023, cc-7lb-2023, bc-2000lb-2023, gb-camohat, gb-blkhat, rvl-x, rvl-x-pro, tct-rvl-x-gen, 32g-sd-crd, lth-rch-btt-crt, djs-cmr-stk, xtr-slr-pnl, txs-wld-spp-2, txs-wld-spp-600, txs-wld-spp-6001, txs-wld-spp-21) · Outputs: `public/products/<sku-folder>/<sku>-<angle>-<width>.<ext>` for {320,640,1024,1600,2400} × {avif,webp,jpg}. Buck Chow hero highest priority (LCP). **Gate:** every AVIF ≤ 80KB at 1024w; every SKU has ≥ 1 hero in all 3 formats × 5 widths; `du -sh public/products/` ≤ 28MB.

**6B.3 — Vectorize logo + signature SVG** · `image-editor-pro` · Outputs: `public/brand/logo.svg` (mark, single-color black `currentColor`); `public/brand/greg-signature.svg` (monoline, accent color). **Gate:** `logo.svg` ≤ 6KB; renders cleanly at 32px and 1024px.

**6B.4 — Generate favicon set** · `image-editor-pro` · Inputs: `public/brand/logo.svg` · Outputs: `public/icons/favicon.ico` (16+32 multi-res), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, 192/512 maskable variants. **Gate:** RealFaviconGenerator validates.

**6B.5 — Generate 38 OG cards (1200×630)** · `image-editor-pro` · Inputs: brand tokens (bone paper #EDE7D9 + loam ink #0F0E0B + oxblood-brick #B33A1A + Bebas Neue display); product photos from 6B.2; logo from 6B.3 · Outputs: 12 evergreen + 16 PDP + 3 journal + 4 season = 38. **Gate:** each PNG exactly 1200×630, ≤ 200KB.

**6B.6 — Simplify Kansas county TopoJSON to ≤ 18 KB SVG** · `image-editor-pro` (or `web-code-executor`) · Inputs: Census Bureau Kansas county TopoJSON · Outputs: `public/textures/kansas-counties.svg` (≤ 18KB raw, ≤ 5KB gz; one `<path>` per county with `data-fips` attr); `src/data/kansas-counties.ts` with 105 entries `{ fips, name, cx, cy }` (centroids in viewBox %). **Gate:** SVG ≤ 18KB; 105 paths.

**6B.7 — Generate paper-grain noise + hairline rule + scanned-grain overlay** · `image-editor-pro` · Outputs: `public/textures/grain.webp` (256×256, multiply); `public/textures/ruled.svg` (24px-pitch, `--rule` color); `public/textures/scanned-grain.webp` (512×512). **Gate:** `grain.webp` ≤ 18KB; `ruled.svg` ≤ 1KB; `scanned-grain.webp` ≤ 60KB.

---

### Sub-phase 6C — Foundation (12 tasks)

**6C.1 — Write `src/styles/{globals,tokens,reset,typography,atmosphere}.css`** · Outputs: Tailwind v4 `@theme` with paper, ink, accent, state, rule, shadow, 6-step warm-gray ladder, type scale clamps; typography defaults for Bebas Neue / DM Serif Display / JetBrains Mono; atmosphere with PaperGrain layer composition. **Gate:** `--color-paper` resolves; `<body>` shows `#EDE7D9` bg + `#0F0E0B` text.

**6C.2 — Wire `next/font/google`** · Outputs: `src/app/layout.tsx` mounts Bebas Neue (preload), DM Serif Display (no preload), JetBrains Mono (no preload); CSS vars `--font-display`, `--font-body`, `--font-mono`. **Gate:** Network panel shows 3 font requests, Bebas with `<link rel="preload">`.

**6C.3 — Write `src/types/{harvests,product,wizard}.ts`** · Outputs: Harvest, HarvestsFile, Product, Region, Season, Goal, Bundle, Pillar, Testimonial, FAQ, JournalEntry, SeasonMeta, WizardState, WizardAction. **Gate:** `tsc --noEmit` clean.

**6C.4 — Write `src/lib/cn.ts`** · Outputs: `cn(...inputs: ClassValue[]): string` using `clsx` + `twMerge`. **Gate:** `cn('p-2','p-4')` returns `'p-4'`.

**6C.5 — Write 12 atomic components** · Outputs: `src/components/atomic/{Button,Link,Container,Section,Heading,Text,Image,Stamp,Rule,Marker,PriceTag,StockBadge}.tsx` — all RSC; `Image.tsx` is the ONLY allowed `next/image` import site (boundary rule); `Marker` composes `Stamp`; `StockBadge` composes `Stamp`; `alt: string` required on `Image`. **Gate:** ESLint boundaries rule passes; `tsc --noEmit` clean.

**6C.6 — Write 3 decoration components** · Outputs: `src/components/decoration/{PaperGrain,HairlineRules,ScannedGrainOverlay}.tsx` — all pure CSS / SVG bg, all RSC. **Gate:** ESLint clean.

**6C.7 — Write 11 data modules + `products.live.json`** · Outputs: `src/data/products.live.json` (16 SKUs derived from `.context/live_products.json` with new fields `slug`, `legacyOlsSlug`, `displayName`, `paymentLinkUrl` placeholder, `bagTag` triptych, `category`); `products.ts`, `testimonials.ts`, `faq.ts`, `seasons.ts`, `season-skus.ts`, `feed-program-map.ts` (48 bundles), `cross-sell-map.ts`, `journal-index.ts`, `nav.ts`, `pillars.ts`, `payment-links.ts`. **Gate:** all zod schemas parse; `tsc --noEmit` clean; ESLint confirms `src/data/*` not imported from any client component.

**6C.8 — Write 5 lib files** · Outputs: `src/lib/{seo,routes,analytics,validators}.ts`. **Gate:** `canonical('/products/buck-chow')` returns `https://gbfeeds.com/products/buck-chow/`; `buildMetadata` returns valid Next.js `Metadata`.

**6C.9 — Write 4 hooks** · Outputs: `src/hooks/{useReducedMotion,useScrollProgress,useLenis,useTrustedSiteBadge}.ts`. **Gate:** `useTrustedSiteBadge` returns `{ enabled: false }` when `NEXT_PUBLIC_TRUSTEDSITE_ID` unset.

**6C.10 — Write 5 build scripts** · Outputs: `scripts/{verify-env,validate-harvests,validate-products,validate-images,build-kansas-map,validate-bundle}.ts`. **Gate:** `tsx scripts/verify-env.ts` with empty env fails with hint; with full env exits 0.

**6C.11 — Write unit tests (Vitest, ≤ 10 specs)** · Outputs: `tests/unit/{harvests.schema,products.schema,wizard-reducer,feed-program-map,seo,cross-sell,cn}.test.ts`; `vitest.config.ts`. **Gate:** `npm run test:unit` exits 0.

**6C.12 — Cross-cutting 6C gate** · **Gate:** lint + type-check + test:unit clean; `npm run build` succeeds on minimal layout.

---

### Sub-phase 6D — Pages (14 tasks)

> **Parallelization rule for 6D pages:** Pages may parallelize when (a) home (6D.2) is COMPLETE and merged; AND (b) all 17 composite + 4 motion components (6D.1) are green; AND (c) Buck Chow PDP (6D.3) validates the `<ProductDetail>` template before fan-out. PDP siblings (6D.4 fan-out × 15) are parallelizable. Editorial pages (6D.5–6D.8) are parallelizable. Long-tail pages (6D.10–6D.13) are parallelizable. **The home (6D.2) and the wizard (6D.9) NEVER parallelize with anything else.**

**6D.1 — Write 17 composite + 4 motion components** · Outputs: `src/components/composite/*` (NavBar, EyebrowStripe, Footer, ProductCard, TestimonialCard, FAQItem, NewsletterForm, ContactForm, FieldClubWaitlistForm, BagTagTriptych, HarvestPin, KansasMap, KansasMapSVG, SeasonChip, MarqueeTicker, ReceiptStrip, PrescriptionPad, TrustedSiteBadge, LiveCount); `src/components/motion/*` (MotionProvider, AntlerInchesCounter, SignatureMove, PageTransition) — all `'use client'`, all dynamic-imported at callsite per Risk 1; `<SignatureMove>` is the ONLY GSAP/ScrollTrigger import site. **Gate:** ESLint boundaries: GSAP imported in exactly one file; `framer-motion` `motion` named export NEVER imported (only `m` + `LazyMotion`); Lenis only in `<MotionProvider>`. Bundle analyzer dry run shows GSAP in only one chunk.

**6D.2 — Build homepage `app/page.tsx` + `<HomePage>`** · Outputs: RSC home page; `<HomePage>` dynamic-imports `<SignatureMove>`; preload AVIF hero per Risk 2; iOS Safari < 768px bailout to static fallback. **Gate:** `npm run dev` shows working signature pin desktop; `prefers-reduced-motion: reduce` shows static counter at final value + all pins visible from first paint; iPhone 14 viewport bails out. E2E specs `home-signature.spec.ts` and `home-reduced-motion.spec.ts` green. Lighthouse mobile on `/` LCP < 2.0s, CLS < 0.05, TBT < 200ms; bundle analyzer confirms `app/page` chunk < 130KB gz.

**6D.3 — Build `<ProductDetail>` + Buck Chow PDP** · Outputs: `src/app/(shop)/products/[slug]/page.tsx` with `generateStaticParams()`; `<ProductDetail>`; `<BagTagTriptych>` Y-axis flip; sticky add-to-cart on mobile; JSON-LD `Product`. **Gate:** `/products/buck-chow/` returns 200 in `out/`; PDP E2E spec green; bundle analyzer confirms chunk < 90KB gz, no GSAP.

**6D.4 — Fan out remaining 15 PDPs (parallelizable batch)** · Outputs: all 16 SKUs build via `generateStaticParams`; each has OG card from 6B.5 wired in metadata. **Gate:** all 16 PDP routes 200 in `out/`; routes-smoke spec green; spot-check 3 PDPs show correct triptych + Stripe Payment Link href.

**6D.5 — Build `/products` index** · Outputs: RSC page + `<ProductFilterClient>` in `<Suspense>`; reads `searchParams.cat`. **Gate:** `/products/` 200; `?cat=deer-feed` filter works.

**6D.6 — Build editorial pages (`/our-story`, `/why-gb-feeds`, `/customer-reviews`, `/photo-gallery`)** · Inputs: CONTENT_INVENTORY verbatim · Outputs: 4 RSC pages; `WhyGBFeedsPage` swaps "10,000 inches" for `<LiveCount>`; `CustomerReviewsPage` mounts `<MarqueeTicker>` + JSON-LD `Review[]`; `PhotoGalleryPage` with client lightbox. **Gate:** all 4 routes 200; route-smoke E2E green.

**6D.7 — Build `/journal` + 3 launch articles** · Outputs: `src/content/journal/{stand-7b-riley,ingredient-walk,twenty-two-inch-rule}.mdx` (~600–900 words each, full frontmatter); `mdx-components.tsx`; `…/journal/page.tsx`; `…/journal/[slug]/page.tsx` with `generateStaticParams`; sticky date-stamp scrubs; JSON-LD `Article`. **Gate:** all 4 routes 200; bundle confirms chunk < 70KB gz.

**6D.8 — Build `/season/[phase]` × 4** · Outputs: `…/season/[phase]/page.tsx` with `generateStaticParams` for `['pre-rut','rut','post-rut','antler-growth']`; calendar-strip CSS scroll-timeline + IO fallback. **Gate:** all 4 season routes 200; OG cards wired.

**6D.9 — Build `/feed-program` (wizard)** · Outputs: RSC shell + `WizardClient.tsx` (`'use client'` useReducer with `WizardState/WizardAction`); resolves to bundle via `getBundle(region, season, goal)`; renders `<PrescriptionPad>` with bundle SKUs + `<a href={bundle.paymentLinkUrl}>`. **Gate:** Wizard E2E spec green: `kansas + rut + trophy` resolves to expected bundle; CTA href matches `/^https:\/\/buy\.stripe\.com\//` OR placeholder muted button + phone fallback.

**6D.10 — Build `/field-club` (waitlist marketing)** · Outputs: page + `<FieldClubWaitlistForm>` POSTs to `NEXT_PUBLIC_FORM_ENDPOINT` with `tag: "field-club-waitlist"`. **Gate:** Route 200; `NEXT_PUBLIC_FEATURE_FIELD_CLUB=false` shows waitlist; `=true` shows live "Join Now".

**6D.11 — Build `/contact` + `/faq`** · Inputs: contact phone (620) 639-3337 + 4 FAQs · Outputs: `<ContactPage>` mounts `<ContactForm>` (Turnstile + zod + honeypot `__hp_field`); `<FAQPage>` JSON-LD `FAQPage`. **Gate:** Contact form E2E spec green via mocked Worker; FAQ JSON-LD validates in Google Rich Results Test.

**6D.12 — Build `/terms` + `/privacy` + `app/not-found.tsx`** · Outputs: 3 routes with placeholder copy + TODO markers for Phase 8 documentation-specialist; no eyebrow stripe (intentional). **Gate:** all 3 routes 200; 404 spec green.

**6D.13 — Write `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`** · Outputs: 38-route sitemap.xml at build; robots.txt; manifest webmanifest. **Gate:** sitemap-robots E2E green; sitemap.xml has 38 `<loc>` entries.

**6D.14 — Cross-cutting 6D gate** · **Gate:** lint + type-check + build clean; all 38 routes 200 via `npx serve out/`; routes-smoke E2E green; per-route bundle weights all under § 10 budgets via `validate-bundle.ts`.

---

### Sub-phase 6E — Integrations (8 tasks)

**6E.1 — Mount GA4 `<Script>` in root layout + `<RouteChangeTracker>`** · Outputs: `<Script>` gated by `NEXT_PUBLIC_GA_ID`; `<RouteChangeTracker>` `'use client'` fires `trackPageView` on `usePathname` change; `metadata.verification.google` set. **Gate:** with ID, gtag.js loads; without, no GA script.

**6E.2 — Mount `<TrustedSiteBadge>` (env-gated)** · Outputs: mounted in layout.tsx after `<Footer>`; `useTrustedSiteBadge` returns null when `NEXT_PUBLIC_TRUSTEDSITE_ID` empty. **Gate:** without ID, zero network calls to trustedsite.com.

**6E.3 — Wire forms to `NEXT_PUBLIC_FORM_ENDPOINT`** · Outputs: `<ContactForm>`, `<NewsletterForm>`, `<FieldClubWaitlistForm>` all POST JSON `{ name, email, message?, tag, turnstileToken, __hp_field: '' }`. Honeypot rejected. **Gate:** mocked E2E confirms payload + 200/4xx state rendering.

**6E.4 — Write Cloudflare Worker (`cloudflare-worker/index.ts`)** · Outputs: TS Worker module: CORS check → Turnstile siteverify → KV per-IP rate limit (1/60s) → POST to Resend `/emails`; honeypot guard; structured errors. **Gate:** `npx wrangler dev` runs locally; valid mock returns 200; bad token 403; rate-limit second-within-60s 429.

**6E.5 — Wire Stripe Payment Link buttons (placeholders)** · Outputs: every PDP `<a href={product.paymentLinkUrl}>`; if `paymentLinkUrl` starts with `about:blank#TODO-`, render disabled muted button with copy `CALL (620) 639-3337 TO ORDER`. Same for bundles in `<PrescriptionPad>`. **Gate:** PDP spec confirms hrefs match `/^https:\/\/buy\.stripe\.com\//` OR placeholder rule fires.

**6E.6 — Wire JSON-LD helpers per page type** · Outputs: `<script type="application/ld+json">` in each page-type orchestrator: Organization+WebSite (home), Product (PDP), BreadcrumbList (products+journal), Article+Person Greg (journal), Review[] (customer-reviews), contactPoint (contact), FAQPage (faq), AboutPage (our-story), Service (field-club). **Gate:** SEO E2E parses every script tag, asserts `@type` + shape.

**6E.7 — Write `public/_headers` (CSP + cache rules)** · Outputs: HSTS preload, X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy, COOP, Permissions-Policy, full CSP (script-src + style-src + img-src + connect-src incl. https://forms.gbfeeds.com + frame-src https://challenges.cloudflare.com + form-action https://buy.stripe.com); per-path cache: `/_next/static/*`, `/products/*`, `/textures/*`, `/icons/*`, `/og/*`, `/fonts/*` immutable + `/*` 5-min must-revalidate. **Gate:** `npx wrangler pages dev out` serves `/` with full CSP header (curl -I); CSP does not block GA4, Turnstile, or Stripe Payment Link form-action.

**6E.8 — Write `public/_redirects` (legacy URL parity)** · Outputs: 31 lines including `/terms-and-conditions` + `/terms-and-conditions-1` → `/terms/`, `/privacy-policy` → `/privacy/`, all 16 OLS PDP slugs, OLS categories, `/m/*` user portal disposal. **Gate:** curl `/terms-and-conditions` returns 301 → `/terms/`. Verified 5 random legacy URLs.

---

**Total: 7 (6A) + 7 (6B) + 12 (6C) + 14 (6D) + 8 (6E) = 48 tasks.**

---

## 2. Cross-cutting gates (apply at end of every sub-phase)

1. `npm run lint` clean (eslint-plugin-boundaries + jsx-a11y).
2. `npm run type-check` clean (strict + noUncheckedIndexedAccess).
3. `npm run build` succeeds (verify-env → validate-harvests → validate-products → validate-images → next build → validate-bundle).
4. `npx serve out/` and curl-test 5 random routes return 200 with valid HTML (`<html>`, `<main>`, exactly one `<h1>`, `<link rel="canonical">`).

If any gate fails, the sub-phase does not close. Phase 6 backs up to the failing task and re-dispatches.

---

## 3. Test gates per sub-phase

| Sub-phase | Gate |
|---|---|
| **6A** | Hello-world `app/page.tsx` renders in `out/`; `npm run build` clean; lint + type-check + (empty) test:unit clean. |
| **6B** | Every produced image meets size budget per Risk 3 table (AVIF ≤ 80KB at 1024w; total `public/products/` ≤ 28MB); `validate-images.ts` green; favicon set passes RealFaviconGenerator validation; Kansas SVG ≤ 18KB. |
| **6C** | All Vitest unit tests pass; zod validators reject malformed fixtures; ESLint boundary rules confirm `src/data/*` not imported from any `'use client'` file. |
| **6D** | Every page route returns 200 from `npx serve out/`; routes-smoke E2E green; home signature-moment renders correctly desktop + mobile + reduced-motion; per-route bundle weight under § 10 budgets via `validate-bundle.ts`. |
| **6E** | Worker validated locally via `npx wrangler dev` (Turnstile + Resend mocks); curl `-I` against `npx wrangler pages dev out` returns full CSP + HSTS + cache headers per § 12; 5 random `_redirects` rules return 301; PDP spec confirms Stripe `<a href>` correctness; SEO spec confirms JSON-LD + canonicals. |

---

## 4. Top 5 known risks + early-warning signals

| # | Risk | Early-warning signal Phase 6 watches |
|---|---|---|
| **1** | **Three motion libraries (GSAP + Framer Motion + Lenis) bloat every route.** Worst case: GSAP ships on PDP/contact/legal routes → ~95KB gz wasted. | At end of 6D, run `ANALYZE=true npm run build`. If `app/products/[slug]` chunk contains GSAP OR ScrollTrigger, OR if any non-home chunk exceeds its § 10 budget — **STOP and fix before continuing.** |
| **2** | **Home scroll-pin destabilizes LCP/CLS** — trail-cam image ≥ 700KB, Kansas SVG > 18KB, missing pre-pin height triggers CLS spike. | After 6D.2, Lighthouse mobile slow-4G on `/` MUST show LCP < 2.0s + CLS < 0.05. AVIF preload starts within 100ms of HTML response; pin container has SSR `min-height: 100vh`; iOS Safari < 768px bails. If LCP > 2.0s, DO NOT proceed to PDP fan-out. |
| **3** | **16 PDPs × 57 photos with `unoptimized: true`** — single 700KB hero kills < 2.0s LCP budget. | After 6B.2, `du -sh public/products/` ≤ 28MB; `validate-images.ts` green. After 6D.4, Lighthouse on `/products/buck-chow/` LCP < 2.0s + total page weight < 600KB on first viewport. Any hero AVIF > 110KB at 1600w fails the build. |
| **4** | **Static-export conflicts** — missing `generateStaticParams` = silent 404 on a PDP at runtime; `useSearchParams` outside `<Suspense>` breaks export; `not-found.tsx` typo silently omits 404. | At end of 6D, routes-smoke spec iterates `routes.ts` and asserts 200 + `<main>` + single `<h1>` per route. Search the codebase for `usePathname()` in any RSC or any file in `src/data/` — both indicate boundary leak. |
| **5** | **Dependency CVEs reactivate** — three forced security upgrades (next 15.5.15, wrangler 4.88.0, next-mdx-remote 6.0.0) must hold; an accidental downgrade re-opens 17 OSV advisories. | After every `npm install`, `npm audit --omit=dev` MUST show 0 high+ advisories. CI gates this via `osv-scanner` or `npm audit` step. Lockfile drift between `package.json` and `package-lock.json` aborts the build. |

---

*End of Build Manifest. Phase 6 starts at task 6A.1.*
