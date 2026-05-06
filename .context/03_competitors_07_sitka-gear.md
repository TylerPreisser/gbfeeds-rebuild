## 7. Sitka Gear (Aspirational benchmark)

**URL:** https://www.sitkagear.com/
**Captured:** 2026-05-06 11:18-11:28 MST (1440x900 desktop, 390x844 mobile @2x)
**Platform:** Salesforce Commerce Cloud (SFRA pattern; client-rendered hero/product modules; non-Shopify)
**Positioning:** Premium technical hunting apparel ($500 jackets, $200 baselayers). The brand owns the "science-driven concealment" lane — every category, terrain, and pattern is engineered against animal-vision research. Speaks the serious-hunter dialect through restraint, not adornment.

---

### 1. Hero strategy
Above-fold is a **full-bleed cinematic aerial video** — slow-tracking drone shot of a duck boat carving a wake through a marsh river. No carousel, no slide nav, no thumbnails. Sound off, autoplay, looping. **Bottom-left text block** anchors the message: tiny eyebrow `SPRING TURKEY GEAR` (uppercase, ~10px, letter-spaced) over an enormous editorial headline `DON'T SWEAT THE / MUD OR MOSQUITOES` (3-line break, ~52px, white, condensed/wide-tracked sans). One CTA: outlined-white pill `SHOP NOW` left-aligned beneath. Right side intentionally blank — the imagery is the message. No motion ornament. Cookie banner suppresses to a tiny circular icon at bottom-left after dismissal. The strategy: **let the moment in the field do the persuading**; copy plays straight man to the cinematography.

### 2. Typography system
- **Display:** custom geometric/grotesk wordmark + an **Akzidenz-Grotesk-style condensed sans** for hero headlines (ALL CAPS, weight ~700-800, tight leading 0.95, tracking +25-50). On product pages a more humanist sans handles category H1s ("Optifade Elevated II Hunting Gear") at ~32-36px regular weight.
- **Body / nav:** clean geometric sans (Helvetica Neue / Inter family) at 14-16px, weight 400-500. Nav labels are 13px regular, lowercase-ish small-caps feel.
- **Hierarchy:** four levels only — eyebrow (10-12px tracked uppercase) / display (32-56px) / body (16px) / micro-meta (11-12px for ratings, breadcrumb, filter pills). **No script, no serif, no decorative.** Editorial discipline — they let the cinematography carry tone.

### 3. Color system
The palette is a **terrain-coded neutral set** — earth tones drawn directly from Optifade pattern swatches:
- **Sitka Black** `#0E0E0E` (primary text + nav)
- **Pure white** `#FFFFFF` (background dominant)
- **Lead** (cool neutral gray) `#9AA0A1`
- **Deep Lichen** (muted olive-green) `#5C6648`
- **Pyrite** (warm khaki/sand) `#A89172`
- **Blaze Orange** `#FF5B00` (single-purpose CTA accent — appears on filter pills, "Shop the Collection" buttons, badge background, system warnings)
- **Optifade pattern itself** acts as a "fifth color" — woven into product photography, terrain landing pages, hero plates
Contrast: text on white = 17.4:1 (AAA). The orange CTA against black = 5.7:1 (AA). **One accent, used surgically** — orange = "act now / filter / convert."

### 4. Motion language
- **Hero video** loops at ~24fps, no scrubbing/scroll-pin (Sitka resists the locked cinematic-scroll pattern YETI uses).
- **Module reveals on scroll:** soft fade-up (~30-50px translate, 600ms ease-out) for editorial sections.
- **Hover on product cards:** image swap to alternate angle/colorway, no zoom, no tilt — restrained.
- **Filter pill interaction:** white pill + black border → black pill + white text on active; 150ms transition.
- **Nav:** flyout mega-menu on hover (desktop), full-screen drawer on mobile (no animation flourish — straight slide-in).
- **No parallax, no scroll-pinning, no GSAP-style choreography.** Motion is functional: signal a state change, then get out of the way.

### 5. Component vocabulary
- **Buttons:** two states only — **filled black** (`#0E0E0E` bg, white text, ~44px height, no border-radius / 2px max) for primary; **outlined white-on-image** for hero CTA; **filled blaze-orange** (`#FF5B00`) reserved for cookie/accept and conversion-critical moments.
- **Cards:** product cards are **borderless** — image on pure white, name in black 16px below, single sub-line meta (gender + colorway count: "Late season pant for late-season hunts"), star rating (e.g. 4.6 / 24 reviews), price right-aligned. Bottom-right corner houses a small **circular pattern badge** (e.g. "EE" for Elevated II, "OC" for Open Country) — this is the technical-spec callout pattern in miniature.
- **Filter chips:** rectangular pills, all-caps labels (`Gender`, `Product Type`, `Color & Pattern`, `Pursuit`, `Technology`), dropdown caret. Active filter shown as a removable chip with X.
- **Tech badges (the signature):** small monogram squares — `GORE-TEX®`, `WINDSTOPPER® by GORE LABS`, `PRIMALOFT®`, `POLYGIENE®` — rendered as **black-on-white logo lockups** in a horizontal row directly under the product title. They function as proof, not decoration.
- **Nav:** thin top utility bar (`Gift Cards | New Arrivals | Store Locator`), 56px main nav with logo center-left, 5 categories center, search/account/cart right.
- **Forms:** minimal — single black-bordered input, black submit, no float labels, no extra ornament.
- **Modals:** dark scrim (~70% opacity black), centered white card, single dismissive X top-right.

### 6. Layout grid
12-column desktop, **wide 80px+ horizontal margins**, generous 80-120px vertical rhythm between modules. Density is **low above the fold, increases on category pages** (3-4 product columns desktop, 2 on mobile). Asymmetry is rare — most modules are symmetric or 50/50 image-text splits. White space is the carrier of premium signal: a $500 jacket sits on a card with 40+px of breathing room on every side. Mobile collapses cleanly to single-column, hero crops to vertical-portrait orientation.

### 7. Photography / illustration style
**Documentary cinematography, not catalog photography.** Hunters in actual field conditions — fog rolling off a marsh, muddy boats, snow-dusted alpine ridges, low golden-hour light. Wide aerial drone shots establish terrain. Product on white is **clinical** by deliberate contrast — once you're shopping, the aspiration drops away and the gear is shown like surgical equipment: front, back, side, fabric macro. **No people in product cards.** No illustration anywhere — the brand refuses the cute/iconographic register entirely. Color grading is cool, slightly desaturated, never warm-Instagram.

### 8. Conversion mechanics
- **Hero CTA** is single, contextual to the season ("SHOP NOW" → spring turkey collection).
- **Top utility nav** funnels to `Store Locator`, `Gift Cards`, `New Arrivals` — wholesale-tier merchandising.
- **Primary nav merchandises by USER, not product:** `Men / Women / Pursuit / Footwear / Explore`. Then under each, the secondary axis is **Pursuit** (Whitetail / Big Game / Waterfowl / Turkey / Fishing / Lifestyle) and **System** (Base / Mid / Outerwear).
- **"Shop by Pattern" is the terrain merchandising layer:** Subalpine, Open Country, Elevated II, Marsh, Timber, Cover — each with its own landing page bundling all SKUs in that camo across all categories. This is where Sitka's IA truly differentiates: **terrain is a first-class navigation axis, not a filter.**
- **System Builder tool** (/system-builder): wizard/quiz flow that asks pursuit + season + conditions → returns a curated 3-layer kit (base + mid + outer). Conversion-as-education.
- **Reviews** are loud — star ratings on every card, count visible. No discount stacking, no urgency timers, no "X people viewing" gimmickry. **Premium brands do not blink.**
- **Product page** Add-to-Cart is sticky-on-scroll on mobile.

### 9. The signature move (transferable)
**Confirmed and refined:** the technical-spec callout pattern is real, but the deeper signature is **TERRAIN-AS-NAVIGATION**. Sitka does not sell hunting clothes — they sell **a system tuned to a place**. The Optifade pattern landing pages (`/pattern/elevated-ii`, `/pattern/subalpine`) are full L1 destinations: hero image of that exact terrain + the science copy ("Designed for engagement up to 80 yards late into the season... developed with University of Georgia ungulate researchers") + the gear filtered to that pattern + a `Comparing Concealment` editorial. **The terrain itself becomes the merchandising taxonomy.**

For a deer-feed brand this translates directly: **don't merchandise by product type (pellets/blocks/minerals) — merchandise by SEASON-PHASE and HABITAT** (Pre-Rut / Rut / Post-Rut / Antler-Growth; or Timber / Ag-Edge / Food-Plot / CRP). Each becomes a destination page with the science (protein %, mineral assay, palatability data), the SKUs filtered to it, and a feeder-system builder. The technical-spec badges are the ornament; **the terrain taxonomy is the structural insight.**

### 10. Screenshots
Six PNGs written to `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/competitors/sitka-gear/`:
- `desktop_home.png` — 1.0MB — full-bleed aerial duck-boat hero, "DON'T SWEAT THE MUD OR MOSQUITOES" headline, white outlined CTA
- `mobile_home.png` — 485KB — collapsed nav (logo + search/cart/hamburger), portrait-cropped wood-deck hero, cookie banner with blaze-orange Accept
- `desktop_product.png` — 329KB — Elevated II pattern landing: "Optifade Elevated II Hunting Gear" H1, 6 filter pills, 4-up product grid with circular "EE" pattern badges in bottom-right of each card
- `mobile_product.png` — 236KB — single-column product grid, filter chip drawer
- `desktop_form.png` — 504KB — 404 page rendered as cinematic mountain hero ("WE'RE HAVING TROUBLE TRACKING DOWN THAT PAGE"), two CTA pills (`KEEP HUNTING` outlined / `GET SUPPORT` filled gray), demonstrates form/utility surfaces preserve hero treatment
- `mobile_form.png` — 117KB — same 404 in mobile vertical layout

---

### Top 5 transferable principles, prioritized

1. **Terrain/season-phase as a first-class navigation axis** — not a filter. Build dedicated landing pages for `Pre-Rut / Rut / Post-Rut / Antler-Growth` (or habitat: `Timber / Ag-Edge / CRP`). Each gets hero photography of that exact context + the science copy + filtered SKUs. This is Sitka's strongest transferable insight to a deer-feed DTC.
2. **Technical-spec badges as proof, not decoration** — small monogram lockups directly under product title (`24% PROTEIN`, `NON-GMO`, `RUT-PHASE`, `WEATHER-RESISTANT`). Black-on-white, logo-style. They are the visual shorthand of credibility.
3. **One accent color, used surgically** — pick a single high-saturation color (Sitka uses blaze orange `#FF5B00`) and reserve it strictly for CTAs and conversion moments. Everything else is neutral earth tones. Restraint is what separates premium from drop-ship.
4. **Documentary photography over catalog photography** — invest in real field cinematography (drone over a Kansas food plot, hunter walking a CRP edge at first light) for hero and editorial; keep product-on-white clinical and clean. The contrast between the two registers IS the brand.
5. **Education-as-conversion via a System Builder/quiz** — Sitka's wizard returns a 3-layer kit; for deer-feed, build a "Feed Program Builder" (region + soil + season + herd goal → curated bundle). Lowers the cognitive cost of buying premium and pre-bundles the AOV.

---

**One-line summary:** Sitka wins by making *terrain* the navigation taxonomy and letting documentary cinematography + clinical product imagery + a single blaze-orange accent carry the entire brand — restraint is the design.
