## 5. Record Rack (Direct competitor)

**URL:** https://recordrack.com/
**Parent:** Cargill, Incorporated (sister brands: Nutrena, ProElite, Black Gold, Sunglo)
**Stack:** WordPress + custom Cargill theme (`/wp-content/themes/cargill/assets/main.css?ver=1.6.0`). No e-commerce — informational + "Where to Buy" dealer locator.
**Captured:** 2026-05-06
**Screenshots:** `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/competitors/record-rack/`

---

### 1. Hero strategy
Above-fold: full-bleed wildlife photography (whitetail buck looking directly at camera through tall green grass) running edge-to-edge under a thin white header bar. No headline overlay visible above the fold at 1440px on first paint — the hero photo carries the entire emotional load. Headline ("Serious Nutrition for Deer and Exotics") sits below the fold. CTAs: dark olive "Where to Buy" button (top-right, sticky in nav) plus a mid-page "Products" link. No video, no parallax, no carousel — a single still photograph. Trust signals are absent above the fold: no Cargill mention, no badges, no testimonial. Pure brand confidence via imagery.

### 2. Typography system
Single-family system: **Work Sans** (self-hosted woff2 from `/wp-content/uploads/2024/08/`), three weights — Regular (400), Medium (500), SemiBold (600). No serif, no display face. Stack: `WorkSans, Arial, sans-serif`. Logo wordmark is a separate raster ("Record Rack" in a custom rounded slab with stag glyph — PNG, not webfont). H1 on /contact-us/ ~64px SemiBold; H1 on PDP ~48px SemiBold; body ~17–18px Regular at ~1.5 line-height. Tracking is neutral (no letter-spacing tricks). Quiet, utilitarian, almost civic — Work Sans is the same face the Cargill design system uses across Nutrena and Black Gold.

### 3. Color system
Eight tokens extracted directly from the inline theme CSS:
- **Primary dark olive** `#363B1D` — buttons, headers, nav text, logo dark
- **Accent olive** `#62652E` — secondary buttons, link hover, footer accents
- **Slate gray** `#444D4E` — body text on light bg
- **Bone/cream** `#F7F8F3` — primary section background
- **Pale sage** `#E3E5D7` — hover/secondary fill
- **White** `#FFFFFF` — cards, hero text on photos
- **Divider gray** `#D8D8D8` — borders
- **Cookie-banner gray** `#F8F8F8`

This is a low-saturation, near-monochromatic earth palette — deep olive on cream, no orange, no blaze, no red. Contrast `#363B1D` on `#F7F8F3` ≈ 12:1 (AAA). One mode only — no dark mode toggle.

### 4. Motion language
Effectively **none**. No scroll-triggered reveals, no parallax, no GSAP, no Framer Motion. Hover states are simple color swaps (button bg `#363B1D` → `#62652E`, ~150ms ease). Nav dropdown is a standard chevron flip. The PDP image gallery has left/right chevron arrows — a basic slider, no inertia. No video backgrounds, no Lottie. The site moves like a printed brochure.

### 5. Component vocabulary
- **Buttons:** rectangular, **square corners** (no border-radius), 1px border, ~14px SemiBold uppercase-ish label, ~18px vertical / 28px horizontal padding. Primary: olive fill `#363B1D` + white text. Secondary: white fill + olive border + olive text. "Buy Now" on PDP is the same primary olive button pointing to retailer.
- **Nav:** flat horizontal bar, lowercase chevron dropdowns, bordered "Where to Buy" button anchored top-right.
- **Cards (Products grid):** image top, "Record Rack" eyebrow, product name H3, three nutrition specs (% Crude Protein/Fat/Fiber), short description, "Learn More" text link. No price, no add-to-cart.
- **Pills/badges (PDP):** small pill tags above product title showing applicable species/use ("Elk", "Texturized", "Deer", "Trough") with a tiny external-arrow glyph indicating filter links.
- **Stat blocks:** giant numeric percentages (~64px Medium) with small caption underneath — used to present nutrition data (17% / 6% / 22%).
- **Forms:** standard text inputs, light gray background, square corners, no floating labels.
- **Cookie banner:** persistent fixed-bottom OneTrust tray (white-ish bg, two olive buttons AGREE/REJECT + underlined MANAGE COOKIES link).

### 6. Layout grid
Centered single-column, max-content-width ~1280–1320px with generous gutters. Whitespace is *abundant* — sections breathe with 80–120px vertical padding. No asymmetry, no broken grid, no overlap. PDP uses a clean 50/50 split (product bag image left, copy + stats right). Density is low; one or two ideas per viewport. Section backgrounds alternate cream `#F7F8F3` ↔ white ↔ olive `#363B1D` to chunk the page.

### 7. Photography / illustration style
Naturalistic wildlife photography — whitetails in actual habitat (tall summer grass, woodland edge), no studio. Color grade is **neutral-to-cool**, not the warm-orange "magazine cover" treatment competitors use. Lifestyle shots include hunters in field and a multi-generational family group on a hay bale (legacy/heritage angle, not trophy-glory). Product photography is straight-on bag-front shots on white, no shadow drama. The buck-and-stag logo glyph is a vintage scratchboard-style line illustration, used as a small mark only.

### 8. Conversion mechanics
**Zero direct e-commerce.** No price anywhere on the site. No cart, no checkout. Single conversion path: **Where to Buy → dealer locator** (also surfaced as a "Buy Now" button on every PDP linking out to retailer SKU pages). Friction is intentionally low for the dealer-locator flow but the brand never asks for an order. Bundles do not exist; instead the strategy is **spec authority** — every PDP leads with three giant nutrition percentages (Crude Protein / Fat / Fiber) framing the product as a formulated science purchase, not a consumer good. Email capture lives in the footer. Trust is borrowed from Cargill in the footer, never above the fold.

### 9. The one signature move
**The giant nutrition-percent triptych on every PDP.** Three oversized numerals — `17%` `6%` `22%` — set in Work Sans Medium at ~64px sitting next to the product bag, captioned "Crude Protein / Crude Fat / Crude Fiber." It functions as both the proof-point AND the visual hero of the product page, replacing what most CPG sites use price for. This is the page's gravity well: the bag photo on the left, the spec sheet rendered as typography on the right.

### 10. Screenshots
Saved to `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/competitors/record-rack/`:
- `desktop_home.png` (1440x900, 1.04 MB)
- `mobile_home.png` (390x844, 190 KB)
- `desktop_product.png` (1440x900, /products/breeder-textured/, 195 KB)
- `mobile_product.png` (390x844, /products/breeder-textured/, 110 KB)
- `desktop_form.png` (1440x900, /contact-us/, 82 KB)
- `mobile_form.png` (390x844, /contact-us/, 50 KB)

---

### Top 5 transferable principles, prioritized

1. **Spec-as-hero on PDP.** Replace pricing or marketing copy with three giant nutrition percentages set in display-scale type. Turns a feed bag into a science purchase and removes the need to argue value with words. GB Feeds should test a "16% / 4% / 18%" stat triptych on every product page — the single highest-leverage steal.
2. **Monochromatic earth palette over blaze-orange.** A two-tone olive (`#363B1D` + `#62652E`) on cream (`#F7F8F3`) reads premium and confident next to the orange-camo clutter of Big & J / Boss Buck. GB Feeds can differentiate from Whitetail Institute's primary green by going darker and more desaturated.
3. **One sans, three weights, zero serif.** Work Sans across the entire site at 400/500/600 — no display face, no decorative type. The restraint reads "category leader" rather than "outfitter swag." Pick one humanist sans and commit.
4. **Wildlife photography over hunter-trophy photography.** Hero is a buck looking back at the camera through summer grass — not a dead deer on a tailgate. Conveys stewardship and seriousness; broadens audience to ranchers, exotic-breeders, conservationists, not just hunters.
5. **No-friction dealer-locator funnel.** Single "Where to Buy" button anchored top-right of the nav on every page. Treats the website as a sales-enablement asset for a B2B retail channel rather than a DTC store — GB Feeds should make this CTA omnipresent and bypass cart-abandonment math entirely.

---

**Summary:** Record Rack is a quiet, Cargill-grade brochureware site that wins on restraint — Work Sans, olive-on-cream, abundant whitespace, and oversized nutrition percentages doing the conversion work that pricing and CTAs do everywhere else.
