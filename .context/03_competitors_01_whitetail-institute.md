## 1. Whitetail Institute (Direct competitor)

**URL:** https://whitetailinstitute.com/
**Platform:** BigCommerce Stencil (theme `eb226320-0e8b-013f-d7bf-4eb4d192a410`)
**Type:** Direct competitor — the category-defining "Industry Founders" of deer food-plot nutrition (since 1988)
**Captured:** 2026-05-06

---

### 1. Hero strategy

Above the fold is a full-bleed black canvas with a single hero photograph of a mature whitetail buck and several does in a real food plot at dusk — clearly *their* product growing in *real* dirt, not stock imagery. The image is deliberately cinematic (low light, real grain, no glossy retouching) which functions as the trust signal *itself*: "this is what our seed grows."

A thin top-utility strip carries the centered circular gold-and-black logo (Whitetail Institute deer-head badge with "Since 1988" lockup), and above that the nav: PRODUCTS, FIELD TESTER SURVEY, WHITETAIL NEWS, MILITARY/FIRST RESPONDERS, BLOG, NEXT LEVEL CONSULTING. **No banner CTA, no "Shop Now" button, no countdown.** The lead message is positional rather than promotional — they are *the institute*; they don't need to sell you. Phone number `1-800-688-3030` is the closest thing to a CTA. Trust signals appear as four icon-with-label value props further down: Industry Founders, Research & Development, Scientific Testing, Exceptional Customer Service. The "Field Tester Survey" tab in the nav is itself a flex — they have an army of citizen-scientist customers feeding back data.

**Motion above the fold:** none in the hero photo itself. A Splide-driven carousel ("homesplideouter") sits below it for product/feature rotation. No parallax, no autoplay video, no scroll-triggered reveals on the hero.

### 2. Typography system

- **Display font:** `din-condensed` (Adobe Typekit kit `eqz5vbi`) — heavyweight, all-caps, narrow industrial sans. Used for every section header, product title, button label, and nav item. This is the brand's signature voice — military/utility/industrial.
- **Secondary display:** `Montserrat` 700 / 500 / 400 (Google Fonts) — used for sub-headlines and long-form headings where condensed would feel too aggressive.
- **Body:** `Karla` 400 (Google Fonts) — humanist sans, slightly warmer than Montserrat, used for paragraph copy, form labels, and product descriptions.
- **Type scale (observed):** Hero/page H1 ~64–80px DIN Condensed all-caps; section H2 ~32–40px DIN Condensed; body ~15–16px Karla; small/utility ~12–13px DIN Condensed letter-spaced for nav.
- **Signature character:** the all-caps DIN Condensed *everywhere* — including nav, breadcrumbs, and CTAs — produces a consistent "scientific bulletin / military spec sheet" tone. There are zero serifs and zero scripts on the entire site.

### 3. Color system

- **#000000** — primary background (every page is a dark mode by default)
- **#122d16** — deep forest green, used as a secondary surface tone on cards / striping (also surfaces in third-party widget config)
- **#f8a500** — signature topaz/amber gold — every accent, link, headline highlight, badge ring, and "Rewards" pill
- **#FFFFFF** — primary body text on black; high contrast (~21:1)
- **#333333** — secondary surface for cookie banner & modals
- **#5d4a2e** approx — antler-brown logo gradient inside the badge
- **#22c55e**-ish green — sparingly used in product-tag highlights

The palette is essentially a two-tone system: **black + topaz gold**, with green and antler-brown reserved for the logo and product-imagery tie-ins. There is **no light-mode toggle.** The whole site is dark-on-black; light surfaces only appear inside modals and form inputs (white input fields with black text). Contrast is excellent (WCAG AAA on body copy).

### 4. Motion language

- **Carousel:** Splide.js drives the home leader/product rotator below the hero. Standard fade/slide, ~600ms ease-in-out, 5s autoplay.
- **Hover:** nav items get a subtle gold underline / color shift to `#f8a500`. Buttons darken slightly on hover with no shadow elevation. **No scale, no glow, no lift.**
- **Page transitions:** none — full hard navigation between pages (BigCommerce Stencil default).
- **Scroll behaviors:** lazyload on hero/product images (`class="lazyload"`). No parallax, no scroll-triggered reveals, no sticky reveal patterns, no GSAP, no Lenis. The site is essentially **motion-conservative**, almost intentionally so — it reads as "we don't need theatrics, we have 35 years of data."
- **Signature animation:** None. The site treats motion as decoration, not as voice. **This is a vulnerability** — a competitor that respects the heritage but layers in tasteful motion can feel both more authoritative *and* more modern simultaneously.

### 5. Component vocabulary

- **Buttons:** Solid topaz `#f8a500` fills with black text in DIN Condensed all-caps; near-zero corner radius (~2–4px); no shadow, no gradient. Secondary buttons are black with topaz border. "ADD TO CART" is the standard label.
- **Cards (product tiles):** Black background, no border, no radius on the image, product title in DIN Condensed white below, price in topaz. Tiles feel like field-manual specimen plates rather than e-commerce cards.
- **Navigation:** Centered logo with horizontal text nav flanking it (a heritage layout — uncommon today). Sub-menus are accordion-style dropdowns. **Sticky:** yes, header stays pinned on scroll. **Mega-menu:** no, only single-column dropdowns under PRODUCTS.
- **Forms:** White inputs on black surface with topaz field labels in DIN Condensed all-caps. Standard browser focus rings — no custom focus styling. reCAPTCHA visible. Submit buttons match the global topaz fill.
- **Modals:** centered, black background, white text, topaz close icon. Cookie consent (Osano) is a fixed bottom strip.
- **Badges:** circular topaz "Rewards" pill bottom-right (Smile.io-style loyalty widget) — the only persistent UI ornament.
- **Distinctive vs generic:** The all-black canvas + topaz gold + condensed type is *recognizably theirs* and feels distinctive. The component shapes, however, are textbook BigCommerce Stencil — nothing custom in the geometry.

### 6. Layout grid

Standard ~1200px max-content-width centered on a full-bleed black canvas. Generous vertical rhythm — sections breathe. Symmetrical, center-aligned compositions dominate (logo center, headline center, four-icon trust row center). Product grids are 4-up desktop, 2-up mobile. **Asymmetry is essentially absent** — this site does not use editorial off-grid layouts. The result is encyclopedic, catalog-like, and a little static.

### 7. Photography / illustration style

- **Bias:** heavy on **wildlife in habitat** — bucks, does, fawns photographed in actual food plots, not in front of trophy walls. Product packaging photographed flat-on-black or composited onto a habitat backdrop.
- **Lifestyle hunters:** present but secondary — typically shown in working-farmer mode (planting, soil-testing, scouting), not posed grip-and-grin trophy shots. This is a meaningful brand choice: they sell *deer health*, not *kill shots*.
- **Product-on-white:** they do *not* use white seamless. Product bags are shot on black or in-context (in a field, on a tailgate).
- **Lighting/grade:** warm, naturalistic, golden-hour leaning; deeper shadows preserved; no HDR or over-saturated retouching. Looks shot, not rendered.

### 8. Conversion mechanics

- **Where CTAs live:** Product tiles → product detail pages with the ADD TO CART button below a Size and Coverage variant dropdown (e.g., 4 lbs / 18 lbs / 36 lbs).
- **Friction-reduction:** quantity stepper, single dropdown variant, downloadable planting-instructions PDF on every product page, prominent customer review counts (242 reviews, 5-star average on flagship Imperial Whitetail Clover at $44.98).
- **Friction-creation (intentional):** Phone number is presented before any "Buy Online" affordance on many flows. The "Next Level Consulting" upsell (paid property consulting) is positioned as a premium layer — turning a commodity transaction into a relationship.
- **Bundle vs spec:** They emphatically **spec the product** — every PDP reads like an agronomy spec sheet (protein percentages, longevity in years, seed varietals). Bundles and "build a food plot" kits exist but are not the lead.
- **Loyalty:** persistent "Rewards" topaz pill bottom-right (Smile.io).
- **Lead magnets:** Free *Whitetail News* magazine subscription, Field Tester Survey participation, planting-date calendar — all designed to build a database of recurring customers, not one-shot buyers.

### 9. The one signature move nobody else does

**They sell *credibility infrastructure*, not products.** The nav itself is the thesis: "Field Tester Survey" + "Whitetail News" magazine + "Next Level Consulting" + "Military/First Responders" program + "Certified Research Stations" claim. Competitors sell bags of seed; Whitetail Institute sells membership in a research community where the customer's planting data feeds back into the brand's R&D loop. The whole site is structured as *the institute as institution* — every page reinforces "we created the category, here's the proof, you participate in the science." That is a moat that a generic catalog cannot replicate by adding nicer photography.

### 10. Screenshots

All six PNGs saved to `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/competitors/whitetail-institute/`:

- `desktop_home.png` (1440×900) — black hero with deer-in-plot photo, centered gold logo
- `mobile_home.png` (390×844) — hamburger left, centered logo, search/account/cart right
- `desktop_product.png` (1440×900) — Imperial Whitetail Clover PDP, "THE NUMBER ONE FOOD PLOT PLANTING IN THE WORLD" subtitle
- `mobile_product.png` (390×844) — single-column PDP, image stacks above title and CTA
- `desktop_form.png` (1440×900) — Contact Us, two-column (form left, address/phone right), all DIN Condensed labels
- `mobile_form.png` (390×844) — single-column stacked form

---

### Top 5 transferable principles, prioritized

1. **Build the brand as an institution, not a store.** Whitetail Institute's strongest moat is positional: nav items like "Field Tester Survey," "Whitetail News," and "Next Level Consulting" reframe a commodity category (deer feed) as a research community. GB Feeds should design at least one nav-level "institutional" surface — a research log, a field journal, a customer-data feedback program — that converts the shopper into a participant.
2. **Commit to a two-tone signature palette and use it everywhere.** Black + topaz `#f8a500` is instantly recognizable and survives every photograph, every product bag, every PDF. A single high-saturation accent against a near-monochromatic ground is more memorable than a five-color brand system. Pick one and weaponize it.
3. **Use a single condensed industrial display face for *everything*.** DIN Condensed in all-caps across nav, headers, buttons, and product titles produces a consistent "spec-sheet authority" voice on every page without any other typographic effort. One face, used relentlessly, beats four well-chosen faces used cautiously.
4. **Photograph the product *in the dirt*, not on white.** Whitetail Institute's wildlife-in-habitat photography is the trust signal. Avoid product-on-white seamless for the hero and category surfaces — show the seed growing, the deer eating it, the farmer planting it. Your photography library *is* your proof.
5. **The motion gap is the opportunity.** Whitetail Institute is motion-conservative to a fault — no scroll-triggered reveals, no signature animation, no transition language. A direct competitor that preserves the heritage feel but layers in tasteful, reduced-motion-respectful animation (slow parallax on hero photography, scroll-pinned product reveals, GSAP-driven section transitions) will read as both *more authoritative* and *more current* simultaneously, without sacrificing trust.
