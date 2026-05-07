# GB FEEDS — REBUILD R2 DESIGNER AUDIT

> **Captured**: 2026-05-06 — designer audit pass after the structural reset.
> **Method**: Playwright (chromium) full-page screenshots at 1440×900 / 768×1024 / 390×844 against `http://localhost:4177/` (the rebuild's static `out/` served by python http.server). Compared 1:1 against `screenshots/original-fresh/`.
> **Scope**: read-only audit. No source files modified.

---

## SCREENSHOT INVENTORY

`.context/screenshots/rebuild-r2/` — 17 fresh full-page captures:

| Viewport | Routes captured |
|---|---|
| Desktop 1440 | `/`, `/products/`, `/products/buck-chow-40lb/`, `/our-story/`, `/why-gb-feeds/`, `/customer-reviews/`, `/photo-gallery/` |
| Tablet 768   | `/`, `/products/`, `/products/buck-chow-40lb/` |
| Mobile 390   | same as Desktop |

Plus per-route `crops/` subfolder with viewport-height strips for fold-by-fold comparison.

> **Server-config gotcha**: `npm start` (`serve out -p 4173`) does NOT route `/products/` → `out/products/index.html` — it strips the trailing slash and falls back to `/index.html`, returning the home for every URL. The audit uses python http.server on :4177 which honors directory-index. Action: replace `serve` in `package.json` with `serve out -p 4173 --no-clipboard --single` is wrong; `npx serve` needs `-c serve.json` with `cleanUrls:false, trailingSlash:true`. Or switch to `npx http-server out -p 4173`. **P0 deploy-blocker** if not already addressed by Cloudflare's directory-index rules in production.

---

## PER-ROUTE FINDINGS

### `/` — HOME (desktop 1440 — page total 7994 px)

| # | Issue | File / class | Severity | Fix |
|---|---|---|---|---|
| H1 | **Hero image is wrong**: rebuild shows a corn-bowl close-up; original shows a man in a tan shirt holding a Buck Chow 40 lb bag in a wooded field. Asset `lifestyle-img-3622.webp` ≠ what ORIGINAL_TRUTH § 2.1 #1 describes. | `HomePage.tsx:96` (img src) + `public/photos/lifestyle/lifestyle-img-3622.webp` | **P0** | Replace src with the actual hunter-with-bag lifestyle image (request from Greg or relocate `lifestyle-img-4172.webp` / `lifestyle-luke.webp` etc.). |
| H2 | **NavBar logo is almost invisible**: SVG logo is rendering tiny (≈ 30 px tall icon glyph) inside the 96 px black header bar. Original shows a SQUARE BLACK BADGE with white outlined antler-buck silhouette + "GB FEEDS" wordmark + "GROW. BIGGER. BUCKS." tagline that fills most of the header height (~60 px on desktop). | `NavBar.tsx:80-83` (`h-14 sm:h-16 lg:h-20`) + `public/brand/logo.svg` | **P0** | Verify `logo.svg` actually contains the full badge + wordmark + tagline (not just an antler glyph). If the SVG is just the buck mark, swap to the full-badge raster `IMG_9340.png` or an SVG vectorization. Also bump to `h-16 sm:h-18 lg:h-20` and add visible padding. |
| H3 | **Customer Reviews photo strip is empty**: section title renders, then ~600 px of blank white space, then the "MORE CUSTOMER REVIEWS" button. The 6 `CUSTOMER_GALLERY_PHOTOS` defined in `HomePage.tsx:38–45` are not visible in the captured strip. | `HomePage.tsx:188-212` | **P0** | Verify all 6 `/photos/gallery/blob-*.webp` assets are reachable from the static export (`out/photos/gallery/`). Currently the section paints empty — likely full-bleed `-mx-*` is offsetting them out of the viewport, or the `aspect-square` collapses to 0 height when the parent has no width constraint. Wrap in `Container` and set explicit `height` on the strip. |
| H4 | **Kansas-fade signature is NOT built**: section after Customer Reviews shows a giant oxblood "7,500" numeral + "ANTLER INCHES HARVESTED" stamp + "0 HARVESTS / 0 COUNTIES". No Kansas state silhouette, no customer photo fade-in, no map. This is the previous antler-counter-only treatment. | `HomePage.tsx:233-243` (`SignatureMoveLoader`) + `motion/SignatureMove.tsx` | **P0** | Build the Kansas-state SVG silhouette with customer-harvest photos that fade in pinned to county coordinates as the user scrolls, per the brief. Tyler explicitly flagged this as the deferred signature moment. |
| H5 | **GB FEEDS DIFFERENCE collage is empty**: 2-column grid renders the 4 pillars on the right but the left column (where the 2×2 customer-harvest collage should live) shows only blank cream paper. | `HomePage.tsx:269-283` | **P0** | Same root cause as H3 — `COLLAGE_PHOTOS` paths exist on disk but the collage `aspect-square` boxes paint empty. Either path mis-resolves through the static build (`out/photos/lifestyle/...`) or the parent grid has `gap-2` only and no min-height. Add `min-h-[300px]` to children. |
| H6 | **Pillar headings are too tight to body**: `Heading` for "PROVEN RESULTS" sits flush against the 2nd-pillar block above with no clear separation — visual rhythm is cramped. | `HomePage.tsx:286-309` (`gap-8` between pillars) | P1 | Increase to `gap-12 lg:gap-16` between pillars; add `pt-2` on each `Heading` or a hairline `Rule` between them. |
| H7 | **Our Story teaser CTA text is invisible**: "LEARN MORE" black-fill button with white text — but in the screenshot the button appears to be a solid black rectangle with NO visible text. | `HomePage.tsx:351-361` | P1 | Black-on-black bug — `text-white` is being overridden, or the inner text is being inherited from a surrounding `text-[var(--color-ink)]`. Inspect computed style; force `text-white` with `!important` modifier or `text-[#fff]`. |
| H8 | **Phone number wraps mid-digit** in Contact section: "(620) 639-3337" wraps after the dash to render `(620) 639-` / `3337` on two lines on desktop because `text-display-md` clamp overshoots column width. | `HomePage.tsx:430-438` | P1 | Add `whitespace-nowrap` to the `<a>`, or reduce size to `text-display-sm` on lg breakpoint. |
| H9 | **"DROP US A LINE!" form: SEND MESSAGE button text barely visible**: low-contrast cream-on-cream rendering. | `composite/ContactForm.tsx` | P1 | Ensure submit button is `bg-[var(--color-ink)] text-white` with no opacity transition pre-state. |
| H10 | **9 sections rendered in correct order** matching ORIGINAL_TRUTH § 2.1 (hero → featured → reviews-strip → signature → difference → our-story-teaser → faq → contact → connect → featured-2). Structural reset succeeded. | — | (status note) | — |
| H11 | **Vertical rhythm**: section padding measures roughly 96–128 px on desktop (`py-16 sm:py-20 lg:py-24` ≈ 96 px). Original feels closer to 128–160 px between sections. Brief asks for `py-24 lg:py-32` floor. | every `<section>` in HomePage | P1 | Bump to `py-20 sm:py-24 lg:py-32`. |
| H12 | **Featured Products card display name truncates**: "BUCK CHOW HIGH PROTEIN FEED — ..." cuts off mid-word at 2 lines. | `composite/ProductCard.tsx:88` (`line-clamp-2`) | P2 | Either widen the card to `w-[360px]` or use a shorter `displayName` (e.g. "BUCK CHOW 40 LB"). |

### `/products` (desktop 1440 — page total 3635 px)

| # | Issue | File / line | Severity | Fix |
|---|---|---|---|---|
| P1 | **TWS feeder cards have no images**: 4 `tws-*` product cards at the bottom of the grid render as empty cream tiles with name + price. The 4 SKUs (`tws-2000lb-gravity-feeder`, `tws-600lb-gravity-feeder`, `tws-600lb-lucky-buck-spin`, `tws-2000lb-spin-feeder`) are missing primary images. | `data/products.ts` (primaryImage field) + `public/products/tws-*` folders | **P0** | Add hero photos to each `public/products/tws-*` folder OR set `primaryImage` to a placeholder feeder render. |
| P2 | **"PRODUCTS" hero is its own invented intro**: oversized "PRODUCTS" Bebas display with kicker "MANHATTAN, KS / EST. 2017 / ALL PRODUCTS" + 3-up stat row + 2-photo grid — none of this is on the original. The original has a BANNER IMAGE with "All Products" overlay (per ORIGINAL_TRUTH § 3.1 #1). | `ProductsIndex.tsx:58-110` | P1 | Replace with a single full-width banner image (corn-feeder shot) with "All Products" overlay text. Drop the kicker, the stat row, and the 2-image preview. |
| P3 | **No left sidebar filter list**: original has a vertical text list of 5 filter labels (All Products / Deer Feed Products / Deer Feeders / Apparel / Tactacam Reveal Products) on the left. Rebuild has a horizontal chip row. | `ProductsIndex.tsx:120` (`ProductFilterChips`) | P2 | Optional: per ORIGINAL_TRUTH § 3.1 #2 the original is a left vertical list; the chip row is acceptable but flag as deviation. |
| P4 | **Card images are object-cover (good) — but cream-paper card body adds visual weight**: the card body section beneath the image (price + IN STOCK pill + VIEW button) is on `bg-[var(--color-paper-3)]` with hairline border — adds chrome the original doesn't have. | `ProductCard.tsx:34-44` + `ProductCard.tsx:87` | P2 | Original cards are border-only with name + price, no IN STOCK pill, no VIEW button. Strip the IN STOCK badge and VIEW button on grid; let card click → PDP. |
| P5 | **Product cards have IN STOCK pill** rendered with a green outlined-mono stamp — invented chrome. Original shows price (and strikethrough sale price) only. | `ProductCard.tsx` (StockBadge) | P2 | Hide StockBadge on grid view; show only on PDP. |
| P6 | **No pagination**: original splits 16 SKUs across 2 pages. Rebuild renders all 16 in one scroll. | `ProductsIndex.tsx` | P2 | Optional — the rebuild's single grid is arguably better UX. Defer. |

### `/products/buck-chow-40lb/` (desktop 1440 — page total 4301 px)

| # | Issue | File / line | Severity | Fix |
|---|---|---|---|---|
| D1 | **No "ADD TO CART" or "Buy with G Pay" buttons**: rebuild shows only `CALL (620) 639-3337 TO ORDER` button. Original has both `ADD TO CART` (black fill) and `Buy with G Pay` side-by-side buttons. | `page/ProductDetail.tsx` (buy CTA section) | **P0** | Restore Add to Cart wired to OLS backend per ORIGINAL_TRUTH § 7B + § 8 cart-flow notes. If backend not yet integrated, render an "Add to Cart" button stub that disables until backend is connected — but DO NOT replace with a phone CTA. |
| D2 | **Empty "GUARANTEED ANALYSIS" panel**: large black-headed paper-colored box with no content. | `ProductDetail.tsx` | P1 | Either populate the table with actual nutritional analysis from product datasheet, or remove the panel entirely. Original has no such panel. |
| D3 | **"BUILD A FEED PROGRAM WITH THIS" cross-sell heading**: editorial flourish not on original. Original says "You May Also Like". | `ProductDetail.tsx` (related products section) | P2 | Rename to "YOU MAY ALSO LIKE" per ORIGINAL_TRUTH § 7B. |
| D4 | **Product name renders broken across 5 lines**: "BUCK / CHOW HIGH / PROTEIN / FEED / — 40LB" wraps at almost every word due to narrow right column. | `ProductDetail.tsx` heading + `Heading display-lg` | P1 | Increase right-column width (`grid-cols-[1fr_1.2fr]` or `lg:grid-cols-2`) or reduce heading scale to `display-md`. |
| D5 | **Date stamp `LOT 2024-09 / MANHATTAN, KS`**: invented chrome below the buy panel. | `ProductDetail.tsx` | P2 | Remove — not on original. |

### `/our-story` (desktop 1440 — page total 2031 px)

| # | Issue | File / line | Severity | Fix |
|---|---|---|---|---|
| OS1 | **Wrong hero image**: rebuild's hero shows the corn-bowl close-up. Original `OUR STORY` page begins with the title centered, then alternating image+text rows. NO standalone hero image at all. | `OurStoryPage.tsx` (top section img) | **P0** | Remove the standalone hero image; render the page title centered, then go straight into the 3 alternating row blocks per ORIGINAL_TRUTH § 4.1. |
| OS2 | **Three alternating image+text rows are missing**: the rebuild only shows pillar copy on a paper background with stamps (Riley Co, Wind, Kansas chrome). Original has 3 distinct rows: Greg + 3 mounted bucks (image LEFT) → trail-cam buck (image RIGHT) → Greg crouched with harvested buck (image LEFT). | `OurStoryPage.tsx` | **P0** | Build 3 alternating rows. Source images: `lifestyle-img-1091-1.webp` (Greg + bucks), `lifestyle-img-0018.webp` (trail-cam), `lifestyle-20231008-234054.webp` (Greg + harvested buck). |
| OS3 | **Invented `KILEY CO`, `WIND`, `KANSAS` mono stamps**: editorial chrome not on original. | `OurStoryPage.tsx` | P1 | Strip. |
| OS4 | **Founder narrative copy is condensed/missing**: rebuild shows abbreviated paraphrase. Original has 5 distinct paragraphs with the `-Greg` signature. | `data/our-story.ts` or inline copy | **P0** | Use verbatim paragraphs from ORIGINAL_TRUTH § 4.2. |

### `/why-gb-feeds` (desktop 1440 — page total 2222 px)

| # | Issue | File / line | Severity | Fix |
|---|---|---|---|---|
| WG1 | **All four pillar images are missing**: every pillar block shows text + a giant ghost-gray "01"/"02"/"03"/"04" pillar numeral on the right, plus `MANHATTAN / CNTY KS / PILLAR 0X` mono-stamps on the left. Original has 4 alternating image+text rows per pillar (collage of harvests / Buck Chow on truck / corn-pellet macro / handwritten thank-you note). | `WhyGBFeedsPage.tsx` | **P0** | Build 4 alternating image+text rows per ORIGINAL_TRUTH § 5.1. Source images: `/photos/gallery/blob-*.webp` for collage, `lifestyle-img-4439.webp` for Buck Chow on truck, etc. Drop the big numerals + stamps. |
| WG2 | **"READY TO PUT IT TO WORK" CTA section** appears at bottom — invented. Original has no CTA on this page (per ORIGINAL_TRUTH § 5.4). | `WhyGBFeedsPage.tsx` | P1 | Remove. |
| WG3 | **The 7,500 / 10,000 / 5,000 brand-stat inconsistency is unresolved**: rebuild surfaces "10,000 inches" in pillar 1 copy and "7,500" in the home counter. ORIGINAL_TRUTH § 5.3 flags this — pick ONE number. | `data/pillars.ts` + `data/harvests.json` | P1 | Standardize on 10,000 (latest). |

### `/customer-reviews` (desktop 1440 — page total 2524 px)

| # | Issue | File / line | Severity | Fix |
|---|---|---|---|---|
| CR1 | **Editorialized vs brutally minimal original**: rebuild has a kicker (`KANSAS / MIDWEST / REAL HUNTERS / REAL RESULTS`), giant CUSTOMER REVIEWS Bebas display, then a 3-COLUMN GRID of testimonial cards with quotation glyphs and `CORN CANDY` / `BUCK CHOW` tag chips. Original is a tightly-stacked LEFT-ALIGNED single-column list of 22 reviews — no cards, no avatars, no tags, no dividers. | `CustomerReviewsPage.tsx` | P1 | Strip cards + tags. Render as single-column left-aligned list of 22 testimonials per ORIGINAL_TRUTH § 6.1–6.2. |
| CR2 | **"Top of page" testimonial photo carousel** appears above the title in rebuild — original has NO photos on /customer-reviews (testimonials are photo-free per ORIGINAL_TRUTH § 6.4). | `CustomerReviewsPage.tsx` (carousel) | P1 | Remove the photo carousel from this page. Photos belong only on `/photo-gallery` and the home `CUSTOMER REVIEWS` strip. |
| CR3 | **Welcome line "No paid sponsorships, no famous TV personalities…"**: rebuild treats this as a smaller subtitle below the giant CUSTOMER REVIEWS Bebas display. Original treats this as the page TITLE itself (multi-line, centered, refined editorial weight). | `CustomerReviewsPage.tsx` | P2 | Promote to page title; demote `CUSTOMER REVIEWS` heading. |

### `/photo-gallery` (desktop 1440 — page total 3672 px)

| # | Issue | File / line | Severity | Fix |
|---|---|---|---|---|
| PG1 | **Editorial chrome at top** ("KANSAS / FIELD / TRAIL-CAM") + giant PHOTO GALLERY display + tagline "Real hunters. Real properties. Real results." — original has no kicker and no tagline. | `PhotoGalleryPage.tsx` | P2 | Strip the kicker + tagline; keep only "PHOTO GALLERY" centered. |
| PG2 | **3-column grid layout vs hero-viewer + filmstrip carousel**: rebuild renders a 3×N masonry grid of all photos. Original is a hero-viewer with a thumbnail filmstrip below + left/right scroll arrows (per ORIGINAL_TRUTH § 7.1). | `PhotoGalleryPage.tsx` | P2 | Either keep the grid (better UX, defendable) OR rebuild the carousel. Flag as deliberate deviation. |
| PG3 | **Some photos render with embedded hand-drawn captions** ("Dude this stuff is fire! -Jon Legacy Pursuit") — these are baked into the source asset, not rendered by the layout. | source assets | P2 | If unintended, re-export source photos without text overlay. |

### `/` mobile 390 (page total 7631 px)

- **NavBar logo invisible on mobile** as well — appears as a tiny icon only.
- **Hero is the corn-bowl image, viewport-tall** — fills full screen height. Same wrong-asset issue.
- **Featured Products carousel cards** render at `w-[280px]` — readable but cramped. Acceptable.
- **GB FEEDS DIFFERENCE** stacks pillars vertically with NO collage above (collage section paints blank).
- **Section padding feels right on mobile** — `py-16` ≈ 64 px, comfortable.
- **No horizontal overflow** detected at 390 px.

### `/` tablet 768 (page total 8489 px)

- Tablet renders the same desktop 2-col layouts at the breakpoint. The PRODUCT CAROUSEL stretches 2 cards visible at a time. Acceptable.

---

## TOP 25 RANKED ISSUES (P0 first → for next fix-up dispatch)

| Rank | Severity | Page / Section | Issue (1-line) | File:line |
|---|---|---|---|---|
| 1  | **P0** | Home — Hero | Hero image is a corn bowl, not the man-with-Buck-Chow-bag lifestyle shot | `HomePage.tsx:96` + `lifestyle-img-3622.webp` |
| 2  | **P0** | Home — Signature | Kansas-state-fade customer-photo signature is NOT built (still antler-counter-only) | `HomePage.tsx:233-243` + `motion/SignatureMove.tsx` |
| 3  | **P0** | Why GB Feeds | All 4 pillar images are MISSING — page is text + ghost numerals only | `WhyGBFeedsPage.tsx` |
| 4  | **P0** | Our Story | Wrong hero image (corn bowl) AND missing 3 alternating image+text rows | `OurStoryPage.tsx` |
| 5  | **P0** | PDP | Missing ADD TO CART + Buy with G Pay buttons; replaced by "Call to order" CTA | `ProductDetail.tsx` |
| 6  | **P0** | Home — Customer Reviews | Photo gallery strip paints empty (6 `/photos/gallery/blob-*.webp` not rendering) | `HomePage.tsx:188-212` |
| 7  | **P0** | Home — GB Feeds Difference | Left-column 2×2 photo collage paints empty | `HomePage.tsx:269-283` |
| 8  | **P0** | NavBar | Logo is barely visible — likely an antler glyph SVG instead of full badge + wordmark + tagline | `NavBar.tsx:80-83` + `public/brand/logo.svg` |
| 9  | **P0** | Products grid | 4 TWS feeder cards have no images (empty cream tiles) | `data/products.ts` + `public/products/tws-*` |
| 10 | **P0** | Our Story | Founder narrative copy is paraphrased instead of verbatim 5-paragraph original | `OurStoryPage.tsx` |
| 11 | **P0** | Static-export server | `serve` on :4173 returns home HTML for every URL (trailing-slash routing broken) | `package.json:start` |
| 12 | P1 | Home — Vertical rhythm | Section `py` is 96 px desktop; brief asks for 128–160 px floor | every `<section>` in `HomePage.tsx` |
| 13 | P1 | Home — Our Story teaser | "LEARN MORE" button text is invisible (black text on black bg) | `HomePage.tsx:351-361` |
| 14 | P1 | Home — Contact | Phone "(620) 639-3337" wraps to two lines mid-string | `HomePage.tsx:430-438` |
| 15 | P1 | Home — Contact | "SEND MESSAGE" button text low-contrast | `composite/ContactForm.tsx` |
| 16 | P1 | Products | Invented PRODUCTS hero (kicker + stat row + 2-up images) replaces original banner-with-overlay | `ProductsIndex.tsx:58-110` |
| 17 | P1 | PDP | Empty "GUARANTEED ANALYSIS" panel | `ProductDetail.tsx` |
| 18 | P1 | PDP | Product name wraps to 5 lines on right column | `ProductDetail.tsx` |
| 19 | P1 | Our Story | Invented `KILEY CO / WIND / KANSAS` mono-stamps | `OurStoryPage.tsx` |
| 20 | P1 | Why GB Feeds | "READY TO PUT IT TO WORK" CTA at bottom — invented | `WhyGBFeedsPage.tsx` |
| 21 | P1 | Why GB Feeds | Brand-stat inconsistency: 10,000 vs 7,500 surfaced unresolved | `data/pillars.ts` + `data/harvests.json` |
| 22 | P1 | Customer Reviews | Editorialized cards + tags + photo carousel vs minimal single-column list | `CustomerReviewsPage.tsx` |
| 23 | P1 | Customer Reviews | Invented kicker `KANSAS / MIDWEST / REAL HUNTERS` | `CustomerReviewsPage.tsx` |
| 24 | P1 | Home — Difference pillars | `gap-8` between pillars feels cramped; bump to `gap-12 lg:gap-16` | `HomePage.tsx:286-309` |
| 25 | P2 | PDP | "BUILD A FEED PROGRAM WITH THIS" cross-sell heading; original says "You May Also Like" | `ProductDetail.tsx` |

---

## STATUS ANSWERS

### a) Kansas-fade customer-photo signature
**NOT BUILT.** Home renders the previous antler-counter-only treatment: oxblood "7,500" numeral + "ANTLER INCHES HARVESTED" stamp + "0 HARVESTS / 0 COUNTIES / 7,500 INCHES / KANSAS-MADE / SINCE 2017". No state silhouette, no fade-in customer photos, no scroll-pinned interaction. **Highest-priority new feature for the next dispatch.**

### b) Product card images
**`object-cover` is correctly applied** (`ProductCard.tsx:59`). No cream-padding inset visible inside the image area itself. HOWEVER, the card body BELOW the image (Heading + Price + IN STOCK pill + VIEW button) is on `bg-[var(--color-paper-3)]` with a hairline top border — that's chrome the original doesn't have. **Image: clean. Card body: over-styled.** Also 4 of 16 products (TWS feeders) have NO image at all.

### c) NavBar
- **Three-column hamburger / logo / icons layout: CORRECT** (matches ORIGINAL_TRUTH § 1).
- **Hamburger-only on desktop AND mobile: CORRECT.**
- **Search / Cart / Account icons present right-side: CORRECT.**
- **Logo size is too small / nearly invisible** — appears as a tiny antler-buck glyph icon. Either the SVG is missing the wordmark + tagline strata, or the `h-14 sm:h-16 lg:h-20` constraints are clamping it too small relative to the artboard. Original logo is a clearly readable square black badge ~60 px tall. **Logo asset and/or sizing is the P0 issue.**

### d) Vertical rhythm
- Section `py` measures 96 px desktop (`py-24`) and ~80 px tablet/mobile.
- Original visually feels closer to 128–160 px between major bands.
- Brief explicitly says `py-24 lg:py-32` is the FLOOR.
- The home page is **breathing better than R1** but still cramped relative to brief.
- Pillar-to-pillar gap inside GB FEEDS DIFFERENCE is `gap-8` (32 px) — too tight; bump to 48–64 px.
- Empty collage column drops the "Difference" section's perceived weight, making the right column read as flush-left to viewport — looks unbalanced.

---

*End of REBUILD_R2_AUDIT.md.*
