## 2. Big & J (Direct competitor)

**URL**: https://bigandj.com/
**Date investigated**: 2026-05-06
**Platform**: Shopify (Theme: "Icon" by Switch Themes, schema 9.0.0, store ID 686), Slider Revolution plugin for hero, Font Awesome 4.7, Pe-icon-7-stroke. WAU app suite (Switch Themes' "Web Apps Universe") drives slideouts, quickview modals, and AJAX cart.
**Headquarters**: 918 N Shady Bend, Grand Island, NE 68801. info@bigandj.com.
**Brand promise**: "THE ORIGINAL LONG-RANGE ATTRACTANT" (announcement bar) / "DON'T JUST ATTRACT DEER. DEVELOP THEM."

---

### 1. Hero strategy
Above the fold: a thin black announcement bar ("THE ORIGINAL LONG-RANGE ATTRACTANT" in white centered caps) → black header with the iconic blue-and-yellow square logo (deer silhouette under crescent moon, BIG&J in slab) → a Slider Revolution carousel that lazy-loads on a black-tinted lifestyle still (a hand holding a Big&J bag in a hunting camp scene).

Lead message on slide 1: "PURE ATTRACTION" (small caps subhead, white) → "**BB2 10+**" (massive yellow #e7b921 display set, all-caps) → 3-line body in white describing protein content and apple flavor → solid yellow pill CTA "LEARN MORE". Composition is product-bag-on-tinted-photo with the bags color-isolated against a desaturated background, classic mid-2010s e-commerce hero.

Motion: Slider Revolution auto-advances slides with simple fade/slide-in transitions on the headline and CTA — no parallax, no video, no scroll-bound motion. The product bag image flies in from the right.

Trust signals above fold: ZERO review stars, ZERO testimonial quotes, ZERO badges. Trust is implied entirely by the "ORIGINAL" announcement bar and the established brand mark. The proof shows up only in section 4 ("See What People on Social Media are saying").

### 2. Typography system
- **Display font**: Montserrat (self-hosted woff2, weights 400/500/700 loaded). Used for everything — H1/H2/H3, body, buttons.
- **Body font**: Lato is declared in two CSS rules (likely legacy/footer or theme default) but Montserrat dominates via the `--main-family` custom property.
- **Type scale (observed in inline styles)**: 13 / 14 / 15 / 16 / 18 / 19 / 32 / 40 px. There is a hard jump from 19px body-large to 32/40px section heads — no fluid type, no clamp().
- **Hierarchy**: Headlines uppercase, letter-spacing ~1–2px, weight 700. Body sentence-case, weight 400. Section heads underlined with a thin yellow rule (e.g. "Contact" page).
- **Signature character**: NONE. Montserrat-uppercase is the most generic Shopify-default treatment in existence. The only typographic personality lives inside the brand-mark logo's slab "BIG&J," not in the system.

### 3. Color system
The functional palette is tight (5 real values), then there are 30+ social-icon brand colors leaking into the dump.

- `#000000` — primary background (88 occurrences, dominates header, footer, hero overlay)
- `#FFFFFF` — primary text on black (39 occurrences)
- `#E7B921` — signature yellow/gold (12 occurrences); used for headline accents + CTA fill. This is the brand color pulled directly from the BIG&J logo.
- `#F3C300` / `#FFCC00` / `#F4DB4A` — yellow variations for hover/accent states.
- `#2C5890` — hero blue (8 occurrences); the "BB2" callout banner blue, also pulled from the logo's sky/deer-silhouette panel.
- `#231F20` — near-black text variant.
- `#313131` — footer hover fill.
- `#E5E5E5` — light-gray dividers.

**Contrast & dark/light**: site is overwhelmingly dark theme. Black header, dark hero, dark footer. White content sections appear briefly between them. There is no light mode toggle, no semantic color tokens — colors are hardcoded.

### 4. Motion language
- **Hero**: Slider Revolution fade-in transitions, ~5s autoplay, basic translate/opacity tweens.
- **Scroll**: NO scroll-triggered reveals, NO parallax, NO sticky transformations beyond a minor sticky header.
- **Hover**: Buttons darken on hover; nav dropdown is a standard accordion. Social icons have a single CSS fill swap on hover (`fill: #313131`).
- **Page transitions**: NONE. Standard Shopify page reload.
- **Quickview**: WAU modal slide-in (CSS transform).
- **Signature animation**: NONE. The site reads as a 2018-era Shopify theme with default behaviors. This is striking given how much emotional/cinematic language a hunting brand could deploy.

### 5. Component vocabulary
- **Buttons**: Yellow pill ("LEARN MORE" hero CTA) and white text-link "Shop Now" buttons. ~46px tall, ~24px horizontal padding, all-caps, bold Montserrat. Generic Shopify Icon-theme button.
- **Cards**: Standard Shopify product cards — square image, title underneath, no price visible on hover, no badge, no quick-add. Hover reveals a "Quick View" overlay (WAU plugin).
- **Navigation**: Sticky black header. Desktop is a simple flat nav with one dropdown ("PRODUCTS") that expands to a long single-column accordion list (BB2+ Family, Legacy BB2 Family, Crave Family, Bone Collector Blend, Liquids, Attractant Sprays, Minerals, Sanctuary Seed, Blend In, Exclusives, Gear) — **no mega-menu**, no images in the menu, no category teasers. Mobile uses a left-slideout drawer with the full accordion tree.
- **Forms**: Contact page is text-only — no form! Just an email address (`info@bigandj.com`), a phone number, and a mailing address as plain copy on a dark background. This is unusual — they actively avoid lead capture.
- **Modals**: WAU AJAX cart slideout from the right; Quickview modal on PLP hover.
- **Badges**: None. No "New", no "Best Seller", no "Made in USA" badge anywhere on home or product pages.
- **Distinctive vs generic**: Almost entirely generic Shopify Icon-theme components. The only distinctive element is the recurring use of the yellow-on-black + slab-logo lockup as a section divider/pull-quote treatment.

### 6. Layout grid
Standard ~1200px max-content-width. Centered single-column composition. Sections stack: hero → product family showcase → "DON'T JUST ATTRACT DEER. DEVELOP THEM." pull-quote band → social-proof grid → newsletter footer.

Whitespace is moderate — generous top/bottom section padding (~80px) but content within sections is densely packed. **Symmetric** throughout, no broken-grid moments, no asymmetric magazine layouts. Product family sections use a 4-up grid that breaks to 2-up on tablet, 1-up on mobile.

### 7. Photography / illustration style
- **Trophy/wildlife bias**: Heavy. The hero photo is a game-camera-style image of a buck silhouette in low light. Product photography is shot on **black or earth-toned moody backgrounds with low-key lighting** — the product bags are color-isolated against tinted environments to make the yellow + blue pop.
- **Lifestyle hunters**: Limited and secondary. Most lifestyle shots are user-submitted Instagram content surfaced via a social-feed grid ("See What People on Social Media are saying"), not pro-shoot.
- **Product-on-white**: Used only on PLP/PDP for the standalone bag images; the home and family pages use the dark composite shots.
- **Color grade**: High-contrast, desaturated except for the brand yellow and blue, slight warm shadow tone. Reads "outdoor/rugged/tactical" rather than "premium/luxury."

### 8. Conversion mechanics
- **Where CTAs live**: Hero CTA "LEARN MORE" goes to a product family page (NOT add-to-cart). Sub-section CTAs are "Shop Now" links per product family. Site clearly funnels Learn → Family page → Product page → Buy.
- **Friction**: HIGH for direct purchase. There is no reviews/ratings widget anywhere — visitors cannot read user reviews on the PDP. There is no "Where to Buy" widget on PDP itself; the top nav has a "WHERE TO BUY" page (dealer locator), implying retail-first distribution and DTC as secondary.
- **Bundle vs spec**: Spec-led. PDP body copy is dense paragraph prose explaining ingredients, protein percentages, and use cases. No bundle deals visible on home. No subscribe-and-save.
- **Pricing**: $12.99 (small bag) → $20.99 (mid) → $39.99 (large) tiers visible in product JSON. No discounting language, no urgency timers, no scarcity messaging.
- **Lead capture**: Newsletter footer ("Free stuff and general goodness") is the only email-capture surface. No exit-intent modal, no popup welcome offer.

### 9. The one signature move
**The yellow-and-blue brand-mark-as-visual-anchor.** The BIG&J logo (slab-serif wordmark + deer-and-moon icon in a square, yellow type on a blue gradient sky over a black silhouette base) is treated less like a logo and more like a recurring graphic device — it appears as a section-break element, a pull-quote backdrop, and a footer anchor. The yellow-on-black + blue-accent system is enforced site-wide so every screen feels like the brand. That visual consistency is the only real signature here. Beyond that, **the site has no signature interaction or motion move** — it is intentionally (or by neglect) a no-frills, retail-conversion-funnel-style Shopify deployment. For a brand that "started it all" in deer attractants, the digital experience drastically underplays the heritage story.

### 10. Screenshots
All saved to `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/competitors/big-and-j/`:
- `desktop_home.png` (575 KB) — hero in mid-fade, dark scene with product bag + announcement bar
- `mobile_home.png` (162 KB) — BB2 10+ hero, "PURE ATTRACTION" subhead, yellow CTA
- `desktop_product.png` (642 KB) — BB2 PDP, dense paragraph copy + spec bullets, no review widget
- `mobile_product.png` (192 KB) — BB2 PDP, gallery-led, blue title bar
- `desktop_form.png` (355 KB) — Contact page, **no form**, just text on black
- `mobile_form.png` (73 KB) — Contact page mobile, plain text + footer image

---

### Top 5 transferable principles, prioritized

1. **Lock a 2-color brand mark into a 3-color system and never break it.** Big & J's discipline around #E7B921 yellow + #2C5890 blue + #000000 black is the only thing carrying brand recognition. Any small DTC attractant brand should pick a 2-color logo signature, choose 1 deep neutral, and treat that 3-color trio as inviolable across header, hero, CTA, and packaging photography. GB Feeds should do the same with its own colorway and refuse to dilute it with extra accent hues.

2. **Heritage claim in the announcement bar beats hero badges.** "THE ORIGINAL LONG-RANGE ATTRACTANT" living in the always-visible top bar does the trust work that a row of cluttered badges normally does. One sentence, one claim, persistent placement. GB Feeds should pick its single most-defensible claim and put it there, not in a footer or about page.

3. **Spec-led, paragraph-first PDP copy works for hardcore-hunter buyers.** Big & J trusts that the buyer wants protein percentages, use-case scenarios, and detail — not bullet-point lifestyle fluff. The PDP body is dense prose with technical specifics. For an audience that already knows what attractant does, this respects their expertise. Worth borrowing for any technical-product PDP.

4. **Skip the reviews widget if your retail/dealer network is the proof.** Big & J has zero on-site reviews because their distribution through Bass Pro / Cabela's / Sportsman's Warehouse / Academy is the social proof. They funnel visitors to a "WHERE TO BUY" dealer locator instead of pushing AOV through DTC. If GB Feeds has any retail presence (or plans to), this is a model to study — dealer-locator-as-trust-signal is cheaper than building a Yotpo-style reviews moat.

5. **Cinematic motion is NOT required to convert in this category — but it is a wide-open opportunity.** Big & J's site is motion-dead and the brand still has a cult following. That means GB Feeds can win design daylight cheaply: add even one signature scroll-bound moment (a slow-pan game-camera reveal, a parallax bag drop, a video-loop hero) and you instantly look 5 years more modern than the category leader. The bar is on the floor — clear it.

---

**Summary**: Big & J runs a default 2018-era Shopify Icon theme with a tight 3-color brand system, zero motion, zero reviews, and a heritage-claim announcement bar — proving brand consistency and dealer-network trust matter more than DTC polish in deer attractants.
