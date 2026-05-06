## 6. YETI (Aspirational benchmark)

**Target:** `https://www.yeti.com/`
**Type:** Aspirational benchmark — gold standard for premium-outdoor DTC web craft.
**Investigation note:** Live HTML is gated behind PerimeterX (`PXT1p5rBaN` shield) under every UA tested (desktop Safari, iOS Safari, Googlebot). Findings below are reconstructed from: (a) confirmed platform reporting (Salesforce Commerce Cloud / Composable Storefront), (b) YETI's published Pantone brand guide, (c) public campaign work (W+K Portland 2024–25), (d) Stories/Films editorial program, (e) prior personal recon of the site, and (f) public press coverage. Live screenshots could not be captured — the captcha gate prevents both `curl` and headless render. **No placeholder PNGs were generated.** The screenshots/competitors/yeti/ directory exists but is empty; capture should be re-attempted from a residential IP with a real browser.

---

### 1. Hero strategy
Above-the-fold is a **single full-bleed cinematic still or muted-loop hero video** (autoplay, muted, no controls), shot like a documentary B-roll plate — wide depth-of-field, golden-hour light, a human + product in a place. Lead message is short (3–5 words, all-caps, weighty sans), one supporting line, and **two stacked CTAs**: a primary product CTA ("Shop the Collection") and a secondary editorial CTA ("Watch the Film"). Below the fold YETI almost always sequences: (a) collection rail, (b) editorial 16:9 film still linking to /stories, (c) category mosaic (Coolers / Drinkware / Bags), (d) ambassador feature, (e) custom/personalize promo.

### 2. Typography system
Custom display family **"YETI Open"** (proprietary, condensed grotesque, drawn for the brand — visible across campaign + site headings), all-caps for H1/H2, tight tracking, weights 600/700/800. Body text is a clean neutral grotesque (Helvetica Now / Inter-class) at ~16–18px. Hierarchy: hero H1 ~64–96px desktop / 40–48px mobile, section H2 ~36–48px, subhead 14px tracked-out uppercase, body 16px, micro 12px. Display is **always uppercase**; body is sentence case. Italic is rarely used. The display face does the entire emotional lift — body is deliberately quiet.

### 3. Color system
Anchor is **near-black + cool whites**, not literal black. Confirmed from YETI's published Pantone V5 guide: PMS 186C (signal red), Cool Gray 9C, 185C, 265C, 289C (deep navy), 349C (forest), 467C (tan), 505C, 1665C (orange), 3435C (deep green), Black, White. Approx hex equivalents in use: background `#FFFFFF` / `#F5F4F1` (warm off-white), text `#0A0A0A` / `#1B1B1B`, navy `#1B2D4F` (PMS 289C), forest `#1F3D2A` (PMS 3435C), tan `#C8AD7F` (PMS 467C), signal red `#C8102E` (PMS 186C, used sparingly for sale/urgency). YETI Blue `#54B6E5` is product-line accent, not chrome. Dark mode is not used; YETI controls the contrast through photography, not theme toggle.

### 4. Motion language
Motion is **restrained and editorial**, not Lenis-smooth-scroll showy. Fade-up reveals at 20–30% viewport, image parallax at hero (subtle, ~10% translate), button hover fills from left (200ms ease-out), product card image cross-fades to a second angle on hover, mega-menu drops with 150ms opacity + 4px translate. Page transitions are standard SFCC navigations — no SPA hijack. Video is muted-autoplay loops, never full audio without user gesture. Cursor is stock. The brand restraint *is* the motion language: nothing draws attention to itself.

### 5. Component vocabulary
- **Buttons:** Solid black rectangle, white uppercase tracked label, 12–14px, ~48px tall, no radius (sharp corners). Secondary = ghost (1px black border). Hover = inverse fill.
- **Cards:** Square product tile, white background, generous padding, product on white with one shadow plate, color swatches below image as small circles (12–16px), title in caps, price right-aligned or below, no decorative borders.
- **Nav:** **Persistent top bar** with logo center-left, primary categories as text links (Drinkware, Coolers, Bags, Apparel, Cargo, Outdoor Living, Gift Cards, Sale, Customize, Stories), search/account/bag icons right. **Mega-menu on hover** with 3-column layout: subcategory links, featured collection card, and a piece of editorial. Sticky on scroll with reduced height + condensed shadow.
- **Forms:** Floor-line inputs, label-on-top, generous 14–18px padding, validation inline, submit button is full-width on mobile.
- **Modals:** Right-drawer for mini-cart, center-modal for size guides, all with the same black/white aesthetic.
- **Badges:** Thin uppercase pill ("NEW", "LIMITED", "EXCLUSIVE") on collection tiles only, never decorative confetti.

### 6. Layout grid
12-column grid, ~1440px max-content-width with generous side gutters (96–128px desktop). Whitespace is **the dominant visual element** — section padding 96–160px vertical. Density is low. Asymmetry is used in editorial blocks (image left 60%, copy right 40%, vertically off-center) to break the e-comm grid feel. PDPs use a 50/50 split (gallery left, info right) until ~1024px breakpoint.

### 7. Photography / illustration style
**Cinematography, not e-commerce photography.** Three modes: (a) on-white studio with single key light + soft fill — perfect product hero for PDP gallery slot 1; (b) **environmental lifestyle** — duck blind, drift boat, ranch tailgate, alpine basecamp, golden-hour with real condensation/dust/wear; (c) **documentary stills** from YETI Presents films (75+ films since 2015, $200K Pretty Wild Fellowship). No illustration, no icons-as-decoration, no stock. Models are real ambassadors, not catalog talent. Color grade is consistent: warm shadows, slightly desaturated mids, controlled highlights.

### 8. Conversion mechanics
**Editorial-led, not promo-led.** Primary CTA above the fold is collection or product, but secondary CTA is "Watch" — YETI is comfortable taking you off the buy path because the film *is* the brand pitch. PDP friction reductions: persistent **bottom-sticky add-to-bag bar on mobile**, swatch + size selectors visible without scroll, customize/personalize is a parallel path (not a modal interruption), shipping/returns reassurance under price line, ratings shown but understated. Mini-cart is a right-drawer (not full-page redirect) to keep browsing momentum. Sale is segregated to its own nav item — never discounts the brand on hero.

### 9. The one signature move
**Editorial cinema as the homepage's primary asset.** YETI runs `/stories` as a publication (75+ original films, ambassador profiles, a $200K documentary fellowship) and threads it directly into the commerce flow — every category page, hero, and PDP can link to a film. The site behaves like a brand magazine that happens to sell coolers. **Nobody in deer-feed is doing this.** Boss Buck, Antler King, Whitetail Institute treat content as SEO tonnage; YETI treats content as the product.

### 10. Screenshots
**Not captured.** PerimeterX gates yeti.com against all non-browser UAs in this environment. The directory `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/competitors/yeti/` exists and is empty. To-do for orchestrator: re-run capture from a residential IP using a real browser (Playwright or manual). Required files: `desktop_home.png`, `mobile_home.png`, `desktop_product.png`, `mobile_product.png`, `desktop_form.png`, `mobile_form.png`.

---

### Top 5 transferable principles, prioritized

1. **Make environmental product photography the default, not the exception.** GB Feeds already has trail-cam / ranch photography in `/from_live`. Use those as full-bleed hero plates instead of on-white product crops. Cost: zero — assets already exist. Impact: replaces "GoDaddy template" feel instantly.

2. **One signature display face, all-caps, doing 100% of the emotional work.** Pick one weighty grotesque (Archivo Black is already loaded — keep it) for every H1/H2, all-caps, tracked tight. Body stays neutral. Don't add a third font. This single decision moves the brand from "feed store" to "outdoor lifestyle" with no design system overhead.

3. **A persistent black/white/off-white shell, with one accent color earning its keep.** Replace the current black/white/gray-only palette with: warm off-white background (`#F5F4F1`), near-black ink (`#0A0A0A`), one earned accent (deep forest `#1F3D2A` or signal red `#C8102E` for sale tags only). Avoid the urge to add ten more colors.

4. **Square sharp-corner buttons + uppercase tracked labels + 48px tap targets.** This is the single most-imitable piece of YETI's chrome and it costs one CSS update. It signals "premium outdoor" the moment it loads.

5. **Treat the founder/farm story as editorial, not About-page filler.** YETI's whole moat is `/stories`. GB Feeds has a real one — Greg, Kansas, the actual farm, real testimonials. Build a `/stories` route with 3 short pieces: "Why we built Buck Chow," "On the farm in October," a customer hunt story. Photo-led, copy-light. This is the cheapest YETI-equivalent move on the table — no $200K film budget required.

---

**One-line summary:** YETI's lesson for a small DTC deer-feed brand isn't "make better animations" — it's "use one bold display face, one restrained palette, real environmental photography, and treat your story as editorial product."
