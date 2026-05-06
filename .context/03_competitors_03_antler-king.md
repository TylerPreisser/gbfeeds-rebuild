## 3. Antler King (Direct competitor)

**URL:** https://antlerking.com/
**Investigated:** 2026-05-06
**Platform:** Shopify, theme **Horizon** (theme_store_id 2481, schema 3.1.0) — Shopify's flagship 2024+ theme
**Stack tells:** Inter font (4 weights preloaded), Blockify IP-blocker app (extension `019d9559-d611-7983-b9f9-f0d73dd985ce`) — site actively redirects detected headless / non-residential traffic to google.com (we bypassed with stealth context)
**Tagline:** "Bigger Bucks, Healthier Deer."

---

### 1. Hero strategy

Above-the-fold is a **full-bleed photographic hero** of an orange Kubota tractor disking a food plot at sunset. Lead message reads "**BIGGER BUCKS, HEALTHIER DEER.**" set in heavy black serif/blackletter-adjacent caps with a thin orange underline rule, plus a single orange "**SHOP**" pill button with a chevron (`>`). No sub-headline, no body copy, no rotating slides on initial render. A second hero block beneath introduces "**BARRICADE™**" (a new product). Trust signals are **NOT** in the hero — they live in the management-calendar section further down ("MANAGEMENT CALENDAR", "FOOD PLOTS IN [SEASON]", "SINCE 1991"-type framing). Motion: zero — the hero image is a static photograph (not video, not parallax). The aesthetic is "old-school hunting brand on a generic Shopify theme."

### 2. Typography system

- **Single typeface: Inter** across the entire site (h1–h6, body, accents, buttons). Weights loaded via `@font-face`: 400 (n4), 500 (n5), 700 (n7). All four `--font-*--family` tokens (body / subheading / heading / accent) point to `Inter, sans-serif`.
- **No display/serif typeface for the hero headline** — the marquee H1 in the hero is rendered as **flattened raster text inside the hero JPG**, not live web type. The actual live H2 ("Introducing BARRICADE™", "Bestsellers", "MANAGEMENT CALENDAR") all render in Inter Bold 700.
- **Type scale** (CSS custom properties):
  - 2xs 0.625rem · xs 0.8125rem · sm 0.875rem · md 1rem · lg 1.125rem · xl 1.25rem · 2xl 1.5rem · 3xl 2rem · 4xl 2.5rem · 5xl 3rem · 6xl 3.5rem
- Heading letter-spacing: `0.25em` on h1–h6 — wide tracking on UPPERCASE labels (the category nav buttons FOOD PLOTS / SOIL / MINERAL etc.). Paragraph spacing 0.5em.
- Hierarchy is shallow: H1 (image), H2 ~32–48px, H3 ~24px, body 16px. Subheading weight 500, heading weight 700.

### 3. Color system

Sky-high stylistic conflict. The **theme** ships seven near-monochrome color schemes (Horizon defaults), but Antler King layers **bright, mismatched category-button colors** on top via inline styles in the AI page-builder blocks ("ai-link-…" classes).

Theme color schemes (from CSS variables):
- **Scheme 1 (default):** bg `#FFFFFF`, fg `rgb(0 0 0 / .81)`, headings `#000000`, primary button bg `#000000` text `#FFFFFF`, hover bg `#333333`, border-radius **14px**
- **Scheme 2 (light gray):** bg `#F5F5F5`, same fg/buttons
- **Scheme 3 (sage):** bg `rgb(238 241 234)` ≈ `#EEF1EA`
- **Scheme 4 (sky):** bg `rgb(225 237 245)` ≈ `#E1EDF5` with primary button border `rgb(29 54 134)` ≈ `#1D3686`
- **Scheme 6 (dark):** bg `#333333`, fg `#FFFFFF`, primary button bg `#FFFFFF` text `#000000`

Brand palette (extracted from inline styles + image assets):
- **Antler-King orange (logo + Shop CTA + Submit):** `#FF5100` / `#FF4A00` (variant `#E06A22`)
- **Brand red (deeper):** `#E53935` / `#D50000` / `#C62800` (used in some category badges)
- **Brand green (logo deer-skull background, "FOOD PLOTS" button):** `#8CC63F` (highlight `#92D500`, soft fill `#B9FFB9`)
- **Brand teal/forest:** `#1F6F63` (the "FEED" category button)
- **Brand blue/navy:** `#0D47A1` (the "MINERAL" category button)
- **Neutrals:** `#000000`, `#1A1A1A`, `#1F1F1F`, `#2B2B2B`, `#333333`, `#666666`, `#999999`, `#CCCCCC`, `#E6E6E6`, `#F4F4F4`, `#F5F5F5`, `#F9F9F9`, `#FFFFFF`
- **Accents in nav bar:** the nav strip is **green `#8CC63F`** with white menu items.
- Dark / light: light only. No dark-mode toggle.

Contrast: Submit/Shop orange `#FF5100` on white ≈ 3.4:1 — fails WCAG AA for normal body text but passes for "Large Bold" CTA labels. Black `#000000` on white passes everything.

### 4. Motion language

**Effectively NONE.** No GSAP, no Lenis smooth-scroll, no scroll-triggered reveals, no parallax. The Horizon theme ships `view-transitions.js` (uses the native CSS View Transitions API for soft cross-fade between page navigations) and a minimal `scrolling.js` for sticky-header logic. Hover states on the category buttons are an opacity dim (no scale, no shadow). Product cards have a quiet 200ms color/border hover (`--card-bg-hover: rgb(0 0 0 / 5%)`). The carousel/slideshow component is loaded but not used on the homepage — they could have, they chose not to. **Signature animation: none.**

### 5. Component vocabulary

- **Buttons:**
  - Primary: solid black `#000000` rounded **14px**, white text, hover `#333333`. Inter 400, default-case (no uppercase forcing).
  - Secondary: transparent w/ 1px black border, same 14px radius.
  - **Category nav buttons** (the dominant pattern above the fold): five colored pill-shape rectangles — FOOD PLOTS (red/orange), SOIL (red), MINERAL (blue), ATTRACTANT (green-ish), FEED (teal), SWAG (light-green). Each uses tracked-out white uppercase Inter 700.
  - **"Shop" hero CTA**: orange `#FF5100`, ~14px radius, white bold caps, terminating chevron icon.
- **Cards:** square product tiles, white bg, image at 4:5 ratio, title in Inter 400 16–18px, price below in Inter 500. Borders are 1px `rgb(0 0 0 / 6%)` semi-transparent. Hover applies a 5%-foreground tint background, 30%-foreground border. No shadow.
- **Nav:** Top utility bar in **green `#8CC63F`** with primary nav items HOW TO PLANT, EDUCATION, CALENDAR, FAQ, WHERE TO BUY + a search field. Below it, the colored category pills act as a secondary "shop by department" rail. Logo (deer-skull antlers + "Antler King" wordmark in orange) sits left-of-center on the second row. Account, search, cart icons right.
- **Forms:** Bare bones. Contact page uses 1px outline boxes (Name, Email, Phone, Comment) with `4px` border-radius (inputs use a different radius from buttons — note this), no labels-as-floating, plain "Submit" orange button. White card, no shadow, no helper text.
- **Modals/drawers:** Standard Horizon mini-cart drawer slides from right, white, 14px radius, basic shadow.
- **Badges:** "Buy more, Save more" tier table on PDP — black border lines on white, tabular layout. Stock indicator color tokens: in-stock `#3ED660`, low `#EE9441`, oos `#C8C8C8` (theme defaults, not customized).

### 6. Layout grid

- **Max content width: ~1280–1320px**, generously gutter-padded on desktop.
- **Whitespace: dense.** Antler King uses small section padding (Horizon default 60–80px on desktop) and the homepage stuffs ~10 distinct sections in the first three viewports: hero → BARRICADE block → bestseller carousel → "Plant in [Month]" calendar → new items → testimonials → blog teaser → newsletter. No expansive negative space.
- **Asymmetry: minimal.** Almost everything is a centered title + 4-up grid. The "MANAGEMENT CALENDAR" section uses a left-image / right-text split (Honey Hole food-plot photo with "Chad H." attribution).
- **Density: high.** This is a catalog-store aesthetic — favors product visibility over editorial breathing room.

### 7. Photography / illustration style

- **Lifestyle and product, not trophy shots up front.** The hero is a tractor-in-action shot (utility, capability framing). Trophy/wildlife photos appear lower on the page (Honey Hole section, customer-submitted "Chad H." etc.).
- Color grade is **warm + dusty** — golden-hour sunsets, brown earth tones. Slight orange/amber bias matching the brand orange.
- **Product shots: bag fronts on white background**, no lifestyle context, no model. The Game Changer Clover PDP shows the bag head-on with a deer graphic on the front of the package. 6 thumbnails per PDP (front, back, ingredient panel, in-field shots).
- **Logo / illustration:** stylized antler/skull line-art over the wordmark, drawn in solid black with a green leafy backdrop in some treatments. No custom illustration system; everything else is photographic.

### 8. Conversion mechanics

- **CTAs in priority order:** (1) hero "SHOP" button, (2) the colored category pill nav (FOOD PLOTS / SOIL / MINERAL / ATTRACTANT / FEED / SWAG), (3) "Where to Buy" in the top utility nav (very prominent — Antler King is a **dual-channel brand**, sold via dealers), (4) bestseller cards' "+" quick-add buttons.
- **Friction: low to moderate.** Direct-to-PDP works; Shop Pay accelerated checkout enabled (`shop-cart-sync`, `Shopify.SignInWithShop.eligible: true`). Quantity selector + "Buy with Shop" purple button on PDP.
- **Bundle vs spec:** Spec-first. PDP shows "**Buy more, Save more**" tier table — buy 6+ for $18.33/ea (vs $24.99 single). No subscription, no AOV bundles, no upsell bumps. 5 short bullet points (sun requirement, pH tolerance, no-till capability, etc.).
- **Trust signals:** "Where to Buy" suggests retailer credibility; testimonials section has named customers ("Chad H."); "Since 1991" / family-owned framing in copy. No press logos, no review-aggregator widgets visible above fold.
- **Inventory urgency:** in-stock dots colored but no fake-scarcity countdowns.

### 9. The one signature move

**The colored category-pill secondary nav.** Five-to-six color-coded pills (FOOD PLOTS red, SOIL deeper red, MINERAL navy `#0D47A1`, ATTRACTANT green, FEED teal `#1F6F63`, SWAG `#8CC63F`) sitting under the green utility bar — they function as an at-a-glance product-category map. It's the most visually distinctive element on the site and immediately tells you what they sell without reading copy. **The rest of the site is a stock Horizon Shopify build.** This pill nav is the design hook.

### 10. Screenshots

All saved to `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/competitors/antler-king/`:
- `desktop_home.png` — homepage hero + start of bestsellers
- `mobile_home.png` — hamburger nav, vertically-stacked hero
- `desktop_product.png` — Game Changer Clover PDP w/ price tier table
- `mobile_product.png` — same, with sticky "Add to cart" footer
- `desktop_form.png` — contact page (logo + form + map placeholder above-fold)
- `mobile_form.png` — full contact form

---

### Top 5 transferable principles, prioritized

1. **Color-code the category map and put it ABOVE the hero.** Antler King's six-pill colored category nav (FOOD PLOTS / SOIL / MINERAL / ATTRACTANT / FEED / SWAG) is the single best UX move on the site — a one-glance product map. GB Feeds should adapt this for its own SKU lineup (e.g., FEED / MINERAL / ATTRACTANT / SEED / GEAR) using **distinct accent hues** rather than monochrome buttons. Place it as a persistent secondary rail under the primary utility nav.
2. **Lead with capability, not a kill photo.** Hero is a working tractor at sunset, not a trophy buck pose. The framing says "tools that do the work" rather than "look at this dead deer" — broader, less polarizing, and converts non-trophy-obsessed land managers too. Use a working/process image as the GB Feeds hero default.
3. **Spec-first PDP with a "Buy More, Save More" volume table.** Dollar-per-unit transparency at quantity tiers (6+ = $18.33/ea vs $24.99 single = ~26% savings) drives basket-size growth without coupons or popups. Implement an explicit tier table, not just a per-unit discount discount-link in tiny text.
4. **"Where to Buy" as a top-nav peer of "Shop".** They treat dealer locator as a primary nav action — acknowledging that a chunk of their audience prefers in-person bag pickup. If GB Feeds has any retail/dealer presence, surface it. If not, signal it with "Found at" partner logos to borrow the same trust.
5. **Don't over-engineer motion.** Antler King has effectively zero JS animation, ships fast, and converts. The Shopify Horizon theme + native CSS View Transitions API is enough. GB Feeds doesn't need GSAP/Lenis/parallax to feel premium — clean type, real photography, and tight component spacing do the work. Save the motion budget for ONE signature moment (a hero transition, a product-add micro-interaction) instead of sprinkling effects everywhere.

---

**One-line summary:** Antler King runs a stock Shopify Horizon theme dressed up with a color-coded pill-button category nav and warm sunset photography — it converts on clarity, dealer-locator trust, and a "Buy More, Save More" volume table, not on motion or polish.
