# Phase 4 — Design Direction Brief

> **Canonical**. Phase 5 architecture and Phase 6 build read directly from this file.
> Direction: **Kansas Field Logbook**. ONE direction, fully scoped. Buildable on the locked stack: Next.js 15 + React 19 + TypeScript + Tailwind v4 + Framer Motion + GSAP + Lenis, `output: 'export'`, Cloudflare Pages.
> Author: general-purpose (Phase 4 lead). Date: 2026-05-06.

---

## 1. Brand DNA preserved

What MUST carry forward into the rebuild without dilution:

- **Name**: GB Feeds.
- **Tagline (verbatim, every page where appropriate)**: "A small batch specialty deer feed company that specializes in creating the world's best deer feeds for the world's best deer hunters."
- **Founder voice**: Greg Brungardt's first-person founder narrative on `/our-story`, signed `-Greg`. Zero rewriting. Zero corporate-glossing. Reuse the Phase 1 verbatim text from `CONTENT_INVENTORY.md § /our-story`.
- **Tonal stance**: hunter-to-hunter, anti-corporate, anti-retail-markup, results-quantified. Plain 8th–9th grade reading level. Heavy second-person address. Not folksy, not tactical-military, not corporate-glossy.
- **Kansas-made identity**: every page touchpoint reinforces "tested right here in Kansas / Midwest." Greg planted the test plots; the antler-inches stat is geographically anchored to Kansas counties; the signature scroll moment displays Kansas county outlines.
- **Headline products**: Buck Chow High Protein Feed (40LB and 2,000LB pallet) and Corn Candy Flavored Attractant. These are the brand. Everything else (Tactacam Reveal cameras, Texas Wildlife Supply feeders, apparel) is reseller / extension.
- **All 16 live SKUs** in `live_products.json` ship into the rebuild at full pricing, full descriptions, full image sets from `_inherited_assets/from_live/products/`. SKU table:

| SKU | Name | Price |
|---|---|---|
| BC-40LB-2023 | Buck Chow High Protein Feed — 40LB | $19.99 |
| CC-7LB-2023 | Corn Candy Flavored Attractant — 7LB | $17.99 |
| BC-2000LB-2023 | Buck Chow — 2,000LB Pallet | $999.99 ($949.99 sale) |
| GB-CAMOHAT | GB Feeds Digital Print Camo Hat | $25.00 ($19.99 sale) |
| GB-BLKHAT | GB Feeds Black Hat | $25.00 ($19.99 sale) |
| RVL-X | Reveal X 2.0 | $119.99 |
| RVL-X-PRO | Reveal X-Pro | $149.99 |
| TCT-RVL-X-GEN | Tactacam Reveal Bundle Pack | $179.99 |
| 32G-SD-CRD | 32GB SD Card | $19.99 |
| LTH-RCH-BTT-CRT | Lithium Rechargeable Battery Cartridge | $49.99 |
| DJS-CMR-STK | Adjustable Camera Stake | $49.99 |
| XTR-SLR-PNL | External Solar Panel | $59.99 |
| TXS-WLD-SPP-2 | TWS 2,000LB Gravity Protein Feeder w/ Ladder & Catwalk | $1,999.99 |
| TXS-WLD-SPP-600 | TWS 600LB Protein Gravity Feeder | $999.99 |
| TXS-WLD-SPP-6001 | TWS 600LB Lucky Buck Spin Feeder | $999.99 |
| TXS-WLD-SPP-21 | TWS 2,000LB Spin Feeder | $1,699.99 |

**Naming convention fix** (Phase 6 implements): rebuild displays product names in **Title Case** ("Buck Chow High Protein Feed — 40LB"), not the inconsistent ALL CAPS / Title Case mix in OLS. Display name only — SKUs preserved verbatim for downstream commerce / inventory continuity.

- **All 22 testimonials** with first-name attribution, verbatim, from `CONTENT_INVENTORY.md § /customer-reviews`. No avatars. No invented last names. The minimalism IS the authenticity signal — direct competitors carry zero on-site testimonials.
- **All four FAQ Q&A pairs** verbatim from `CONTENT_INVENTORY.md § Frequently Asked Questions` (gravity vs. spin compatibility, 20% protein content, 400-500lbs corn coverage, US shipping policy). Surface on home AND on a dedicated `/faq` route.
- **Contact phone**: `(620) 639-3337`. Surface in footer of every page, on `/contact` (new route consolidating the home contact form into its own page), and as a `tel:` link on PDP for the $999+ feeder line.
- **Email contact form**: name + email + open message body. Same fields as today.
- **Kansas factory address**: cited in copy as "Manhattan, KS" (Greg's testing/operations base — confirmed brand DNA).

What gets DROPPED:
- Black-on-black palette (replaced — see § 4).
- Archivo Black + Montserrat type pairing (replaced — see § 3).
- "Powered by GoDaddy Website Builder" attribution.
- `/m/account`, `/m/login`, `/m/orders` user-portal routes (commerce moves off OLS — see § 10).
- `/terms-and-conditions-1` duplicate (consolidated to `/terms`).
- All references to `mysimplestore.com` in static markup (per security MUST-NOT § 4 in `02_live_recon.md`).
- The three inconsistent antler-inches stats (5,000 / 7,500 / 10,000) — replaced by ONE canonical live counter, see § 7 home + § 8.

---

## 2. Aesthetic direction (verbatim restate from synthesis)

Quoted exactly from `03_competitors_synthesis.md § 4`. This paragraph is the north star for every Phase 5 / Phase 6 decision.

> **Direction: "Kansas Field Logbook."**
>
> The site reads like a small-batch Kansas farmer's stand-by-stand hunting logbook that happens to ship deer feed. The dominant surface is **warm bone paper** (`#EDE7D9`, the color of a 1980s ag-extension service almanac) with **deep loam-black ink** (`#0F0E0B`) printed on it; everything sits inside a narrow inch-wide left margin marked with date / county / wind / weight stamps in monospace. The display face is **Tusker Grotesk** (a wide, slab-built industrial display family — narrower than Druk, more masculine than YETI Open, never used in deer-feed) set in heavy weight uppercase for headlines and bag-tag stat triptychs; body is **GT Sectra Display** (a modern angular serif with newspaper bones — refined, slightly aristocratic, completely against the category default) for the founder narrative, journal entries, and testimonials. Background atmosphere is layered: a subtle paper-fiber noise texture, faint horizontal hairlines every 24px (like ruled logbook paper), and on hero plates a low-opacity scanned-grain overlay that gives every photo the 35mm-on-newsprint feel. The accent is **a single saturated color: blaze brick `#B33A1A`** — not orange, not red, the color of dried oxblood paint on a barn — used exclusively for the "ANTLER INCHES HARVESTED" live counter, the Field Club member badges, and a single 1px underline on hovered links. The signature scroll moment is **one** — a 30-second-long single-pin scroll-tied sequence on the home page where the giant antler-inches counter (set in 240px Tusker) ticks from "0" up to the live total over the course of the user's scroll, while a real Kansas trail-cam plate cross-fades behind it from a black-and-white scan to a full-color wildlife frame. After that one moment, the rest of the site is motion-quiet: bag-tag stat reveals on PDP, sticky bottom add-to-cart on mobile, no parallax anywhere else.

**Substitution lock (Phase 3D)**: Tusker Grotesk → **Bebas Neue**; GT Sectra Display → **DM Serif Display**; JetBrains Mono → **JetBrains Mono** (already free). All three loaded via `next/font/google`. Zero commercial-license spend.

---

## 3. Type system — full, locked spec

### Faces

| Role | Face | Weights | Loader | Used for |
|---|---|---|---|---|
| Display | Bebas Neue | 400 (sole weight) | `next/font/google` with `display: 'swap'`, `preload: true` | H1, H2, all-caps section labels, button labels, bag-tag stat numbers, the antler-inches counter (240px), navigation anchors, marquee tickers |
| Body / editorial | DM Serif Display | 400 (regular + italic) | `next/font/google` with `display: 'swap'` | Hero H1 lede, body paragraphs in editorial sections, founder narrative, journal entries, testimonials, FAQ answers, long-form copy, blockquotes |
| Stamps / mono | JetBrains Mono | 400, 500 | `next/font/google` with `display: 'swap'` | Date / county / wind / weight stamps in left margin, SKU codes, lot stamps, bag-label simulations, antler-inches counter unit ("INCHES"), subscript photo captions, PDP price labels ("$ MSRP", "20% PROTEIN"), receipt-tape financing strip numerals, footer fine print |

CSS-variable wiring (Tailwind v4 `@theme`):

```css
@theme {
  --font-display: 'Bebas Neue', 'Arial Narrow', sans-serif;
  --font-serif: 'DM Serif Display', 'Times New Roman', serif;
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

### Default settings

- **Display tracking**: `letter-spacing: 0.02em` (slight expansion for grain-elevator-signage register). At 240px counter scale, hold tracking at 0.0em — the optical openness already exists at that size.
- **Display leading**: `1.0` for H1/H2; `1.05` for stat triptychs.
- **Body leading**: `1.4` for paragraphs; `1.2` for testimonial pulls; `1.5` for journal long-form.
- **Mono leading**: `1.2`. Tracking `0.04em` for stamps (looks letterpressed).
- **Italic policy**: italic DM Serif Display reserved for Greg's first-person interjections and journal field-notes; never used decoratively.

### Type scale (clamp() fluid scale, mobile-first, Tailwind v4 tokens)

```css
@theme {
  --text-mono-xs:     clamp(0.6875rem, 0.625rem + 0.25vw,  0.75rem);   /* 11→12px stamps */
  --text-body-sm:     clamp(0.875rem,  0.8125rem + 0.3125vw, 1rem);    /* 14→16px caps/captions */
  --text-body-md:     clamp(1rem,      0.95rem + 0.25vw,   1.125rem);  /* 16→18px body */
  --text-body-lg:     clamp(1.25rem,   1.15rem + 0.5vw,    1.5rem);    /* 20→24px lede */
  --text-display-sm:  clamp(2rem,      1.6rem + 2vw,       3rem);      /* 32→48px eyebrows */
  --text-display-md:  clamp(3rem,      2.4rem + 3vw,       5rem);      /* 48→80px H2 */
  --text-display-lg:  clamp(4.5rem,    3.6rem + 4.5vw,     8rem);      /* 72→128px H1 */
  --text-display-xl:  clamp(6rem,      4.8rem + 6vw,      12rem);      /* 96→192px bag-tag triptych */
  --text-counter:     clamp(8rem,      6.4rem + 8vw,      15rem);      /* 128→240px counter */
}
```

Tailwind utility names: `text-mono-xs`, `text-body-sm`, `text-body-md`, `text-body-lg`, `text-display-sm`, `text-display-md`, `text-display-lg`, `text-display-xl`, `text-counter`.

### FOUT mitigation

`next/font/google` inlines all three font CSS bundles into the build output and serves them from Cloudflare Pages' edge. `display: 'swap'` + bone-paper background means a brief swap is essentially imperceptible. The 240px counter is below-the-fold (inside the scroll-pin section) so it is never on the LCP critical path.

---

## 4. Color system — full token set

All values are OKLCH-first (Tailwind v4 native color space), with HEX provided for legacy reference. Define inside Tailwind v4 `@theme` block in `globals.css`. **Light mode only.** Set `<html style="color-scheme: light only">` in `layout.tsx` (per Phase 3D recommendation — the bone-paper aesthetic is a physical-object simulation; dark-mode inversion destroys the logbook metaphor).

### Paper (warm canvas surfaces)

| Token | OKLCH | HEX | Usage |
|---|---|---|---|
| `--paper` | `oklch(0.927 0.022 78)` | `#EDE7D9` | Page background, dominant brand surface |
| `--paper-2` | `oklch(0.945 0.014 75)` | `#F2EEE2` | Alternating section bands (slightly cooler ivory) |
| `--paper-3` | `oklch(0.962 0.010 78)` | `#F8F4EB` | Card backgrounds, FAQ accordion expanded state |

### Ink (text)

| Token | OKLCH | HEX | Usage |
|---|---|---|---|
| `--ink` | `oklch(0.145 0.008 60)` | `#0F0E0B` | Primary body text, H1/H2, button fill (default), nav links default |
| `--ink-muted` | `oklch(0.345 0.012 60)` | `#3A3933` | Secondary text, deck/subhead copy, FAQ answer copy |
| `--ink-quiet` | `oklch(0.520 0.015 60)` | `#6E6A60` | Caption text, fine print, footer secondary, photo subscripts |

### Accent (oxblood-brick — the ONE saturated color)

| Token | OKLCH | HEX | Usage |
|---|---|---|---|
| `--accent` | `oklch(0.502 0.158 35)` | `#B33A1A` | Antler-inches counter ticking digits, county-map pins, hover underlines, Field Club badges, sale price strikethrough, "BUILD YOUR PROGRAM" persistent CTA |
| `--accent-2` | `oklch(0.430 0.150 35)` | `#9A2F12` | Hover/active state for accent CTAs, pressed-state county pins |

### State (signal colors — moss/wheat/oxblood-noir, distinct from accent)

| Token | OKLCH | HEX | Usage |
|---|---|---|---|
| `--success` | `oklch(0.510 0.062 130)` | `#5B6E3D` | "In Stock" stamp, positive feedback (moss/olive — distinct from competitor greens) |
| `--warn` | `oklch(0.745 0.110 75)` | `#C99A3D` | "Low Stock" stamp, secondary warning (wheat/amber) |
| `--danger` | `oklch(0.330 0.115 25)` | `#6E2310` | "Sold Out" stamp, form error (deep oxblood-noir — distinctly darker than `--accent`) |

### Lines

| Token | OKLCH | HEX | Usage |
|---|---|---|---|
| `--rule` | `oklch(0.760 0.018 70)` | `#BDB29C` | The 24px hairline ruled-logbook lines (1px), default border |
| `--rule-strong` | `oklch(0.640 0.020 65)` | `#9C9079` | Section dividers, heavier divider above footer |

### Shadow (warm sepia, NOT pure black)

| Token | OKLCH | HEX | Usage |
|---|---|---|---|
| `--shadow` | `oklch(0.30 0.020 55) / 0.18` | `rgba(75, 60, 40, 0.18)` | Sticky mobile add-to-cart drop shadow, modal backdrop |

### 6-step warm-gray ladder

| Token | OKLCH | HEX |
|---|---|---|
| `--gray-50` | `oklch(0.972 0.008 78)` | `#FAF7F0` |
| `--gray-100` | `oklch(0.918 0.012 75)` | `#EAE4D6` |
| `--gray-300` | `oklch(0.804 0.015 70)` | `#CEC5B2` |
| `--gray-500` | `oklch(0.605 0.018 65)` | `#928873` |
| `--gray-700` | `oklch(0.395 0.015 60)` | `#544E42` |
| `--gray-900` | `oklch(0.215 0.010 60)` | `#241F18` |

### Dark-mode recommendation: **DO NOT SHIP**

Per Phase 3D: lock to light mode only. Apply `<html style="color-scheme: light only">` so users in OS dark mode see the bone-paper experience as designed. No `dark:` Tailwind variants anywhere in the codebase. If a future engagement insists on a "night-logbook" counterpart, design it bespoke (deep loam ground + warm-cream ink + slightly desaturated brick) — NOT as an inversion of bone palette. Out of scope for this rebuild.

### Atmosphere assets

- `public/textures/grain.webp` — 256×256 paper-fiber noise tile, mounted via `background-image` on `<body>` at `opacity: 0.06`, `mix-blend-mode: multiply`.
- `public/textures/ruled.svg` — 24px-pitch hairline ruled-paper SVG, mounted as repeating `background-image` on long-form content sections (`/our-story`, `/journal/[slug]`, `/customer-reviews`) at `opacity: 0.18`.
- `public/textures/scanned-grain.webp` — 512×512 high-frequency scan grain, mounted as fixed-position pseudo-element overlay on hero `<img>` plates at `opacity: 0.10`, `mix-blend-mode: multiply`.

---

## 5. Motion language — locked spec

### Lenis settings (global)

```ts
// SmoothScrollProvider
new Lenis({
  duration: 1.1,
  lerp: 0.085,                 // slightly slower than default 0.1 — almanac feel
  wheelMultiplier: 0.9,        // slight dampening — never feels frantic
  touchMultiplier: 1.5,        // mobile keeps native momentum responsiveness
  easing: (t) => 1 - Math.pow(1 - t, 4),  // easeOutQuart — soft settle
  smoothWheel: true,
  smoothTouch: false,          // do NOT smooth touch; respects iOS native scroll
  syncTouch: false,
});
```

GSAP ScrollTrigger sync via `ScrollTrigger.scrollerProxy()` — required setup ~5 lines, documented in the `MotionProvider` JSDoc.

### Page transitions

180ms inkblot wipe in `--accent` color from top-left → bottom-right corner, layered over the outgoing route. Implemented via Framer Motion `<AnimatePresence mode="wait">` with a single `<motion.div>` mask. Subtle, never hijacks. Falls back to instant route swap under `prefers-reduced-motion`.

### Hover patterns

- **Buttons**: 1px underline (color `--accent`) animates from 0% → 100% width in 220ms with `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint). Filled buttons additionally darken from `--ink` → `--gray-900` background in 200ms.
- **Product cards**: hairline border thickens 1px → 2px in 200ms; card translates `translateY(-4px)`; image inside scales `1.02` with `transform-origin: bottom`. Stamp chip in lower-left fades from 0% → 100% opacity revealing the SKU code.
- **Nav links**: each nav link has a hidden monospace stamp at `--text-mono-xs` (e.g., `EST. 2017 KS`, `RX FOR SEASON`, `KANSAS-MADE`). On hover, stamp slides up 4px with 240ms fade-in below the link label. On `prefers-reduced-motion`, stamp is just instant-shown.
- **Photo plates**: 600ms fade-from-grayscale-to-color (`filter: grayscale(1) → grayscale(0)`) on first viewport entry. Static after that.

### Hero animation concept (restraint-first)

The home hero is a **static editorial logbook page**. It does not move on its own. Photo grain is static. Hairlines are static. The only animated element above the fold is the eyebrow stat strip (KANSAS-BORN. FIELD-TESTED. HUNTER-OWNED.) which fades in with a 600ms delay on initial mount. Everything else is held still until the user scrolls into the pinned counter moment.

### Signature motion moment per route

| Route | Signature moment |
|---|---|
| `/` | Scroll-pinned antler-inches counter + Kansas county-pin map drop sequence (see § 8) |
| `/products` | First product card on viewport enter does a 400ms hairline-border-stroke-on animation (1px draws from top-left clockwise around the card frame, 800ms duration); subsequent cards static |
| `/products/[slug]` (PDP) | Bag-tag triptych flip — three large stat squares (Protein / Fat / Calcium) flip on Y-axis from blank tag back → printed front, staggered 80ms apart, 600ms total, on viewport entry |
| `/our-story` | Greg's signed founder note slides up from below paper as scroll passes the hero (translateY 40px → 0, opacity 0 → 1, 800ms with 300ms delay) |
| `/why-gb-feeds` | Four-pillar cards fade-up sequentially as each crosses 25% viewport (150ms stagger, 500ms duration) |
| `/customer-reviews` | Continuous left-scrolling marquee ticker at the top (CB-radio transmission log: timestamps + names + verbatim quotes) — pure CSS `@keyframes` translateX, no JS, paused on hover |
| `/photo-gallery` | Masonry grid items fade-from-grayscale on viewport enter, staggered |
| `/journal` (index) | Hand-stamped date-block on each article card revealed on hover (offset rotation +1.5°, opacity 0 → 1, 220ms) |
| `/journal/[slug]` | Single-pin date-stamp ticker that scrubs alongside article scroll — left-margin sticky stamp updates date/county/wind as user moves down through dated sections |
| `/field-club` | Membership-card flip animation on the join CTA hover (X-axis flip, 500ms) |
| `/feed-program` | Wizard step transitions: 220ms slide-from-right + fade-in with stagger; final "prescription pad" output materializes with a typewriter reveal of the SKU list (per-character 12ms, 600ms total) |
| `/season/[phase]` | Calendar strip at top fades date-by-date from left to right as user scrolls (mimics the season's progress); pure CSS scroll-driven via `animation-timeline: scroll()` where supported, IntersectionObserver fallback |
| `/contact` | Form field focus = field's stamp label slides from outside left margin into focused state (180ms) |
| `/faq` | Accordion expand: hairline rule below question slides right-to-left as answer reveals |
| `/404` | Static editorial logbook page; no motion. |

### `prefers-reduced-motion` — mandatory fallback for every motion

| Animation | Reduced fallback |
|---|---|
| Pinned counter | Counter shows final number on mount; all 64 pins visible at once on static map; trail-cam plate in full color from first paint |
| Bag-tag flip | Triptych is just statically present, no flip |
| Marquee ticker | Static stacked column, three testimonials visible, "View all" link |
| Page transitions | Instant route swap |
| Hover stamps | Instant-shown |
| Card hairline draw-on | Static thick border from start |
| Greg's note slide-up | Static, in-position from start |
| Wizard step transitions | Instant step swap |

Reduced-motion is checked once at mount via `useReducedMotion()` from Framer Motion + `window.matchMedia('(prefers-reduced-motion: reduce)')` for GSAP guards. The site never feels broken under reduced motion — it just becomes a perfectly readable static document.

---

## 6. Component inventory

### Atomic

| Component | One-line spec |
|---|---|
| `<Button variant="primary\|secondary\|ghost" size="sm\|md\|lg">` | Sharp 0px-radius, 1px hairline border, all-caps Bebas Neue label, animated 1px accent underline on hover; `<a>` or `<button>` polymorphic via `as` prop |
| `<Link>` | Inline body link, 1px `--rule` underline always-on, hover swaps underline to `--accent` |
| `<Container>` | Max-width 1280px, fluid padding-x, optional inch-wide left-margin gutter (`paddingLeft: clamp(2rem, 6vw, 5rem)`) |
| `<Section variant="paper\|paper-2\|paper-3">` | Vertical-rhythm wrapper with consistent padding-y `clamp(4rem, 10vw, 9rem)` and optional ruled-paper bg |
| `<Heading level="1\|2\|3" font="display\|serif">` | Polymorphic `<h1>–<h6>` with locked type scale + leading + tracking |
| `<Text variant="body\|lede\|caption\|stamp">` | Body copy primitive, picks face + size + leading by variant |
| `<Image>` | `next/image` wrapper with `unoptimized: true` (static export), default `loading="lazy"`, optional `<ScannedGrainOverlay>` child |
| `<Stamp>` | Monospace chip — `JetBrains Mono`, `--text-mono-xs`, `--ink-quiet`, 1px hairline border, 4px x-padding, 2px y-padding; props for `label`, `value`, `dim` |
| `<Rule kind="hair\|strong\|ruled-bg">` | 1px hairline divider in `--rule`, full-width or content-width per prop |
| `<Marker>` | Inch-wide left-margin marker block; floats left of content; renders 4–6 stacked `<Stamp>` children (DATE, COUNTY, WIND, WEIGHT, TEMP) |
| `<PriceTag>` | Dollar+cents split — dollars in `--text-display-sm`, cents in `--text-body-sm` superscript; sale variant strikes-through MSRP in `--accent` |
| `<StockBadge state="in\|low\|out">` | Stamp-style chip in `--success` / `--warn` / `--danger`, mono label `IN STOCK` / `LOW STOCK` / `SOLD OUT` |

### Composite

| Component | One-line spec |
|---|---|
| `<NavBar>` | Mark-left + nav-right + persistent "BUILD YOUR PROGRAM" CTA + mobile drawer; sticky via `position: sticky` (no animation on stick) |
| `<EyebrowStripe>` | Always-visible top strip: "KANSAS-BORN. FIELD-TESTED. HUNTER-OWNED. SINCE 2017." reverse-out white on `--ink`, with `KS-{counter}` mile-marker icon pulling from `harvests.json` |
| `<Footer>` | Three columns (Brand / Shop / Contact) + newsletter form + legal row + copyright + social row; hairline `--rule-strong` above |
| `<ProductCard>` | Hairline-bordered card; product image (square aspect), name, price, stock badge, "VIEW" button; `<Stamp>` SKU chip in lower-left revealed on hover |
| `<TestimonialCard>` | DM Serif Display blockquote, first-name attribution in mono, optional date-stamp; no avatar |
| `<FAQItem>` | Accordion with hairline-rule under each Q; serif body answer copy |
| `<NewsletterForm>` | Single-field email input + "JOIN FIELD NOTES" submit; double-opt-in pattern |
| `<ContactForm>` | Name + email + message fields; Cloudflare Turnstile widget in lieu of reCAPTCHA; honeypot field; submit posts to Cloudflare Worker proxy → Resend |
| `<BagTagTriptych>` | Three oversized stat squares (Protein / Fat / Calcium for feed; Weight / Capacity / Runtime for non-feed). Numbers in `--text-display-xl` Bebas; labels in mono. Hairline-stroked rectangles, "GUARANTEED ANALYSIS" header strip, lot-stamp footer ("LOT 2024-09 / MANHATTAN, KS") |
| `<HarvestPin>` | 8px brick-red SVG circle pin with 1px white halo; on hover, stamp tooltip reveals (name, date, score) |
| `<KansasMap>` | Inline simplified SVG of 105 Kansas counties (≤20 KB); accepts `pins[]` prop; each `<path>` has `aria-label` |
| `<AntlerInchesCounter>` | 240px Bebas numeral + "INCHES" mono unit; tweens via `gsap.to()` mapped to scroll progress; reduced-motion shows final number |
| `<SeasonChip>` | Pill-shaped chip with mono label PRE-RUT / RUT / POST-RUT / ANTLER-GROWTH / YEAR-ROUND; `--accent` border for active phase |
| `<MotionProvider>` | Wraps app; instantiates Lenis; registers `ScrollTrigger.scrollerProxy()`; provides `useReducedMotion()` context for downstream components |
| `<MarqueeTicker>` | Continuous left-scrolling CSS-keyframed strip; pause-on-hover; ARIA-live polite for screen readers' first cycle then aria-hidden |
| `<ReceiptStrip>` | Sticky financing strip with perforated edges (CSS `mask-image`), monospace dot-matrix numerals, `prevPrice` and `installment` props, slight 0.3deg rotation |
| `<PrescriptionPad>` | Output card for Feed Program Wizard; ruled paper bg, hand-stamped "RX FOR" header, list of recommended SKUs with mono prices, "ADD BUNDLE" CTA |

### Page-level

`<HomePage>`, `<ProductsIndex>`, `<ProductDetail>`, `<OurStoryPage>`, `<WhyGBFeedsPage>`, `<CustomerReviewsPage>`, `<PhotoGalleryPage>`, `<JournalIndex>`, `<JournalArticle>`, `<FieldClubPage>`, `<FeedProgramWizardPage>`, `<SeasonPhasePage>` (one component, 4 routes), `<ContactPage>`, `<FAQPage>`, `<TermsPage>`, `<PrivacyPage>`, `<NotFoundPage>`.

### Decoration

| Component | One-line spec |
|---|---|
| `<PaperGrain>` | Fixed-position pseudo-element layer rendering `grain.webp` at `opacity: 0.06`, `mix-blend-mode: multiply` |
| `<HairlineRules>` | Absolute-positioned background layer rendering 24px-pitch repeating SVG hairlines; opt-in per section |
| `<ScannedGrainOverlay>` | Pseudo-element child layer for hero `<img>` plates; `pointer-events: none` |

**Total component count: ~46 components.**

---

## 7. Page-by-page architecture

**Brand-stat consolidation (canonical fix for Q1)**: the live counter on the home page IS the canonical antler-inches number. Every other page that previously cited 5,000 / 7,500 / 10,000 inches now references it via the phrase **"GB Feeds harvest counter →"** (link to home `#counter`). Wherever a numeric stat is required mid-copy, render `<LiveCount source="harvests.json" suffix="inches" />` so a single JSON edit propagates everywhere. **Surfaced still-pending-client-final-number as Q1 in STATE.md.**

### `/` (Home)

**Sections in order**:
1. `<EyebrowStripe>` — top-of-page persistent strip (KANSAS-BORN. FIELD-TESTED. HUNTER-OWNED. SINCE 2017.)
2. `<NavBar>` — sticky.
3. **Hero plate** — full-bleed scanned-grain hero photograph from `_inherited_assets/from_live/products/02-BC-40LB-2023/` (lifestyle Buck Chow bag in field). Left-margin `<Marker>` with stamps DATE / COUNTY (RILEY) / WIND (NW 9) / TEMP (54°F). Overlay: H1 "A SMALL BATCH SPECIALTY DEER FEED COMPANY" (Bebas, `--text-display-lg`), serif lede paragraph (DM Serif Display, `--text-body-lg`) carrying the tagline verbatim, primary "SHOP BUCK CHOW" CTA + secondary "READ GREG'S STORY" link.
4. **Sub-hero strapline** — single line "A deer feed company founded for hunters, by hunters" set in DM Serif Display italic, large-display-sm scale, centered, hairline rules above and below.
5. **Four-pillar block (THE GB FEEDS DIFFERENCE)** — preserved verbatim from `CONTENT_INVENTORY.md § Four-Pillar Block`. Layout: section header in Bebas `--text-display-md`, four cards in 2×2 desktop / 1-col mobile. Each card: stamp-eyebrow ("PILLAR 01" etc.) + Bebas heading + DM Serif Display body. "Learn more" anchor link to `/why-gb-feeds`.
6. **Founder voicemail / signed quote moment** — pulled excerpt from `/our-story` ("Have you ever bought a deer feed product and been disappointed when it didn't work? Me too..."), set as oversized DM Serif Display italic blockquote with hand-signed `-Greg` graphic stamp in `--accent`. Link "READ THE FULL STORY →".
7. **`<AntlerInchesCounter>` + `<KansasMap>`** — the signature scroll-pinned moment (see § 8 for full spec). Anchored at id `#counter`.
8. **Latest from the Journal** — three-card row of most-recent `/journal` entries; date-stamp + headline + 1-line dek + read time.
9. **FAQ (preserved on home)** — section header, four `<FAQItem>` accordions verbatim from `CONTENT_INVENTORY.md § Frequently Asked Questions`.
10. **Customer Reviews teaser** — `<MarqueeTicker>` with all 22 testimonials, "MORE CUSTOMER REVIEWS →" link.
11. **Contact block** — Subhead "Drop us a line!", `<ContactForm>` (name + email + message), alternative-contact card with `<a href="tel:6206393337">` clickable phone.
12. `<Footer>`.

**Components**: `<EyebrowStripe>`, `<NavBar>`, `<Marker>`, `<Stamp>`, `<Heading>`, `<Text>`, `<Button>`, `<Rule>`, `<AntlerInchesCounter>`, `<KansasMap>`, `<HarvestPin>`, `<MarqueeTicker>`, `<TestimonialCard>`, `<FAQItem>`, `<ContactForm>`, `<Footer>`.
**Copy source**: `CONTENT_INVENTORY.md § /` (all blocks).
**Signature moment**: scroll-pinned counter + Kansas county-pin map (§ 8).

### `/products` (Products Index)

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "PRODUCTS", serif dek "Sixteen items. Every one tested on Kansas dirt." Left-margin stamp list (16 SKUs / 4 categories).
3. Category filter strip — four `<SeasonChip>`-like pills DEER FEED / DEER FEEDERS / APPAREL / TACTACAM. Click filters in-place via URL query param `?cat=deer-feed`.
4. Product grid — 3-column desktop / 2-column tablet / 1-column mobile, `<ProductCard>` each. Sort: feed first (Buck Chow / Corn Candy / Pallet), then feeders, then trail-cams, then apparel. Sale items get a `<Stamp>` chip "ON SALE".
5. "Build Your Program" cross-link strip — large-display-sm Bebas "DON'T KNOW WHERE TO START? → BUILD A FEED PROGRAM" linking to `/feed-program`.
6. `<Footer>`.

**Components**: `<NavBar>`, `<Heading>`, `<Marker>`, `<SeasonChip>`, `<ProductCard>`, `<StockBadge>`, `<PriceTag>`, `<Button>`.
**Copy source**: `live_products.json` for SKU data; `CONTENT_INVENTORY.md § /products` for shell copy (mostly empty in original — rebuild authors fresh shell copy in Greg's voice).
**Signature moment**: card hairline-border-stroke-on draw-in.

### `/products/[slug]` (PDP — 16 routes)

**Sections** (per SKU):
1. `<EyebrowStripe>` + `<NavBar>` + breadcrumb (Home > Products > [Category] > [Name]).
2. Hero — two-column desktop / stacked mobile. Left: hero photograph from `_inherited_assets/from_live/products/<id>-<sku>/` (carousel of all available image positions). Right: stamp-eyebrow (SKU + category), Bebas H1 (Title-Case product name), serif lede ("Extra Inches Aren't An Accident" for Buck Chow, etc., from `description_formatted`), `<PriceTag>`, quantity selector, primary "ADD TO CART" or "BUY NOW" CTA (per § 10 commerce decision), `<StockBadge>`, `<a href="tel:6206393337">` clickable phone for $999+ feeders.
3. **`<BagTagTriptych>`** — the spec-as-hero block. For Buck Chow: PROTEIN 20% / FAT 4% / CALCIUM 8%. For Corn Candy: AROMA 5X / TREATS 500LB / WEIGHT 7LB. For non-feed SKUs: contextual triptych (e.g., feeder = CAPACITY 2000LB / RUNTIME 90D / WEIGHT 220LB; Tactacam = MEGAPIXELS / TRIGGER SPEED / BATTERY).
4. Long description — `description_formatted` rendered as serif body copy with bullet-list converted to hairline-bordered specs list.
5. **"Build a feed program with this" cross-sell** — 2–3 SKU recommendation cards based on a static `data/cross-sell-map.ts` lookup keyed by SKU.
6. **Filtered testimonials** — testimonials from the 22-list filtered to those mentioning the product by name (Buck Chow, Corn Candy) — 3–5 per Buck Chow / Corn Candy PDP; non-feed SKUs show 1 generic Greg signed line.
7. **JSON-LD `Product` schema** — embedded in `<head>` per route. Includes brand, name, description, image, sku, mpn, offers (price, priceCurrency, availability), and aggregateRating omitted (no on-site review counts).
8. **Sticky-on-mobile add-to-cart bar** — slides up at viewport bottom on scroll past hero. Persistent until cart action. Per § 10, Stripe Payment Link redirect: button text = "BUY NOW — $19.99"; target = pre-generated Stripe Payment Link URL hardcoded in `live_products.json` lookup.
9. `<Footer>`.

**Components**: `<NavBar>`, `<Marker>`, `<BagTagTriptych>`, `<PriceTag>`, `<StockBadge>`, `<Button>`, `<TestimonialCard>`, `<ProductCard>` (cross-sell), `<Stamp>`.
**Copy source**: `live_products.json` (all 16) + filtered subset of `CONTENT_INVENTORY.md § /customer-reviews`.
**Signature moment**: bag-tag triptych flip on viewport entry.

### `/our-story`

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — single full-width black-and-white scanned photograph of Greg in field (asset to be selected from `_inherited_assets/gbfeeds-isteam-assets/`). Left-margin stamps (EST. 2017, MANHATTAN KS).
3. Founder narrative — verbatim from `CONTENT_INVENTORY.md § /our-story`. Set in DM Serif Display, `--text-body-lg`, single 720px max-width column, ruled-paper background. Hairline rules between paragraphs. The closing `-Greg` set in display-italic with hand-signed graphic stamp.
4. Four-pillar inline restatement — same content as `/why-gb-feeds`, condensed.
5. CTA stripe — "READY TO TRY BUCK CHOW? → SHOP NOW".
6. `<Footer>`.

**Components**: `<NavBar>`, `<Marker>`, `<Heading>`, `<Text>`, `<Rule>`, `<Button>`, `<Footer>`.
**Copy source**: `CONTENT_INVENTORY.md § /our-story` (verbatim).
**Signature moment**: Greg's signed founder note slides up from below paper as scroll passes the hero.

### `/why-gb-feeds`

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "WHY GB FEEDS", DM Serif Display dek (one sentence framing the four pillars).
3. Four pillar sections — each its own full-width section, alternating paper / paper-2, with a number (01, 02, 03, 04) in `--text-display-xl` Bebas hugging the inch-margin. Verbatim from `CONTENT_INVENTORY.md § /why-gb-feeds`. The "10,000 inches" stat is replaced with `<LiveCount source="harvests.json" suffix="inches" /> inches harvested using GB Feeds products right here in Kansas`.
4. CTA stripe.
5. `<Footer>`.

**Components**: `<NavBar>`, `<Marker>`, `<Heading>`, `<Text>`, `<Rule>`, `<LiveCount>`, `<Button>`.
**Copy source**: `CONTENT_INVENTORY.md § /why-gb-feeds` (verbatim, with stat substitution).
**Signature moment**: four-pillar fade-up sequential on scroll.

### `/customer-reviews`

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "CUSTOMER REVIEWS", DM Serif Display tagline verbatim ("No paid sponsorships, no famous TV personalities, just real hunters sharing real success stories").
3. Stat strip — "22 REAL HUNTERS / 0 SPONSORSHIPS / KANSAS-MIDWEST-PLAINS" in mono.
4. Testimonial wall — 22 `<TestimonialCard>` in a tight 1-column or 2-column grid (mobile/desktop). Each card: blockquote in DM Serif Display + mono-attributed first name + optional `<Stamp>` "BUCK CHOW" or "CORN CANDY" tag inferred from quote content.
5. CTA — "GOT YOUR OWN STORY? CALL (620) 639-3337 OR DROP US A LINE →" linking to `/contact`.
6. `<Footer>`.

**Components**: `<NavBar>`, `<Heading>`, `<TestimonialCard>`, `<Stamp>`, `<MarqueeTicker>` (optional secondary instance), `<Button>`.
**Copy source**: `CONTENT_INVENTORY.md § /customer-reviews` (all 22 verbatim, attribution preserved).
**Signature moment**: marquee ticker at top continuous-scroll.

### `/photo-gallery`

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "FIELD PHOTOGRAPHS", dek ("Trail cams, harvests, and the people behind the bags.").
3. Filter chips — All / Trail Cam / Harvest / Property / Behind the Scenes.
4. Masonry grid — sourced from `_inherited_assets/gbfeeds-isteam-assets/` (~27 lifestyle photos enumerated in `CONTENT_INVENTORY.md`). Each thumbnail click opens lightbox with photographer (Greg or attributed customer) + date stamp + county.
5. `<Footer>`.

**Components**: `<NavBar>`, `<Image>`, `<Stamp>`, `<Marker>`.
**Copy source**: `CONTENT_INVENTORY.md § /photo-gallery` (gallery image list).
**Signature moment**: masonry items fade-from-grayscale on viewport entry.

### `/journal` (NEW — editorial)

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "FIELD NOTES", dek ("Greg's stand-by-stand log. Updated when something happens.").
3. Article grid — 6 cards desktop / 3 mobile per page; pagination via `[page]` segments. Each card: hand-stamped header (county / date / wind / activity score 1–5) + Bebas headline + DM Serif Display 2-sentence dek + read time.
4. Tag strip at bottom — Pre-Rut / Rut / Post-Rut / Antler-Growth / Customer Hunts.
5. `<Footer>`.

**3 launch articles seeded** (titles for Phase 6 author):
- "Stand 7B, Riley County: Why I Switched My Spin Feeders Back to Gravity"
- "What's Actually In a Bag of Buck Chow: An Ingredient-by-Ingredient Walk"
- "How We Measure Inches: The 22-Inch Rule and Why Greens Don't Count"

**Components**: `<NavBar>`, MDX renderer, `<Stamp>`, `<Heading>`.
**Copy source**: `content/journal/*.mdx` files (Phase 6 authors per template above).
**Signature moment**: hand-stamped date-block hover reveal on cards.

### `/journal/[slug]` (NEW — article)

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Article hero — full-bleed photograph, hand-stamped page header (COUNTY / DATE / WIND / TEMP / ACTIVITY n/5), Bebas H1, DM Serif Display dek.
3. Article body — MDX rendered content. Left-margin sticky `<Marker>` carries the date-stamp ticker that scrubs.
4. Footer of article — "Filed under: [tags]" + previous/next navigation + "READ MORE FIELD NOTES →".
5. `<Footer>`.

**Components**: `<NavBar>`, `<Marker>` (sticky), `<Image>`, MDX components.
**Copy source**: per-article MDX file with frontmatter (title, date, county, season, weather, wind, activity_score, tags[]).
**Signature moment**: single-pin date-stamp ticker scrubs alongside article scroll.

### `/field-club` (NEW — marketing page only at Phase 6)

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "THE GB FEEDS FIELD CLUB", brick-accent subscript "BY INVITATION OF GREG", DM Serif Display dek explaining the membership.
3. What you get — three cards: "FIELD CLUB PRE-RUT MIX (member-only)", "GREG'S QUARTERLY LETTER", "EARLY ACCESS TO NEW BLENDS".
4. Sample Pre-Rut Mix card — burlap-feel blackletter date-stamped tag treatment, "JOINS YOUR DOORSTEP LATE AUGUST".
5. **Email-signup form** (Phase 4 ships this; subscription mechanic deferred to Phase 5 ratification — see § 10) — single field "Drop your email and we'll save your spot. Field Club opens [TBD]." Submits to Cloudflare Worker proxy → Resend, populates a "field-club-waitlist" tag.
6. `<Footer>`.

**Components**: `<NavBar>`, `<Heading>`, `<NewsletterForm>` (subclass: `<FieldClubWaitlistForm>`), `<Image>`.
**Copy source**: Phase 6 author drafts (Greg-voice).
**Signature moment**: membership-card flip animation on join CTA hover.
**Phase 5 placeholder note**: actual subscription mechanic (Stripe subscription mode + Customer Portal? Memberstack? Outseta?) is a Phase 5 architecture decision (§ 10). Phase 6 ships the marketing page with waitlist signup only.

### `/feed-program` (NEW — Wizard)

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "BUILD YOUR PROGRAM", DM Serif Display dek ("Three questions. One Greg-built bundle.").
3. 3-step wizard:
   - **Step 1 — Region**: Kansas / Midwest / Plains / South — four large radio cards.
   - **Step 2 — Season**: Pre-Rut / Rut / Post-Rut / Antler-Growth — four `<SeasonChip>`s.
   - **Step 3 — Goal**: Trophy / Health / Density — three radio cards.
4. **Result — `<PrescriptionPad>`** — ruled-paper card with "RX FOR [REGION] / [SEASON] / [GOAL]" header, 2–3 SKU bundle list with per-SKU Bebas name + mono price, per-bundle "WHY THIS COMBINATION" 1-line rationale, "ADD BUNDLE TO CART" CTA linking to a pre-generated Stripe Payment Link bundle URL (per § 10).
5. CTA — "NOT WHAT YOU EXPECTED? CALL GREG → (620) 639-3337".
6. `<Footer>`.

**Components**: `<NavBar>`, `<SeasonChip>`, `<PrescriptionPad>`, `<Button>`.
**Copy source**: pure derivation — `data/feed-program-map.ts` static lookup of all 4×4×3 = 48 combinations to 2–3 SKU arrays + 1-line rationale strings.
**Signature moment**: wizard step transitions + typewriter prescription reveal.

### `/season/[phase]` (NEW — 4 routes: pre-rut, rut, post-rut, antler-growth)

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 e.g. "PRE-RUT", DM Serif Display dek ("Late September through mid-October. Bucks are establishing rubs and starting to break out of bachelor groups."). Left-margin Marker with date-range stamp.
3. Calendar strip — 12-week strip showing the phase's date range, average rainfall, and Greg's stand-by-stand notes for that phase (1-line each).
4. Curated SKU collection — 3–5 `<ProductCard>`s filtered to that phase (per static `data/season-skus.ts` mapping).
5. Nutritional priority paragraph — DM Serif Display, 2-paragraph essay on what the herd needs in this phase (Phase 6 authors per Greg's input).
6. Filtered field-notes — 2–3 `<JournalCard>`s tagged to that season.
7. `<Footer>`.

**Components**: `<NavBar>`, `<Marker>`, `<Heading>`, `<ProductCard>`, `<JournalCard>` (composite of `<Stamp>` + `<Heading>`).
**Copy source**: Phase 6 authors per Greg's voice; SKU mapping in `data/season-skus.ts`.
**Signature moment**: calendar strip date-by-date fade-in on scroll.

### `/contact`

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "DROP US A LINE", DM Serif Display dek.
3. Two-column desktop / stacked mobile: left = `<ContactForm>` (name, email, message); right = call-card with `<a href="tel:6206393337">` clickable `(620) 639-3337`, hours, email link.
4. `<Footer>`.

**Components**: `<NavBar>`, `<Heading>`, `<ContactForm>`, `<Stamp>`.
**Copy source**: `CONTENT_INVENTORY.md § Contact Block`.
**Signature moment**: form field focus = stamp-label slide.

### `/faq`

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "FREQUENTLY ASKED QUESTIONS".
3. Four `<FAQItem>` accordions verbatim from `CONTENT_INVENTORY.md`.
4. JSON-LD `FAQPage` schema embedded for Google rich results.
5. CTA — "DIDN'T FIND YOUR ANSWER? CALL (620) 639-3337".
6. `<Footer>`.

**Components**: `<NavBar>`, `<Heading>`, `<FAQItem>`, JSON-LD.
**Copy source**: `CONTENT_INVENTORY.md § Frequently Asked Questions`.
**Signature moment**: accordion hairline rule slide-reveal.

### `/terms`

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Hero — Bebas H1 "TERMS & CONDITIONS", date-of-last-update stamp.
3. Body — long-form legal copy in DM Serif Display.
4. `<Footer>`.

**Components**: `<NavBar>`, `<Heading>`, `<Text>`, `<Stamp>`.
**Copy source**: Phase 8 `documentation-specialist` drafts replacement (current GoDaddy template lacks vendor disclosure). Q9 in STATE.md tracks.
**Signature moment**: none (legal page is intentionally still).

### `/privacy`

Same structure as `/terms`. Q9 in STATE.md applies.

### `/404`

**Sections**:
1. `<EyebrowStripe>` + `<NavBar>`.
2. Editorial logbook page — Bebas "PAGE NOT IN THE FIELD", DM Serif Display copy: "Looks like this stand isn't on the property. Maybe it never was, or maybe Greg moved it after a bad sit. Either way, here's the way back."
3. "RETURN TO MAIN STAND" link → `/`.
4. `<Footer>`.

**Components**: `<NavBar>`, `<Heading>`, `<Text>`, `<Button>`.
**Signature moment**: none (intentionally still).

### Cloudflare Pages `_redirects` (Phase 8)

```
/terms-and-conditions    /terms     301
/terms-and-conditions-1  /terms     301
/privacy-policy          /privacy   301
/products/ols/products/buckchow                    /products/buck-chow                301
/products/ols/products/corn-candy                  /products/corn-candy              301
# (...one redirect per OLS PDP path → new /products/[slug] URL)
/products/ols/cart                                  /products                          301
/products/ols/checkout                              /products                          301
/m/login                                            /                                  301
/m/account                                          /                                  301
/m/orders                                           /                                  301
```

**Total routes built: 38** (1 home + 1 products index + 16 PDPs + 1 our-story + 1 why + 1 reviews + 1 gallery + 1 journal index + 3 journal articles + 1 field-club + 1 feed-program + 4 season pages + 1 contact + 1 faq + 1 terms + 1 privacy + 1 404 + 1 sitemap.xml).

---

## 8. The signature move — fully scoped for Phase 6

### Where in the home page

Immediately following the four-pillar `THE GB FEEDS DIFFERENCE` block. Pin enters at section anchor `#counter`. Pinned scroll buffer: ~3 viewport heights of scroll = roughly 30 seconds at typical wheel speed. Section ID anchored so other pages can deep-link to it.

### Component composition

```tsx
// app/(home)/components/SignatureMove.tsx — 'use client', dynamic import
<SignatureMove>
  <Pinned>
    <BackgroundPlate src="/photos/trail-cam-2024-11-14.jpg" /> {/* grayscale → color */}
    <AntlerInchesCounter source="/data/harvests.json" />        {/* 240px Bebas */}
    <KansasMap pins={harvests} />                                {/* SVG with HarvestPins */}
  </Pinned>
</SignatureMove>
```

### Data source — `public/data/harvests.json`

Per Phase 3D and STATE.md decision: build-time JSON bake. Greg edits + commits + Cloudflare Pages CI rebuilds.

```ts
// types/harvests.ts
export interface Harvest {
  id: string;             // unique slug, e.g. "dylan-2024-11-14"
  hunter_first_name: string;
  date: string;           // ISO 8601, e.g. "2024-11-14"
  county: string;         // e.g. "Riley"
  state: string;          // 2-letter, e.g. "KS"
  inches: number;         // gross typical antler score in inches
  buck_age: number | null;        // optional, in years
  product_used: string[];         // ["Buck Chow", "Corn Candy"]
  trail_cam_image: string | null; // optional, path under /photos/
  caption: string | null;          // optional Greg-line, ≤120 chars
}

export interface HarvestsFile {
  total_inches: number;          // sum of harvest.inches across all entries
  total_count: number;           // number of harvests
  last_updated: string;          // ISO 8601 timestamp of last edit
  source: "manual" | "import";
  harvests: Harvest[];
}
```

Total inches displayed in the counter = `HarvestsFile.total_inches` (NOT recomputed at runtime — baked at build by a `scripts/validate-harvests.ts` step).

### Behavior — full motion spec

1. **On scroll into pin point** (`ScrollTrigger.pin()` registered against the `<SignatureMove>` section's bounding rect):
   - Counter starts at `0`, ticks up to `total_inches` over the pin's progress (0 → 1).
   - Counter tick rendered via `gsap.to(counterRef, { textContent: total_inches, duration: 1, snap: { textContent: 1 }, ease: "power2.out" })` driven by the timeline's progress (no real `duration` — the value is mapped to scroll progress).
   - Behind the counter, a single `<img>` element (one source file, no double-download) tweens `filter: grayscale(1) → grayscale(0)` from progress 0 → 1.
   - Pins drop on the Kansas map in sync: `harvests.length` total pins, distributed across the timeline so pin index `i` becomes visible when `progress >= i / harvests.length`. Each pin's `opacity` tweens 0 → 1 over 200ms when its threshold is crossed; pin scale tweens `0.6 → 1.0`.
2. **Pin release**: progress reaches 1, counter shows final number, all pins are visible, image is full color. Pin section unsticks, normal scroll resumes.
3. **GSAP + Lenis sync**: `ScrollTrigger.scrollerProxy()` configured per Phase 3D — required for Lenis to drive ScrollTrigger.
4. **Bundle isolation**: GSAP + ScrollTrigger imported via `dynamic(() => import('./SignatureMove'), { ssr: false })` so the ~60 KB GSAP cost is paid only on the home route.

### Reduced-motion fallback

- `useEffect(() => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; gsap.timeline(...) }, [])`.
- When matched: counter renders `total_inches` directly; all pins on map render with `opacity: 1` immediately; trail-cam plate renders in full color (no `filter: grayscale()` applied); pin section is just a normal full-bleed section, not pinned.
- All informational content is preserved — only the cinematic delivery is dropped.

### Mobile fallback (≤480px viewport)

- Pin section reduces to 70vh (not 3 viewport heights).
- Counter renders at `--text-display-lg` (smaller scale, ~96px).
- Pins on Kansas map drop staggered via IntersectionObserver (not scroll-tied), 80ms stagger between pins.
- Map below 480px collapses to a static text list "64 HARVESTS / 28 KANSAS COUNTIES / SINCE 2023" — simpler and more legible.

### "As-of" stamp

Counter displays a small mono `<Stamp>` below the number reading `AS OF <last_updated>` (DD MMM YYYY), pulling from `harvests.json`'s `last_updated`. This turns the build-time-bake constraint (the counter's age is bounded by the deploy cadence) into an authenticity signal, not a transparency gap.

### Accessibility

- Each `<HarvestPin>` has `aria-label="<first_name>, <date>, <county> County, <inches> inches"`.
- Each county `<path>` in `<KansasMap>` has `aria-label="<county_name> County"`.
- `<AntlerInchesCounter>` has `aria-live="polite"` and on initial mount announces the final value (not the ticking) for screen readers.
- Keyboard focus order: county → adjacent county (`tabIndex={0}` on each).

---

## 9. Industry-fit guardrails

### Clichés to AVOID (extending § 3 of synthesis)

1. **Orange-and-camo / red-and-black "hunter" palettes**. Reject categorically.
2. **Dead-buck-on-tailgate / trophy grip-and-grin photography**. Use process / habitat / lifestyle instead — the existing `_inherited_assets/from_live/products/` and `gbfeeds-isteam-assets/` photo set is plenty.
3. **Slider Revolution / Splide hero carousel**. Static cinematic hero only.
4. **Inter / Roboto / Open Sans / Montserrat / Lato / Helvetica Neue body defaults**. Locked: Bebas + DM Serif Display + JetBrains Mono.
5. **Stock Shopify / WordPress / GoDaddy templated home layout**. Reject the layout grammar entirely.
6. **"We are passionate about deer hunting" / "Hunter-founded, hunter-driven" boilerplate**. Use Greg's actual 2017 narrative, never platitudes.
7. **Centered logo + 6-link horizontal nav + cart icon (BigCommerce default)**. Asymmetric / stamp-style header instead.
8. **Trust-badge clutter** in footer. Replace with one earned proof: the live antler-inches counter + customer-named harvest count.
9. **Colored category-pill secondary nav with 6 mismatched accent hues** (Antler King anti-pattern). Single accent only.
10. **Stock product-on-white seamless** as sole product photography mode. Commit to environment + lifestyle for hero plates.
11. **Generic "Shop Now" / "Learn More" / "Discover" CTAs**. Use imperatives in Greg's voice: "DROP A BAG", "PULL A PALLET", "BUILD YOUR PROGRAM", "READ GREG'S STORY", "JOIN FIELD NOTES".
12. **Light-mode-only with no atmosphere** (Record Rack anti-pattern). The bone canvas MUST carry grain, paper texture, and stamped edges to feel inhabited.
13. **AI-generated wildlife illustration / clean vector deer silhouettes**. Only scanned scratchboard, woodcut, or photographic.
14. **Emoji of any kind**. Specifically forbidden across all routes.
15. **Purple gradients / chromatic gradients / "founder selfie circles"**. Out.
16. **Tailgate trophy photography** (already covered above, restated for emphasis).

### Expectations to MEET — what a serious deer hunter expects

1. **Pricing visibility**: every SKU's price shown immediately, no "request a quote" patterns. ✅ (live OLS API exposes all 16 prices — preserved).
2. **Trust signals appropriate to a small brand**: 22 verbatim testimonials, founder-named narrative, contact phone number prominently, Kansas operations address, TrustedSite / McAfee Secure badge re-attached (Q7).
3. **Legitimate testimonials with attribution**: preserved verbatim with first-name attribution.
4. **No upsell-bombardment**: zero modal popups on first visit, zero "WAIT! 10% OFF!" exit-intent dialogs, zero floating chat-pop-ups beyond the bottom-right Reamaze widget (or whatever chat replacement is chosen).
5. **Phone access**: `(620) 639-3337` as `tel:` link in footer, contact page, and on $999+ feeder PDPs (high-ticket items where buyers want to talk).
6. **Honest stock signaling**: in-stock confirmed via build-time data; rebuild does NOT show fake "low stock — only 3 left!" urgency markers.
7. **Real product photography**: actual bag in actual field. No 3D renders. No stock photos.
8. **Full ingredient transparency**: bag-tag triptych + long-form description from the live PDP API. Hunters check protein percentages.
9. **Mobile-first consumption**: most hunters browse on phones in the truck. Mobile experience must be first-class — sticky add-to-cart, large tap targets, fast LCP.
10. **No dealer-locator** (anti-pattern — covered in synthesis § 1). GB is DTC-only; the equivalent is "WHERE GREG TESTED IT" Kansas pin map (§ 8).
11. **JSON-LD `Product` + `FAQPage` + `Organization` schema**: rich-results eligibility on every PDP and the FAQ. Easy SEO win the original site doesn't have.
12. **Strict `Content-Security-Policy`, HSTS, X-Frame-Options DENY, Permissions-Policy** — per security MUST list (Phase 8 implements via `_headers`).

---

## 10. Open questions surfaced for Phase 5 + Phase 8

### 10.1 — Commerce pattern (Q2.1 in STATE.md)

**Recommendation: migrate to Stripe Checkout via Payment Links.** Retire GoDaddy OLS / Poynt / `mysimplestore.com` cross-domain hop.

**Why**:
- Eliminates the brand-discontinuity domain hop (`gbfeeds.com` → `<uuid>.mysimplestore.com`) that breaks brand cohesion at the highest-stakes UX moment.
- Stripe Payment Links are zero-server, fully compatible with `output: 'export'`. Each SKU gets one pre-generated Stripe Payment Link URL in the dashboard; the link is hardcoded in `live_products.json`. PDP "BUY NOW" button is just an `<a href="https://buy.stripe.com/...">`.
- Card-entry stays inside Stripe's iframe (or hosted page), so GB Feeds remains **out of PCI DSS scope** (per security § PII / data handling).
- Stripe supports recurring/subscription mode natively (needed for Field Club, § 10.2).
- Tyler's other brand sites use Stripe — operational pattern is proven.
- For multi-SKU bundles (Feed Program Wizard output): pre-generate one Stripe Payment Link per common bundle (~10–15 links to start) and key the wizard output to the matching link.

**Trade-offs**:
- Stripe's transaction fee is 2.9% + 30¢ vs. Poynt's slightly different blended rate — verify with Greg.
- One-time Stripe-account setup (or migration of existing if Greg has one).
- 16 single-SKU links + ~15 bundle links = ~30 Payment Links to generate manually in dashboard. Acceptable.

**Alternative considered (NOT recommended)**: preserve existing GoDaddy redirect to `mysimplestore.com`. Saves migration effort but accepts the brand-discontinuity hop, the cross-domain trust gap (security audit P-flagged), and locks GB out of subscriptions for Field Club.

**Phase 5 ratifies. Phase 6 implements PDP `<a href>` patterns. Phase 8 cuts over DNS + ships `_redirects` from old OLS paths.**

### 10.2 — Field Club subscription mechanism

**Recommendation: Stripe Checkout in subscription mode + Stripe Customer Portal.**

**Why**:
- Aligns with § 10.1 (already on Stripe).
- Customer Portal handles cancellations / pauses / payment-method updates without GB-side engineering.
- Native dunning / retry logic.
- Free for the merchant beyond Stripe's normal transaction fees.

**Alternatives considered**:
- **Memberstack** — adds $25/mo + 2% transaction fee on top of Stripe. Worth it only if member-gated content is needed (it is not — Field Club benefits are physical: a member-only bag + Greg's letter + early access).
- **Outseta** — same overhead reasoning. Skip.

**Phase 4 ships**: marketing page + waitlist email-signup form (Cloudflare Worker proxy → Resend). Subscription mechanic mounts in Phase 6 as a Stripe Payment Link (subscription mode) hardcoded URL — same pattern as one-off SKUs.

**Phase 5 ratifies the Stripe subscription model. Phase 6 builds. Phase 8 final-tests dunning + portal flows.**

### 10.3 — Newsletter / contact form delivery

**Recommendation: Cloudflare Worker → Resend.**

**Why**:
- Cloudflare Pages already hosts the static site. Workers run on the same edge. Zero-config for `/api/contact` route.
- Resend is the cleanest transactional + marketing email platform for small senders. Generous free tier (3K/mo). Native React Email template support.
- Cloudflare Turnstile for bot defense (privacy-friendlier than reCAPTCHA v3, free, GDPR posture better).

**Alternatives considered**:
- **Formspree** — easier to wire (no Worker code), but less flexible and not free at expected volume.
- **Web3Forms** — similar trade-off. Free tier sufficient but limits visibility into deliverability.
- **Mailchimp / Klaviyo** — heavier than needed for current volume; worth considering if marketing automation grows post-launch (defer).

**Phase 5 ratifies. Phase 6 wires Worker + Resend account. Phase 8 connects custom domain.**

### 10.4 — TrustedSite badge (Q7)

**Recommendation: preserve mount point with `NEXT_PUBLIC_TRUSTEDSITE_ID` env var.**

`<TrustedSiteBadge>` component reads `process.env.NEXT_PUBLIC_TRUSTEDSITE_ID`; renders the badge if set, no-ops if unset (graceful degradation). Tyler supplies the value once it's recovered from the McAfee Secure dashboard (Phase 8 client task in STATE.md). If the account cannot be recovered, re-issue with a new site ID and update env.

**Phase 8 final integration step.**

### 10.5 — Reamaze chat widget

**Recommendation: drop chat at launch; re-add post-launch as Reamaze direct snippet OR swap to Crisp / Tawk.**

**Why**: the existing `gbfeeds.com/m/api/reamaze/v2/customers/auth?brand=…` bridge is GoDaddy-OLS plumbing that does not survive the rebuild (security § Third-party scripts P1). Re-attaching Reamaze post-launch via their standard widget snippet is one line of HTML; do it after launch validation.

**Phase 5 ratifies. Phase 8 (post-launch checklist) re-mounts.**

### 10.6 — Live counter data ingestion (deferred from § 8)

Phase 4 ships build-time JSON bake (Greg edits `public/data/harvests.json` and pushes). Phase 5 may ratify a Cloudflare Worker admin form (small `POST /admin/harvests` endpoint behind basic auth → updates KV → triggers Cloudflare Pages deploy hook) for ergonomic non-technical editing later. No blocker for launch.

### 10.7 — Privacy policy refresh (Q9)

Phase 8 `documentation-specialist` drafts replacement disclosing GA4, the chosen email service (Resend), Cloudflare (CDN/Workers), Stripe, optional Reamaze, Cloudflare Turnstile. Tyler reviews for compliance. Current GoDaddy template is not portable.

### 10.8 — GA4 property continuity

The existing GA4 measurement ID `G-BF2FDR6KMM` is safe to publish (security § 1). Recommend keeping the same property post-rebrand for trend continuity. Confirm with client in Phase 8.

---

*End of Phase 4 Design Direction Brief — general-purpose — 2026-05-06.*

---

## Phase 4 — Source Tree Proposal (clean-architecture-expert)

> Author: clean-architecture-expert. Date: 2026-05-06.
> Purpose: lock the canonical file tree the Phase 6 builders will follow. Every decision below derives from the locked stack (Next.js 15 App Router + React 19 RSC + TS strict + Tailwind v4 CSS-first + `output: 'export'` + Cloudflare Pages), the 38-route map (§ 7), and the ~46-component inventory (§ 6).

### Decision summary (one-line each)

1. **`src/app/` — route-grouped via parenthesized segments.** Groups isolate layouts (e.g., `(editorial)` mounts the ruled-paper background; `(legal)` skips the eyebrow stripe; `(shop)` mounts the sticky add-to-cart provider on mobile). No URL impact.
2. **`src/components/` — taxonomic subfolders matching § 6** (`atomic/`, `composite/`, `decoration/`, `motion/`, `page/`). Co-locate each component as a single `.tsx` file (no per-component folders). Tailwind v4 means zero `.module.css` co-location.
3. **`src/data/` — typed wrappers + frozen JSON.** Live SKU JSON lives BOTH in `src/data/products.live.json` (build-time TS import + type-checked via `products.ts` zod schema) AND copied to `public/data/products.live.json` for any client-side fetch. RSC components import from `src/data/`; client components receive props.
4. **`src/lib/` — five canonical files only**: `cn.ts`, `seo.ts`, `routes.ts`, `analytics.ts`, `validators.ts`. No deep nesting.
5. **`src/hooks/` — exactly four hooks**: `useReducedMotion`, `useScrollProgress`, `useLenis`, `useTrustedSiteBadge`.
6. **`src/styles/` — token splitting**: `globals.css` is the single import target in `app/layout.tsx`; it `@import`s `tokens.css` (the `@theme` block), `reset.css`, `typography.css`, `atmosphere.css` (grain/ruled/scanned-grain CSS data-URLs and bg compositions). Texture binaries (`grain.webp`, `ruled.svg`, `scanned-grain.webp`) live in `public/textures/` per § 4.
7. **`public/`** — flat asset tree with one folder per asset family. `harvests.json` and `products.live.json` under `public/data/`. Logo + paper-grain noise SVG under `public/brand/`. 16 SKU photo folders under `public/products/<sku>/` (post AVIF/WebP conversion). 1200×630 OG cards under `public/og/`. Favicon set under `public/icons/`. Texture binaries under `public/textures/` (matches § 4 spec).
8. **MDX content placement** — `src/content/journal/<slug>.mdx`. Reasoning: `generateStaticParams` reads via Node `fs.readdirSync(path.join(process.cwd(), 'src/content/journal'))` at build time only; co-locating with source ensures TS-aware imports for MDX components. `public/journal/` reserved for per-article image assets referenced from frontmatter.
9. **Repo root config** — minimal: `next.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `.gitignore`, `.env.example`, `wrangler.toml`, `README.md`, `RUNBOOK.md`, `.editorconfig`, `.prettierrc.json`, `eslint.config.mjs`, `.github/workflows/deploy.yml`, `mdx-components.tsx` (Next.js 15 MDX bridge file — must be at root, not in `src/`).
10. **Dependency direction** — enforced by ESLint flat config + `eslint-plugin-boundaries` (recommended over discipline; CI fails on violation). Three rules locked below.

### Final tree

```text
gbfeeds.com-rebuilt/
├── .context/                         # phase docs (already exists, untouched)
├── .github/
│   └── workflows/
│       └── deploy.yml                # Cloudflare Pages via wrangler-action@v3
├── .editorconfig
├── .env.example                      # NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_TRUSTEDSITE_ID, RESEND_API_KEY (worker-only), TURNSTILE_SITE_KEY
├── .gitignore
├── .prettierrc.json
├── eslint.config.mjs                 # flat config + eslint-plugin-boundaries layer rules
├── mdx-components.tsx                # Next.js 15 root MDX components export (REQUIRED at root)
├── next.config.ts                    # output: 'export', images.unoptimized: true, trailingSlash: true
├── package.json
├── package-lock.json
├── README.md
├── RUNBOOK.md                        # ops: deploy, harvest-edit, env-vars, post-launch checklist
├── tsconfig.json                     # strict: true, paths { "@/*": ["src/*"] }
├── wrangler.toml                     # Cloudflare Pages project + Worker (forms proxy → Resend)
│
├── public/
│   ├── _headers                      # CSP, HSTS, X-Frame-Options DENY, Permissions-Policy, COOP/COEP
│   ├── _redirects                    # 301s per § 7 redirect map (OLS legacy paths → new slugs)
│   ├── robots.txt                    # auto-generated by build script in Phase 6
│   ├── sitemap.xml                   # auto-generated by build script in Phase 6 (38 routes)
│   ├── manifest.webmanifest
│   ├── brand/
│   │   ├── logo.svg                  # primary mark
│   │   ├── logo-1024.png             # PWA / OG fallback (preserved from from_live)
│   │   └── greg-signature.svg        # hand-signed -Greg accent in --accent
│   ├── data/
│   │   ├── harvests.json             # live counter source (Greg-edited; § 8 schema)
│   │   └── products.live.json        # mirror of src/data/products.live.json (for any client fetch)
│   ├── icons/
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── og/
│   │   ├── default.png               # 1200×630 fallback
│   │   ├── home.png
│   │   ├── products.png
│   │   ├── products-{sku}.png        # 16 PDP-specific cards (generated Phase 6)
│   │   ├── our-story.png
│   │   ├── why-gb-feeds.png
│   │   ├── customer-reviews.png
│   │   ├── photo-gallery.png
│   │   ├── journal.png
│   │   ├── journal-{slug}.png        # per-article cards
│   │   ├── field-club.png
│   │   ├── feed-program.png
│   │   ├── season-{phase}.png        # 4 seasonal cards
│   │   ├── contact.png
│   │   └── faq.png
│   ├── photos/                       # editorial photography pool (gallery, hero plates, journal article inline)
│   │   ├── trail-cam/                # filenames stamped: YYYY-MM-DD_county_camera-id.webp
│   │   ├── lifestyle/                # bag-in-field, founder portraits
│   │   └── gallery/                  # 27 lifestyle photos enumerated in CONTENT_INVENTORY.md
│   ├── products/                     # 16 SKU photo folders (post image-editor-pro AVIF/WebP conversion)
│   │   ├── bc-40lb-2023/
│   │   │   ├── hero.avif
│   │   │   ├── hero.webp             # WebP fallback
│   │   │   ├── 02.avif
│   │   │   └── 03.avif
│   │   ├── cc-7lb-2023/
│   │   ├── bc-2000lb-2023/
│   │   ├── gb-camohat/
│   │   ├── gb-blkhat/
│   │   ├── rvl-x/
│   │   ├── rvl-x-pro/
│   │   ├── tct-rvl-x-gen/
│   │   ├── 32g-sd-crd/
│   │   ├── lth-rch-btt-crt/
│   │   ├── djs-cmr-stk/
│   │   ├── xtr-slr-pnl/
│   │   ├── txs-wld-spp-2/
│   │   ├── txs-wld-spp-600/
│   │   ├── txs-wld-spp-6001/
│   │   └── txs-wld-spp-21/
│   ├── journal/                      # per-MDX-article images (referenced by frontmatter cover_image)
│   │   ├── stand-7b-riley/
│   │   ├── ingredient-walk/
│   │   └── twenty-two-inch-rule/
│   └── textures/
│       ├── grain.webp                # 256×256 paper-fiber tile (§ 4)
│       ├── ruled.svg                 # 24px-pitch hairline ruled paper (§ 4)
│       └── scanned-grain.webp        # 512×512 hero-overlay grain (§ 4)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                # ROOT — fonts, <html lang="en" style="color-scheme: light only">, MotionProvider, EyebrowStripe, NavBar, Footer, GA4 script
│   │   ├── page.tsx                  # `/` — Home (RSC; SignatureMove dynamically imported as 'use client')
│   │   ├── not-found.tsx             # `/404` (renders <NotFoundPage>)
│   │   ├── opengraph-image.tsx       # default OG generator (route-overridable)
│   │   ├── icon.tsx                  # favicon generator
│   │   ├── manifest.ts               # PWA manifest export
│   │   ├── sitemap.ts                # build-time sitemap.xml emitter (reads routes.ts)
│   │   ├── robots.ts                 # build-time robots.txt emitter
│   │   │
│   │   ├── (shop)/                   # group: products + PDPs (mounts mobile sticky add-to-cart provider)
│   │   │   ├── layout.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx          # `/products`
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx      # `/products/[slug]` — generateStaticParams from src/data/products.ts
│   │   │   │       └── opengraph-image.tsx
│   │   │   └── feed-program/
│   │   │       └── page.tsx          # `/feed-program` — wizard (client component)
│   │   │
│   │   ├── (editorial)/              # group: long-form content (mounts ruled-paper bg + grain layer)
│   │   │   ├── layout.tsx
│   │   │   ├── our-story/
│   │   │   │   └── page.tsx
│   │   │   ├── why-gb-feeds/
│   │   │   │   └── page.tsx
│   │   │   ├── customer-reviews/
│   │   │   │   └── page.tsx
│   │   │   ├── photo-gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── journal/
│   │   │   │   ├── page.tsx          # `/journal` index
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx      # MDX renderer; generateStaticParams reads src/content/journal/
│   │   │   │       └── opengraph-image.tsx
│   │   │   └── season/
│   │   │       └── [phase]/
│   │   │           └── page.tsx      # `/season/{pre-rut,rut,post-rut,antler-growth}` (4 routes)
│   │   │
│   │   ├── (membership)/             # group: field-club page + future subscription
│   │   │   ├── layout.tsx
│   │   │   └── field-club/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (support)/                # group: contact + faq (mounts Turnstile provider)
│   │   │   ├── layout.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   └── faq/
│   │   │       └── page.tsx
│   │   │
│   │   └── (legal)/                  # group: terms + privacy (no eyebrow stripe; intentionally still)
│   │       ├── layout.tsx
│   │       ├── terms/
│   │       │   └── page.tsx
│   │       └── privacy/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── atomic/                   # 12 components — primitives, zero composition
│   │   │   ├── Button.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Image.tsx             # next/image wrapper, unoptimized, with optional ScannedGrainOverlay child
│   │   │   ├── Stamp.tsx
│   │   │   ├── Rule.tsx
│   │   │   ├── Marker.tsx
│   │   │   ├── PriceTag.tsx
│   │   │   └── StockBadge.tsx
│   │   │
│   │   ├── composite/                # 18 components — compose atomics
│   │   │   ├── NavBar.tsx
│   │   │   ├── EyebrowStripe.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── FAQItem.tsx
│   │   │   ├── NewsletterForm.tsx
│   │   │   ├── ContactForm.tsx       # 'use client' — Turnstile + zod-validated POST to /api/contact
│   │   │   ├── FieldClubWaitlistForm.tsx
│   │   │   ├── BagTagTriptych.tsx
│   │   │   ├── HarvestPin.tsx
│   │   │   ├── KansasMap.tsx         # inline 105-county SVG; pins[] prop
│   │   │   ├── SeasonChip.tsx
│   │   │   ├── MarqueeTicker.tsx     # 'use client' — pause-on-hover; ARIA-live polite first cycle
│   │   │   ├── ReceiptStrip.tsx
│   │   │   ├── PrescriptionPad.tsx
│   │   │   ├── TrustedSiteBadge.tsx  # gated by NEXT_PUBLIC_TRUSTEDSITE_ID
│   │   │   └── LiveCount.tsx         # reads harvests.json's total_inches at build; tiny RSC
│   │   │
│   │   ├── decoration/               # 3 components — purely visual atmosphere
│   │   │   ├── PaperGrain.tsx
│   │   │   ├── HairlineRules.tsx
│   │   │   └── ScannedGrainOverlay.tsx
│   │   │
│   │   ├── motion/                   # 4 components — all 'use client', dynamic-imported where heavy
│   │   │   ├── MotionProvider.tsx    # Lenis + ScrollTrigger.scrollerProxy + reduced-motion context
│   │   │   ├── AntlerInchesCounter.tsx
│   │   │   ├── SignatureMove.tsx     # the home pinned counter+map (GSAP isolated here only)
│   │   │   └── PageTransition.tsx    # Framer Motion AnimatePresence inkblot wipe
│   │   │
│   │   └── page/                     # 17 components — route-level orchestrators
│   │       ├── HomePage.tsx
│   │       ├── ProductsIndex.tsx
│   │       ├── ProductDetail.tsx
│   │       ├── OurStoryPage.tsx
│   │       ├── WhyGBFeedsPage.tsx
│   │       ├── CustomerReviewsPage.tsx
│   │       ├── PhotoGalleryPage.tsx
│   │       ├── JournalIndex.tsx
│   │       ├── JournalArticle.tsx
│   │       ├── FieldClubPage.tsx
│   │       ├── FeedProgramWizardPage.tsx
│   │       ├── SeasonPhasePage.tsx
│   │       ├── ContactPage.tsx
│   │       ├── FAQPage.tsx
│   │       ├── TermsPage.tsx
│   │       ├── PrivacyPage.tsx
│   │       └── NotFoundPage.tsx
│   │
│   ├── content/
│   │   └── journal/                  # MDX articles; generateStaticParams reads filenames here
│   │       ├── stand-7b-riley.mdx
│   │       ├── ingredient-walk.mdx
│   │       └── twenty-two-inch-rule.mdx
│   │
│   ├── data/                         # RSC-only imports; client gets data via props
│   │   ├── products.live.json        # source of truth (16 SKUs from Phase 2 live_products.json)
│   │   ├── products.ts               # zod schema + typed export of products.live.json + Stripe Payment Link map
│   │   ├── testimonials.ts           # 22 verbatim testimonials (CONTENT_INVENTORY.md § /customer-reviews)
│   │   ├── faq.ts                    # 4 verbatim Q&A pairs
│   │   ├── feed-program-map.ts       # 4×4×3 = 48 combos → SKU bundle + rationale
│   │   ├── season-skus.ts            # phase → SKU[] (curated for /season/[phase])
│   │   ├── seasons.ts                # phase metadata (date ranges, copy decks)
│   │   ├── cross-sell-map.ts         # SKU → recommended SKUs[] (PDP cross-sell)
│   │   ├── journal-index.ts          # build-time MDX frontmatter index (generated via getStaticImports)
│   │   ├── nav.ts                    # navigation tree (typed)
│   │   └── pillars.ts                # four-pillar content (verbatim)
│   │
│   ├── hooks/
│   │   ├── useReducedMotion.ts       # matchMedia + Framer's useReducedMotion combined
│   │   ├── useScrollProgress.ts      # wraps Framer Motion's useScroll
│   │   ├── useLenis.ts               # accesses MotionProvider's Lenis instance
│   │   └── useTrustedSiteBadge.ts    # reads NEXT_PUBLIC_TRUSTEDSITE_ID; returns boolean + script src
│   │
│   ├── lib/
│   │   ├── cn.ts                     # clsx + tailwind-merge
│   │   ├── seo.ts                    # buildMetadata() + JSON-LD helpers (Product, FAQPage, Organization, BreadcrumbList)
│   │   ├── routes.ts                 # typed route map (used by sitemap + Link components)
│   │   ├── analytics.ts              # GA4 dispatch helpers behind NEXT_PUBLIC_GA_ID
│   │   └── validators.ts             # zod schemas — contact form payload, harvests.json, products.live.json
│   │
│   ├── styles/
│   │   ├── globals.css               # ONLY file imported by app/layout.tsx; @imports tokens/reset/typography/atmosphere
│   │   ├── tokens.css                # Tailwind v4 @theme block (colors, fonts, type scale, all from § 3+§ 4)
│   │   ├── reset.css                 # minimal modern reset
│   │   ├── typography.css            # body defaults, italic policy, mono stamp tracking
│   │   └── atmosphere.css            # paper-grain bg composition, ruled hairlines, scanned-grain overlay rules
│   │
│   └── types/
│       ├── harvests.ts               # Harvest + HarvestsFile interfaces (§ 8)
│       └── product.ts                # Product type (mirrors live_products.json shape)
│
└── scripts/                          # build-time Node scripts (run from package.json)
    ├── validate-harvests.ts          # zod-validates public/data/harvests.json before build
    ├── validate-products.ts          # zod-validates src/data/products.live.json
    ├── generate-og-images.ts         # @vercel/og or satori → public/og/*.png
    └── sync-products-public.ts       # copies src/data/products.live.json → public/data/ if a client fetch is used
```

### Three enforcement rules (eslint-plugin-boundaries)

1. **Layer direction is one-way.** `atomic/` MUST NOT import from `composite/`, `page/`, `motion/`, or `decoration/`. `composite/` MAY import `atomic/` and `decoration/` only. `page/` MAY import all component layers + `data/` + `lib/`. `app/**/page.tsx` MAY import `page/` + `data/` + `lib/` + `seo.ts` only — never `atomic/` or `composite/` directly (page-level components are the orchestration boundary). Violations fail CI.
2. **`'use client'` is a one-way valve.** Any file under `src/components/motion/`, `ContactForm.tsx`, `MarqueeTicker.tsx`, `FieldClubWaitlistForm.tsx`, and the wizard (`FeedProgramWizardPage.tsx`) is the ONLY surface that may carry `'use client'`. RSC components (everything else) MUST NOT import client-only modules (`framer-motion`, `gsap`, `lenis`). Enforced via boundary rule + an eslint custom rule banning these imports outside the allow-list.
3. **Data flows inward only.** `src/data/*` is RSC-import-only. Client components NEVER import from `src/data/`; they receive data as props from the nearest RSC ancestor. `public/data/*.json` is for client-fetched JSON only (currently used by `<SignatureMove>` for `harvests.json` because GSAP needs runtime access to the count). Boundary rule: files under `src/components/motion/` and any `'use client'` file MUST NOT import from `src/data/`.

### MDX placement (one line)

MDX articles live at `src/content/journal/<slug>.mdx` so `generateStaticParams` reads them via `fs.readdirSync(path.join(process.cwd(), 'src/content/journal'))` at build time, with TS-aware imports of MDX components from the root `mdx-components.tsx` per Next.js 15 convention.

*End of Phase 4 Source Tree Proposal — clean-architecture-expert — 2026-05-06.*

---

## Phase 4 — Performance Risk Register (performance-optimization-specialist)

> Stack: Next.js 15 + React 19 + TS + Tailwind v4 + Framer Motion + GSAP + Lenis. `output: 'export'`, `images: { unoptimized: true }`. Cloudflare Pages.
> Budgets: LCP < 2.0s, CLS < 0.05, TBT < 200ms, JS payload per route < 200KB gzipped.
> Author: performance-optimization-specialist. Date: 2026-05-06.

---

### Risk 1 — Three motion libraries (GSAP + Framer Motion + Lenis) loaded on every route

**Risk.** Framer Motion (~30–35KB gz of `motion` core), GSAP core (~30KB gz) + ScrollTrigger (~25–30KB gz), and Lenis (~8KB gz) collectively run ~95–105KB gz before a single byte of React/Next runtime, product data, or page CSS. If any library is imported at module top-level inside `app/layout.tsx`, a shared client component (e.g. `Header`, `Footer`, `MotionProvider`), or a barrel `src/components/index.ts`, the entire payload ships to *every* route — including `/contact`, `/faq`, and the 16 PDPs that need none of GSAP. That alone consumes ~50% of the per-route 200KB JS budget before page-specific code is added. Worst case: tree-shaking fails on `import { motion } from 'framer-motion'` because of side-effect imports, and the full ~70KB Framer bundle ships.

**Likelihood / Impact:** **High / High.**

**Mitigation.**

1. **GSAP + ScrollTrigger: home-only via `next/dynamic` with `ssr: false`.** Only `<ScrollPinSequence>` (the one signature moment in `app/page.tsx`) imports GSAP. Pattern:
   ```ts
   const ScrollPinSequence = dynamic(() => import('@/components/home/ScrollPinSequence'), {
     ssr: false,
     loading: () => <ScrollPinFallback />, // static counter + still photo
   });
   ```
   The dynamic boundary creates a separate Webpack chunk; routes that do not render `<ScrollPinSequence>` pay zero GSAP cost. Verify in `.next/analyze/client.html` that GSAP appears in exactly one chunk attached only to the `/` route.

2. **Lenis: route-gated via `<SmoothScrollProvider>` wrapping only home + season + journal routes.** Do NOT mount in root `layout.tsx`. Instead create `app/(scrolling)/layout.tsx` that wraps the home, season, and field-notes route group with the Lenis provider. PDP, FAQ, contact, and policy routes use the default `app/layout.tsx` with native scroll. Lenis is a client component that sets up `requestAnimationFrame` — moving it into a route group prevents it from running on routes that do not need smoothness.

3. **Framer Motion: import only `m` + `LazyMotion` with `domAnimation` feature pack, never bare `motion`.** Pattern:
   ```ts
   import { LazyMotion, domAnimation, m } from 'framer-motion';
   <LazyMotion features={domAnimation} strict><m.div /></LazyMotion>
   ```
   This drops Framer Motion's per-route footprint from ~35KB gz to ~12KB gz by tree-shaking out the gesture, drag, layout-animation, and 3D feature packs. `strict` mode forbids accidental `<motion.*>` usage that would re-pull the full bundle. Codify in `.eslintrc` with `no-restricted-imports` blocking `'framer-motion'`'s `motion` named export — force everyone to use `m` from a project-local re-export.

4. **No motion-library re-exports from a barrel file.** Forbid `src/components/index.ts` from importing any animation library transitively. Each component imports its own library directly so unused components are tree-shaken cleanly.

**Verification gate.** Run `ANALYZE=true npm run build` with `@next/bundle-analyzer` configured. Check three chunks:
- `app/page` chunk: GSAP + ScrollTrigger + Lenis present; total < 130KB gz.
- `app/products/[slug]` chunk: GSAP + ScrollTrigger absent; Framer `m` present; Lenis absent; total < 90KB gz.
- `app/contact` chunk: all three motion libraries absent; total < 65KB gz.
Lighthouse mobile run on `/` shows TBT < 200ms; on `/contact` shows TBT < 50ms.

---

### Risk 2 — Home scroll-pinned signature moment destabilizes LCP and ships heavy SVG

**Risk.** The 30-second pin sequence (`<AntlerInchesCounter>` + `<KansasMap>` + grayscale→color trail-cam crossfade) is the brand's marquee asset and the primary LCP candidate. Three concrete failure modes: (a) the trail-cam image at hero size — if shipped as a 2400×1600 JPEG without `srcset`, ~700KB on 4G blows LCP past 4.0s; (b) the inline Kansas SVG of all 105 counties — at full USGS resolution the path data is ~80–120KB gz with thousands of vertices; if mounted in the initial HTML it bloats the document size and forces layout to wait for SVG paint; (c) GSAP `ScrollTrigger.pin()` rewrites layout (clones the pinned element, applies `position: fixed`) which can trigger a CLS spike at hydration unless the pin container has a deterministic pre-pin height. The brief already places the counter "below the fold" — but the trail-cam image behind it is ABOVE the fold and is the LCP element.

**Likelihood / Impact:** **High / High.**

**Mitigation.**

1. **Trail-cam image: AVIF + WebP fallback at 5 widths, `<picture>` with `fetchpriority="high"`, `decoding="async"`.** Phase 6 (`image-editor-pro`) outputs:
   - `trailcam-hero-640.avif` ≤ 35KB, `-1024.avif` ≤ 70KB, `-1600.avif` ≤ 110KB, `-2048.avif` ≤ 160KB, `-2560.avif` ≤ 220KB.
   - Same widths in WebP at ~1.6× the AVIF size as fallback.
   - Single LQIP base64 inline (≤ 1.2KB) used as `background-image` until the AVIF resolves; eliminates blank LCP candidate.
   - `<link rel="preload" as="image" imagesrcset="...avif" imagesizes="100vw" fetchpriority="high">` injected from `app/page.tsx` metadata so the browser starts the image fetch parallel to the HTML parse.
   - Same image file serves both grayscale and color states (CSS `filter: grayscale(1→0)` driven by GSAP timeline progress) — no double download.

2. **Kansas SVG: simplify to ≤ 18KB, lazy-render BELOW the pin.** Run `mapshaper -simplify dp 12% keep-shapes` on the Census Bureau Kansas county TopoJSON; export as a flat SVG with `<path>` per county and a tabular `aria-label`. Inline result must be ≤ 18KB. The `<KansasMap>` component is mounted *after* the counter (pinned section progresses counter → then map reveals), so it can be rendered with `<Suspense>` + `dynamic({ ssr: false })` to defer its parse cost out of the LCP path. Pin tooltips/aria are wired via React event handlers, not inline SVG `<title>` (keeps the SVG DOM lean).

3. **CLS-safe pin container.** Reserve a fixed `min-height: 100vh` on the pin wrapper from server-rendered CSS (no JS measurement) so `ScrollTrigger.pin()` finds the same height before and after hydration. Use `gsap.set({ willChange: 'transform' })` on the pin target only — never on the document body — to avoid promoting the entire viewport to a compositor layer.

4. **Pre-pin static fallback for first paint.** Server-render the counter with the baked-in final number (from `harvests.json`) and the trail-cam image already in COLOR. GSAP runs after hydration and rewinds the counter to 0 + applies grayscale filter, then the scroll-tween plays forward. This makes the LCP candidate the COLOR hero image (already rendered, no JS dependency) — a `prefers-reduced-motion` user gets exactly this state and never sees the rewind.

5. **iOS Safari momentum-scroll bailout.** Detect via `CSS.supports('-webkit-touch-callout','none')`; if true and viewport width < 768px, skip pin initialization entirely and render the static fallback. iOS Safari's pin sync with Lenis is the #1 scroll-pin failure mode on this stack — a conservative bailout keeps mobile Safari LCP/CLS clean without risking a janky pin.

**Verification gate.** Lighthouse mobile (Moto G Power, slow-4G throttle) on `/` shows: LCP < 2.0s, CLS < 0.05, TBT < 200ms. WebPageTest waterfall confirms the AVIF preload starts within 100ms of HTML response and completes before any JS executes. The home-page document HTML (compressed, not including JS chunks) is ≤ 38KB gz. Inline SVG byte budget (Kansas map): ≤ 18KB raw, ≤ 5KB gz.

---

### Risk 3 — 16 PDPs with ~57 photographic assets and `images: { unoptimized: true }`

**Risk.** Because Phase 5 ships `images: { unoptimized: true }`, the Next.js Image runtime does not transcode at request time — every PDP image is exactly the file `image-editor-pro` puts in `public/products/`. The live OLS CDN today serves 2102×2560 JPEGs to mobile (live recon § 12 item 10: ~2–4MB per PDP unnecessary mobile payload). If Phase 6 fails to ship AVIF/WebP at multiple widths with proper `srcset`, every PDP will repeat the live site's bottleneck. Buck Chow is the highest-traffic PDP and its hero shot is the LCP candidate. With 57 inherited product photos and 16 SKUs (each with 3–5 angle shots), the per-PDP image weight is the entire LCP critical path — a single 700KB hero kills the < 2.0s budget on 4G.

**Likelihood / Impact:** **High / High.**

**Mitigation.** Phase 6 image pipeline contract (binding for `image-editor-pro`):

| Width | AVIF target | WebP fallback | JPEG fallback | Use |
|---|---|---|---|---|
| 320w | ≤ 22KB (q50) | ≤ 32KB (q72) | ≤ 50KB (q70) | mobile thumbnail, related-products grid |
| 640w | ≤ 45KB (q50) | ≤ 65KB (q72) | ≤ 110KB (q70) | mobile PDP hero, category card |
| 1024w | ≤ 80KB (q55) | ≤ 120KB (q75) | ≤ 200KB (q72) | tablet PDP hero, desktop category card |
| 1600w | ≤ 130KB (q55) | ≤ 200KB (q75) | ≤ 320KB (q72) | desktop PDP hero |
| 2400w | ≤ 200KB (q55) | ≤ 300KB (q75) | ≤ 480KB (q72) | retina desktop PDP zoom only (lazy) |

**Naming convention** (sortable, predictable, cacheable):
```
public/products/<sku-lowercase>/<sku>-<angle>-<width>.<ext>
e.g. public/products/bc-40lb-2023/bc-40lb-2023-hero-1024.avif
     public/products/bc-40lb-2023/bc-40lb-2023-hero-1024.webp
     public/products/bc-40lb-2023/bc-40lb-2023-hero-1024.jpg
     public/products/bc-40lb-2023/bc-40lb-2023-bag-back-640.avif
```

**Markup contract.** Use native `<picture>`, not `<img src>`:
```tsx
<picture>
  <source type="image/avif"
          srcSet="bc-40lb-2023-hero-320.avif 320w, ...-1024.avif 1024w, ...-1600.avif 1600w"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 50vw" />
  <source type="image/webp" srcSet="...-320.webp 320w, ..." sizes="..." />
  <img src="bc-40lb-2023-hero-1024.jpg"
       srcSet="...-640.jpg 640w, ...-1024.jpg 1024w, ...-1600.jpg 1600w"
       sizes="..."
       width="1024" height="1024"
       alt="Buck Chow 40LB feed bag, three-quarter front"
       fetchPriority={isHero ? 'high' : 'auto'}
       loading={isHero ? 'eager' : 'lazy'}
       decoding="async" />
</picture>
```

**Lazy-load discipline.**
- PDP hero (slot 1): `loading="eager"`, `fetchpriority="high"`, preloaded via `<link rel="preload" as="image" imagesrcset>` injected from page metadata.
- PDP gallery slots 2–5: `loading="lazy"`, `fetchpriority="low"`, `decoding="async"`.
- Category-grid thumbnails: above-fold first 4 are `loading="eager"`, remainder `loading="lazy"`.
- Related-products carousel: always `loading="lazy"`.
- Width/height attributes ALWAYS present (CLS prevention).
- All inherited live-site assets first transit `image-editor-pro` — never reference `_inherited_assets/from_live/` paths from production code.

**Build-time validation.** Add `scripts/validate-images.ts` to CI: walks `public/products/`, asserts every SKU has all 5 widths in all 3 formats with file sizes within budget; CI fails if any image exceeds its target size.

**Verification gate.** Lighthouse mobile on `/products/buck-chow-40lb`: LCP < 2.0s, total page weight < 600KB on first viewport, "Properly size images" + "Serve images in next-gen formats" + "Defer offscreen images" all PASS. WebPageTest filmstrip confirms hero visible by 1.6s on slow-4G. `npm run build` followed by `du -sh out/products/` reports ≤ 28MB total for all 16 PDPs across all formats and widths.

---

### Top 5 perf wins available BEYOND the 3 risks

1. **`next/font/google` with `display: 'swap'` + `preload: true` for Bebas Neue only** (DM Serif + JetBrains Mono get `preload: false` to prioritize the display face on first paint).
2. **`<Link prefetch={true}>` only on top-nav anchors and the four feeder PDPs;** disable prefetch on long-tail routes (policy pages, FAQ tags) to keep the prefetch budget on commercial pages.
3. **`<link rel="modulepreload">` on the home `ScrollPinSequence` chunk** so it parses in parallel with HTML; defer `<KansasMap>` chunk via a separate `dynamic()` boundary until after pin starts.
4. **`<link rel="preconnect">` to `js.stripe.com`** on `/products/*` and `/field-club` only — opens the TLS handshake before the user clicks "Buy" without paying the connect cost on routes that never reach checkout.
5. **`content-visibility: auto` + `contain-intrinsic-size`** on the testimonial marquee, the FAQ accordion, and the field-notes archive list — skips render work for off-screen sections, recovering ~80–120ms TBT on home.

### Cloudflare Pages-specific wins (`_headers` file at repo root)

```
# Hashed assets — immutable, 1 year
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding

/products/*
  Cache-Control: public, max-age=31536000, immutable
  Vary: Accept-Encoding

/textures/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

# HTML — short cache, must revalidate, full security headers
/*
  Cache-Control: public, max-age=300, must-revalidate
  Vary: Accept-Encoding
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: interest-cohort=(), geolocation=(), camera=(), microphone=(), payment=(self "https://js.stripe.com")
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://api.stripe.com https://challenges.cloudflare.com; frame-src https://js.stripe.com https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://buy.stripe.com
  X-Frame-Options: DENY
```

Single `_headers` file at repo root, served by Cloudflare Pages edge globally. No origin involvement, no paid tier, no Worker required.

---

*End of Phase 4 Performance Risk Register — performance-optimization-specialist — 2026-05-06.*

---

## Phase 4 — Component Architecture Refinements (react-architect)

> Author: react-architect. Date: 2026-05-06.
> Scope: RSC/client classification for all ~46 components; deep dives on `<MotionProvider>`, `<AntlerInchesCounter>`, `<KansasMap>`, `<BagTagTriptych>`, `<FeedProgramWizardPage>`; static-export conflict flags; a11y must-haves.

---

### 1. Atomic components — RSC vs client classification

| Component | Classification | Justification |
|---|---|---|
| `<Button>` | **RSC** | Pure markup + Tailwind. No event handlers at the component primitive level — callers pass `href` or `onClick`. The `as` prop (polymorphic `<a>` / `<button>`) resolves statically. Any page or composite that attaches a live `onClick` (wizard step advance, form submit) is already a client component and owns that interactivity boundary. |
| `<Link>` | **RSC** | Wraps Next.js `<Link>` from `next/link` — RSC-compatible in App Router. No browser API. |
| `<Container>` | **RSC** | Layout div with Tailwind utilities. No runtime state. |
| `<Section>` | **RSC** | Layout wrapper with variant-driven background class. No runtime state. |
| `<Heading>` | **RSC** | Polymorphic heading with static type-scale classes. No runtime. |
| `<Text>` | **RSC** | Text primitive mapping variant prop to static classes. No runtime. |
| `<Image>` | **RSC** | Wraps `next/image` with `unoptimized: true`. `next/image` is RSC-compatible in App Router. Optional `<ScannedGrainOverlay>` child is decoration — also RSC (pure CSS pseudo-element via `::after`). `alt` is a **required** TypeScript prop (no default empty string) to enforce build-time accessibility compliance. |
| `<Stamp>` | **RSC** | Monospace chip, purely presentational. |
| `<Rule>` | **RSC** | 1px horizontal rule with variant classes. No runtime. |
| `<Marker>` | **RSC** | Left-margin block rendering stacked `<Stamp>` children. No runtime. |
| `<PriceTag>` | **RSC** | Dollar + cents split with sale/MSRP variant — presentational. |
| `<StockBadge>` | **RSC** | State chip with three variants mapped to static classes + tokens. |

**Atomic RSC count: 12. Client count: 0.** All twelve atomics are safe as server components. The principle: atomics own no interactivity or browser APIs — they are rendered output. Consuming composites or pages own the client boundary.

---

### 2. Composite components — RSC vs client + animation strategy

| Component | Classification | Client-needed-because | Animation library | Reduced-motion path |
|---|---|---|---|---|
| `<NavBar>` | **`"use client"`** | `usePathname()` for active-link highlight; mobile drawer requires `useState` for open/close; "BUILD YOUR PROGRAM" CTA opens wizard modal | Framer Motion `AnimatePresence` for mobile drawer slide | Drawer opens instantly; active-link highlight is a static CSS class |
| `<EyebrowStripe>` | **RSC** | Static markup; the `KS-{counter}` mile-marker reads `harvests.json` at build time via a prop passed from the RSC parent layout. No runtime state. | None | N/A |
| `<Footer>` | **RSC** | Pure layout + links. `<NewsletterForm>` is a client island child — `<Footer>` itself stays RSC, rendering the form as a client component child (RSC can compose client components as children). | None | N/A |
| `<ProductCard>` | **RSC** | Hover effects (border-thicken, `translateY(-4px)`, SKU chip reveal) can be fully achieved with Tailwind `group` + `group-hover:` CSS utilities — no runtime state needed. **Recommendation: keep RSC** to avoid a client boundary on a component rendered 16+ times in a grid. If a future requirement needs JS hover logic, promote then. | Tailwind `group-hover:` CSS transitions only | Static border; no SKU chip animation |
| `<TestimonialCard>` | **RSC** | Pure presentational blockquote + attribution. No interactivity. | None | N/A |
| `<FAQItem>` | **`"use client"`** | Accordion expand/collapse requires `useState` for open state | Framer Motion `AnimatePresence` + `motion.div` height reveal; hairline `scaleX` tween | Instant expand; no height tween; `aria-expanded` still set correctly |
| `<NewsletterForm>` | **`"use client"`** | Form `onSubmit`, controlled input, submission state (`idle` / `loading` / `success` / `error`) | Framer Motion `animate` on success-state swap | Instant state swap |
| `<ContactForm>` | **`"use client"`** | Same as `<NewsletterForm>` + Cloudflare Turnstile widget mounts via `useEffect` (browser-only JS embed) | Framer Motion for stamp-label slide on field focus | Stamp is statically visible in full from first paint |
| `<BagTagTriptych>` | **`"use client"`** | `whileInView` Y-axis flip animation requires Framer Motion's IntersectionObserver integration, which is browser-side | Framer Motion `motion.div` `rotateY: [90, 0]` per panel, 80ms stagger | Triptych is statically present — no flip, no delay |
| `<HarvestPin>` | **`"use client"`** | Hover/focus tooltip reveal; opacity + scale tween driven by parent GSAP timeline | GSAP (tween delegated from `<SignatureMove>` parent timeline) | Pins render `opacity: 1`; tooltip visible on keyboard focus only |
| `<KansasMap>` | **`"use client"`** | Inline SVG interaction (`onMouseEnter` / `onFocus` on `<path>` elements); pin drop animations from GSAP parent timeline | GSAP (timeline owned by `<SignatureMove>`) | All pins rendered `opacity: 1` on mount; SVG collapses to a text list below 480px |
| `<AntlerInchesCounter>` | **`"use client"`** | GSAP ScrollTrigger, `useRef` on counter DOM node | GSAP ScrollTrigger scrub-driven `gsap.to(ref, { textContent })` | Counter renders final `total_inches` on mount; `aria-live="polite"` announces value once |
| `<SeasonChip>` | **RSC** | Pill chip; active state is a CSS class applied by the parent. No internal state. | None | N/A |
| `<MotionProvider>` | **`"use client"`** | Lenis in `useEffect` (requires `window`); `gsap.registerPlugin(ScrollTrigger)` requires browser globals; provides `MotionContext` via `createContext` | Lenis + GSAP plugin registry | Full gate — see § 3 deep dive |
| `<MarqueeTicker>` | **`"use client"`** | Pause-on-hover requires `useState`; `aria-live` management on first cycle requires `useEffect` | Pure CSS `@keyframes translateX` — no JS animation; `useState` only for pause class toggle | `animation-play-state: paused` on mount; static stacked column of three testimonials |
| `<ReceiptStrip>` | **`"use client"`** | Klarna/Affirm widget mounts via `useEffect` (browser JS embed); conditional render by prop (see Flag 4 below) | None (strip is CSS; widget is third-party embed) | Strip renders static installment text with no widget |
| `<PrescriptionPad>` | **`"use client"`** | Typewriter SKU-list reveal requires `useEffect` + staggered character animation | Framer Motion `staggerChildren` 12ms per character | Static SKU list rendered in full from mount |

**Composite RSC count: 5** (`<EyebrowStripe>`, `<Footer>`, `<ProductCard>` per recommendation above, `<TestimonialCard>`, `<SeasonChip>`).
**Composite client count: 12.**
**Total across atomics + composites: RSC = 17, client = 12.**
Decoration components (`<PaperGrain>`, `<HairlineRules>`, `<ScannedGrainOverlay>`) are RSC — pure CSS, no browser APIs.

---

### 3. Critical component deep dives

#### 3.1 `<MotionProvider>` — sketch

`<MotionProvider>` mounts once in `src/app/layout.tsx` as a `"use client"` wrapper around `{children}`. It owns three responsibilities: Lenis instantiation, GSAP plugin registration, and a reduced-motion context flag that every downstream animation component reads before initializing.

Because `layout.tsx` is the root layout (RSC by default), the `"use client"` boundary of `<MotionProvider>` does not force the entire layout into client rendering — Next.js 15 App Router correctly threads RSC children through a client boundary via the `children` prop slot pattern. The root layout passes `{children}` as a prop; `<MotionProvider>` renders them without importing them as modules.

```ts
// src/components/motion/MotionProvider.tsx
'use client';
import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface MotionCtx { reducedMotion: boolean; lenis: Lenis | null; }
const MotionContext = createContext<MotionCtx>({ reducedMotion: false, lenis: null });
export const useMotion = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  // Synchronous check — safe because this component only executes in browser
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;             // gate: skip Lenis + ScrollTrigger sync

    const lenis = new Lenis({ duration: 1.1, lerp: 0.085, smoothTouch: false });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [reducedMotion]);

  return (
    <MotionContext.Provider value={{ reducedMotion, lenis: lenisRef.current }}>
      {children}
    </MotionContext.Provider>
  );
}
```

**Route-change Lenis pause**: App Router's root layout shares one mounted `<MotionProvider>` across navigations (the layout does not remount on sibling-route navigation). Add a `<MotionRouteWatcher>` child that calls `usePathname()` and runs `lenis.stop()` → `lenis.start()` on path change. This is a ~10-line `"use client"` component with no visible UI.

**`prefers-reduced-motion` gate**: checked synchronously in the component body before `useEffect` fires, guarded by `typeof window !== 'undefined'`. When true, Lenis is never instantiated and `gsap.ticker` is never touched. All downstream `useMotion()` consumers check `reducedMotion` before registering their own ScrollTrigger instances.

---

#### 3.2 `<AntlerInchesCounter>` — GSAP dynamic import strategy

The counter is the only component in the codebase that needs GSAP + ScrollTrigger at runtime. The correct isolation:

1. Home `page.tsx` is an RSC. It dynamic-imports `<SignatureMove>` with `ssr: false`:

```ts
// src/app/page.tsx (RSC)
import dynamic from 'next/dynamic';
const SignatureMove = dynamic(
  () => import('@/components/motion/SignatureMove'),
  { ssr: false, loading: () => <div style={{ minHeight: '100vh' }} /> }
);
```

2. `<SignatureMove>` carries `"use client"` and imports GSAP + ScrollTrigger at module top. Because it is dynamically imported with `ssr: false`, Webpack places it in its own async chunk. The ~60 KB GSAP bundle is excluded from every non-home route's JS graph entirely.

3. `<AntlerInchesCounter>` is a child of `<SignatureMove>` and co-located in the same chunk. It does not need its own `dynamic()` call — it inherits the home-only chunk boundary from its parent.

4. `harvests.json` is consumed at **build time** in `page.tsx` (RSC) via a static JSON import (`resolveJsonModule: true` in `tsconfig.json`). The `total_inches` value is passed as a prop: `page.tsx` → `<SignatureMove totalInches={harvestData.total_inches}>` → `<AntlerInchesCounter totalInches={totalInches}>`. The counter never touches the network at runtime.

5. The GSAP counter tween uses `snap: { textContent: 1 }` (integer snapping) driven by `ScrollTrigger`'s `onUpdate` callback — scroll position is the authoritative clock, not a duration tween:

```ts
gsap.to(counterRef.current, {
  textContent: totalInches,
  ease: 'none',              // linear — scroll progress IS the easing
  snap: { textContent: 1 }, // integer display only
  scrollTrigger: { scrub: true, ... }
});
```

---

#### 3.3 `<KansasMap>` — prop interface and data flow

```ts
// src/components/composite/KansasMap.tsx — 'use client'
import type { Harvest } from '@/types/harvests';

interface KansasMapProps {
  pins: Harvest[];                          // full Harvest[] from harvests.json (passed from RSC parent)
  animateSequentially?: boolean;            // false when reducedMotion — all pins visible on mount
  onPinFocus?: (harvest: Harvest) => void;  // optional keyboard/hover callback for tooltip management
}
```

The inline Kansas SVG lives at `src/components/composite/KansasMapSVG.tsx` — a static React component exporting all 105 `<path>` elements with `id="county-{fips}"` and `aria-label="{county_name} County, Kansas"`. The FIPS code is the join key.

`<KansasMap>` imports `<KansasMapSVG>` and overlays `<HarvestPin>` components using centroid coordinates stored in `src/data/kansas-counties.ts` (a 105-entry typed array of `{ fips: string; name: string; cx: number; cy: number }` where `cx`/`cy` are percentage coordinates within the SVG viewBox, derived once from Census TIGER/Line shapefile centroids and committed as a static data file).

`harvests.json` is loaded at build time in `src/app/page.tsx` (RSC) and passed as `pins={harvestData.harvests}` → `<SignatureMove>` → `<KansasMap>`. No client-side fetch ever occurs.

Below 480px, `<KansasMap>` renders a `<ul>` text fallback grouping harvests by county name with counts — derived from the `pins` prop. Zero extra network cost; no mobile tap-target issues on 8px circle pins.

---

#### 3.4 `<BagTagTriptych>` — discriminated union vs generic triptych

**Recommendation: generic 3-stat triptych prop interface.** The component receives the already-resolved `panels[]` tuple. The discriminated union belongs in the data layer, not the component interface.

```ts
// src/components/composite/BagTagTriptych.tsx
interface StatPanel {
  value: string;     // e.g. "20%", "2,000LB", "90D"
  label: string;     // e.g. "PROTEIN", "CAPACITY", "RUNTIME"
  sublabel?: string; // e.g. "CRUDE" for "CRUDE PROTEIN"
}

interface BagTagTriptychProps {
  panels: [StatPanel, StatPanel, StatPanel]; // exactly three — TS tuple enforces count
  lotStamp?: string;  // e.g. "LOT 2024-09 / MANHATTAN, KS"
  header?: string;    // default: "GUARANTEED ANALYSIS"; hardware SKUs: "TECHNICAL SPECS"
}
```

Per-SKU bag-tag data lives in `src/data/products.ts` as a `bagTag` field on each product entry. The discriminated union (feed SKUs require `PROTEIN`/`FAT`/`CALCIUM`; feeder SKUs require `CAPACITY`/`RUNTIME`/`WEIGHT`) is correct at the **data-layer type**, not the component prop. The component receives a resolved tuple and renders identically regardless of product category. This keeps `<BagTagTriptych>` a pure, dumb display component — testable, reusable for editorial stat blocks on `/why-gb-feeds`.

---

#### 3.5 `<FeedProgramWizardPage>` — state management

**Use `useReducer`.** Reason: the wizard has three dependent selection dimensions (region, season, goal) plus a derived result state and a step index — five pieces of state with inter-state invariants. With `useState` you end up with four independent atoms that can drift out of sync (a reset that forgets to clear all, or a step-3 render when step-2 is null). A `useReducer` with a typed `WizardState` + `WizardAction` discriminated union makes the state machine explicit and prevents impossible states. It also makes the component trivially unit-testable as a pure function with no hook mocking.

```ts
type WizardState = {
  step: 0 | 1 | 2 | 'result';
  region: Region | null;
  season: Season | null;
  goal:   Goal   | null;
};
type WizardAction =
  | { type: 'SELECT_REGION'; value: Region }
  | { type: 'SELECT_SEASON'; value: Season }
  | { type: 'SELECT_GOAL';   value: Goal   }
  | { type: 'BACK' }
  | { type: 'RESET' };
```

The wizard client component lives at `src/app/(shop)/feed-program/WizardClient.tsx` (`"use client"`); the outer `page.tsx` remains RSC for the static page shell.

---

### 4. Folder structure for `src/components/`

The clean-architecture-expert's source tree proposal covers the full repository. This restates only the `src/components/` taxonomy with one addition noted:

```
src/components/
  atomic/        (12 RSC primitives)
  composite/     (17 mixed; see § 2 table — includes KansasMapSVG.tsx as added file)
  decoration/    (3 RSC: PaperGrain, HairlineRules, ScannedGrainOverlay)
  motion/        (4 client: MotionProvider, AntlerInchesCounter, SignatureMove, PageTransition)
  page/          (17 route-level orchestrators)
```

`KansasMapSVG.tsx` is added to `composite/` as a separate file from `KansasMap.tsx` — the SVG shape file is a machine-generated 20 KB artifact that should be committed and diffed independently from the interaction logic. Any future simplification (re-running `mapshaper` on a new Census shapefile) changes only the SVG file with zero logic-code churn.

Motion components in `motion/` carry GSAP as a dependency. The physical separation from `composite/` is a signal to contributors: files in `motion/` are always `"use client"` and always dynamically-imported at their callsite. Do not import from `motion/` in an RSC.

---

### 5. Static-export conflict flags

**Flag 1 — `/journal/[slug]` and `/journal/tag/[tag]` require `generateStaticParams()`.**
With `output: 'export'`, both dynamic segments must export `generateStaticParams()` returning every slug/tag at build time. A new MDX file added to `src/content/journal/` without running `next build` yields a 404. Mitigation: add `scripts/validate-routes.ts` as a pre-build CI step comparing MDX file slugs against `generateStaticParams` output; fail CI on divergence. Document in RUNBOOK.md.

**Flag 2 — `/products?cat=` filter requires Suspense boundary around `useSearchParams()`.**
The products category filter reads `?cat=deer-feed` via `useSearchParams()`. In Next.js 15 App Router, any component calling `useSearchParams()` without a `<Suspense>` wrapper causes the entire page to be deopted into client rendering (a build error). Correct pattern: the RSC `page.tsx` reads `searchParams` from its own props (App Router passes `searchParams` as an RSC prop) and passes the initial value down to a `<ProductFilterClient>` child wrapped in `<Suspense fallback={<ProductGridSkeleton />}>`.

**Flag 3 — `images: { unoptimized: true }` must be locked in `next.config.ts`; add ESLint guard.**
This is in ROUTING.md. Add an ESLint `no-restricted-imports` rule banning direct imports of `'next/image'` everywhere except `src/components/atomic/Image.tsx`. This prevents future contributors from accidentally bypassing the wrapper and omitting `unoptimized`.

**Flag 4 — `<ReceiptStrip>` must accept `showStrip: boolean` as a prop, not use `usePathname()` internally.**
`usePathname()` inside a statically-generated client component requires Suspense. The RSC `(shop)/products/[slug]/page.tsx` knows its own SKU category and passes `showReceiptStrip={product.category === 'deer-feeders'}` down to `<ProductDetail>` → `<ReceiptStrip>`. Cleaner and no Suspense overhead.

**Flag 5 — No `revalidate` anywhere; document as a repository invariant.**
`output: 'export'` silently ignores `export const revalidate = N` or `fetch` cache options. All data is baked at build time. Add an ESLint custom rule banning `export const revalidate` anywhere in `src/app/` and document the constraint in RUNBOOK.md as "STATIC EXPORT: all data is build-time — do not add revalidate directives."

**Flag 6 — Custom 404 must be `not-found.tsx`, not `404.tsx`.**
Next.js App Router convention is `src/app/not-found.tsx`. With `output: 'export'` the build emits `out/404.html`. Cloudflare Pages serves `404.html` automatically for unmatched routes — no additional `_redirects` entry needed. Verify the filename before Phase 6 begins.

---

### 6. A11y must-haves

1. **Wizard keyboard navigation**: each radio card is a `<button>` (not `<div onclick>`) with `tabIndex={0}`; step advance fires only after a valid selection; focus moves programmatically to the first option of the next step via `ref.current?.focus()` in a `useEffect` that fires on `state.step` change.
2. **`<AntlerInchesCounter>` `aria-live`**: `aria-live="polite"` + `aria-atomic="true"` on the counter wrapper; announces only the **final** value when ScrollTrigger progress reaches 1.0 — not each ticked integer — preventing a stream of screen-reader interruptions during the animation.
3. **`prefers-reduced-motion` honored everywhere**: via `useMotion().reducedMotion` from `<MotionProvider>` and Framer Motion's `useReducedMotion()` hook — every animation component checks one of these two before registering any transition; no animation fires without a reduced-motion guard.
4. **Semantic landmarks per page**: every page has exactly one `<main>`, `<header>` (wrapping `<EyebrowStripe>` + `<NavBar>`), and `<footer>`; `<nav aria-label="Main navigation">` inside `<NavBar>`; named `<section aria-labelledby="...">` for the counter, FAQ, and contact sections on home.
5. **Alt text on every `<Image>`**: the atomic `<Image>` wrapper enforces `alt` as a required TypeScript prop (no default, no optional) — build-time catch on any omitted callsite; decorative images use `alt=""` + `role="presentation"` explicitly.
6. **`<FAQItem>` accordion**: implemented as button-controlled `aria-expanded` + `aria-controls` pair (not native `<details>`/`<summary>`, which resists CSS height animation); each question is `<button aria-expanded={open} aria-controls="faq-{id}-body">`; the answer panel is `<div id="faq-{id}-body" role="region" aria-labelledby="faq-{id}-btn">`.

---

*End of Phase 4 Component Architecture Refinements — react-architect — 2026-05-06.*
