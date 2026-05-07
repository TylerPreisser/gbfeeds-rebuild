# GB FEEDS — REBUILD R4 DESIGNER AUDIT

> **Captured**: 2026-05-06 — designer audit pass after R3 fix-up dispatch.
> **Method**: Playwright (Chromium full Chrome-for-Testing) full-page screenshots at 1440×900 / 768×1024 / 390×844 against `http://localhost:4173/` (rebuild static export served by `http-server -e html` for proper directory routing). Compared 1:1 against `screenshots/original-fresh/`. Pixel-color sampling, computed-style inspection (CDP), and source-tree cross-reference.
> **Scope**: read-only audit. No source files modified.

---

## 1. SCREENSHOT INVENTORY

`.context/screenshots/rebuild-r4/` — **19 fresh full-page captures** (counts match dispatch spec):

| Viewport | Count | Routes |
|---|---|---|
| Desktop 1440 | 8 | `/`, `/products/`, `/products/buck-chow-40lb/`, `/products/corn-candy-7lb/`, `/our-story/`, `/why-gb-feeds/`, `/customer-reviews/`, `/photo-gallery/` |
| Tablet 768 | 3 | `/`, `/products/`, `/products/buck-chow-40lb/` |
| Mobile 390 | 8 | same as Desktop |
| **TOTAL** | **19** | — |

Plus per-region `crops/` for fold-by-fold inspection (Kansas-fade zoom, PDP buy-panel zoom, hero zoom, etc.).

---

## 2. ROOT-CAUSE BUG (P0-CRITICAL — cascade-layer regression)

**`src/styles/reset.css:115-120`**:

```css
button {
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
```

This rule is loaded **OUTSIDE** any `@layer` wrapper, while every Tailwind v4 utility class lives inside `@layer utilities`. Per CSS Cascade Layers spec, **unlayered author styles always beat layered author styles** regardless of selector specificity or source order.

Result: every `<button>` element styled with `bg-[var(--color-ink)]`, `border border-[var(--color-ink)]`, or any other utility class loses to this reset and renders **transparent bg + 0px border**. CDP-confirmed via `getComputedStyle()`:

```
.bg-[var(--color-ink)] selector matches: TRUE
computed background-color: rgba(0,0,0,0)   ← reset wins
computed border-width: 0px                 ← reset wins
computed color: rgb(255,255,255)           ← inline style wins
```

**Symptom**: Every primary CTA implemented as a `<button>` (not an `<a>`) is invisible. ADD TO CART, Buy with G Pay, MORE CUSTOMER REVIEWS, FAQ accordion toggles — all render as white text on cream paper with no button shape. R3 "PDP commerce buttons restored" was a false-positive — the buttons exist in DOM but are visually invisible.

**One-line fix**:
```css
@layer base {
  button { cursor: pointer; background: none; border: none; padding: 0; }
}
```
…OR add `!important` to the utility classes (much worse), OR import `reset.css` after `@import "tailwindcss"` while wrapping it in `@layer base`.

---

## 3. PER-ROUTE FINDINGS

### `/` HOME (desktop 1440 — page total 8911 px)

| # | Issue | Location | Severity | Fix |
|---|---|---|---|---|
| H1 | **Hero is STILL the wrong image** — corn-bowl close-up. Original hero is a man in tan shirt holding Buck Chow 40lb bag in wooded field. | `HomePage.tsx` hero `<picture>` block + asset filename | **P0** | Swap to `lifestyle-img-4172.webp` (or whichever asset is the hunter-with-bag); R2 H1 still OPEN. |
| H2 | **Kansas-fade SIGNATURE is broken in 3 ways**: (a) the SVG path renders as a noisy zigzag-edged rectangle, NOT a recognizable Kansas state outline; (b) the counter shows `0`, never animates to `7,500` (state desync — `scrollProgress` never reaches 1 during the captured frame); (c) what's visible inside the clip is a 4-up grid of harvest photos, not photos cycling through a single Kansas-shaped window. | `composite/KansasPhotoFade.tsx:15` (path) + `motion/SignatureMove.tsx:97-107` (scrollTrigger) + `motion/AntlerInchesCounter.tsx:54-61` | **P0** | Replace `KANSAS_PATH` with a clean topojson-derived Kansas outline (~30 vertices, not 700+) so the silhouette READS as Kansas. Fix counter: drive count-up from a `scrub:true` ScrollTrigger or an `IntersectionObserver` one-shot tween that runs `from 0 to total` over 1.2s, independently of the section's fade-in opacity tween. |
| H3 | **Logo is now visible at proper size** — square black badge w/ antler-buck + "GB FEEDS" + "GROW. BIGGER. BUCKS." tagline. R2 H2 RESOLVED. | `NavBar.tsx` + `public/brand/logo.svg` | (resolved) | — |
| H4 | **Customer-Reviews photo strip RENDERS** — 6+ harvest photos visible in horizontal scroll. R2 H3 RESOLVED. | `HomePage.tsx` reviews strip | (resolved) | — |
| H5 | **MORE CUSTOMER REVIEWS button is INVISIBLE** (root-cause bug § 2 — `<button>` reset zeroes the `bg-[var(--color-ink)]`). | `HomePage.tsx` reviews CTA | **P0** | Fixed by § 2 root-cause fix. |
| H6 | **Difference left-column collage RENDERS** — 4-up customer harvest photos visible. R2 H5 RESOLVED. | `HomePage.tsx:269-283` | (resolved) | — |
| H7 | **Our Story teaser button "LEARN MORE"** is rendered as a `<button>` (or with text-on-cream contrast issue). Hard to read in screenshot — needs the § 2 fix. | `HomePage.tsx` Our Story teaser | P1 | After § 2 fix: verify the button now shows black-fill / white-text. |
| H8 | **Phone "(620) 639-3337" no longer wraps mid-digit** — R2 H8 RESOLVED. | `HomePage.tsx` Contact section | (resolved) | — |
| H9 | **"DROP US A LINE!" form SEND button still low-contrast** — same § 2 root cause; the submit `<button>` reset wins. | `composite/ContactForm.tsx` | **P0** | Fixed by § 2. |
| H10 | **Featured Products card chrome** — IN STOCK pill + VIEW button still on every grid card; original has price + name only. | `composite/ProductCard.tsx` | P1 | Hide IN STOCK + VIEW on grid; show only on PDP. R2 P4/P5 still OPEN. |
| H11 | **Featured Products card name truncates** ("BUCK CHOW HIGH PROTEI…" cut at 2-line clamp) — R2 H12 still OPEN. | `composite/ProductCard.tsx:88` | P2 | Widen card to `w-[340px]` or shorten `displayName` to "BUCK CHOW 40LB". |
| H12 | **9 sections render in the correct order** matching ORIGINAL_TRUTH § 2.1 (hero → featured → reviews-strip → signature → difference → our-story-teaser → faq → contact → connect → featured-2 → footer). | — | (status note) | — |
| H13 | **No gray section bands detected** — every band is `paper`/`paper-2`/`paper-3` (warm cream). Tyler's "gray crap" complaint is RESOLVED. | tokens.css | (resolved) | — |
| H14 | **Vertical rhythm** measured: section padding ≈ `py-24` (96px) desktop, `py-20` (80px) tablet, `py-16` (64px) mobile. Brief asks `py-24 lg:py-32` (128px lg) as floor. Still 32 px short of the brief at ≥1024 px. | every `<section>` in HomePage.tsx | P1 | Bump section padding to `py-20 sm:py-24 lg:py-32`. R2 H11 still OPEN. |
| H15 | **FAQ heading IS centered** — `Heading … className="text-center"`. R2 partial RESOLVED. The accordion rows themselves are full-width which can read "left-aligned" optically; that's the original layout. | `HomePage.tsx:393-398` | (resolved) | — |
| H16 | **Footer is minimal** — 3 legal links + "GB Feeds, LLC" + copyright. CORRECT per ORIGINAL_TRUTH § 2.5. | `Footer.tsx` | (resolved) | — |

### `/products/` (desktop 1440)

| # | Issue | Location | Severity | Fix |
|---|---|---|---|---|
| P1 | **All 16 SKUs now have product images** — TWS feeders rendered. R2 P1 RESOLVED. | `data/products.ts` + `public/products/tws-*` | (resolved) | — |
| P2 | **Invented "PRODUCTS" oversized hero with 2-image preview grid + chip-row filter** still in place; original has banner-image-with-overlay + LEFT VERTICAL filter list. | `ProductsIndex.tsx:58-110` | P1 | Replace with single banner image + "All Products" centered overlay; move filter row to a left-rail vertical text list per ORIGINAL_TRUTH § 3.1. R2 P2/P3 still OPEN. |
| P3 | **IN STOCK pill + VIEW button on every card** — invented chrome. | `composite/ProductCard.tsx` | P2 | Strip on grid view. R2 P4/P5 still OPEN. |
| P4 | **No pagination** (single scroll); original has 2 pages. Defendable UX deviation. | — | P2 | Defer. R2 P6. |

### `/products/buck-chow-40lb/` (desktop 1440 — page total 4367 px)

| # | Issue | Location | Severity | Fix |
|---|---|---|---|---|
| D1 | **ADD TO CART and Buy with G Pay buttons exist in DOM but render INVISIBLE** (white text on cream paper, no button shape) due to § 2 root-cause `<button>` reset bug. Pixel-sampled the button area: every pixel is `rgb(239,229,215)` (paper). | `composite/AddToCartPlaceholder.tsx:28-57` | **P0** | Fixed by § 2 root-cause fix. Verify with second-pass screenshot. |
| D2 | **Product name "Buck Chow High Protein Feed — 40LB" still wraps to 5 lines** in the right column at desktop because `display-lg` is `clamp(4.5rem, 3.6rem+4.5vw, 8rem)` = ~76px, far too large for `lg:grid-cols-2` half-width. | `ProductDetail.tsx:178` (`size="display-lg"`) | P1 | Demote to `display-md` (~3rem→5rem clamp) OR use `lg:grid-cols-[1fr_1.4fr]` to give the title more room. R2 D4 still OPEN. |
| D3 | **GUARANTEED ANALYSIS panel shows "20 / 4 / 8" (PROTEIN/FAT/FIBER)** — looks fine but the values render before the labels render fully (label text is small). Not blank. R2 D2 partially RESOLVED. | `BagTagTriptych*` | P2 | Tighten label↔value visual hierarchy. |
| D4 | **"BC-40LB-2023 / 40 LB" stamps** still rendered below the buy panel — invented chrome. | `ProductDetail.tsx:270-273` | P2 | Remove or tuck into a meta line. R2 D5 still OPEN. |
| D5 | **"YOU MAY ALSO LIKE" cross-sell heading** — RESOLVED (was "BUILD A FEED PROGRAM WITH THIS"). R2 D3 RESOLVED. | `ProductDetail.tsx:349` | (resolved) | — |
| D6 | **"TRUSTED BY HUNTERS" testimonial cards on PDP** — invented; ORIGINAL_TRUTH § 7B explicitly says "NO product reviews on the PDP." | `ProductDetail.tsx:370-408` | P1 | Remove the entire testimonials section from PDP. |
| D7 | **Mobile sticky add-to-cart bar** present (`lg:hidden fixed bottom-0` div). Visible on mobile screenshot. The contained ADD TO CART button suffers the same § 2 root-cause invisibility. | `ProductDetail.tsx:413-449` | **P0** | Fixed by § 2. |
| D8 | **Description headline missing** — original PDP shows "Extra Inches Aren't An Accident!" as the description heading. Rebuild shows "ABOUT THIS PRODUCT" instead. | `ProductDetail.tsx:291-292` | P2 | Use `product.descriptionTagline` (e.g. "Extra Inches Aren't An Accident!") above the body, then keep "ABOUT THIS PRODUCT" as a smaller sub-heading or remove. |

### `/products/corn-candy-7lb/` (desktop 1440)

Same template as Buck Chow PDP; same issues (D1, D2, D7 all present).

### `/our-story/` (desktop 1440 — page total 2287 px)

| # | Issue | Location | Severity | Fix |
|---|---|---|---|---|
| OS1 | **3 alternating image+text rows RENDER correctly** (Greg+bucks LEFT, trail-cam RIGHT, Greg+harvest LEFT). R2 OS2 RESOLVED. | `OurStoryPage.tsx` | (resolved) | — |
| OS2 | **Verbatim 5-paragraph founder narrative + signature `-Greg`** present. R2 OS4 RESOLVED. | `OurStoryPage.tsx` copy | (resolved) | — |
| OS3 | **No standalone hero image** (was corn-bowl in R2). R2 OS1 RESOLVED. | — | (resolved) | — |
| OS4 | **OUR STORY title is LEFT-aligned**, original title is centered. | `OurStoryPage.tsx` h1 | P2 | Add `text-center` to h1 or wrap in `mx-auto` container. |
| OS5 | **`KILEY CO / WIND / KANSAS` mono-stamps** — RESOLVED if previously stripped (none visible in current screenshot). R2 OS3 RESOLVED. | — | (resolved) | — |

### `/why-gb-feeds/` (desktop 1440 — page total 2976 px)

| # | Issue | Location | Severity | Fix |
|---|---|---|---|---|
| WG1 | **4 alternating image+text rows for the 4 pillars RENDER correctly** with real customer photos (collage / harvest / harvest / harvest+thank-you). R2 WG1 RESOLVED. | `WhyGBFeedsPage.tsx` | (resolved) | — |
| WG2 | **Pillar 4 image** is a closeup of a hunter w/ bucks AND a Buck Chow bag with "193 inches!" text overlay (baked into asset). Original pillar 4 image is a HANDWRITTEN THANK-YOU NOTE (per ORIGINAL_TRUTH § 5.1 row 4). Image-asset mismatch. | `WhyGBFeedsPage.tsx` row 4 img src | P1 | Swap to a handwritten-thank-you-note photo. |
| WG3 | **WHY GB FEEDS title is LEFT-aligned**; original is CENTERED. | `WhyGBFeedsPage.tsx` h1 | P2 | Add `text-center` to h1. |
| WG4 | **Brand-stat inconsistency unresolved** — pillar 1 copy still says "10,000 inches" but home counter says "7,500" (well, "0" right now, target 7,500). | `data/pillars.ts` + `data/harvests.json` | P1 | Pick ONE number with Greg; standardize everywhere. R2 WG3 still OPEN. |
| WG5 | **No invented "READY TO PUT IT TO WORK" CTA** — RESOLVED. R2 WG2 RESOLVED. | — | (resolved) | — |

### `/customer-reviews/` (desktop 1440 — page total 2785 px)

| # | Issue | Location | Severity | Fix |
|---|---|---|---|---|
| CR1 | **Welcome line "No paid sponsorships, no famous TV personalities, just real hunters sharing real success stories"** is now the page title (large display, centered, multi-line). R2 CR3 RESOLVED. | `CustomerReviewsPage.tsx` | (resolved) | — |
| CR2 | **Single-column LEFT-aligned testimonial list** — brutally minimal. ~22 reviews. R2 CR1 RESOLVED. | `CustomerReviewsPage.tsx` | (resolved) | — |
| CR3 | **No photo carousel** above the title (was R2 CR2). R2 CR2 RESOLVED. | — | (resolved) | — |
| CR4 | **List could be slightly more centered** — currently hugs left of the page; original sits at ~480-540px column LEFT-aligned with empty space right. Acceptable match. | — | P2 | Optional: indent column from `mx-auto max-w-2xl` → `mx-auto max-w-xl pl-12`. |

### `/photo-gallery/` (desktop 1440 — page total 3672 px)

| # | Issue | Location | Severity | Fix |
|---|---|---|---|---|
| PG1 | **PHOTO GALLERY title LEFT-aligned**; original is CENTERED. Plus a kicker subtitle "Real hunters. Real properties. Real results." remains — invented. | `PhotoGalleryPage.tsx` | P2 | Center title; strip kicker tagline. R2 PG1 still partly OPEN. |
| PG2 | **Masonry grid layout** vs original hero-viewer + filmstrip. Defendable deviation; flag only. | — | P2 | Defer. R2 PG2. |
| PG3 | **Some photos have baked-in caption/text overlays** ("Dude this stuff is fire! -Jon Legacy Pursuit", "CUSTOMER REVIEW!") — this is in the source asset, not the layout. | source assets | P2 | Re-export source photos without text overlay if unintended. R2 PG3 still OPEN. |

### `/` MOBILE 390 (page total 8065 px)

- **No horizontal overflow detected.** Each section width = 390 px.
- **Hero still corn-bowl** (same § 3 H1 issue).
- **Logo readable** — square badge ~50px tall.
- **Featured Products carousel** scrolls horizontally — readable.
- **Customer Reviews strip** renders.
- **Kansas signature** renders at narrow width — same `0` counter issue + jagged-rectangle outline issue.
- **GB FEEDS DIFFERENCE pillars** stack vertically with collage images above each. Reasonable.
- **Contact form** stacks; phone visible.
- **No broken layouts** at 390 px.

### `/` TABLET 768 (page total 8644 px)

- **Same content** as desktop, just narrower. No horizontal overflow.
- **Kansas signature** renders smaller; same animation/path issues.
- **2-column grids collapse to 1-col** correctly.

---

## 4. TOP 15 RANKED ISSUES (P0 first → next fix-up dispatch)

| Rank | Severity | Page | Issue (1-line) | File:line | 1-line fix |
|---|---|---|---|---|---|
| 1 | **P0** | site-wide | `<button>` reset in `reset.css` is unlayered; defeats every Tailwind utility class on every `<button>` (ADD TO CART, Buy with G Pay, MORE CUSTOMER REVIEWS, FAQ toggles all invisible) | `src/styles/reset.css:115-120` | Wrap reset.css in `@layer base { ... }` OR move the `button` rule into `globals.css` `@layer base { button { ... } }` |
| 2 | **P0** | Home — Hero | Hero image is corn-bowl, not man-with-Buck-Chow-bag (R2 H1 still OPEN) | `HomePage.tsx` hero `<picture>` block | Swap `src` to `lifestyle-img-4172.webp` or whichever asset shows hunter w/ bag |
| 3 | **P0** | Home — Signature | Kansas state outline is unrecognizable — SVG path is 700+ noisy zigzag vertices (looks like a torn rectangle, not Kansas) | `composite/KansasPhotoFade.tsx:15` (KANSAS_PATH) | Replace with a clean ~30-vertex topojson-derived Kansas outline (state border only) |
| 4 | **P0** | Home — Counter | Counter renders `0`, never ticks to `7,500` — `scrollProgress` desyncs from GSAP onUpdate after scroll-up | `motion/SignatureMove.tsx:96-107` + `AntlerInchesCounter.tsx:54-61` | Drive count-up from an IntersectionObserver one-shot tween (0→total over 1.2s, ease-out), independent of the section opacity tween |
| 5 | **P0** | PDP | "TRUSTED BY HUNTERS" testimonial card section invented; ORIGINAL_TRUTH § 7B says no PDP reviews | `ProductDetail.tsx:370-408` | Delete the testimonial section entirely from PDP |
| 6 | P1 | PDP | Product name "Buck Chow High Protein Feed — 40LB" wraps to 5 lines on right column; R2 D4 still OPEN | `ProductDetail.tsx:178` | Demote `Heading size="display-lg"` → `"display-md"`, OR change grid to `lg:grid-cols-[1fr_1.4fr]` |
| 7 | P1 | Products grid | Invented "PRODUCTS" oversized hero + 2-image preview grid + chip filter row; original is banner-image-with-"All Products"-overlay + left-vertical filter list | `ProductsIndex.tsx:58-110` | Replace with single banner image + centered "All Products" overlay; move filter to left rail |
| 8 | P1 | Products grid | IN STOCK pill + VIEW button on every grid card — invented chrome | `composite/ProductCard.tsx` (StockBadge + VIEW button) | Hide on grid; show only on PDP |
| 9 | P1 | Why GB Feeds | Pillar 4 image is hunter+bucks (with "193 inches" overlay) instead of handwritten thank-you note per ORIGINAL_TRUTH § 5.1 | `WhyGBFeedsPage.tsx` row 4 img | Swap to a handwritten thank-you note customer photo |
| 10 | P1 | site-wide | Page H1 titles are LEFT-aligned on `/our-story`, `/why-gb-feeds`, `/photo-gallery`; original site uses CENTERED page titles | each page's `<h1>` | Add `text-center` (or wrap in `mx-auto` container) to each page's H1 |
| 11 | P1 | Home — Difference | Section `py` is `py-24` (96px) at desktop; brief floor is `py-32` (128px). Pillar gap `gap-8` (32px) feels tight | each `<section>` in `HomePage.tsx` + Difference pillar wrapper | Bump to `py-20 sm:py-24 lg:py-32`; pillar gap `gap-12 lg:gap-16` |
| 12 | P1 | Brand stat | Why-GB-Feeds copy says "10,000 inches"; home counter targets "7,500"; PDP says "5,000" — three different numbers (R2 WG3 still OPEN) | `data/pillars.ts` + `data/harvests.json` + `data/products.ts` | Standardize on one number (recommend 10,000 — latest); update everywhere |
| 13 | P2 | PDP | "BC-40LB-2023 / 40 LB" stamps below buy panel — invented chrome | `ProductDetail.tsx:270-273` | Tuck into a small meta line or remove |
| 14 | P2 | Featured Products | Card name truncates at 2-line clamp ("BUCK CHOW HIGH PROTEI…") | `composite/ProductCard.tsx:88` (line-clamp-2) | Widen card to `w-[340px]` or use shorter `displayName` "BUCK CHOW 40LB" |
| 15 | P2 | PDP | Description heading is generic "ABOUT THIS PRODUCT"; original uses Buck Chow tagline "Extra Inches Aren't An Accident!" | `ProductDetail.tsx:291-292` | Render `product.descriptionTagline` as an H2 above the body; keep "ABOUT THIS PRODUCT" as small sub-label or remove |

---

## 5. STATUS OF TYLER'S 9 SPECIFIC MUST-FIXES

| # | Tyler's complaint | Status | Notes |
|---|---|---|---|
| 1 | "vertical cramming" | **MOSTLY RESOLVED** | Section padding now `py-24` (96px) on desktop — improved from R2's ~64px. Brief floor of `py-32` not yet hit at lg breakpoint (32px short). |
| 2 | "everything also needs to be perfectly centered" | **PARTIALLY RESOLVED** | Home sections, Customer-Reviews title, FAQ heading, Connect-With-Us all centered. STILL OPEN: H1 titles on `/our-story`, `/why-gb-feeds`, `/photo-gallery` are LEFT-aligned. |
| 3 | "every section is weirdly left aligned for a certain display size" | **RESOLVED** | At 768/1024/1440 the home page's sections all measure horizontally centered (verified visually across viewports). |
| 4 | "Nothing adapts to my window size" | **RESOLVED** | Mobile 390 / tablet 768 / desktop 1440 all reflow correctly. No horizontal overflow detected at any viewport. |
| 5 | "GB feeds logo from the top left is itty-bitty" | **RESOLVED** | Logo now renders as a clearly-readable square black badge (antler buck + "GB FEEDS" + "GROW. BIGGER. BUCKS." tagline) at ~52-60 px tall. R2 H2 RESOLVED. |
| 6 | "Get rid of the freaking gray crap" | **RESOLVED** | All section bands are warm cream (`paper` / `paper-2` / `paper-3`). No gray bands detected on any captured route. |
| 7 | "I want those customer review images to fade in and out of this state of Kansas" | **STILL OPEN** | The KansasPhotoFade component IS rendered, but: (a) the SVG path is too noisy to read as Kansas — looks like a jagged rectangle; (b) the photos look like a 4-up grid, not single photos cycling through one state-shaped window; (c) the counter shows `0` instead of `7,500`. Signature is built but visually amateurish. |
| 8 | "all content should come from the original website" | **MOSTLY RESOLVED** | Spot-checked 3 random copy blocks: (a) FAQ Q1 "Will GB Feeds products work in both gravity and spin feeders?" matches verbatim ✓; (b) Our Story "If you're in the market for quality deer feed products…" matches verbatim ✓; (c) Customer Review #1 "Let me tell you this stuff works! Thanks GB Feeds!" -Aaron matches verbatim ✓. STILL OPEN: brand-stat inconsistency (10k/7.5k/5k). |
| 9 | "shopping cart button goes to /products" | **NEEDS VERIFICATION** | The cart icon in NavBar points to a route — needs click-through test. Per ORIGINAL_TRUTH § 8 it should go to `/products?olsPage=cart` or rebuild equivalent. |

---

## 6. KANSAS-FADE SIGNATURE — IS IT WORKING?

**NO. Functionally rendered, visually broken.** Three problems:

1. **State outline unrecognizable.** The SVG path traces 700+ vertices of zigzag noise from the original county-detail SVG bounding hull. It reads as a TORN PIECE OF PAPER, not the iconic Kansas rectangle. Anyone unfamiliar with the brief would not recognize the shape as "Kansas."
2. **Counter stuck at 0.** The 7,500 antler-inch headline never animates up. `AntlerInchesCounter` depends on `scrollProgress` from `SignatureMove`'s GSAP onUpdate, but the trigger config (`toggleActions: 'play none none none'` + opacity tween only) doesn't reliably feed a 0→1 progression to the counter after the page is scrolled and re-rendered.
3. **Photos read as a collage, not a fade.** The screenshot captured 1 frame mid-cycle; visually you see a 2x2 grid of harvest photos clipped by the noisy state hull. There's no single dominant photo with a smooth crossfade — it's hard to read as "premium photographic moment."

**Verdict: amateurish, not premium. Needs major re-do.**

---

## 7. GETTING CLOSE TO "PERFECT"?

**Still rough. Significant progress vs R2 — but not close to launch.**

What's strong now (vs R2):
- Logo rendering (R2 H2 → resolved)
- Customer Reviews strip (R2 H3 → resolved)
- Difference left-column collage (R2 H5 → resolved)
- Our Story 3-row layout + verbatim copy (R2 OS2/OS4 → resolved)
- Why GB Feeds 4-pillar image+text rows (R2 WG1 → resolved)
- Customer Reviews brutally-minimal layout (R2 CR1/CR2/CR3 → resolved)
- Logo + footer + nav match original (visual + structural)
- 16 product images all populated (R2 P1 → resolved)
- No gray bands (Tyler #6 → resolved)
- Static-export server routing fixed via `http-server -e html` (R2 #11 → resolved)

What's still **launch-blocking**:
- **The button-reset cascade bug invisibly nukes every primary CTA on the site.** This is one tiny CSS file edit but it touches everything visible.
- **Hero is still wrong.** Tyler hates this; it's been flagged twice.
- **Kansas-fade is the brand-defining moment and it doesn't work.** Outline is wrong, counter is broken, photos read as collage.
- **PDP commerce is fundamentally broken** until § 2 fix lands. ADD TO CART invisible = no e-commerce.

After the next fix-up dispatch hits issues 1-5 from § 4, I'd estimate 60% complete → 85% complete. Issues 6-15 are polish.

---

*End of REBUILD_R4_AUDIT.md.*
