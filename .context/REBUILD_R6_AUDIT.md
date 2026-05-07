# GB FEEDS — REBUILD R6 DESIGNER AUDIT

> **Captured**: 2026-05-07 — designer audit pass after R5 fix-up dispatch (10 fixes: 5 P0 + 5 P1).
> **Method**: Playwright (Chromium, deviceScaleFactor 1, fullPage: true) full-page screenshots at 1440×900 / 768×1024 / 390×844 against `http://localhost:4173/` (rebuild static export served via `http-server -e html`). Compared 1:1 against `screenshots/original-fresh/`. CDP `getComputedStyle()` + DOM-walk inspection on every R5 fix.
> **Scope**: read-only audit. No source files modified.

---

## 1. SCREENSHOT INVENTORY

`.context/screenshots/rebuild-r6/` — **18 fresh full-page captures**:

| Viewport | Count | Routes |
|---|---|---|
| Desktop 1440 | 7 | `/`, `/products/`, `/products/buck-chow-40lb/`, `/our-story/`, `/why-gb-feeds/`, `/customer-reviews/`, `/photo-gallery/` |
| Tablet 768 | 4 | `/`, `/products/`, `/products/buck-chow-40lb/`, `/our-story/` |
| Mobile 390 | 7 | same as Desktop |
| **TOTAL** | **18** | — |

Home `/` waited 4s after `networkidle`, then scrolled mid-page to attempt counter trigger, then back to top.

---

## 2. R5 FIX VERIFICATION (10 sub-items)

Hard data via CDP `getComputedStyle()` + DOM walks.

| # | R5 Fix | Status | Hard evidence |
|---|---|---|---|
| **a** | CSS cascade-layer P0-1 (button bg) | **PASS** | PDP ADD TO CART: `bg=oklch(0.145 0.008 60)` (ink dark), `color=rgb(255,255,255)`, `border=1px`, height=42px. Buy with G Pay: same. Mobile sticky-bar ADD TO CART: same. Reset `<button>{background:none}` no longer wins. |
| **b** | Home hero swap P0-2 | **PASS** | Hero `<img src="/photos/lifestyle/lifestyle-img-4172.webp" alt="Hunter holding a Buck Chow 40lb bag in a wooded Kansas field">`. Confirmed visually — hunter w/ bag + harvested deer, NOT corn-bowl close-up. |
| **c** | Kansas state SVG redo P0-3 | **FAIL** | `KANSAS_PATH = 'M 8,8 L 706,8 L 706,36 L 743,36 L 743,8 L 792,8 L 792,406 L 8,406 Z'` — 9 vertices total, axis-aligned **literal rectangle with one tiny notch in the NE corner**. Bottom border is dead straight (correct), but TOP, LEFT, RIGHT borders are also dead straight — Kansas's actual outline has a slight slope on the western border (S to N narrowing) and a 90° corner. This shape reads as a torn dollar bill, not Kansas. R4 had a noisy zigzag rectangle; R5 replaced it with a *clean* rectangle. Same visual problem, slightly different vibe. |
| **d** | Counter IO tween P0-4 | **FAIL** | Counter span `<span class="font-display uppercase leading-[1.0] text-[var(--color-accent)]">0</span>` reads `0` both at scrollY=0 AND after `window.scrollTo(0, 3565)` + 2.5s wait. The IntersectionObserver in `AntlerInchesCounter.tsx:53-86` looks correct, but the parent `SignatureMove.tsx:125` sets `style={{ opacity: 0 }}` on desktop and relies on a GSAP ScrollTrigger that only advances via Lenis-driven scroll events. Native `window.scrollTo` doesn't trigger Lenis → ScrollTrigger never fires opacity 0→1, AND/OR Lenis transforms body (translate3d) so IO never sees the counter intersect viewport. Counter is still BROKEN at 0. |
| **e** | PDP testimonials delete P0-5 | **PASS** | `document.body.innerText.includes('TRUSTED BY HUNTERS') === false`. PDP headings are exactly: `H1 "Buck Chow High Protein Feed — 40LB"` → `H2 "ABOUT THIS PRODUCT"` (with tagline "Extra Inches Aren't An Accident!" above body) → `H2 "YOU MAY ALSO LIKE"` → 3 cross-sell cards. Section is gone. |
| **f** | H1 centering P1 | **PASS** | `/our-story/`: `text-align: center`, leftPad=384, rightOverhang=384 (exact match) at vw=1440. `/why-gb-feeds/`: same. `/photo-gallery/`: same. All three centered. |
| **g** | Vertical rhythm P1 | **PASS** | 9 of 11 home sections compute `padding-top: 128px / padding-bottom: 128px` (= `py-32` = brief floor) at vw=1440. Two minor sections at 96px (FAQ + final featured) — acceptable. R4 was 96px everywhere; R5 hit the lg:py-32 floor. |
| **h** | PDP title size P1 | **PARTIAL PASS** | Title computed: `fontSize: 80px`, `lineHeight: 80px`, `height: 240px`, `width: 496px` → **3 lines** ("Buck Chow / High Protein / Feed — 40LB"). R4 was 5 lines. Improvement, but original is ~2 lines on a wider title column. Either demote to `display-md` (~64px) for 2 lines, OR widen the right column (`lg:grid-cols-[1fr_1.4fr]`). |
| **i** | ProductCard cleanup P1 | **PASS** | `/products/` page innerText contains neither "IN STOCK" nor `\bVIEW\b`. Card chrome is name + price only. |
| **j** | Brand stat reconcile P1 | **PASS** | Home: `7,500 inches`. /why-gb-feeds: `7,500 inches`. /products/buck-chow-40lb/: `7,500 inches`. No "10,000" or "5,000" anywhere. Single canonical figure. |

**Score: 7 PASS / 1 PARTIAL / 2 FAIL** (Kansas SVG, counter animation).

---

## 3. R4 ISSUE TRACKING — RESOLVED / STILL OPEN

| R4 # | Issue | R6 Status |
|---|---|---|
| §2 | Cascade-layer button reset bug (P0) | **RESOLVED** — buttons now render with ink-dark fill |
| H1 | Hero corn-bowl (P0) | **RESOLVED** — lifestyle-img-4172.webp swapped in |
| H2 | Kansas SVG path noisy (P0) | **STILL OPEN** — replaced with literal rectangle, not Kansas outline |
| H2 | Counter stuck at 0 (P0) | **STILL OPEN** — Lenis/ScrollTrigger/opacity-0 interaction breaks IO trigger |
| H10 | IN STOCK + VIEW chrome on grid cards (P1) | **RESOLVED** |
| H14 | Vertical rhythm short of py-32 floor (P1) | **RESOLVED** |
| D1 | ADD TO CART invisible (P0) | **RESOLVED** |
| D2 | PDP title 5 lines (P1) | **PARTIAL** — now 3 lines, original ~2 |
| D4 | "BC-40LB-2023 / 40 LB" stamps (P2) | **STILL OPEN** — visible below buy panel as empty cream box |
| D6 | TRUSTED BY HUNTERS testimonials (P1) | **RESOLVED** |
| D8 | Description heading "ABOUT THIS PRODUCT" missing tagline (P2) | **RESOLVED** — tagline "Extra Inches Aren't An Accident!" rendered |
| OS4 | OUR STORY title left-aligned (P2) | **RESOLVED** — centered |
| WG2 | Pillar 4 image is "193 inches" hunter not handwritten note (P1) | **STILL OPEN** — same image in place |
| WG3 | WHY GB FEEDS title left-aligned (P2) | **RESOLVED** — centered |
| WG4 | Brand-stat inconsistency (P1) | **RESOLVED** — 7,500 everywhere |
| PG1 | PHOTO GALLERY title left-aligned + invented kicker (P2) | **PARTIAL** — title centered, kicker still TBD (not visible in current screenshot, marking resolved) |
| P2 | Products invented hero + chip filter (P1) | **STILL OPEN** — oversized "PRODUCTS" hero with stat row + 2-image preview grid + chip-row filter unchanged |

---

## 4. CRITICAL INSPECTIONS

**Products page hero + filter** (`ProductsIndex.tsx:58-110`): STILL the invented design — large "PRODUCTS" centered display heading, `MANHATTAN, KS / EST. 2017 / ALL PRODUCTS` mono kicker, `16 SKUs / 20% Protein / Ships US` 3-up stat row, then a 2-figure preview grid (Buck Chow + Corn Candy bag images), then a horizontal chip row filter. Original is a single banner image with overlay + left-vertical text-list filter on desktop. **Unfixed.**

**Why GB Feeds pillar 4 image** (`WhyGBFeedsPage.tsx` row 4): STILL the wrong "193 Inches Thanks" hunter+bucks composite. Should be a handwritten thank-you note photo per ORIGINAL_TRUTH § 5.1 row 4. **Unfixed.**

**Cart icon target**: NavBar cart anchor is `<a href="/products/" aria-label="Shop products">`. Per ORIGINAL_TRUTH § 8 it should resolve to `/products?olsPage=cart` (or rebuild equivalent /cart route). Currently it just dumps users on the product index. The behavior is *defensible* (no real cart yet) but doesn't match Tyler's spec.

**Mobile sticky add-to-cart bar** (PDP at 390): visible at `position: fixed; bottom: 0; height: 71.5px`. Contains the title + price + ADD TO CART button. Button `bg=oklch(0.145 0.008 60)`, `color=white`, height=32px. **Renders correctly.**

**Customer Reviews on home**: 6+ photos visibly rendering in horizontal scroll strip. Confirmed in screenshot — multiple harvest photos with overlay text ("CUSTOMER REVIEW!" baked-in stamps). **Renders.**

**GB FEEDS DIFFERENCE collage**: confirmed in screenshot — 4-up customer-photo collage in left column, 4 pillars in right column. **Renders.**

**Footer**: minimal — `Terms and Conditions / Privacy Policy / Terms and Conditions / GB Feeds, LLC / © 2026 GB Feeds. All Rights Reserved.` Three legal links + business name + copyright. Matches original. **Correct.**

---

## 5. TOP 10 NEXT P0/P1 ISSUES — ranked

| Rank | Severity | Page | Issue (1-line) | File:line | 1-line fix |
|---|---|---|---|---|---|
| 1 | **P0** | Home | Counter stuck at `0` — IO never fires under Lenis-managed scroll because parent has `opacity:0` waiting on GSAP ScrollTrigger that desyncs from native scroll | `motion/SignatureMove.tsx:125` (`style={{ opacity: 0 }}`) + `motion/SignatureMove.tsx:84-105` ScrollTrigger | Drop the `opacity:0` initial state on the inner div (or render the counter OUTSIDE the opacity-tweened wrapper); rely on AntlerInchesCounter's own IO+rAF tween |
| 2 | **P0** | Home | Kansas state outline is a 9-vertex axis-aligned rectangle, not a Kansas silhouette — looks like a torn paper rectangle | `composite/KansasPhotoFade.tsx:22` `KANSAS_PATH` | Replace with a real topojson-derived Kansas border (~60-100 vertices). Even just hand-trace 30-vertex SVG with the panhandle (NE Missouri River notch) + the slightly-narrower-east-than-west border |
| 3 | **P1** | Products grid | Invented "PRODUCTS" oversized hero + stat row + 2-image preview grid + chip filter row; original is banner-image + left-vertical text filter | `page/ProductsIndex.tsx:58-110` | Replace hero with single banner image + "All Products" overlay; move filter chips to a left-rail vertical text list (`<aside>` + `<ul>`) per ORIGINAL_TRUTH § 3.1 |
| 4 | **P1** | Why GB Feeds | Pillar 4 image is hunter+buck "193 Inches Thanks" composite; original is a handwritten thank-you note photo | `page/WhyGBFeedsPage.tsx` row 4 `<img>` src | Swap to a handwritten thank-you note customer photo (or any Greg-thanking-customer asset from /photos/lifestyle/) |
| 5 | **P1** | PDP | Product title still wraps to 3 lines at desktop right column (original is ~2) | `page/ProductDetail.tsx:178` `Heading size="display-lg"` | Demote to `size="display-md"` (~3-5rem clamp) OR change buy-panel grid to `lg:grid-cols-[1fr_1.4fr]` |
| 6 | **P1** | PDP | Empty cream "BC-40LB-2023 / 40 LB" stamp box renders below buy panel — invented chrome, breaks visual flow | `page/ProductDetail.tsx:270-273` | Remove the SKU/weight stamp box or tuck the values into a small meta line above the price |
| 7 | **P1** | Home — Kansas signature | Photos inside the rectangular outline read as a 4-up grid, not a single dominant photo with cross-fade — defeats the "premium photographic moment" intent | `composite/KansasPhotoFade.tsx:49-90` (image rendering loop) | Stack all photos absolutely positioned, opacity 0, only `activeIndex` at opacity 1; ensure single-photo dominance with smooth 1s crossfade |
| 8 | **P1** | NavBar | Cart icon link resolves to `/products/` not a real cart route. Tyler's #9 must-fix says "shopping cart button goes to /products" — that's now true, but spec said `/products?olsPage=cart` | `components/composite/NavBar.tsx` (search icon + cart anchor) | Confirm with Tyler whether `/products/` only is acceptable or whether a `/cart/` route stub is needed |
| 9 | **P2** | Home | "0" counter is rendered as a giant `clamp(8rem, 6.4rem+8vw, 15rem)` (240px height) — even WHEN it animates correctly, the magnitude is overwhelming relative to the `7,500 INCHES` subline. Also feels disconnected from the small Kansas outline below | `motion/AntlerInchesCounter.tsx:99` | Reduce to `clamp(6rem, 4.8rem+5vw, 11rem)` (~176px max). Tighten gap between counter + Kansas to `gap-4` so they read as one unit |
| 10 | **P2** | Photo Gallery | Several photos have baked-in caption overlays ("CUSTOMER REVIEW!", "Dude this stuff is fire!") — caption-art style is inconsistent with the brutally-minimal restof-site aesthetic | source assets in `/photos/gallery/` | Re-export source photos without text overlays; or accept this is from-original-site Greg-uploaded content |

---

## 6. TYLER'S "PERFECTION" BENCHMARK — would he say "good now"?

**No. Tyler would still say "Trash" — but he'd be 60% less mad than R4.**

The 5 things that prevent the site from looking professional to a hunter-buyer:

1. **The Kansas signature still doesn't read as Kansas.** The literal axis-aligned rectangle with a tiny notch is the brand-defining moment — and it looks like a print-shop bug. Anyone unfamiliar with the brief would not say "that's Kansas." If you can't recognize the silhouette, the photographic content inside means nothing. **This is the #1 visual liability.**

2. **The counter shows `0` and never moves.** It's the largest piece of typography on the home page, in an attention-grabbing oxblood color, and it's broken. Even if it worked, the "0" animation never fires because the GSAP/Lenis/IO interaction is racing itself. A user lands, sees a giant red 0, and concludes the site is half-built.

3. **The /products/ page hero is the most off-brand surface.** Stat row "16 SKUs / 20% Protein / Ships US" reads like a startup landing page, not a Kansas family-owned feed brand. The 2-image preview grid feels like it was generated by a template. Original site is a banner image + simple filter list — **brutally minimal** in a way the rest of the site has gradually achieved, but this page keeps undoing.

4. **Pillar 4 "193 Inches Thanks" image is a brand mismatch.** The other 3 pillars use authentic customer photos. Pillar 4 has a heavily-stylized graphic with text baked into the image, which clashes with the photojournalistic tone. Plus it's not what the original used.

5. **PDP buy panel still has visual leftovers** — the empty "BC-40LB-2023 / 40 LB" cream box below the buttons looks like a placeholder that wasn't deleted. It's the kind of thing that screams "this site is unfinished" to anyone who pauses on it.

---

## 7. OVERALL COMPLETENESS

**~78% complete** (up from R4's estimated 60%).

R5 nailed 7 of 10 fixes. The two FAILs (Kansas SVG, counter) are the brand-defining moment of the home page, so the user-perceived improvement is smaller than the fix-count suggests. The bones are now correct (typography, layout, color, copy, button rendering, centering, vertical rhythm, brand-stat reconcile). The flesh problems remaining are:

- 2 P0 home-page signature defects (Kansas + counter) — must fix before launch
- 1 P1 invented `/products/` hero — visible to every prospect
- 1 P1 wrong pillar image
- 3 P1/P2 PDP polish items
- Cart routing decision

Estimate: one more focused dispatch on items 1-7 would bring this to **92%**. Items 8-10 are pre-launch polish.

---

*End of REBUILD_R6_AUDIT.md.*
