# GB Feeds Rebuild — Visual Audit
**Date:** 2026-05-06
**Server:** http://localhost:4173/ (Vite preview of `out/` static export — confirmed 200)
**Playwright version:** 1.51.1 / Chromium headless
**Screenshots captured:** 31 total
- Desktop 1440×900: 14 routes
- Tablet 768×1024: 3 routes (`/`, `/products/`, `/products/buck-chow-40lb/`)
- Mobile 390×844: 14 routes

---

## Route-by-Route Visual Audit

### `/` — Home (all viewports)

**Header / NavBar (desktop 1440)**
- Logo: rendered at **h-10 = 40px** tall. At 1440px this is unambiguously tiny for a heritage brand mark. The logo SVG is square (320×320 viewBox) with a wordmark beneath it; at 40px rendered height the antler/wordmark detail is barely legible. A heritage brand logo should sit at **56–64px** minimum. Code: `NavBar.tsx:128` `className="h-10 w-auto"`.
- Nav links: Bebas Neue, clamp(1.05rem → 1.25rem). Appropriate weight and size.
- Eyebrow stripe: **NOT mounted anywhere**. `EyebrowStripe.tsx` is defined but never imported in `NavBar.tsx` or `layout.tsx`. The black "FREE SHIPPING" / phone number strip that every heritage brand carries above-fold is completely absent. This is a P0 omission.
- Cart icon: links to `/products`. This is intentional per comments ("visual parity — no cart functionality yet"). The aria-label says "Shop products" which is honest. It is a shopping bag icon (not a cart). Functionally acceptable as a placeholder but needs a note in the UI — or the icon should be swapped for a Shop/bag-style icon with tooltip. Does NOT currently link anywhere unexpected. Tyler's framing "the cart icon goes to /products" is accurate; whether that's "pathetic" depends on whether a real cart is expected.

**Hero (desktop 1440)**
- Full-viewport-height hero. H1 "BUILD BIGGER KANSAS DEER" in Bebas Neue at `clamp(4.5rem, 15vw, 12rem)` = ~216px at 1440px — enormous, fills the top. Visually dominant. Centered. Text center-aligned.
- Three product/lifestyle image row below: lifestyle photo (object-cover, good), Buck Chow bag (object-contain + p-6, bag appears small floating in a pale box), Corn Candy bag (same). The product bags look lost inside oversized padding boxes.
- Proof-point strip ("7,500+ inches / Kansas-made / 20% protein / Direct to hunter") renders correctly as a 4-column mono grid. Appropriate.
- Hero section does adapt to viewport width (clamp-based sizing). ✓
- Vertical breathing: the hero has `min-h-[calc(100svh-5rem)]` and `py-10 md:py-16` — breathing is adequate at desktop.

**Hero (mobile 390)**
- H1 drops to ~72px (clamp floor). Text still centered. Appropriate.
- Three product images stack vertically. Each is 22rem tall. This means the hero alone is ~800px of stacked images on mobile — excessive vertical length.
- The hero + image trio forces extreme scroll before reaching any product content.

**Hero (tablet 768)**
- Images shift to 3-column grid (md:grid-cols-3). Good.
- H1 ~108px at 768px. Strong presence.

**Featured Products section**
- `py-14 md:py-20`. Three `ProductCard` components in a 1→3 col grid.
- Product cards: `bg-[var(--color-paper-3)]` = `#F8F4EB` (very light cream), `aspect-[4/5]` image area, image uses `object-contain p-5 sm:p-6`. **This creates a visible pale-cream padding border around every product image.** The bags float in white-ish space. No `object-cover` cropping. This is the "white borders" Tyler called out. Code: `ProductCard.tsx:59`.
- The heading "Start with Buck Chow." is left-weighted inside the centered max-w-3xl block — the period feels incongruous for Bebas Neue. Minor.

**Four-Pillar Section ("THE GB FEEDS DIFFERENCE")**
- `Section bg="paper-2"` = `#F2EEE2`. Not gray — warm cream. Acceptable within token system.
- 2×2 grid with large mono numerals and Bebas Neue pillar headings.
- `gap-px bg-[var(--color-rule)]` creates hairline dividers between cells. Clean.
- Spacing after pillars before Signature section: Section uses `py-16 md:py-24`. Then the Signature section has `minHeight: 58svh`. **Combined vertical rhythm between Pillar CTA and next section is approximately 6rem (py-24) + 0 top padding on Signature = abrupt transition.** This contributes to "vertical cramming" feeling — sections butt against each other because alternating light tones without strong visual separation make them feel continuous.

**Signature Move / Antler Counter**
- GSAP pin section. At static screenshot time (no JS executed beyond React hydration): counter renders "7,500" with a Kansas county map below. The `minHeight: 58svh` is respected. Appears functional.
- Background is `--color-paper` (base cream), not gray. ✓

**Founder Quote Section**
- Clean editorial layout. DM Serif Display italic quote. Greg signature SVG. Stamp column.
- At desktop: two-column `flex-row`. At mobile: stacks correctly. ✓

**FAQ Section**
- `Section bg="paper-3"`. Four FAQs. Clean accordion layout. ✓

**Journal Cards**
- Three cards with `aspect-video` cover images. All three journal entries use the SAME cover image (`lifestyle-img-3622-640w.webp`). The journal is not visually differentiated between entries. This looks like a content placeholder failure.
- All three journal entries have `draft: true` in `journal-index.ts`. They should not ship with draft flag active.

**Newsletter**
- Clean two-column layout at desktop. ✓

**Horizontal centering overall:** Container uses `mx-auto w-full px-[clamp(1rem,5vw,3rem)]` with `max-w-[72rem]` (default) or `max-w-[88rem]` (wide). Content IS centered with `mx-auto`. The complaint about "nothing horizontally center spaced" likely refers to the hero image treatment (left-aligned lifestyle photo) and product bags not filling their tiles rather than a structural centering failure.

**Section spacing overall:** All `Section` components use `py-16 md:py-24`. This is 4rem / 6rem. This is NOT cramped by spec; the issue is that alternating warm cream tones (`paper` / `paper-2` / `paper-3`) with no strong divider or whitespace rhythm makes them visually merge. The sections don't "breathe" because the tonal differences are too subtle.

---

### `/products/` — Products Index (all viewports)

**Hero:** Centered. Two product image figures at top (Buck Chow + Corn Candy, `object-contain p-6`). Same "pale border" issue as cards. ✓ Structure is correct.

**Product grid (desktop 1440):** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` → renders as 4-column at 1440. Cards have `aspect-[4/5]` with `object-contain p-5 sm:p-6`. **Product images do NOT use object-cover. Every card shows the product bag/item floating on a pale cream background with visible padding gutters on all four sides. This is the primary visual problem Tyler called out.** The padding is intentional (design choice: show full bag), but at small card widths it makes products look undersized and unprofessional. Heritage brands use tight `object-contain` with minimal padding (p-2 max) or `object-cover` cropped to the most dramatic part of the image.

**Product images that look cropped/wrong:** Trail camera and feeder products are square or landscape images squeezed into `aspect-[4/5]` portrait containers with `object-contain`. The cameras appear at ~30% of card area, surrounded by cream padding. This is egregious on the trail cam cards.

**Product grid (mobile 390):** Single column. Each card is full-width. The `aspect-[4/5]` is very tall on mobile — 390×(390*1.25) = 390×487px per image area. Products look okay but very large, and the scroll is immense (16 cards × ~600px each = ~9600px of card scroll). No lazy load fallback visible.

**Product grid (tablet 768):** 2-column (`sm:grid-cols-2`). Better proportioned.

**Filter chips:** Render correctly (DEER FEED / FEEDERS / TACTACAM / APPAREL). ✓

---

### `/products/buck-chow-40lb/` — Product Detail Page

**Desktop 1440:**
- Hero: "BUCK CHOW HIGH PROTEIN FEED — 40LB" in Bebas Neue display-lg. Strong. Left-aligned. Full viewport height top section.
- Lifestyle photo is cropped with `object-cover` — looks great.
- BUY button: renders as phone fallback `tel:+16206393337` link ("CALL ORDER FIRST NUMBER"), confirming Stripe payment links are all placeholders (`about:blank#TODO-`). This means **zero products can be purchased** from the rebuilt site. The "Add to Cart" / "Buy" flow does not function on ANY product.
- Cross-sell section ("BUILD A FEED PROGRAM WITH THIS"): ProductCards in 3-column with same image-padding issue.
- Bag tag triptych: rendered as black strip showing protein/fat/fiber stats. ✓
- Reviews section at bottom: hardcoded testimonials. ✓

**Mobile 390:**
- Header / breadcrumb: tight but functional.
- H1 takes significant vertical space (4 lines of large Bebas Neue). Appropriate given product nature.
- Cross-sell cards: single column, very tall. See padding issue above.

---

### `/our-story/`

**Desktop 1440:**
- H1 "OUR STORY" full-bleed. Lifestyle/grain photo present.
- Body text in DM Serif Display. Readable.
- Pillar list ("PROVEN RESULTS / QUALITY PRODUCTS / UNMATCHED VALUE / SUPERIOR CUSTOMER SERVICE") renders with appropriate Bebas Neue scale.
- Greg signature SVG present. ✓
- Page feels thin — mostly one column of text. Appropriate for story page.

**Mobile 390:**
- Stacks cleanly. No horizontal overflow. ✓

---

### `/why-gb-feeds/`

**Desktop 1440:**
- Four-pillar expansion with body copy per pillar. Each pillar has a monospace stamp column (dates, property names) on the left.
- "READY TO PUT IT TO WORK?" CTA section at bottom: `bg-[var(--color-paper-2)]` — warm cream. NOT gray. ✓
- Page is substantive. Original site had this content. ✓

---

### `/customer-reviews/`

**Desktop 1440:**
- Multi-column masonry-style testimonial grid. Quotes are short and product-attributed (BUCK CHOW / CORN CANDY stamps). ✓
- "RATED" header strip is present and dark. ✓
- No images of reviewers — appropriate.
- Page matches the original site's reviews section in spirit. ✓

---

### `/photo-gallery/`

**Desktop 1440:**
- Masonry photo grid. Lifestyle hunt photos + social proof screenshots. Some "CUSTOMER REVIEW" overlay screenshots present.
- Images appear correctly sized and cropped. ✓
- `GalleryLightbox` component present (client island). ✓

---

### `/contact/`

**Desktop 1440:**
- Clean split: form left / phone right. (620) 639-3337 prominently displayed.
- Form fields: Name / Email / Message. ✓
- "MANHATTAN, KS" attribution. ✓
- Contact form uses Cloudflare Worker + Resend (per integration docs). May not function without env vars.

---

### `/faq/`

**Desktop 1440:**
- 4 FAQ items in accordion. Very sparse page — only 4 questions visible.
- CTA to call: phone number displayed large. ✓
- `faqs` data is `slice(0, 4)` on home. FAQ page likely shows all. Let me note: page is thin but functional.

---

### `/field-club/` — INVENTED ROUTE

**Verdict: Not on the original gbfeeds.com. Entirely agent-invented.**
- Original gbfeeds.com routes (confirmed from inherited assets + live sitemap) are: Home, Products (individual SKU pages), About/Our Story, Reviews, Contact. No field club membership exists on the live site.
- This page invents a "member-only Kansas blend seasonal shipment" program with a waitlist form. The program may be aspirational (Greg may want to build this), but the route does not reflect any live product or service.
- Hero: dark (--color-ink bg). "THE FIELD CLUB" with black-background stripe.
- "WHAT MEMBERS GET" section: 4 benefit cards on paper bg. Looks clean but the content is fabricated.
- "SEASONAL CADENCE" section: Spring / Pre-Season / Peak Season / Winter shipment grid. Invented.
- Waitlist form: present, points to `about:blank#TODO-stripe-field-club`. Non-functional.
- **P0-blocker to ship: remove or clearly gate behind `NEXT_PUBLIC_FEATURE_FIELD_CLUB=true` env flag (code supports this) and ensure it defaults to OFF in production.**

---

### `/feed-program/` — INVENTED ROUTE

**Verdict: Not on the original gbfeeds.com. Entirely agent-invented.**
- A "personalized feed program wizard" — multi-step form asking region, season, and goal.
- Step 1 visible in screenshot: "WHERE DO YOU HUNT? — KANSAS / MIDWEST / PLAINS / SOUTH."
- This is a product-recommendation engine that does not exist on the live site.
- Clean UI but fundamentally invented functionality.
- The NavBar has "Build Program →" as a persistent CTA linking here. This means every page of the rebuild promotes an invented feature.
- **Must be gated or removed before launch.**

---

### `/journal/` — INVENTED ROUTE

**Verdict: Not on the original gbfeeds.com. Agent-invented editorial section.**
- Original site has no blog or field journal.
- Three articles listed, all with `draft: true` in data. All three use identical cover images.
- The slug `stand-7b-riley` is listed as "agent-authored first-person narrative — pending Greg's review."
- All three articles are explicitly draft content that should not ship.
- **Must be noindexed (code sets `robots: { index: false }` when all drafts — ✓) and ideally hidden entirely pre-launch.**

---

### `/journal/stand-7b-riley/` — DRAFT ARTICLE

**Desktop 1440:**
- Full article text present. Authored in Greg's first-person voice. Has NOT been approved by Greg.
- Circular hero image (lifestyle photo, dark ring). Header + article body in clean editorial layout.
- Page renders well visually. Content authenticity is the problem, not the UI.

---

### `/season/rut/` — INVENTED ROUTE

**Verdict: Not on the original gbfeeds.com.**
- Season-specific landing pages (pre-rut / rut / post-rut / antler-growth) are agent-invented.
- Hero: dark background strip with rut description. "NUTRITIONAL PRIORITY" section with body copy.
- Product cards below (2 products shown: Reveal X 2.0, Reveal X-Pro). Feeder cameras for rut? Questionable product curation for a "rut" season page that should feature attractants.
- Bottom strip: tabs for PRE-RUT / RUT / POST-RUT / ANTLER GROWTH navigation.
- "BUILD YOUR FEED PROGRAM" accent button present.
- Season pages could be valuable SEO content but are invented and do not reflect the original site.

---

## Tyler's Specific Callouts — Verified

| Issue | Finding |
|---|---|
| "Logo is itty-bitty, midget-sized" | **CONFIRMED.** Logo renders at **40px tall** (`h-10` = 2.5rem). At 1440px desktop this is genuinely small. Heritage brand standard is 56–72px. Fix: change `h-10` to `h-14` (56px) or `h-16` (64px) in `NavBar.tsx:128`. |
| "Vertical cramming on home" | **CONFIRMED, nuanced.** Section `py-24` = 6rem is not cramped by spec, but alternating cream tones with no hard rule between them make sections feel merged. The gap between the four-pillar CTA button and the next Signature section is `pb-24` (6rem below pillar) → `minHeight: 58svh` Signature block. Tonal contrast is the real fix needed. |
| "Nothing horizontally center spaced" | **PARTIAL.** Structure IS centered via `mx-auto`. The complaint is likely about product images floating inside padding boxes and lifestyle photo not filling its tile, making content look adrift. Not a centering bug — a fill/object-fit bug. |
| "Product card images are cropped wrong / have white borders" | **CONFIRMED.** `ProductCard.tsx:59`: `object-contain p-5 sm:p-6`. All product images float on pale cream (#F8F4EB) background with 20–24px padding on all sides. Bags appear at ~60% of card area. Trail camera and feeder images appear at ~30%. Fix: reduce padding to `p-2` or `p-3`, or switch lifestyle/context products to `object-cover`. |
| "Cart icon goes to /products" | **CONFIRMED, intentional.** `NavBar.tsx:167` `href="/products"`. No real cart exists. Comment acknowledges this. Icon is a shopping bag SVG, aria-label "Shop products". Not broken — no cart to link to. |
| "Get rid of the gray sections" | **PARTIALLY CONFIRMED.** There are NO `bg-gray-*` or system gray classes anywhere. All backgrounds are warm paper tokens (`paper`/`paper-2`/`paper-3`). The sections Tyler perceives as "gray" are actually `paper-2` (#F2EEE2) and `paper-3` (#F8F4EB). The issue is that the tonal differences between the three paper tones are subtle enough to read as "bland gray" on a screen. Not technically gray, but needs stronger contrast or a different approach. |
| "/field-club, /feed-program, /journal — pathetic" | **CONFIRMED. All three are agent-invented.** None exist on original gbfeeds.com. All have placeholder/draft content. All appear in the primary navigation. See per-route notes above. |
| "Pages with placeholder copy / draft banners" | **CONFIRMED.** All 3 journal articles are `draft: true`. All Stripe payment links are `about:blank#TODO-`. The feed-program wizard produces no real prescription. The field-club waitlist links to `about:blank`. |

---

## Gray Sections Inventory

Every background in the rebuild uses design tokens from `tokens.css`. There are NO system grays. However, the following sections APPEAR gray-ish due to subtle warm cream tones:

| Section | Token | Hex equiv | Location |
|---|---|---|---|
| Featured Products | `paper-3` | #F8F4EB | Home, Section bg |
| Four Pillars | `paper-2` | #F2EEE2 | Home, Section bg |
| FAQ (home) | `paper-3` | #F8F4EB | Home, Section bg |
| Journal cards | `paper-2` | #F2EEE2 | Home, Section bg |
| Products hero | `paper-2` | #F2EEE2 | /products |
| Field Club — WHAT MEMBERS GET | `paper` | #EDE7D9 | /field-club |
| Field Club — SEASONAL CADENCE | `paper-2` | #F2EEE2 | /field-club |
| Why GB Feeds CTA | `paper-2` | #F2EEE2 | /why-gb-feeds |

None are technically gray. The design has three nearly-identical cream tones with ~15 OKLCH lightness steps between them. On certain display profiles this reads as "warm gray soup."

---

## Invented vs. Original Routes

| Route | Status | Verdict |
|---|---|---|
| `/` | On original site | ✓ Real |
| `/products/` | On original site | ✓ Real |
| `/products/[slug]/` | On original site (16 SKUs confirmed vs inherited assets) | ✓ Real |
| `/our-story/` | On original site ("About" / "Our Story" content exists) | ✓ Real |
| `/why-gb-feeds/` | On original site (pillar content exists) | ✓ Real |
| `/customer-reviews/` | On original site (reviews page exists) | ✓ Real |
| `/photo-gallery/` | On original site (photos section exists) | ✓ Real |
| `/contact/` | On original site | ✓ Real |
| `/faq/` | On original site | ✓ Real |
| `/field-club/` | **NOT on original site** | ✗ INVENTED |
| `/feed-program/` | **NOT on original site** | ✗ INVENTED |
| `/journal/` | **NOT on original site** | ✗ INVENTED |
| `/journal/[slug]/` | **NOT on original site** | ✗ INVENTED |
| `/season/[phase]/` | **NOT on original site** | ✗ INVENTED |
| `/privacy/`, `/terms/` | Likely on original (boilerplate) | ✓ Acceptable |

**5 invented route groups** (field-club, feed-program, journal, journal/[slug], season/[phase]) promoted in primary navigation — visitors will immediately see these as aspirational/fake.

---

## Top 20 Issues Ranked

### P0 — Blockers (must fix before any stakeholder demo)

**P0-1. All Stripe payment links are placeholders — zero products can be purchased.**
- Every `paymentLinkUrl` in `products.live.json` is `about:blank#TODO-create-stripe-link-<sku>`.
- Buy button on all PDPs falls back to a phone call CTA. This is a non-functional e-commerce site.
- File: `src/data/products.live.json` (all 16 entries), `src/data/payment-links.ts`.

**P0-2. Three invented routes in primary navigation — Field Club, Feed Program, Journal.**
- `nav.ts:15-19`: primary nav includes Feed Program, Field Club, Journal.
- All three link to pages with placeholder or draft content.
- File: `src/data/nav.ts:14-19`, pages at `(membership)/field-club/`, `(shop)/feed-program/`, `(editorial)/journal/`.

**P0-3. All journal articles are `draft: true` and agent-authored without Greg's approval.**
- `src/data/journal-index.ts`: all 3 entries have `draft: true` + comment "pending Greg's review."
- Articles are written in Greg's first-person voice. Publishing without approval is a serious problem.
- File: `src/data/journal-index.ts`.

**P0-4. EyebrowStripe component is defined but never mounted — no shipping bar or phone number above-fold.**
- `EyebrowStripe.tsx` is fully implemented but not imported in `NavBar.tsx` or `layout.tsx`.
- Customers see no "Free Shipping over $99" announcement and no phone number above the fold.
- File: `src/components/composite/NavBar.tsx` — add `<EyebrowStripe />` above the main header row.

### P1 — Must Fix (blocks visual approval)

**P1-5. Logo too small — 40px rendered height at desktop.**
- `NavBar.tsx:128`: `className="h-10 w-auto"` = 40px.
- Should be `h-14` (56px) minimum. Heritage brand, complex antler mark — needs presence.
- The logo SVG is also square (320×320 viewBox) not a horizontal wordmark format; at 40px the detail is illegible.

**P1-6. Product card images have excessive padding, bags look tiny.**
- `ProductCard.tsx:59`: `object-contain p-5 sm:p-6` = 20–24px padding all around.
- Fix: reduce to `p-2` or `p-3` (8–12px). Cards feel like products floating in cream boxes.
- Affects all 16 product cards sitewide.

**P1-7. Hero product images (home) use `object-contain p-6` — bags appear undersized.**
- `HomePage.tsx:150,162`: second and third hero figures use `object-contain p-6`.
- Lifestyle photo (first figure) correctly uses `object-cover`. Product bags should either match with tighter padding or use a different layout.

**P1-8. Section tonal differentiation is too subtle — warm cream soup.**
- paper / paper-2 / paper-3 differ by only ~15 OKLCH lightness steps.
- Sections merge visually, creating "vertical cramming" feeling.
- Fix: add `border-t border-[var(--color-rule)]` between every section, or increase tonal contrast between paper tokens in `tokens.css`.

**P1-9. All three journal card entries use identical cover image.**
- `journal-index.ts`: all three entries `coverImage: '/photos/lifestyle/lifestyle-img-3622-640w.webp'`.
- Journal index page shows three identical thumbnails. Looks broken.

**P1-10. Trail camera and feeder product images are visually broken inside portrait aspect-ratio cards.**
- `ProductCard.tsx:49`: `aspect-[4/5]` portrait container.
- Square and landscape images (cameras, feeders, SD cards) rendered `object-contain` in portrait aspect ratio = tiny subject, enormous cream padding.
- Fix: either `aspect-square` for non-feed products, or use a consistent `object-cover` crop with a landmark focal point.

**P1-11. Hero three-image row on mobile creates excessive scroll (22rem × 3 stacked = 66rem).**
- `HomePage.tsx:129-173`: three figures stacked in `grid-cols-1` on mobile.
- 66rem = ~1056px of hero images alone before first content section on 390px mobile.
- Fix: hide two of the three images on mobile, or reduce to `h-48` (12rem) on small screens.

**P1-12. NavBar persistent "Build Program →" CTA links to invented `/feed-program` route.**
- `NavBar.tsx:153-163`: `href="/feed-program"`.
- This CTA appears on every page. Until feed-program is real, this button should either be removed or link to `/products`.

**P1-13. No section dividers / hard rules between alternating sections on home.**
- No `<Rule>` or `border-b` is applied between consecutive `<Section>` components on home.
- Results in visual merge of content blocks, particularly between Featured Products → Pillars → Signature.

### P2 — Polish (fix before launch)

**P2-14. Logo SVG is portrait-oriented (320×320 square) — no horizontal wordmark format.**
- The inherited logo at `_inherited_assets/from_live/branding/logo-IMG_9340-1024.png` should be reviewed.
- The SVG has a stacked mark (antler above letters). A horizontal lockup would work better in the NavBar.

**P2-15. "BUCK CHOW" stamp overlaps product image in hero (z-index conflict).**
- `HomePage.tsx:153-155`: `Stamp` in `figcaption` positioned `absolute left-3 top-3` over the image.
- At small widths the stamp is partly off-frame. Minor.

**P2-16. Product card H3 size is `clamp(1.75rem, 1.45rem+1vw, 2.4rem)` — very large for a card body.**
- `ProductCard.tsx:88`: custom size override on top of display-sm.
- At mobile, product name runs to 2–3 lines in very large Bebas Neue, pushing the price and CTA down.

**P2-17. Footer newsletter section duplicated.**
- Home page has a newsletter section (`Section 7`). Footer also has a newsletter email input.
- Two subscribe inputs on same page. Minor redundancy.

**P2-18. `/faq/` page is very thin — only 4 questions shown.**
- `faqs.slice(0, 4)` on home is correct. The dedicated `/faq` page should show all questions.
- Verify `src/components/page/` — check if FAQ page renders full `faqs` array.

**P2-19. `/season/rut/` recommended products (Reveal X 2.0, Reveal X-Pro) are trail cameras, not nutritional attractants.**
- Rut product recommendations should feature Corn Candy or Buck Chow attractants as primary, cameras as secondary.
- File: `src/data/season-skus.ts`.

**P2-20. Animated EyebrowStripe CSS uses `opacity: 0` on initial load — both slides invisible until animation runs.**
- `EyebrowStripe.tsx:59`: both `eyebrow-slide` elements start at `opacity: 0`.
- On first render there will be a flash of empty black bar before first slide fades in (8% keyframe).
- Fix: set `eyebrow-slide--1` initial opacity to 1 with `animation-fill-mode: forwards` or use `animation-delay: 0s` on slide 1 with the keyframe starting at `opacity: 1`.

---

## Summary

**Screenshots captured:** 31 (14 desktop 1440 + 3 tablet 768 + 14 mobile 390)

**Server confirmed live:** http://localhost:4173/ returning 200. This is the `out/` static export — the latest build.

**5 most catastrophic issues Tyler is staring at:**
1. **No purchase path exists.** Every buy button is a phone-call fallback. Zero Stripe links are real.
2. **Three invented routes (field-club, feed-program, journal) are front-and-center in the primary nav.** First thing a visitor sees after the logo is links to fantasy products.
3. **Product images have cream padding borders making bags look tiny and unprofessional.** This is `object-contain p-5 sm:p-6` on every product card.
4. **The logo is 40px tall.** Barely legible at desktop. Embarrassingly small for a heritage brand.
5. **The eyebrow stripe (shipping/phone announcement bar) doesn't exist in the rendered output** despite being fully coded — nobody wired it in.

**Invented routes vs original:**
- INVENTED: `/field-club/`, `/feed-program/`, `/journal/`, `/journal/[slug]/`, `/season/[phase]/`
- ORIGINAL: `/`, `/products/`, `/products/[slug]/`, `/our-story/`, `/why-gb-feeds/`, `/customer-reviews/`, `/photo-gallery/`, `/contact/`, `/faq/`

**Is localhost serving the latest build?** Yes. The `out/` directory is the static export from the latest `npm run build`. The Vite preview at port 4173 is serving it correctly.
