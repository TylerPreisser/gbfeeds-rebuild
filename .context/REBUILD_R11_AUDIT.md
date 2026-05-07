# REBUILD R11 — Designer Audit

**Date:** 2026-05-07
**Local rebuild:** http://localhost:4173/
**Original:** https://gbfeeds.com/
**Screenshots:** `.context/screenshots/rebuild-r11/{desktop_1440,tablet_768,mobile_390}/*.png`
**Total captures:** 17 (7 desktop + 3 tablet + 7 mobile)

---

## R10 Fix Verification (8 items)

| # | Fix | Verdict | Evidence |
|---|---|---|---|
| 1 | NavBar logo = black buck silhouette PNG | **PASS** | DOM: `<img src="/brand/buck-icon.png" width="228" height="368" class="h-10 w-auto">`. Computed: 25×40px on bone-paper bg. NavBar.tsx:89-96. |
| 2 | Hero text overlay (kicker + GB FEEDS h1 + tagline) | **PASS** | H1 computed `font-size: 144px`, font-family Bebas Neue. Kicker "MANHATTAN, KS · EST. 2017 · FIELD-TESTED" present. Photo `object-position: center 70%`. HomePage.tsx:124-148. |
| 3 | Customer Reviews IS the Kansas signature | **PASS** | No standalone photo strip. Section heading "CUSTOMER REVIEWS" + kicker "From hunters across Kansas" + SignatureMoveLoader + single CTA "READ ALL CUSTOMER REVIEWS". HomePage.tsx:215-255. |
| 4 | FAQ shrunk | **PASS** | Computed: summary 20.96px (in 1rem→1.375rem clamp), answer 16.88px (in 0.9375rem→1.0625rem clamp). FAQItem.tsx:35,65. |
| 5 | Price font = single-string Bebas Neue | **PASS** | PriceTag.tsx:28-38 uses `font-display tracking-[0.01em]`, single `<span>${displayPrice}</span>` per :60-67. PDP screenshot shows "$19.99" correctly. |
| 6 | Mobile horizontal scrollbar gone | **PASS** | Computed at 1440 viewport: html `overflow-x: clip`, body `overflow-x: clip`, docW=winW=1440. reset.css:152,155. |
| 7 | Desktop NavBar h-20 (80px) | **PASS** | Computed header height 81px (h-20 + 1px border). NavBar.tsx:79. |
| 8 | First 6 product cards eager-loaded | **PASS** | DOM inspection: cards 0–5 have no `loading` attr (eager), 6–15 have `loading="lazy"`. ProductsIndex.tsx:132 `priority={i < 6}`. |

**8 of 8 R10 fixes confirmed shipped.**

---

## NEW Issues — Top 12 Ranked (P0 first)

### P0 — Brand-killing

1. **PhotoGallery still includes "CUSTOMER REVIEW!" placeholder tiles**
   `src/components/page/PhotoGalleryPage.tsx:79-104` — `GALLERY_PHOTOS` array imports `blob-93bef42.webp` and `blob-de1da36.webp` which are dark social-media review graphics with baked-in "CUSTOMER REVIEW!" headline + 5-star burst + GB Feeds logo. Looks like clip-art, not photography. Mixed with real lifestyle photos in the same grid = unprofessional.
   *Fix:* Remove the 6 `blob-*` entries from `GALLERY_PHOTOS` array OR replace with real customer harvest photos. Same blobs also leak into `KansasPhotoFade` (KansasPhotoFade.tsx:27-36) and the home `CUSTOMER_GALLERY_PHOTOS` (HomePage.tsx:38-45) and Why-GB-Feeds collage.

2. **WhyGBFeeds "Proven Results" 2x2 collage uses the same review-meme placeholders**
   `src/components/page/WhyGBFeedsPage.tsx` (collage section, ~line 60-90 region) — visible in `desktop_1440/why-gb-feeds.png`: bottom-left collage tile is the dark "CUSTOMER REVIEW! ★★★★★" graphic. Reads as an ad banner, not a hero photo.
   *Fix:* Swap collage tile sources to lifestyle/harvest photos that don't have baked-in marketing text.

3. **Two desynced testimonial timers (TestimonialFade vs KansasPhotoFade)**
   `TestimonialFade.tsx:52-58` and `KansasPhotoFade.tsx:55-63` each call `setInterval(..., 3500)` independently inside separate `useEffect` hooks in different components. They mount in different commit phases so first-frame offset is ~50–200ms. Over 2 minutes they will drift visibly — the photo of a buck in Kansas will not match the quote text below it. The hold ms is identical (3500) but the photo array (8 items) and quote array (8 items) start at index 0 with no shared store.
   *Fix:* Hoist `activeIndex` state into a parent (e.g., `SignatureMove.tsx`) and pass it as prop to both children, OR use a context with one shared interval. Single source of truth.

### P1 — Visual hierarchy + composition

4. **Hero photo crop chops the actor's head + shows feet**
   `HomePage.tsx:107` `objectPosition: 'center 70%'` pulls the frame down to where the actor's HANDS are mid-bag — head is cut, feet/ground dominate the lower band of the frame. The hero text now sits over the BUCK CHOW bag art so the kicker stamp visually competes with the bag's printed name.
   *Fix:* `objectPosition: 'center 35%'` or commission a true hero shot (model facing camera, full bag visible at hip-height, ample sky for overlay text).

5. **Hero kicker stamp legibility is borderline**
   At 1440×900, the "MANHATTAN, KS · EST. 2017 · FIELD-TESTED" kicker renders white on a complex tree-trunk + bag-art background. The 0.42-opacity gradient at the top doesn't reach down where the kicker sits (kicker is in the upper-mid band). Text barely reads.
   *Fix:* Either deepen the top gradient stop (`rgba(15,14,11,0.42)` → `0.6` extending to 22% Y) or pin the kicker to top: `clamp(2rem, 6vh, 4rem)` so it overlaps the strongest gradient zone.

6. **Featured Products carousel cuts a card mid-image with no visible "scroll right" affordance**
   `HomePage.tsx:171-186` horizontal scroll, `scrollbar-hide` removes any indicator. Desktop screenshot shows 4th product card 50% clipped at right edge — looks like a layout bug, not a "carousel".
   *Fix:* Add `overflow-x: auto` mask gradient on the right edge OR a chevron control OR a 5–10% peek with explicit `mask-image: linear-gradient(to right, black 92%, transparent)`.

7. **Product card titles truncate to ellipsis on lg viewport**
   `ProductCard.tsx:91-99` uses `line-clamp-2` + `min-h-[2.4em]` + clamped font-size. On `xl:grid-cols-3` desktop, "BUCK CHOW HIGH PROTEI..." / "CORN CANDY FLAVORED..." / "TWS 2,000LB GRAVITY..." all clip. Screenshot evidence: `desktop_1440/products.png`. Ellipsis on a $50K product page reads as broken.
   *Fix:* Drop the clamped font-size by ~10% (`text-[clamp(1.25rem,1.0rem+0.7vw,1.75rem)]`), increase `line-clamp` to 3, and shorten data display names where possible (`displayName` field in `data/products.ts`).

8. **`/products` banner heading "All Products" is partially clipped behind the slim-banner-image bottom edge**
   `ProductsIndex.tsx:55,75-86` — banner `height: clamp(180px, 28vh, 320px)` with absolutely-positioned heading + `pt-16 pb-12`. At 1440×900 (28vh = 252px) the bottom of "All Products" overlaps the banner's bottom hairline border (visible as a subtle clip in the screenshot top region).
   *Fix:* Reduce banner height to `clamp(160px, 22vh, 260px)` OR drop the heading's pt-16 → pt-6 to keep it vertically centered.

### P1 — Small but visible

9. **Social icons all `href="#"`**
   `HomePage.tsx:362-414` — Facebook/Instagram/TikTok/YouTube anchors all `href="#"`. Clicking them scroll-jumps to top of page. On a real $50K build these are real URLs even if placeholders.
   *Fix:* Either fill the real GB Feeds social URLs (FB: facebook.com/GBFeedsLLC, IG: instagram.com/gb_feeds) or remove the section until URLs are confirmed. As-is, it's actively misleading.

10. **`/customer-reviews` page is a raw italic-text dump (22 quotes, no cards/photos/spacing variance)**
    Screenshot `desktop_1440/customer-reviews.png` — 22 short italic centered paragraphs stacked top-to-bottom. No avatars, no quote marks decoration, no varying card sizes, no group dividers. Looks like a copy-paste from a legal terms page. The original gbfeeds.com renders these the same way — Tyler's "make it agency-tier" bar means we should improve on the original here.
    *Fix:* Render testimonials as alternating left/right cards with stamp accent borders, group by year, or add a 2-up grid with subtle hairline cards.

11. **NavBar buck-only icon may lose brand recognizability with no wordmark**
    NavBar.tsx:88-97 — desktop nav shows ONLY the silhouette, no "GB FEEDS" wordmark beside it. A user landing from search has zero text confirmation they're on the right brand. Original gbfeeds.com pairs the buck icon with the "GB FEEDS · GROW. BIGGER. BUCKS." wordmark.
    *Fix:* Add a `<span class="font-display tracking-[0.06em] uppercase ml-3">GB Feeds</span>` next to the buck icon on lg+ viewports, or use `logo-1024.png` cropped (the original combined mark) at h-10.

12. **Antler counter starts visibly at "0" and tweens up — looks broken on first paint above the fold**
    `AntlerInchesCounter.tsx:41` `useState<number>(reducedMotion ? total : 0)`. The counter is BELOW the fold so the IO threshold-0.3 fires only on scroll-in — that part works. But the screenshot shows two captures landed mid-animation (4,321 desktop / 0 mobile) because the IO fires once Lenis scrolls the section into view. On slower devices users will see the "0" flash before the tween starts.
    *Fix:* Defer the `<span>{formatInches(displayValue)}</span>` render until either IO has fired OR animation flag is true. Show `formatInches(total)` as static fallback (the SR `aria-label` already says the final number).

---

## $50K-Tier Blockers (top 5)

1. **The hero photo itself is a stock-feeling action shot of a hands-only person bagging product, head out of frame.** A premium agency would commission a buck-in-hand sunset hero, not crop an existing 4172.webp lifestyle shot. *Without a hero that LANDS, the whole front door reads "self-built."*

2. **CUSTOMER REVIEW! social-meme placeholders bleeding into PhotoGallery + WhyGBFeeds + KansasPhotoFade.** Six of the eight gallery rotation photos are these dark Instagram-style review tiles with baked-in 5-star bursts. They scream "social media intern" not "agency." Replace ALL `blob-*.webp` references with real customer harvest photography.

3. **CustomerReviews page is a wall of unstructured italic text.** No design intervention. Even the original site's version looks more refined. Needs cards, photos, year groupings, or a feature-quote band.

4. **No real photography commissioned for above-the-fold moments** — hero, why-gb-feeds collage, our-story rows all reuse the same handful of `lifestyle-img-*.webp` files from `_inherited_assets`. A buck-and-Greg portrait shot, a clean studio bag shot, and a sunrise field shot would unlock the next tier instantly.

5. **No microinteractions/animation polish.** GSAP is registered but only the antler counter ticks. No scroll-driven reveals on Story rows, no kerning animation on the hero h1, no parallax on the Kansas SVG, no card-stagger on Featured Products. Agency-tier sites have 6–10 micro-moments — we have 1.

---

## Honest Completeness vs. "Real $50K Agency Build"

**74%**

What's done (74 points):
- Information architecture matches original (✓)
- Type system + design tokens consistent (✓)
- All 8 R10 punch-list fixes shipped clean (✓)
- Responsive at 3 viewports without breakage (✓)
- A11y baselines (alt text, aria-labels, focus states) (✓)
- Performance (eager-loading first 6, AVIF/WebP picture sources) (✓)
- Brand voice, copy, FAQ correctness (✓)
- Static export + Cloudflare Pages plumbing (✓)

What's missing for the last 26 points (in rough order of impact):
- Real photography for hero + key moments (8 pts)
- Removal of all CUSTOMER REVIEW! social-meme placeholders (6 pts)
- CustomerReviews page redesigned with cards/photos/groupings (4 pts)
- Microinteraction layer — staggered card reveals, scroll-driven story rows, hero kerning (4 pts)
- Resolved testimonial/Kansas timer sync (2 pts)
- Real social URLs filled (1 pt)
- Wordmark next to buck-icon in NavBar (1 pt)
