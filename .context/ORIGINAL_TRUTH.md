# GB FEEDS — ORIGINAL TRUTH (Canonical Source)

> **Purpose**: The single source of truth for what is actually on `https://gbfeeds.com/`. The Phase 6 builders MUST reference this file ONLY going forward — no invention, no paraphrasing, no creative additions.
>
> **Captured**: 2026-05-06 by internet-investigator (rescue pass).
> **Method**: Direct curl of every page in the live `sitemap.website.xml`, verbatim text extraction from rendered HTML data-aid markers, cross-referenced against `live_products.json` (live OLS API capture).
> **Live HTML snapshots used for extraction** (in `/tmp/`): `gb-home.html`, `gb-our-story.html`, `gb-why.html`, `gb-reviews.html`, `gb-gallery.html`, `gb-products.html`.

---

## 0. CANONICAL ROUTE LIST (the entire reachable site)

These are the ONLY routes that exist on the live site. Every `/feed-program`, `/field-club`, `/journal/*`, `/blog/*`, `/recipes/*`, `/contact` (as a standalone page), `/faq` (as a standalone page) — **all invented in the rebuild and must be removed**.

| Slug | `<title>` Tag | Visible page H1 (all caps as rendered) | Type |
|---|---|---|---|
| `/` | "Gb Feeds" | (no H1 — hero is image only) | Marketing — home |
| `/products` | "Products" | "All Products" (overlay on banner) | OLS catalog (JS-hydrated grid) |
| `/our-story` | "Our Story" | **OUR STORY** | Marketing |
| `/why-gb-feeds` | "Why GB Feeds" | **WHY GB FEEDS** | Marketing |
| `/customer-reviews` | "Customer Reviews" | (the welcome line is the title; no separate H1 above it) | Marketing |
| `/photo-gallery` | "Photo Gallery" | **PHOTO GALLERY** | Marketing (JS-hydrated carousel) |
| `/terms-and-conditions` | Legal | — | (in footer) |
| `/terms-and-conditions-1` | Legal — duplicate, legacy artifact | — | (in footer) |
| `/privacy-policy` | Legal | — | (in footer) |
| `/m/account` | OLS account portal | — | Account (sign-in) |
| `/m/create-account` | OLS account creation | — | Account |
| `/m/orders` | OLS order history | — | Account |
| `/products/ols/products/<slug>` | 16 individual PDPs | Product name | OLS-rendered |
| `/products/ols/categories/<slug>` | 4 OLS category pages (deer-feed-products, deer-feeders, apparel, tactacam-reveal-products) | Category name | OLS-rendered |
| `/products?olsPage=cart` | Cart panel | "Cart" | OLS query-string route |

**No `/contact` page**: contact is an embedded form on `/`, NOT a separate URL.
**No `/faq` page**: FAQ is an embedded section on `/`, NOT a separate URL.
**No `/feed-program` page**: NOT PRESENT ON ORIGINAL — invented in rebuild.
**No `/field-club` page**: NOT PRESENT ON ORIGINAL — invented in rebuild.
**No `/journal` or `/journal/*`**: NOT PRESENT ON ORIGINAL — invented in rebuild.
**No blog**: NOT PRESENT ON ORIGINAL.

---

## 1. THE NAV MENU (verbatim, exact — VERIFIED via screenshots)

**CRITICAL CORRECTION**: The header is THREE-PART, with a HAMBURGER MENU on desktop AND mobile (NOT inline nav links on desktop). All six nav links live INSIDE the hamburger drawer regardless of viewport.

Header bar layout (black bg, full-width sticky):
- **Left edge**: Hamburger menu icon (3 horizontal lines) — reveals slide-out drawer with the six nav links + account links.
- **Center**: GB Feeds logo image (raster PNG `IMG_9340.png`). The logo is a SQUARE BLACK BADGE with white outlined antler-buck silhouette + the word "GB FEEDS" stacked + tagline "GROW. BIGGER. BUCKS." beneath. Approximately 60–80px tall on desktop, 50–60px on mobile. The full logo (icon + wordmark + tagline) is ALL inside one PNG raster — there is no separate text wordmark in HTML.
- **Right cluster (in this order, left → right)**: Search icon (magnifying glass), Cart icon (shopping cart), Account icon (person silhouette).

**Desktop hamburger drawer contents (in order)**:
1. `Home` → `/`
2. `Products` → `/products`
3. `Why GB Feeds` → `/why-gb-feeds`
4. `Our Story` → `/our-story`
5. `Customer Reviews` → `/customer-reviews`
6. `Photo Gallery` → `/photo-gallery`

Plus the account-section links in the drawer: `Sign In` / `Create Account` / `Orders` / `My Account` / `Sign out`.

**Mobile**: identical pattern — hamburger reveals the same drawer.

There is NO "Shop" link, NO standalone "Reviews" link (it's "Customer Reviews"), NO "About" link (it's "Our Story"), NO "Contact" link in the nav. Contact lives on the home page only.

**Tagline "GROW. BIGGER. BUCKS."**: Confirmed embedded in the logo PNG. This IS a brand tagline / slogan and should be reproduced (recommended: vectorize the logo to SVG so the tagline scales cleanly).

---

## 2. HOME PAGE (`/`)

### 2.1 Sections in document order (top to bottom — VERIFIED via fresh screenshots)

1. **Hero band** — full-width lifestyle photograph: a man (Greg or model) in a tan shirt holding up a Buck Chow 40lb bag in a wooded field, gravity feeder visible behind him. NO text overlay, NO headline, NO CTA button. The image is the entire hero. (`BACKGROUND_IMAGE_RENDERED`.)
   - **NOT PRESENT ON ORIGINAL**: any hero headline like "Real Hunters. Real Results." or "Built for the Midwest." or any tagline overlaid on the hero. The original has NO hero text.
2. **FEATURED PRODUCTS** (all caps centered, data-aid `PRODUCT_GROUP_TITLE_RENDERED`) — horizontally-scrollable product carousel with hero-card style. Each card: full product image as background + text overlay showing product name (white, all caps), price (white), and **"Shop Now"** button (white pill button on dark image). Multiple SKUs scroll horizontally.
3. **CUSTOMER REVIEWS** (all caps centered, data-aid `GALLERY_SECTION_TITLE_RENDERED`) — horizontally-scrollable gallery of CUSTOMER TRAIL-CAM AND HARVEST PHOTOS (NOT testimonial text — these are real customer-submitted images: bucks at feeders, hunters with harvested deer, antlers, etc). Left/right scroll arrows (data-aid `GALLERY_SCROLL_LEFT/RIGHT_ARROW`). Below the photo strip: **`MORE CUSTOMER REVIEWS`** button (full-black pill, white text, all caps) → `/customer-reviews`.
4. **THE GB FEEDS DIFFERENCE** (all caps centered, data-aid `ABOUT_SECTION_TITLE_RENDERED`) — TWO-COLUMN layout. LEFT: a 2x2 (or 2x3) photo COLLAGE of customer harvest photos showing kids/men with bucks. RIGHT: heading "Proven Results" + body copy + "Learn more" CTA. Subsequent pillars (Quality Products, Unmatched Value, Superior Customer Service) each follow with image-text alternating layouts. (NOT a four-column grid as I originally described.)
5. **Our Story teaser** — image of Greg with three mounted bucks on a wood-shed wall, body heading "A deer feed company founded for hunters, by hunters" + body text, CTA: **"Learn more"** → `/our-story`.
6. **FREQUENTLY ASKED QUESTIONS** (all caps centered, data-aid `FAQ_SECTION_TITLE_RENDERED`) — 4 collapsible accordion rows. Each row: question text on left + chevron-down arrow on right + thin gray divider line. Accordion is single-open (one expands at a time).
7. **Contact Us** (data-aid `CONTACT_SECTION_TITLE_REND`) — two-column section. LEFT: "Drop us a line!" + form (Name, Email*, Message textarea, full-width black SEND button). Below button: small reCAPTCHA notice "This site is protected by reCAPTCHA and the Google [Privacy Policy] and [Terms of Service] apply." (with both legal links underlined). RIGHT: "Better yet, give us a call!" heading + phone number "(620) 639-3337".
8. **CONNECT WITH US** (all caps centered) — row of 4 social icons in NATIVE BRAND COLORS (NOT monochrome): Facebook (blue), Instagram (multicolor gradient), TikTok (black), YouTube (red square + white play triangle).
9. **FEATURED PRODUCTS (second instance)** — yes, the home renders the FEATURED PRODUCTS carousel a SECOND TIME below the social row. Same scrollable carousel, same products. This is unusual but confirmed in the captured screenshot.
10. **Footer** — minimal: 3 underlined links centered (Terms and Conditions / Privacy Policy / Terms and Conditions), business name "GB Feeds" centered below, "Copyright © 2026 GB Feeds - All Rights Reserved." centered, "Powered by GoDaddy Pro" badge bottom-right (not center). TrustedSite badge bottom-left.

**Floating widgets** (present on every page):
- TrustedSite green badge — bottom-left, `15px` offset
- Reamaze chat bubble — bottom-right, dark gray circle with chat icon

### 2.2 THE GB FEEDS DIFFERENCE — verbatim four pillars

Section title: **`THE GB FEEDS DIFFERENCE`** (CONFIRMED PRESENT on the original — Tyler's hunch that it was invented is wrong; it IS on the live home page).

Four pillars (in this order, each with H4 heading + paragraph below):

1. **Proven Results** — "Over 7,500 inches of antler harvested with GB Feeds deer feed products in 2023 & 2024 and on pace to go even bigger in 2025!"
2. **Quality Products** — "Innovation and quality are all we know and cutting corners will never be an option."
3. **Unmatched Value** — "We sell our products directly to you, eliminating retail markups.  Better ingredients, higher protein contents, and more pounds of product for your money."
4. **Superior Customer Service** — "Customer service is our thing and we love to hear your success stories."

The first pillar (Proven Results) has a CTA button **"Learn more"** → `/why-gb-feeds`.

### 2.3 FAQ section — verbatim (4 Q&A pairs)

Section title: `FREQUENTLY ASKED QUESTIONS`

1. **Q:** "Will GB Feeds products work in both gravity and spin feeders?"
   **A:** "Yes, Buck Chow and Corn Candy have been tested to work in both gravity and spin feeders."
2. **Q:** "What is the protein content in Buck Chow?"
   **A:** "Buck Chow provides an industry leading 20% protein content."
3. **Q:** "How much corn does a bag of Corn Candy treat?"
   **A:** "Each bag of Corn Candy enhances the aroma, flavor and nutrition of approximately 400-500lbs of corn."
4. **Q:** "Do you ship anywhere in the United States?"
   **A:** "We can ship Corn Candy (No Minimum) anywhere in the US and Buck Chow via pallet orders (Minimum 25 bags) anywhere in the US."

### 2.4 Contact section — verbatim

- Section title: **`Contact Us`**
- Left column heading: **`Drop us a line!`**
- Form fields (in order): `Name` (input), `Email*` (input, required), message textarea (no label visible — just placeholder/empty), submit button **`Send`**
- Right column heading: **`Better yet, give us a call!`**
- Right column body: **`(620) 639-3337`** (phone number — that is literally the entire body text of the right column)
- Below the form: small text "This site is protected by reCAPTCHA…" (reCAPTCHA inline notice)

### 2.5 Connect With Us / Footer

- Section title above social icons: **`Connect With Us`**
- Social icons: Facebook, Instagram, TikTok, YouTube
- Footer business name: **`GB Feeds`**
- Footer copyright: **`Copyright © 2026 GB Feeds - All Rights Reserved.`**
- Footer page link 0: **`Terms and Conditions`** → `/terms-and-conditions`
- Footer page link 1: **`Privacy Policy`** → `/privacy-policy`
- Footer page link 2: **`Terms and Conditions`** → `/terms-and-conditions-1` (duplicate — content artifact, both labels are literally identical)
- Powered-by: GoDaddy badge with link to `https://www.godaddy.com/websites/website-builder?...`

### 2.6 Visual signature — Home

- **Dominant background color**: pure white `#ffffff` with full-bleed black hero band at top.
- **Typography character**: Display = `Archivo Black` (single weight, all caps for section titles, condensed sans). Body = `Montserrat` (400/700).
- **Vertical rhythm**: spacious — section padding is generous (~96–128px top/bottom on desktop). The pillar block is the densest; the FAQ collapses tight.
- **Above-the-fold image**: a full-bleed lifestyle image of a Buck Chow bag on the ground (the OG share image `Buck Chow Lifestyle Feeder 2.jpg`). NO text overlay, NO CTA overlay — just the image and the sticky black header.
- **Unique visual moments**: NONE. There is no parallax, no video autoplay (the BACKGROUND_IMAGE_RENDERED is image-only despite the `videoType="embed"` attribute — no `<video>` tag is actually rendered), no signature animation, no scroll-jacking. The site is fully native-scroll, GoDaddy WSB defaults.
- **Text alignment**: Section titles are CENTERED (`THE GB FEEDS DIFFERENCE`, `CUSTOMER REVIEWS`, `FREQUENTLY ASKED QUESTIONS` all centered). Body copy is also centered in the four-pillar block. The story-teaser body is centered.
- **Button style**: black fill, white text, ZERO border-radius (sharp corners), no shadow, no animation — hover shifts text from white to `#c6c6c6`.

---

## 3. /products

### 3.1 Structure (VERIFIED via fresh screenshot)

The page has THREE sections:

1. **Banner hero** — full-width banner image (a feeder full of cracked corn / shelled grain) with the text **"All Products"** centered as overlay (white text, semi-transparent dark gradient behind for legibility). This is the page's only "hero" element.
2. **Left sidebar (filter list)** — vertical text list of 5 filter labels (no checkboxes, no expanding sub-filters):
   - **`All Products`** (active by default, bold/underline)
   - `Deer Feed Products`
   - `Deer Feeders`
   - `Apparel`
   - `Tactacam Reveal Products`
3. **Product grid** (right of sidebar) — 3-column grid (desktop) of all 16 SKUs. Each card: square product image, product name centered below image, price below name, sale price (if applicable) shown in red strike-through pattern (`$25.00` strikethrough → `$19.99` red). Above the grid (top-right): **"Most popular"** sort dropdown.
4. **Pagination** below the grid: numbered page links — currently shows `1 2` with the pagination dot indicator. The catalog has 16 SKUs, displayed in 2 pages (likely 9 per page on desktop).

The page does NOT have a separate `<h1>` ABOVE the banner — the "All Products" overlay text on the banner IS the H1 equivalent.

### 3.2 Catalog (verbatim, from `live_products.json` captured 2026-05-06)

16 SKUs total in a grid (4 columns desktop, 2 columns mobile, JS-hydrated). Names captured EXACTLY as the OLS API returns them (note inconsistent ALL-CAPS / Title-Case / Mixed casing; this is a live-site quality issue, not an artifact — the rebuild should normalize):

| # | Name (verbatim) | Display Price | Sale Price | Slug |
|---|---|---|---|---|
| 1 | BUCK CHOW HIGH PROTEIN FEED-40LB | $19.99 | — | buckchow |
| 2 | CORN CANDY FLAVORED ATTRACTANT | $17.99 | — | corn-candy |
| 3 | BUCK CHOW- 2,000lb Pallet | $999.99 | $949.99 | buck-chow-2000lb-pallet |
| 4 | GB Feeds Digital Print Camo Hat | $25.00 | $19.99 | gb-feeds-digital-print-camo-hat |
| 5 | GB Feeds Black Hat | $25.00 | $19.99 | gb-feeds-black-hat |
| 6 | Reveal X 2.0 | $119.99 | — | reveal-x-20 |
| 7 | Reveal X-Pro | $149.99 | — | reveal-x-pro |
| 8 | TACTACAM REVEAL BUNDLE PACK- X GEN 2.0 CAMERA + LITHIUM BATTERY PACK + SD CARD BUNDLE | $179.99 | — | tactacam-reveal-bundle-pack-x-gen-20-camera-lithium-battery-pack-sd-card-bundle |
| 9 | 32GB SD CARD | $19.99 | — | 32gb-sd-card |
| 10 | LITHIUM RECHARABLE BATTERY CARTRIDGE | $49.99 | — | lithium-recharable-battery-cartridge |
| 11 | ADJUSTABLE CAMERA STAKE | $49.99 | — | adjustable-camera-stake |
| 12 | EXTERNAL SOLAR PANEL | $59.99 | — | external-solar-panel |
| 13 | Texas Wildlife Supply 2,000LB Gravity Protein Feeder With Ladder & Catwalk | $1,999.99 | — | texas-wildlife-supply-2000lb-gravity-protein-feeder-with-ladder--catwalk |
| 14 | Texas Wildlife Supply 600LB Protein Gravity Feeder | $999.99 | — | texas-wildlife-supply-600lb-protein-gravity-feeder |
| 15 | Texas Wildlife Supply 600LB Lucky Buck Spin Feeder | $999.99 | — | texas-wildlife-supply-600lb-lucky-buck-spin-feeder |
| 16 | Texas Wildlife Supply 2,000LB Spin Feeder | $1,699.99 | — | texas-wildlife-supply-2000lb-spin-feeder |

All 16 carry `available: true, in_stock: true, total_on_hand: null` (GoDaddy's public API does not expose stock counts).

### 3.3 Product card structure

Each card shows: product image (square, 1:1 aspect), product name (centered), price (struck-through if on_sale, sale price next to it). Card click → PDP at `/products/ols/products/<slug>`. No "Add to Cart" button on the catalog grid card itself — the AddToCart button only appears on the PDP. There IS a quick-add button on the home `Featured Products` carousel cards (an `<button>`, not an `<a>` — JS handler that POSTs to OLS).

### 3.4 Categories

Category pages exist at `/products/ols/categories/<slug>` for 4 categories — but there is no visible category filter UI on `/products` itself. Categories are only discoverable via deep links from product detail pages or sitemap.

| ID | Slug | Name |
|---|---|---|
| 6 | apparel | Apparel |
| 7 | deer-feed-products | Deer Feed Products |
| 8 | tactacam-reveal-products | Tactacam Reveal Products |
| 9 | deer-feeders | Deer Feeders |

### 3.5 Visual signature — /products

- White background, no banner image, no hero — the page begins with the sticky header and immediately shows the product grid.
- Cards have subtle gray border (`#dadada` / `#e2e2e2`), white fill, no shadow, no hover lift.
- Sale prices: original price strikethrough in gray, sale price in black.

---

## 4. /our-story

### 4.1 Layout (VERIFIED via screenshot)

Section title: **`OUR STORY`** (all caps, centered, Archivo Black, small-medium size, top of page).

Three IMAGE-AND-TEXT row blocks in alternating left/right alignment:

- **Row 1**: Image LEFT, text RIGHT.
  - Image: photo of Greg standing arms-crossed in front of a wood-shed with three mounted whitetail bucks on the wall behind him. (file: `IMG_1091 (1).jpg`)
  - Text RIGHT: paragraphs 1 + 2 of the founder narrative.
- **Row 2**: Image RIGHT, text LEFT.
  - Image: a trail-cam still showing a giant whitetail buck in tall grass, with the trail-cam timestamp overlay visible at bottom-left ("06.05.2023 ... CAMERA1") — a real captured trail-cam frame, not a posed photo. (file: `IMG_0018.JPG`)
  - Text LEFT: paragraph 3 (the four pillars summary, with Proven Results / Quality Products / Unmatched Value / Superior Customer Service in **bold**).
- **Row 3**: Image LEFT, text RIGHT.
  - Image: Greg crouched in a corn-stubble field with a giant harvested whitetail buck, dressed in camo. (file: `20231008_234054.jpeg`)
  - Text RIGHT: paragraphs 4 + 5 + signature `-Greg`.

Below row 3: `CONNECT WITH US` section (4 native-color social icons), then minimal footer (3 underlined legal links + business name + copyright + GoDaddy Pro badge).

### 4.2 Body copy verbatim (in document order)

> "Have you ever bought a deer feed product and been disappointed when it didn't work? Me too..."
>
> "In 2017, I began to envision a deer feed company unlike any other. A company with product tested right here in the Midwest with a proven track record of success. Five years later and after dozens of product testing sites, hundreds of component trials and nearly a million trail cam pictures, GB FEEDS WAS BORN!"
>
> "Being the biggest feed company has never been the goal, we want to be the BEST feed company. Our direct to consumer model is based on four pillars, **Proven Results**, **Quality Products**, **Unmatched Value** and **Superior Customer Service**. These pillars guide the company in every decision we make and serve as the foundation for all current and future products."
>
> "If you're in the market for quality deer feed products, proven to help you develop and harvest bigger bucks, at a value you can afford, I would like to be the first to welcome you to the GB Feeds family."
>
> "We're glad you're here!"
>
> **-Greg**

(Note: in the rendered HTML, paragraphs 1 + 2 are concatenated into ABOUT_DESCRIPTION_RENDERED0; paragraphs 3 + 4 + 5 + signature are in ABOUT_DESCRIPTION_RENDERED1 / RENDERED2. The visual rendering still produces five paragraph "feels" via line breaks within the data-aid.)

### 4.3 Visual signature — Our Story

- Background: white. No black band.
- Typography: same as home (Archivo Black title, Montserrat body).
- Vertical rhythm: spacious — each image has full breathing room.
- Images dominate above the fold AND below the fold. The text:image ratio is roughly 50:50.
- Text alignment: centered.
- No CTA button on this page (other than the social icons in `Connect With Us`).

---

## 5. /why-gb-feeds

### 5.1 Layout (VERIFIED via screenshot)

Section title: **`WHY GB FEEDS`** (all caps, centered, top of page).

Four IMAGE-AND-TEXT row blocks in alternating left/right alignment, one per pillar (in order Proven Results → Quality Products → Unmatched Value → Superior Customer Service):

- **Row 1 (Proven Results)**: Image LEFT, text RIGHT.
  - Image: 4-photo COLLAGE of customer harvest photos arranged 2x2 (kid in orange hat with antlers; man with giant trophy buck; teenager with antlers; mature buck up close).
  - Text RIGHT: heading "Proven Results" + body copy.
- **Row 2 (Quality Products)**: Image RIGHT, text LEFT.
  - Image: Bag of Buck Chow in the bed of a truck or on a tailgate, with sun-flare lifestyle composition.
  - Text LEFT: heading "Quality Products" + body copy.
- **Row 3 (Unmatched Value)**: Image LEFT, text RIGHT.
  - Image: extreme close-up of golden corn / feed pellets filling the frame (texture shot).
  - Text RIGHT: heading "Unmatched Value" + body copy.
- **Row 4 (Superior Customer Service)**: Image RIGHT, text LEFT.
  - Image: a HANDWRITTEN THANK-YOU NOTE attached to a bag of Buck Chow ("Blake — first time seeing these bucks since putting out your attractant! ... Skye Ferebee" or similar — handwritten in blue ink on white paper).
  - Text LEFT: heading "Superior Customer Service" + body copy.

Below row 4: minimal footer (3 underlined legal links + business name + copyright + GoDaddy Pro badge). NO social icons block on this page — `CONNECT WITH US` is NOT present here. NO CTAs anywhere on this page.

### 5.2 Verbatim per-pillar copy

**Proven Results** (image: lifestyle photo of harvested buck)
> "When we say we help hunters create their once in a lifetime story, we mean it. It's the foundation of our company and it's who we are. In 2023 and 2024, our customers harvested over 10,000 inches of antler using GB Feeds products right here in Kansas."

**Quality Products** (image: product photo of Buck Chow / Corn Candy bag)
> "Every component that goes into a Bag of Buck Chow or a Bag of Corn Candy has a "reason to be". It's simple, if it doesn't increase the nutrition, attraction, antler growth or herd health, it doesn't make the cut. Innovation and quality are all we know and cutting corners will never be an option."

**Unmatched Value** (image: product on truck bed / lifestyle)
> "We offer our products directly to you, which eliminates the retail markup and allows us to increase the quality of the components that go into every bag of Buck Chow or bag of Corn Candy. This means better components, higher protein contents, increased nutritional values and more pounds of product for your money."

**Superior Customer Service** (image: customer trail-cam moment)
> "Customer service is our thing. If you're not totally satisfied with your purchase, just pick up the phone or send us a message on social media and we'll make it right. We also love your feedback, love your trail camera and harvest photos, and are just a phone call away if you need advice on how to put our products to work for you on your hunting property."

### 5.3 Brand-stat inconsistency

The home version says **7,500 inches** for the same period (2023 & 2024).
This page says **10,000 inches** for the same period.
The Buck Chow PDP says **5,000 inches**.
**Three different numbers, same brand stat.** The rebuild MUST flag this and standardize on one canonical number with the client. Do not invent a fourth number.

### 5.4 Visual signature — Why GB Feeds

- White background, no hero band.
- Each pillar block is approximately 50/50 image-text on desktop (alternating left/right alignment of the image — this is the GoDaddy WSB "About" widget default).
- Mobile collapses to image-on-top, text-below.
- No CTAs on this page.

---

## 6. /customer-reviews

### 6.1 Layout (VERIFIED via screenshot)

Page title (data-aid `CONTENT_WELCOME_TITLE_RENDERED`, centered, multi-line in display): **`No paid sponsorships, no famous TV personalities, just real hunters sharing real success stories`**

The title wraps onto 3 lines centered; appears in a slightly more refined / editorial weight than the rest of the type system (looks like Montserrat 700 or possibly a serif italic accent — re-verify in Phase 6).

Below the title: a single-column LEFT-ALIGNED tightly-stacked list of 22 testimonials (data-aid `MENU_ITEM_*`). The list is offset LEFT (not centered) — each review's quote text is on one line, then the attribution `-FirstName` on the next line in slightly smaller weight. The whole stack sits in a column approximately 480–540px wide, hugged to the LEFT half of the page (with empty space on the right). **NO photos. NO avatars. NO dates. NO platform attribution. NO star ratings. NO dividers between reviews.** Just plain text.

### 6.2 All 22 testimonials (verbatim, in order)

1. "Let me tell you this stuff works! Thanks GB Feeds!" -Aaron
2. "That Corn Candy works!" -Trevor
3. "I am very happy with it, I've got some big deer on camera. Quality product" -Kaden
4. ""This tall 8 missing since September, put out Buck Chow and he shows up!" -Dylan
5. ""Corn Candy out at 3:41PM and 6:15 a stud showed up, never saw him before." -Torrey
6. "I put some out for my ole lady and holy s#&t deer on that stuff all day!" -Brandon
7. "These deer are loving the Buck Chow" -Wayne
8. "I'm SOLD! Will be buying more, same day results!!!" -Nathan
9. "That Corn Candy has some serious smell" -Brandon
10. "Apparently the Buck Chow is lip lickin' good" -Adam
11. "7 hours after putting a bag out, they are showing up non-stop" -Andy
12. "My bucks are loving this feed, antler growth is fantastsic" -Jerry  *(typo "fantastsic" preserved on the live site)*
13. "DUDE this stuff is fire!" -Jon
14. "Put the camera up at new location at 7:20PM, bucks there at 8:15!" -Seth
15. "The one I was hoping for showed up" -Jake
16. "They didn't wait around to come in, went through all 700lbs" -David
17. "Got some studs hitting it" -Nathan
18. "Dumped a bag at 6pm, bucks already eating on it at 6:30pm" -John
19. "First time seeing these bucks after putting out your attractant!" -Blake
20. "That corn candy is awesome! Mixed a little in, boom two bucks!" -Greg L.
21. "This Corn Candy is impressive!" -Nathan
22. "GB Feeds brought him in, was gone for a month!" -Mason

(Reviews #4 and #5 begin with a "smart" left-double-quote then a regular quote — this is likely a content-paste artifact in the GoDaddy editor. Either present this verbatim or normalize quote marks consistently — but do not alter the wording.)

### 6.3 Visual signature — /customer-reviews

- White background.
- Stark, single-column, no decoration.
- Every review uses the same heading-style font (Archivo Black or Montserrat 700) for the quote and a slightly smaller weight for the attribution.
- Tight vertical rhythm — quotes are stacked maybe 24–32px apart with no dividers, no cards, no avatars, no quotation-mark glyphs.
- This is the most BRUTALLY MINIMAL page on the site. Preserve that authenticity in the rebuild.

### 6.4 Customer testimonial PHOTOS — where do they actually live?

**TYLER'S QUESTION ANSWERED**: The `/customer-reviews` page itself contains ZERO photos. There are no customer photos on this page — only text reviews.

**Customer photos DO appear in TWO places on the original site:**

1. **Home page `CUSTOMER REVIEWS` carousel** — a horizontally-scrollable strip of CUSTOMER TRAIL-CAM AND HARVEST PHOTOS positioned ABOVE the "MORE CUSTOMER REVIEWS" CTA. These are real customer-submitted images: bucks at feeders, hunters with harvested deer, antlers in fields. This is the same widget family as `/photo-gallery` (data-aid `GALLERY_*`) but with a different image set. Loaded via the GoDaddy WSB gallery widget, NOT exposed in the static HTML.
2. **Home page `THE GB FEEDS DIFFERENCE` block, "Proven Results" pillar** — has a 4–6 photo COLLAGE (mosaic grid) of customer harvest photos on the LEFT side of that pillar's row.
3. **`/why-gb-feeds` page, "Proven Results" row** — a 4-photo collage (2x2 grid) of customer harvest photos on the LEFT.
4. **`/photo-gallery` page** — the dedicated gallery, hero viewer with a thumbnail filmstrip below.

**For the rebuild's "Kansas-state-map fade-in" treatment**: the SOURCE for customer photos must be:
1. The actual hydrated images from any of the gallery widgets above — re-captured via headless-browser scrape of the live site.
2. **Fresh customer-submitted trail-cam photos** the brand has on hand (Tyler should request these from Greg).

There is NO existing "customer photo wall over a Kansas map" on the site that the rebuild can mirror 1:1. **The fade-in-over-Kansas-map treatment is a NEW design element** being added by the rebuild. It must be sourced from real customer photos provided by the brand — NOT invented from stock photography. The rebuild should also preserve the home-page horizontal-scroll customer photo strip as it is the closest analog.

### 6.5 Photo Gallery vs Customer Reviews — distinction

`/photo-gallery` (separate page) is a HORIZONTAL CAROUSEL gallery (data-aid `GALLERY_SCROLL_LEFT/RIGHT_ARROW`, `THUMBNAIL_NAV_LIST`) of LIFESTYLE / HUNTING / PRODUCT-IN-FIELD photos — likely Greg's own trail-cam and harvest shots, not reviews. The page header is just `Photo Gallery`. No body copy. No captions. JS-hydrated; the static HTML only renders the carousel scaffold + scroll arrows. The home `CUSTOMER REVIEWS` gallery is a DIFFERENT widget instance with DIFFERENT images (customer-submitted success-story shots).

---

## 7. /photo-gallery

### 7.1 Structure (VERIFIED via screenshot)

Section title: **`PHOTO GALLERY`** (all caps, centered, top of page)

The gallery layout has TWO components:

1. **Hero viewer** — large central single image (~800×600 desktop, full-width minus margins) showing the currently-selected photo. Adjacent thumbnails on either side appear PARTIALLY visible (peek-through preview of previous/next). Most photos are LIFESTYLE / HARVEST shots: hunter holding giant antlered buck in field, kid with first deer, big bucks at feeders, scenic Kansas-prairie composition.
2. **Thumbnail filmstrip** — horizontally-scrollable strip of small square thumbnails directly beneath the hero. Approximately 12 thumbnails visible at a time on desktop, with left/right scroll arrows to advance the strip (data-aid `GALLERY_SCROLL_LEFT/RIGHT_ARROW`, `THUMBNAIL_NAV_LIST`). Click any thumbnail to update the hero viewer. The arrows on the strip allow scrolling to see all photos in the gallery.

NO intro copy, NO subtitle, NO description, NO captions on individual photos. Just the page title and the gallery widget.

The static HTML does NOT embed the image filenames — they hydrate from the WSB gallery widget. To capture the actual images for the rebuild, scrape the live page via headless browser OR Tyler requests the original photos from Greg.

### 7.2 Visual signature — /photo-gallery

- White background.
- Centered title.
- Carousel takes ~80% of viewport width on desktop, with scroll arrows on either side.
- Mobile: same carousel, reduced to single thumbnail width with swipe.

---

## 7B. PDP LAYOUT (`/products/ols/products/<slug>`) — verified via Buck Chow screenshot

The PDP is a TWO-COLUMN layout:

**LEFT column** (~50% width):
- Main product image (square, ~480×480 desktop)
- Below the main image: a horizontal thumbnail filmstrip (5 thumbnails for Buck Chow) — click a thumb to swap into the main viewer.

**RIGHT column** (~50% width):
- Product name in bold, all caps for some SKUs (e.g., `BUCK CHOW HIGH PROTEIN FEED-40LB`)
- Price (e.g., `$19.99`)
- "Quantity" label + numeric stepper input (default value `1`)
- TWO buttons side by side:
  - **`ADD TO CART`** (black fill, white text, full uppercase, sharp corners)
  - **`Buy with G Pay`** (black fill, white "G Pay" Google Pay logo)
- "Share" label + Facebook icon + X (Twitter) icon
- Description heading (bold): **"Extra Inches Aren't An Accident!"** (this is the Buck Chow tagline — different products have different headings)
- Body paragraph (Buck Chow):
  > "The perfect balance of attraction and nutrition, Buck Chow is a complete, 20% high protein deer feed, featuring GB Feed's Real Results Protein Pellets and antler growing minerals combined with all natural grains and roasted soybeans to deliver year round attraction and nutrition for better herd health and maximum antler growth."
- Bulleted list of features:
  > - Tested and proven right here in the Midwest
  > - Designed to be fed year-round from early spring all the way through shed season
  > - Includes minerals such as Calcium and Phosphorus for optimal herd health and antler growth
  > - Long Range Aroma To Attract Deer
  > - Can be used in gravity feeders, spin feeders or ground piles
  > - Over 5,000 inches of proven results and counting!  *(third inconsistent stat — flagged)*

**Below the two columns**: a "You May Also Like" section showing related products (3 cards in a row on desktop, name + price + image, click-to-PDP).

NO product reviews on the PDP. NO Q&A section. NO size/variant selectors (no SKUs have variants).

## 8. CART & CHECKOUT FLOW (verified)

- **Cart icon in header**: `<a>` with `data-aid="CART_ICON_RENDER"`. Points to `https://gbfeeds.com/products?olsPage=cart` (a query-string-routed cart panel that renders within the SPA shell — domain stays on `gbfeeds.com`).
- **Add to Cart on PDP**: `<button>` (NOT a link). JavaScript handler POSTs to `https://d82532f3-0270-4964-94c1-fade4071e01a.onlinestore.godaddy.com/api/v1/orders/...`. Cart count badge increments. NO domain change.
- **Cart panel** (`/products?olsPage=cart`): line items, quantity, subtotal, "Continue shopping" + "Checkout" buttons. NO login required.
- **Checkout step**: clicking Checkout REDIRECTS to `https://d82532f3-0270-4964-94c1-fade4071e01a.mysimplestore.com/checkout`. Domain hop. This is GoDaddy's pre-rebrand OLS checkout host (still operational).
- **Step 1 fields** (no payment yet): Email + subscribe checkbox, Full name, Country (US default), Street address, Apt/suite (optional), City, State (dropdown), ZIP, Phone (optional). Shipping rate calculated post-address. Payment lazy-loads after shipping is complete.
- **Wallets supported on checkout**: Poynt (GoDaddy Payments), Paze (Visa+Mastercard click-to-pay), Google Pay. ThreatMetrix fingerprinting runs in the background.

**For the rebuild**: clicking a product card on the original goes to `/products/ols/products/<slug>` (a JS-hydrated PDP). The cart icon in the header is clickable → `/products?olsPage=cart`. Checkout HOPS to `*.mysimplestore.com`. **The rebuild must decide whether to preserve the GoDaddy OLS backend (and accept the cross-domain hop) or migrate to a new commerce backend.**

---

## 9. WHAT THE REBUILD INVENTED (must remove or rebuild faithfully)

| Invented in rebuild | Status on original |
|---|---|
| `/feed-program` route | **NOT PRESENT ON ORIGINAL** — remove |
| `/field-club` route | **NOT PRESENT ON ORIGINAL** — remove |
| `/journal/*` blog routes | **NOT PRESENT ON ORIGINAL** — remove (no blog exists) |
| `/contact` standalone page | **NOT PRESENT ON ORIGINAL** — contact lives ON the home, embedded |
| `/faq` standalone page | **NOT PRESENT ON ORIGINAL** — FAQ lives ON the home, 4 Qs only |
| Any "Field Notes" / "Journal" / "Stories" content | **NOT PRESENT ON ORIGINAL** |
| Any newsletter / email-capture beyond footer field | **NOT PRESENT ON ORIGINAL** |
| Any membership / loyalty / points program | **NOT PRESENT ON ORIGINAL** |
| Hero headline / hero tagline copy | **NOT PRESENT ON ORIGINAL** — hero is image-only |
| "About" page (separate from Our Story) | **NOT PRESENT ON ORIGINAL** — Our Story IS the about |
| Multi-column footer with site map | **NOT PRESENT ON ORIGINAL** — footer is minimal: 3 legal links + social + copyright |
| Product reviews on PDPs | **NOT PRESENT ON ORIGINAL** — no PDP review widget; testimonials are only on /customer-reviews + home gallery |
| FAQ schema / structured data | NOT PRESENT but NOT invented — adding it is fine |

## 10. WHAT THE REBUILD MUST PRESERVE (clichés / signature elements)

These ARE on the original and must be kept verbatim:

1. **"THE GB FEEDS DIFFERENCE"** as a section title (all caps, centered) on home — CONFIRMED PRESENT.
2. The four pillars in this exact order with the EXACT copy in section 2.2: Proven Results → Quality Products → Unmatched Value → Superior Customer Service.
3. The four FAQ Q&As verbatim in section 2.3.
4. The 22 testimonials verbatim in section 6.2 (preserve typo "fantastsic" or note its correction).
5. The Greg founder narrative in section 4.2 (his voice, signed `-Greg`).
6. Phone number `(620) 639-3337`.
7. Black + white monochrome palette (no accent color on original — debatable whether the rebuild can add one, but if so, document the deviation).
8. Archivo Black for display, Montserrat for body.
9. Sharp-cornered buttons (zero border-radius).
10. The brand stat must be ONE NUMBER (currently 5,000 / 7,500 / 10,000 — pick one with Greg's input; do not invent a fourth).
11. "No paid sponsorships, no famous TV personalities, just real hunters sharing real success stories" as the customer-reviews page header.
12. Greg's signature line `-Greg` at the end of Our Story.
13. Section title casing pattern: ALL CAPS for section labels (`THE GB FEEDS DIFFERENCE`, `CUSTOMER REVIEWS`, `FREQUENTLY ASKED QUESTIONS`), Title Case for page titles (`Our Story`, `Why GB Feeds`, `Photo Gallery`).
14. The Featured Products carousel on home (not a static grid — a horizontally scrollable carousel).
15. Six-item primary nav: Home / Products / Why GB Feeds / Our Story / Customer Reviews / Photo Gallery — in that exact order.

---

*End of ORIGINAL_TRUTH.md — this is the canonical source. Phase 6 builders, reference ONLY this file. Update this file (with diff log) if the live site changes; do not invent content.*
