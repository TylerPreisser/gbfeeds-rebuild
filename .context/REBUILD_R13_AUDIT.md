# REBUILD R13 — Designer Audit

**Date:** 2026-05-06
**Local rebuild:** http://localhost:4173/
**Original:** https://gbfeeds.com/
**Commit baseline:** 870ee97 (R12 ship)
**Screenshots:** `.context/screenshots/rebuild-r13/{desktop_1440,tablet_768,mobile_390}/*.png`
**Total captures:** 21 (8 desktop + 5 tablet + 8 mobile — home is 2 captures × 3 viewports)

---

## R12 Fix Verification (7 items)

| # | Fix | Verdict | Evidence |
|---|---|---|---|
| 1 | Killed 3 review-meme tiles (`blob-16f87b2`, `blob-93bef42`, `blob-de1da36`) | **PASS** | `Grep` across `out/` and `src/`: zero matches in compiled output. The src files reference the SHA names only inside comments documenting the removal (`HomePage.tsx:38`, `PhotoGalleryPage.tsx:79`, `KansasPhotoFade.tsx:27`). No JSX/data array references. |
| 2 | Counter no-flash (SSR `total` then drop-to-0 on mount) | **FAIL** | `desktop_1440/home_pre-counter.png` shows the counter rendering **`0`** on initial paint at networkidle. The R12 strategy in `AntlerInchesCounter.tsx:46-70` (SSR `total`, then `setDisplayValue(0)` on first mount) actually CAUSES the flash it was meant to fix. The SSR `7,500` is overwritten with `0` on mount before IO fires. Post-counter screenshot correctly shows 7,500 after scroll-in animation. Animation works, but pre-animation state IS the broken state. |
| 3 | Hero photo recrop (`objectPosition: center 38%`) | **PASS** | `HomePage.tsx:96`. Desktop hero now shows actor's torso + bag + feeder mid-frame. Head still cropped above frame, but the bag is the visual anchor instead of feet/ground. |
| 4 | Hero gradient deepened (kicker legibility) | **PASS** | `HomePage.tsx:108` 5-stop gradient `0.62 → 0.38 → 0.22 → 0.38 → 0.62` darkens top + bottom. Kicker `MANHATTAN, KS · EST. 2017 · FIELD-TESTED` is readable. *Note:* the `GB FEEDS / GROW. BIGGER. BUCKS.` overlay was ADDED in this commit — original spec said NO hero text overlay (ORIGINAL_TRUTH § 2.1.1: "NO text overlay, NO headline, NO CTA"). Deviation from original truth. |
| 5 | NavBar wordmark | **PASS** | `NavBar.tsx:97-109`. Desktop renders buck icon + "GB Feeds" (display 1.375rem) + "Grow. Bigger. Bucks." (mono 0.6875rem). Visible in every desktop screenshot. |
| 6 | CustomerReviewsPage rebuilt as grid | **PASS** | `CustomerReviewsPage.tsx`. 22 cards in 1/2/3-col responsive grid with `№ 01-22` Stamp accents, product-mention chips, featured-quote spans (jerry-1, andy-1, dylan-1 use lg:col-span-2). Visually rich. |
| 7 | Featured Products grid | **PASS** | `HomePage.tsx:162` `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`. Renders 4 cards uniform width on desktop, no horizontal scroll cut-off. |

**5 of 7 R12 fixes confirmed shipped.** #2 fails (counter flashes 0); #4 partial (legibility achieved, but introduces NEW deviation from ORIGINAL_TRUTH which said "NO hero text overlay").

---

## NEW Issues — Top 12 Ranked (P0 first)

### P0 — Brand-killing

1. **Counter flashes "0" before IO-driven tween** — `src/components/motion/AntlerInchesCounter.tsx:67-70`
   The R12 fix logic SSR-renders `total` then `setDisplayValue(0)` on first mount. Result: the screenshot at networkidle shows `0`, not `7,500`. The intended "no-flash" outcome doesn't happen because the moment the client takes over it forces a 0. On real load this is a brief but visible 0-flash.
   *Fix:* Don't reset to 0 unconditionally. Either (a) keep `displayValue=total` until IO fires (then snap to 0 + tween), OR (b) only reset to 0 if the section is BELOW the fold AT mount (so an above-the-fold render keeps the static `total`). Better still: animate from `total - delta` to `total` instead of from 0.

2. **`lifestyle-luke.webp` and `lifestyle-luke-2.webp` are "CUSTOMER REVIEW!" social-meme tiles** — `src/components/page/PhotoGalleryPage.tsx:53-60` (rows 10–11 of `LIFESTYLE_PHOTOS`)
   These two files are NOT lifestyle photos despite the filenames. They are dark Instagram-style review graphics with baked-in white "CUSTOMER REVIEW!" / "GB FEEDS DOIN' WORK! -LUKE ★★★★★" / 5-star burst / GB FEEDS deer-buck-with-US-flag logo. They render in the `/photo-gallery` grid. R11 P0#1 only flagged the three `blob-*` SHAs — these two slipped through because they are filed under `lifestyle/`, not `gallery/`. Same brand problem.
   *Fix:* Remove the two entries from `LIFESTYLE_PHOTOS` (lines 53-60), OR replace with real customer harvest photos. Also delete the underlying `.webp` files from `public/photos/lifestyle/`.

3. **`/photo-gallery` shows blank/stretched white tiles where images failed** — visible in `mobile_390/photo-gallery.png` and `desktop_1440/photo-gallery.png`
   Two cells in the gallery grid render as flat off-white rectangles with no image. Possibly broken aspect ratio (e.g., `lifestyle-img-3622.webp` portrait orientation jammed into a square mosaic without `object-cover`), or a 404 on a deferred image. The grayscale-to-color fade fallback is also visible as a frozen mid-state.
   *Fix:* Audit `GalleryLightbox` for missing `object-cover` on grid cells, then verify all 18 `ALL_PHOTOS` URLs resolve in `out/` (run `for f in <list>; do test -f public$f || echo MISSING $f; done`).

4. **WhyGBFeeds uses the SAME photo for two pillars** — `src/components/page/WhyGBFeedsPage.tsx:112` and `:191`
   Both Quality Products (Row 2) and Superior Customer Service (Row 4) render `/photos/lifestyle/lifestyle-img-4439.webp` (boy in orange hat with whitetail). This is glaringly unprofessional — same photo twice on the same page. Caught on both desktop and mobile screenshots.
   *Fix:* Replace the Row 4 image. Per ORIGINAL_TRUTH § 5.1, this row should be a handwritten thank-you note photo — `/photos/gallery/blob-b7a2223.webp` (the "Blake — here is your very own bag of Buck Chow!" handwritten note) is the obvious match and is already in `public/`.

5. **WhyGBFeeds Row 3 "Unmatched Value" image and alt text don't match the photo** — `src/components/page/WhyGBFeedsPage.tsx:138-139`
   The code uses `lifestyle-img-4215.webp` with alt "Close-up of golden corn feed pellets". The actual file is two hunters posing with a harvested whitetail buck + Buck Chow bag + Corn Candy jug at night. ORIGINAL_TRUTH § 5.1 says Row 3 should be a corn/feed-pellet macro shot. The CORRECT corn-pellet photo IS `lifestyle-img-3622.webp` (a spinner-feeder full of corn — verified in this audit). The two filenames were swapped somewhere in the inheritance.
   *Fix:* Swap to `lifestyle-img-3622.webp` for Row 3, update alt text accordingly, and re-purpose `4215.webp` (the buck + bag + jug photo) as a hero candidate elsewhere — it's actually the BEST product-in-the-field shot in the entire library.

### P1 — Visual hierarchy + composition

6. **Hero adds a text overlay that ORIGINAL_TRUTH explicitly forbids** — `src/components/page/HomePage.tsx:113-137`
   The R12 commit added "GB FEEDS / GROW. BIGGER. BUCKS." H1 + tagline overlay on top of the hero photo. ORIGINAL_TRUTH § 2.1 item 1 reads: "NO text overlay, NO headline, NO CTA button. The image is the entire hero." The original is image-only. This is a designer-driven embellishment that violates the canonical source. (Aesthetic improvement, but a deviation that should at minimum be flagged in a CHANGELOG.)
   *Fix:* Either (a) accept the deviation and document in `.context/CHANGELOG.md` as an intentional brand uplift, or (b) remove the overlay and lean entirely on the photograph. Decision needs Tyler's call.

7. **Featured Products card titles still ellipsis-truncate on lg/xl viewports** — `src/components/composite/ProductCard.tsx:91-99` (R11 P1#7 NOT fixed in R12)
   Desktop screenshot of `/products` shows: "BUCK CHOW HIGH PROTEI…", "TACTACAM REVEAL…", "TWS 2,000LB GRAVITY…", "LITHIUM RECHARGEA…". On a $50K-tier site, ellipsis on a product catalog reads as broken.
   *Fix:* Reduce display name length in `data/products.ts` (e.g., `displayName` field separate from `name`) OR allow `line-clamp: 3` and reduce font-size by ~10%. R11 fix wasn't shipped.

8. **Hero overlay text occludes the bag in the photo** — `desktop_1440/home_post-counter.png`
   The added "GB FEEDS" wordmark sits exactly on top of where the actor is holding the bag. The photographic hero point of interest is hidden behind type. Text is legible but image storytelling is killed.
   *Fix:* If keeping the overlay, reposition it lower (justify-end with bottom padding) so the bag/feeder remain visible in the upper 60% of the frame and text occupies the bottom 30%.

9. **WhyGBFeeds Proven Results collage still includes a "REAL HUNTERS…" text-overlay tile** — `src/components/page/WhyGBFeedsPage.tsx:50-54` collage uses `blob-478b3b7.webp` and `blob-8085ecb.webp`. While these are not the three previously-flagged review-meme files, one of them in the rendered output shows a baked-in "REAL HUNTERS" headline overlay (visible in mobile_390/why-gb-feeds.png upper-right tile).
   *Fix:* Audit each `blob-*.webp` visually for baked-in marketing text. Replace any that show overlay text with clean harvest photos.

10. **Counter "AS OF" stamp + small kicker text disappear pre-animation** — `desktop_1440/home_pre-counter.png`
    Because the counter renders `0` and the layout hugs the number, the entire CUSTOMER REVIEWS section appears collapsed. It reads as a broken layout, not a pending animation.
    *Fix:* Combined with #1 above. Render the static `total` number until IO fires, then transition.

### P1 — Small but visible

11. **NavBar tagline "Grow. Bigger. Bucks." crowds layout at desktop 1024–1280px breakpoints** — `src/components/composite/NavBar.tsx:104-108`
    At lg:flex (1024px+), the wordmark stack + 6 nav links share a row with `justify-between`. At 1024px, the gap collapses and the rightmost link "Gallery" sits ~16px from the wordmark. Visible in tablet-sized intermediate breakpoints between lg and xl.
    *Fix:* Hide the mono tagline on `lg:` only, show it on `xl:` only — `<span class="hidden xl:block …">Grow. Bigger. Bucks.</span>`.

12. **Social icons still all `href="#"`** — `src/components/page/HomePage.tsx:347, 358, 380, 391` (R11 P1#9 NOT fixed)
    Facebook, Instagram, TikTok, YouTube anchors all point to `#`. Clicking scroll-jumps to top of page. Real URLs exist (facebook.com/GBFeedsLLC, instagram.com/gb_feeds).
    *Fix:* Either fill real URLs or hide the section.

---

## $50K-Tier Blockers (top 5)

1. **Counter "0" flash on initial paint** — the very first signal a user gets above-the-fold-after-scroll is a giant red `0` that THEN tweens up. This is the polar opposite of the intended "engaging count-up" feel. Fix the SSR/hydration handoff so the static value persists until IO fires.

2. **Hero photo overlay copy violates ORIGINAL_TRUTH yet adds nothing photographic.** A premium agency would either (a) commission a clean buck-in-hand portrait that needs no text, OR (b) lean fully into a quiet image-only hero. The current "let's add text on top of the lifestyle photo" is the worst of both — image is partially occluded, text fights the bag art behind it. Decision time: clean photography hero OR fully designed type-led hero on a clean black band.

3. **Same harvest photo used twice on /why-gb-feeds, plus mismatched alt text on the corn-pellet row.** This kind of asset-hygiene miss is the difference between agency-tier and self-built. Each pillar needs a unique, intentional photo with accurate alt text.

4. **PhotoGallery still polluted with "CUSTOMER REVIEW!" social-meme tiles** (`lifestyle-luke.webp`, `lifestyle-luke-2.webp`). R11 caught the `blob-*` SHAs; R12 missed the same problem hiding under `lifestyle/` filenames. The brand audit needs to be: "look at every image rendered on every page, not just the SHA-named ones."

5. **No microinteraction layer beyond the antler counter.** GSAP is registered but not used. Story rows don't reveal on scroll, hero h1 doesn't kern in, Featured Products don't stagger, Kansas SVG doesn't parallax. R11 flagged this — still unfixed in R12. Agency-tier sites have 6–10 micro-moments; we have 1, and that 1 is broken (the "0" flash).

---

## Honest Completeness vs. "Real $50K Agency Build"

**76%** (was 74% at R11)

Net change: **+2 points**.

Gains since R11:
- CustomerReviews page rebuilt with cards/stamps (+4)
- NavBar wordmark added (+1)
- 3 review-meme blob references stripped from JSX (+1)
- Featured Products grid replaces clipped carousel (+2)

Losses from new regressions / unfixed items:
- Counter no-flash fix actually CAUSES the flash on first paint (-2)
- Two more `lifestyle-luke*.webp` "CUSTOMER REVIEW!" tiles surfaced (-1)
- WhyGBFeeds duplicate photo + mismatched alt text (-1)
- Hero overlay deviates from ORIGINAL_TRUTH without being photographic enough to justify it (-1)
- Photo gallery shows broken/stretched cells (-0.5)

What's still missing for the last 24 points (in rough order of impact):
- Real photography for hero + key moments (7 pts)
- Removal of ALL CUSTOMER REVIEW! tiles wherever they live (3 pts)
- Microinteraction layer (4 pts)
- Counter SSR/hydration fix (2 pts)
- Asset hygiene pass: unique photo per pillar, accurate alt text (2 pts)
- Product card title overflow fix (1 pt)
- Hero overlay decision + execution (2 pts)
- Real social URLs (1 pt)
- Photo gallery rendering cleanup (1 pt)
- ORIGINAL_TRUTH conformance audit (1 pt)

---

*End of R13 audit.*
