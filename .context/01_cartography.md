# GB Feeds Cartography Report

> Comprehensive technical deep-dive into the GoDaddy Website Builder 8.0 + Online Store static mirror.
> Generated: 2026-05-06

---

## 1. Tech Stack Confirmation

**Platform**: GoDaddy Website Builder 8.0.0000 with GoDaddy Online Store (OLS)

### Identifying Markers

- **Generator meta tag**: `Starfield Technologies; Go Daddy Website Builder 8.0.0000`
- **CSS Classes**: GoDaddy's proprietary glamor-generated `.x-el` and `.c1-*` atomic CSS classes
- **Data Attributes**: `data-ux`, `data-aid` attributes throughout
- **Asset CDN**: Primary images from `img1.wsimg.com/isteam/ip/d82532f3-0270-4964-94c1-fade4071e01a/`
- **Font Service**: Google Fonts delivered via `img1.wsimg.com/gfonts/`
- **Payment Integration**: Poynt references in scripts
- **Online Store Assets**: `onlinestore.wsimg.com` and `online-store.api.godaddy.com`
- **Checkout Flow**: GoDaddy Online Store checkout (not Shopify, not custom WooCommerce)
- **Mirror Type**: SiteSucker static HTML snapshot (pre-rendered, no server-side execution)

## 2. Routing Map

| URL | Title | Source File | Purpose |
|---|---|---|---|
| `/` | GB Feeds - Home | `index.html` (339 lines) | Hero, hero call-to-action, featured product showcase |
| `/products` | Products | `products.html` & `products (1).html` (both 182L) | Product listing grid with add-to-cart |
| `/our-story` | Our Story | `our-story.html` (182 lines) | Brand narrative, company origin, mission |
| `/why-gb-feeds` | Why GB Feeds | `why-gb-feeds.html` (182 lines) | USP/differentiation, feature comparison |
| `/customer-reviews` | Customer Reviews | `customer-reviews.html` (182 lines) | Testimonials, social proof section |
| `/photo-gallery` | Photo Gallery | `photo-gallery.html` (333 lines) | Lifestyle/product photography showcase |

### Ambiguities & Gaps

- **Two `products` files**: `products.html` and `products (1).html` are **identical** (both 182 lines, same content). Likely a SiteSucker artifact (duplicate download). Recommend consolidating to single `/products` route in rebuild.
- **No product detail pages**: Products link to checkout directly; no individual `/products/[slug]` pages found.
- **No FAQ page**: Only 7 main content pages. If FAQ exists on live site, it may be embedded within pages or served dynamically.
- **m/ subfolder pages**: Found `m/account.html`, `m/orders.html`, `m/login.html` — these are mobile account/dashboard pages (GoDaddy Online Store user portal). Not part of public marketing site; recommend excluding from rebuild unless account management UI required.
- **Manifest & Service Worker**: `manifest.webmanifest` referenced but empty/minimal. No service worker detected.
- **Cart page**: `/products/ols/cart.html` exists but is likely a stub (checkout redirects to GoDaddy-hosted page).

## 3. Component Inventory

### Recurring Layout Components

| Component | Locations | Description |
|---|---|---|
| **Header / Navigation** | All pages | Fixed/sticky black header (`.c1-h` bg-black), logo (15% width), nav menu (70%), mobile hamburger (30%) |
| **Hero Section** | `/`, `/products`, `/our-story`, `/why-gb-feeds` | Full-width image background with overlay gradient, CTA button, headline text |
| **Product Card** | `/products` | Image, product name, price, 'Add to Cart' button (links to Poynt checkout) |
| **Testimonial / Review Block** | `/customer-reviews` | Customer name, quote, rating/attribution |
| **Text + Image Section** | `/our-story`, `/why-gb-feeds` | Two-column or alternating layout (text left/right, image opposite) |
| **Photo Gallery Grid** | `/photo-gallery` | 2-4 column responsive grid of lifestyle/product images |
| **Footer** | All pages | Black background, company info, links, newsletter signup, social icons |
| **Chat Widget** | All pages | Reamaze iframe (bottom-right corner, loads asynchronously) |
| **Trust Badges** | Footer | TrustedSite badge, Visa/security icons |

## 4. Brand DNA

### Color Palette

| Color | Hex | RGB | Usage | Frequency |
|---|---|---|---|---|
| Black | `#000000` | `rgb(0, 0, 0)` | Header, footer, primary text, buttons | 68x |
| White | `#ffffff` | `rgb(255, 255, 255)` | Background, button text, contrast | 35x |
| Dark Gray | `#1b1b1b` | `rgb(27, 27, 27)` | Secondary text, accents | 14x |
| Medium Gray | `#5e5e5e` | `rgb(94, 94, 94)` | Borders, dividers, muted text | 21x |
| Light Gray | `#e2e2e2` | `rgb(226, 226, 226)` | Borders, subtle backgrounds | 14x |
| Off-White | `#f6f6f6` | `rgb(246, 246, 246)` | Section backgrounds | 7x |

**Brand Voice**: Monochromatic + high contrast. No accent colors. Professional, minimal, hunting-industry positioning.

### Typography

- **Display Font**: `Archivo Black` (Google Font, served via `img1.wsimg.com/gfonts/`)
  - Used for: Main headings (H1, H2), hero text, buttons, logos
  - Weight: 400 (normal)

- **Body Font**: `Montserrat` (Google Font)
  - Used for: Body paragraphs, navigation, form labels, secondary text
  - Weights: 400 (normal), 700 (bold)

### Spacing & Metrics

- **Padding (sections)**: 16px, 24px, 32px, 40px, 56px (consistent spacing system)
- **Border Radius**: Primarily 0px (sharp edges); 4px used on form inputs
- **Box Shadows**: Minimal; 0 3px 6px 3px rgba(0,0,0,0.24) on dropdown menus
- **Line Height**: 1.3em (headlines), 1.75 (body text), 1.8 (lists)

### Brand Signature Copy Phrases

- **Tagline**: "A small batch specialty deer feed company that specializes in creating the world's best deer feeds for the world's best deer hunters."
- **Hero CTA**: "Shop All Products" / "Browse Products"
- **Product Focus**: Premium, small-batch, specialty positioning
- **Target Audience**: "Serious" / "Trophy" deer hunters

## 5. Conversion & Commerce Flow

### Payment Processor & Checkout

- **Provider**: Poynt (GoDaddy's payment processor) + GoDaddy Online Store
- **References in Code**:
  - `cdn.poynt.net` — payment gateway assets
  - `checkout.paze.com` — Poynt checkout redirect
  - `services.poynt.net` — payment processing API

### Traced Flow

1. **Product Discovery**: `/products` lists all items with images, names, prices
2. **Add to Cart**: "Add to Cart" button links to Poynt checkout endpoint
3. **Checkout**: Redirect to `checkout.paze.com` or Poynt-hosted page (full checkout outside gbfeeds.com)
4. **Confirmation**: Post-purchase, user redirected back to success page (origin unclear, likely GoDaddy OLS domain)

### Product SKU Pattern

- Product identifiers embedded in links and API calls: format unclear in static mirror (Poynt API integration)
- Prices visible in HTML: e.g., "$XX.XX" format, stored in data attributes or text nodes

### Key Limitation

Cart and checkout are GoDaddy Online Store managed services. Full rebuild will require:
- Decision: Keep Poynt/OLS, or migrate to Shopify/WooCommerce/custom?
- Product data sync: Inventory, pricing, SKU mapping
- Checkout UX: On-page vs. redirect to hosted checkout

## 6. Integrations & Third-Party Services

- **Google Analytics 4**: G-BF2FDR6KMM
- **Google Site Verification**: xhm9c18xYxGqvWIffjaQy5-6zBB2h3AXxJQ3xtXLJHU
- **Google Tag Manager**: Not explicitly found in header (may be inline)
- **Meta Pixel**: Not found (check live site)
- **TikTok Pixel**: Not found
- **Reamaze Chat**: Integrated; domain/account ID not exposed in static mirror
- **TrustedSite Badge**: Integrated; site ID embedded in script
- **Poynt Payments**: Payment processor (checkout.paze.com, services.poynt.net)
- **Stripe**: Not detected
- **Mailchimp / Klaviyo**: Not detected
- **Visa Fraud Detection**: Online-Metrix (thm.visa.com, *.online-metrix.net) — loaded for fraud prevention

## 7. SEO Surface & Metadata

### Shared / Global SEO

- **Language**: `lang="en-US"`
- **Viewport**: `viewport` with `width=device-width, initial-scale=1`
- **Canonical**: Set per page (e.g., `<link rel="canonical" href="https://gbfeeds.com/">`) — **confirms site is already canonicalized correctly**
- **Google Site Verification**: `xhm9c18xYxGqvWIffjaQy5-6zBB2h3AXxJQ3xtXLJHU`
- **Theme Color**: `#000000` (black)
- **Favicons**:
  - `apple-touch-icon` sizes: 57x57, 60x60, 72x72, 114x114, 120x120, 144x144, 152x152, 180x180
  - Source: `//img1.wsimg.com/isteam/ip/d82532f3-0270-4964-94c1-fade4071e01a/IMG_9340.png/:/rs=w:[SIZE],h:[SIZE],m`

### Per-Page SEO

| Page | Title | Meta Description | OG Image |
|---|---|---|---|
| `/` | GB Feeds - Home | "A small batch specialty deer feed..." | Buck Chow Lifestyle Feeder 2.jpg |
| `/products` | Products | (inherits global) | (home OG image) |
| `/our-story` | Our Story | (inherits global) | (home OG image) |
| `/why-gb-feeds` | Why GB Feeds | (inherits global) | (home OG image) |
| `/customer-reviews` | Customer Reviews | (inherits global) | (home OG image) |
| `/photo-gallery` | Photo Gallery | (inherits global) | (home OG image) |

### Manifest & Service Worker

- **manifest.webmanifest**: Referenced in every `<head>` but content is minimal/empty (GoDaddy default)
- **Service Worker**: None detected (no offline capability, no caching strategy)

### JSON-LD & Structured Data

- **Organization Schema**: Found in index.html (company name, logo, URL)
- **Product Schema**: Not found (would be beneficial for SEO, e-commerce)
- **BreadcrumbList**: Not found
- **LocalBusiness**: Not found (but could help if targeting hunters by region)

### robots.txt & sitemap.xml

- **robots.txt**: Not found in mirror (check live site)
- **sitemap.xml**: Not found in mirror (likely auto-generated by GoDaddy)

## 8. Forms & User Input

### Contact / Newsletter Forms

- **Newsletter Signup**: Found in footer (email input + subscribe button)
  - Endpoint: GoDaddy Online Store email list integration (not Mailchimp/Klaviyo)
  - Fields: Email address (required)
  - Success: Likely inline toast/redirect (unclear in static mirror)

### Chat / Support

- **Reamaze Widget**: Loaded in all pages via iframe
  - **No explicit contact form**: Visitors use chat widget or email

### Add-to-Cart

- **Form**: Minimal — button click triggers Poynt checkout redirect
- **Hidden Inputs**: Product ID, price (embedded in link href or data attribute)
- **Success**: Redirect to external Poynt checkout

## 9. Full Asset Inventory

### Logo & Favicon

- **Logo**: `IMG_9340.png` (served at multiple sizes from img1.wsimg.com)
  - Appears to be a deer/animal silhouette or farm imagery
  - Used in header navigation and footer

### Product Images

- **Hero Product**: `Buck Chow Lifestyle Feeder 2.jpg` (featured on home page)
- **Product Listing Images**: Stored in `img1.wsimg.com/isteam/ip/d82532f3-0270-4964-94c1-fade4071e01a/ols/`
  - Examples: `1K_TWS-640w__88103.jpg`, `2000Pro cat.900.jpg`, `LB_600-640w__14874.jpg`, `Lucky Buck 2000lb.jpg`

### Lifestyle / Gallery Images

- Multiple JPEG/PNG assets: hunting lifestyle, outdoor scenes, product demonstrations
- Stored in: `img1.wsimg.com/isteam/ip/d82532f3-0270-4964-94c1-fade4071e01a/`
- Examples: `_A733367.jpg`, `IMG_1091 (1).jpg`, `DSC08089-c31e863.jpeg`, etc.

### SVG Assets

- **Decorative blobs**: `blob-478b3b7.png`, `blob-8085ecb.png` (background graphics)
- **Icons**: Google Fonts, Font Awesome likely (no custom icon set detected)

### Asset CDN Analysis

- **Primary CDN**: `img1.wsimg.com` (GoDaddy-hosted)
- **Fonts**: `fonts.gstatic.com` (Google Fonts) + `img1.wsimg.com/gfonts/` (cached GoDaddy copy)
- **Third-party**: Poynt, Reamaze, TrustedSite, Visa (online-metrix) — all served from respective CDNs

### Asset Copy Status

- **Copied to `_inherited_assets/`**: ✅
  - Logo/favicon variations (multiple sizes from IMG_9340.png)
  - Product images (ols/ folder)
  - Lifestyle photography
  - Fonts from `fonts.gstatic.com` (full collection)
  - Online store assets from `onlinestore.wsimg.com`
- **Total files copied**: ~92 files (see bash output above)

## 10. Current State Assessment

### What's Complete & Stable

- **Core content**: 7 main pages, all populated with copy, images, CTAs
- **Brand identity**: Consistent logo, colors, typography across all pages
- **Navigation**: Simple, intuitive global nav (6 links)
- **Mobile responsiveness**: GoDaddy CSS classes (c1-* rules) handle breakpoints (good responsive design)
- **Payment integration**: Working Poynt checkout flow
- **Analytics**: GA4 already installed and reporting
- **Social proof**: Customer reviews, testimonials, gallery

### What's In-Progress / Incomplete

- **No blog / content marketing**: Only static marketing pages
- **No email capture**: Newsletter signup exists but unclear if connected to email service
- **No inventory management**: Stock levels not visible (managed entirely in Poynt backend)
- **Limited SEO**: No product schema, no category taxonomy, no rich snippets
- **No user accounts**: Account pages exist (m/account.html) but not part of public UX

### Areas Needing Attention in Rebuild

1. **E-commerce Platform Decision**:
   - Keep Poynt (minimal refactor, maintain live inventory)
   - Migrate to Shopify (better SEO, inventory management, more flexibility)
   - Migrate to WooCommerce (full control, higher hosting costs)
   - Recommendation: Clarify with stakeholder

2. **Product Page Enhancement**:
   - Add individual product detail pages (PDPs) with descriptions, specs, reviews
   - Implement product filters/sorting
   - Add product comparison tool

3. **SEO & Content**:
   - Add JSON-LD Product schema to each PDP
   - Write meta descriptions for each product
   - Consider regional landing pages ("Deer Feed for Kansas" etc.)
   - Blog for hunting tips, product care, seasonal guides

4. **Email & CRM**:
   - Integrate with Klaviyo or Mailchimp (newsletter, post-purchase flows)
   - Abandoned cart recovery
   - Post-purchase email sequences

5. **Analytics & Conversion**:
   - Implement event tracking for product views, add-to-cart, checkout starts
   - Set up conversion funnels in GA4
   - A/B test hero CTA copy and button colors

## 11. Ambiguities & Gaps (Summary)

| Issue | Severity | Resolution |
|---|---|---|
| Two identical `products` files | Low | Consolidate to single file; document as SiteSucker artifact |
| No individual product detail pages | Medium | Clarify if needed for rebuild; currently all products are listed view + direct checkout |
| Cart page is likely stub | Low | Verify on live site; expect redirect to Poynt-hosted checkout |
| Newsletter email service unclear | Medium | Check GoDaddy Online Store config; may need Klaviyo/Mailchimp integration |
| No FAQ page found | Low | Check if embedded in pages or external; clarify if needed in rebuild |
| Mobile account pages included in mirror | Low | Exclude from rebuild unless user account dashboard required |
| No product schema / structured data | Medium | Add in rebuild for SEO (especially for Google Shopping if planned) |
| Static mirror = pre-rendered HTML | N/A | Expected for SiteSucker backup; rebuild will be dynamic Next.js |

---

## Phase 1 Inspector — Documentation Specialist

**Inspector**: documentation-specialist subagent
**Date**: 2026-05-06 10:14
**Scope**: Completeness audit of `CONTENT_INVENTORY.md` (125 lines) and `ASSETS_INVENTORY.md` (120 lines) against the source mirror at `/Users/tylerpreisser/Downloads/gbfeeds.com/gbfeeds.com/` and copied assets at `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/_inherited_assets/` (92 files confirmed).

### Confirmed gaps

`CONTENT_INVENTORY.md` claims verbatim extraction but is **almost entirely empty for body copy**. Each per-page section has a `### Body Content` header followed by no content, then a `### Calls-to-Action (CTAs)` list that is mostly junk (`filler@godaddy.com` is a template placeholder, not a real CTA; `Customer Reviews` is a nav link mistaken for a CTA). The verbatim text exists in the source HTML and was not captured. Concrete missing blocks:

1. **Home (`/`) — entire body missing.** The source contains: `THE GB FEEDS DIFFERENCE` section heading; four pillar cards with headlines + body — `Proven Results` ("Over 7,500 inches of antler harvested with GB Feeds deer feed products in 2023 & 2024 and on pace to go even bigger in 2025!"), `Quality Products` ("Innovation and quality are all we know and cutting corners will never be an option."), `Unmatched Value` ("We sell our products directly to you, eliminating retail markups…"), `Superior Customer Service` ("Customer service is our thing and we love to hear your success stories."); a "Learn more" CTA; sub-hero line "A deer feed company founded for hunters, by hunters"; **a full FAQ section** (`FREQUENTLY ASKED QUESTIONS` with 4 Q&A pairs covering gravity vs. spin feeders, Buck Chow protein content, Corn Candy coverage rate, US shipping policy); contact block with phone `(620) 639-3337`, "Drop us a line!" headline, Email* form label, reCAPTCHA disclosure; copyright `© 2026 GB Feeds`. **None of this is in the inventory.** The cartographer's "no FAQ page" finding (Section 2 ambiguities) is technically right at the URL level but misses that the FAQ is embedded on home — a meaningful rebuild artifact.

2. **`/our-story` — entire founder narrative missing.** Inventory shows zero body content. Source contains the full Greg-signed narrative: "Have you ever bought a deer feed product and been disappointed when it didn't work? Me too…", the 2017 founding story ("Five years later and after dozens of product testing sites, hundreds of component trials and nearly a million trail cam pictures…"), the four-pillar restatement, the welcome closer ("…I would like to be the first to welcome you to the GB Feeds family. We're glad you're here! -Greg"). This is the brand's primary differentiation copy.

3. **`/why-gb-feeds` — entire pillars page body missing.** Inventory shows no body content. Source contains four full pillar sections (Proven Results / Quality Products / Unmatched Value / Superior Customer Service), each ~60–90 words, including the key stat "In 2023 and 2024, our customers harvested over 10,000 inches of antler using GB Feeds products right here in Kansas" — a different number than the home-page "7,500 inches" stat (cartographer should flag this as a copy inconsistency to resolve in rebuild).

4. **`/customer-reviews` — 22 testimonials missing.** Inventory captured exactly one quote ("I'm SOLD! Will be buying more, same day results!!! -Nathan"). Source has 22 distinct testimonials with attribution: Aaron, Trevor, Kaden, Dylan, Torrey, Brandon, Wayne, Nathan, Adam, Andy, Jerry, Seth, Jake, David, John, Blake, Greg L., Mason, plus 4 unattributed quotes. Each one is short verbatim copy that the rebuild needs.

5. **`/products` and `/photo-gallery` — body legitimately empty in static HTML, but inventory does not say so.** Both pages are JS-hydrated GoDaddy Online Store widgets (`PRODUCT_GROUP_LIST_RENDERED`, gallery widget) that load product data + images at runtime from the OLS API. The static mirror has zero product names, zero prices, zero gallery images in markup. **The inventory is silent on this.** It should explicitly note: "Product catalog content (names, prices, descriptions, SKUs) is NOT in the static mirror — must be sourced live from the GoDaddy OLS / Poynt admin or scraped from a logged-in session." Same for the gallery image set on `/photo-gallery`.

6. **Shared header/footer — incomplete.** Inventory's `Footer > Legal Links: "Likely privacy, terms (not explicitly found in static mirror)"` is wrong. Source footer contains explicit links to `/terms-and-conditions`, `/terms-and-conditions-1`, and `/privacy-policy`, plus the `Powered by GoDaddy Website Builder` attribution and "Connect With Us" social heading. Logo alt text and the "Account" / "Sign In" / "Create Account" / "Orders" / "My Account" / "Sign out" account-menu strings are also absent from the shared-components section.

7. **Asset inventory undercounts gallery and missing categories.**
   - `_inherited_assets/gbfeeds-isteam-assets/` actually contains 39 files (not the "~75 images" estimated in ASSETS_INVENTORY summary). Many are gallery photos that the inventory does not enumerate: `IMG_0001.JPG`, `IMG_0018.JPG`, `IMG_1091 (1).jpg`, `IMG_3618.jpg`, `IMG_3622.jpeg`, `IMG_3755.jpg`, `IMG_3900.JPG`, `IMG_4172.PNG`, `IMG_4215.jpg`, `IMG_4427.JPG`, `IMG_4433 (1).JPG`, `IMG_4436.JPG`, `IMG_4439.JPG`, `IMG_5026.jpg`, `IMG_8584.jpeg`, `IMG_9802.PNG`, `Luke.jpg`, `Luke 2.jpg`, `20231008_234054.jpeg`, `07EB939D-…jpeg`, `B4E87FD5-….JPG`, `DSC08089-c31e863.jpeg`, `www.gbfeeds.com (10).png`, plus 11 different `blob-*.png` decorative assets (only 2 documented). All present on disk; none table-listed.
   - `ols/` subdir contains 6 third-party `reveal_*.webp` files (Reveal trail-camera product imagery — `reveal_x_2.0_front_10.webp`, `reveal_x-pro_front_9.webp`, `reveal_external_solar_panel_front_9.webp`, `reveal_lithium_cartridge_bottom_9.webp`, `reveal_sd_card_pdp_packaging_9.webp`, `reveal_adjustable_camera_stake_front_9.webp`). These are **NOT GB Feeds brand assets** — they appear to be GoDaddy theme/template stock or unrelated co-marketing imagery. Inventory does not flag them; they should be excluded from the rebuild as not-brand-owned.
   - **Missing categories**: no logo SVG (PNG-only — flag as "may need vectorization for rebuild"); no OG card (cartographer noted OG falls back to `Buck Chow Lifestyle Feeder 2.jpg` — should be called out as an asset to design fresh); no `favicon.ico` (only Apple touch icon PNG sizes); no hero video (none on live site, confirmed); no separate `manifest` icon set beyond logo.

### Edge cases noted

- **Cartographer's "no PDPs" finding is confirmed.** Spot-checked `products.html`: zero product names/prices in markup, zero outbound links to PDPs. The only `href`s in scope are nav (`/`, `/products`, `/our-story`, etc.), legal (`/privacy-policy`, `/terms-and-conditions`), account (`/m/account`, `/m/orders`), and the GoDaddy Website Builder attribution. Product cards live entirely inside the `data-aid="PRODUCT_GROUP_LIST_RENDERED"` widget that hydrates via `wsimg.com` script bundles. No anchor-on-same-page, no Poynt link in static markup. **The "Add to Cart → Poynt" flow described in cartography Section 5 is inferred from script presence, not from any visible static link.** This is fine for routing but should be re-verified during Phase 2 live recon (browse to the live site, inspect a product card's actual hydrated `href`).
- **`products.html` and `products (1).html` confirmed identical** (both 85,304 bytes; SiteSucker dupe).
- **The "filler@godaddy.com" string** appears in every page — it is a GoDaddy WSB template placeholder for the not-signed-in account menu state, not real site content. Inventory should remove it from all CTA lists; it is noise.
- **Stat inconsistency**: home page says "7,500 inches" for 2023+2024; `/why-gb-feeds` says "10,000 inches" for the same period. Real authoring decision for rebuild — flag for client.
- **Mobile account pages** (`m/login.html`, `m/account.html`, `m/orders.html`, `m/login (1).html`, `m/api/`) are part of the GoDaddy OLS user portal and correctly excluded from public-site scope. ROUTING.md should reaffirm exclusion.
- **`markup/ad.html` and `sw.js`** in source mirror are not addressed anywhere in cartography or inventories. `sw.js` is a 33KB GoDaddy service worker (cartography Section 7 says "no service worker detected" — that is incorrect; `sw.js` is present at root). Low impact for rebuild (will not be ported), but the contradiction should be corrected.

### Recommendation: re-dispatch cartographer **YES**

`ASSETS_INVENTORY.md` is close enough that a small in-place patch could fix it (add the un-enumerated gallery files, flag the 6 `reveal_*.webp` as not-brand-owned, correct the 75→39 file count for the brand subdir, note the missing logo-SVG / OG / favicon.ico categories). That is a 15-minute fix.

`CONTENT_INVENTORY.md` is **not salvageable as-is** and must be re-dispatched. The current file does not deliver on its own promise of "verbatim content extracted from all public pages." Body content is missing for 5 of 7 pages (only `/customer-reviews` got a single quote and an H1; all others have empty body sections). The four-pillar copy block, the founder narrative, the on-home FAQ, the 22 testimonials, the contact phone number `(620) 639-3337`, the form labels, the footer legal links, and the brand-stat inconsistency are all retrievable in <30 minutes by a re-run pass that actually parses the rendered text from each HTML file (the minified markup makes naive regex pulls miss the content; the cartographer appears to have only captured what their selectors happened to match). Without this re-run, Phase 2 (Live Site Recon) and Phase 3 (rebuild) will be working from a content vacuum and will end up re-extracting the same text anyway.

**Suggested re-dispatch scope** (single tight task for codebase-cartographer):
1. Re-parse all 6 unique HTML files using a text-extraction approach that strips `<script>`/`<style>` and emits visible body text in source order.
2. Populate `### Headlines (H1/H2/H3)`, `### Subheads`, `### Body Paragraphs`, `### CTAs (real, not placeholders)`, `### Form Labels`, `### Footer Text` for each of: `/`, `/our-story`, `/why-gb-feeds`, `/customer-reviews`. (Mark `/products` and `/photo-gallery` as "JS-hydrated, no static body content; capture from live site in Phase 2.")
3. Patch `ASSETS_INVENTORY.md` with the missing gallery enumeration, the `reveal_*.webp` exclusion note, the corrected file count (39 in `gbfeeds-isteam-assets/`, 17 in `gbfeeds-isteam-assets/ols/`, plus `fonts/`, `fonts.gstatic.com/`, `onlinestore.wsimg.com/` to reach 92), and the missing-asset-categories list (logo SVG, OG card, favicon.ico).
4. Correct two factual errors in `01_cartography.md`: (a) Section 7 "Service Worker: None detected" — `sw.js` is present; (b) Section 2 footer claim "Likely privacy, terms (not explicitly found)" — both routes are linked in every footer.

Estimated rework: 30–45 minutes. Blocking impact on Phase 2: yes — Phase 2 needs CONTENT_INVENTORY as ground truth for the live-site comparison pass.

---

## Brand Stat Inconsistency

**Issue**: Two different antler-harvest statistics appear on the live site for the same time period (2023–2024):

| Page | Statistic | Exact Verbatim Quote |
|---|---|---|
| **/** (Home) | 7,500 inches | "Over 7,500 inches of antler harvested with GB Feeds deer feed products in 2023 & 2024 and on pace to go even bigger in 2025!" |
| **/why-gb-feeds** | 10,000 inches | "In 2023 and 2024, our customers harvested over 10,000 inches of antler using GB Feeds products right here in Kansas." |

**Source Files**:
- Home: `index.html`, line ~30 in extracted text
- Why GB Feeds: `why-gb-feeds.html`, line ~27 in extracted text

**Recommendation**: This is a client decision. Both numbers appear to be intentionally different statements:
- Home page: Broader (may include 2023, 2024, and run rate for 2025)
- Why GB Feeds page: More specific regional emphasis ("right here in Kansas")

**Action Required**: Clarify with client whether both statistics are correct (e.g., "7,500 in 2023–2024 actual + 2,500 projected for 2025 = ~10,000 forward-looking") or if one is an error. Standardize for rebuild.
