# GB Feeds — Phase 2 Live Recon Report

> Forensic reconnaissance pass on the live production site at https://gbfeeds.com/.
> Lead: internet-investigator. Date: 2026-05-06.
> Companion artifacts: `live_products.json` (16 products, full schema), `screenshots/original/*.png` (17 captures), `_inherited_assets/from_live/` (logo, OG card, manifest, 57 product images).

---

## 1. Crawl & Route Map

The cartographer's 7-route static-mirror inventory is **confirmed** as the marketing-page set, but the live site exposes several additional routes that were not surfaced (account portal, OLS PDPs, OLS category pages, dual legal pages, cart/checkout). The ground truth is `https://gbfeeds.com/sitemap.xml`, which is a sitemap-index pointing to three sub-sitemaps:

- `sitemap.website.xml` — 13 marketing/account URLs
- `sitemap.ols.xml` — 22 commerce URLs (1 catalog index + 16 PDPs + 4 category pages + 1 OLS root + home)
- `sitemap.ola.xml` — 1 URL (home only; "ola" = online-appointments scaffold, unused)

### Confirmed marketing routes (from `sitemap.website.xml`)

| URL | Purpose | In static mirror? |
|---|---|---|
| `/` | Home — hero, four-pillar block, Our Story teaser, customer-reviews teaser, on-home FAQ, contact form | ✅ |
| `/products` | OLS catalog grid (JS-hydrated) | ✅ (stub only) |
| `/our-story` | Greg-signed founder narrative | ✅ |
| `/why-gb-feeds` | Long-form four-pillar page | ✅ |
| `/customer-reviews` | 22 testimonials | ✅ |
| `/photo-gallery` | OLS gallery widget (JS-hydrated) | ✅ (stub only) |
| `/terms-and-conditions` | Terms page | ❌ NOT in mirror |
| `/terms-and-conditions-1` | Duplicate Terms page (legacy / draft) | ❌ NOT in mirror |
| `/privacy-policy` | Privacy Policy | ❌ NOT in mirror |
| `/m/login` | OLS account login portal | ✅ |
| `/m/reset` | Password reset | ❌ |
| `/m/create` / `/m/create-account` | Account creation | ✅ partial |

**Surprise — dual T&C pages**: `/terms-and-conditions` AND `/terms-and-conditions-1` are both present in the live sitemap. Footer points to both. Likely a content-edit artifact in the GoDaddy WSB CMS where a duplicate page was created and never deleted. **Rebuild action**: collapse to a single `/terms` page.

### Surprise — commerce routes not in static mirror (from `sitemap.ols.xml`)

| URL | Purpose |
|---|---|
| `/products/ols/products` | OLS catalog index |
| `/products/ols/products/buckchow` | Buck Chow PDP |
| `/products/ols/products/corn-candy` | Corn Candy PDP |
| `/products/ols/products/buck-chow-2000lb-pallet` | Pallet PDP |
| `/products/ols/products/gb-feeds-digital-print-camo-hat` | Apparel PDP |
| `/products/ols/products/gb-feeds-black-hat` | Apparel PDP |
| `/products/ols/products/reveal-x-20` | Tactacam PDP |
| `/products/ols/products/reveal-x-pro` | Tactacam PDP |
| `/products/ols/products/tactacam-reveal-bundle-pack-x-gen-20-camera-lithium-battery-pack-sd-card-bundle` | Tactacam bundle PDP |
| `/products/ols/products/32gb-sd-card` | Tactacam SD-card PDP |
| `/products/ols/products/lithium-recharable-battery-cartridge` | Tactacam battery PDP (note: typo "recharable") |
| `/products/ols/products/adjustable-camera-stake` | Tactacam stake PDP |
| `/products/ols/products/external-solar-panel` | Tactacam solar PDP |
| `/products/ols/products/texas-wildlife-supply-2000lb-gravity-protein-feeder-with-ladder--catwalk` | Feeder PDP (note double dash) |
| `/products/ols/products/texas-wildlife-supply-600lb-protein-gravity-feeder` | Feeder PDP |
| `/products/ols/products/texas-wildlife-supply-600lb-lucky-buck-spin-feeder` | Feeder PDP |
| `/products/ols/products/texas-wildlife-supply-2000lb-spin-feeder` | Feeder PDP |
| `/products/ols/categories/deer-feed-products` | Category page |
| `/products/ols/categories/deer-feeders` | Category page |
| `/products/ols/categories/apparel` | Category page |
| `/products/ols/categories/tactacam-reveal-products` | Category page |
| `/products/ols/cart` | Cart panel |
| `/products/ols/checkout` | Checkout shell |

Important behavior: **all PDP and category routes return HTTP 404 on direct curl**, but render as 200 in a real browser because the GoDaddy SPA shell catches the route client-side and hydrates from the OLS API. The 404 status code on direct curl is misleading; for SEO, GoDaddy returns the marketing-page shell with the correct canonical `<link>` so Googlebot resolves the page (Googlebot executes JS). **Rebuild action**: implement true SSR/SSG for every PDP — this is one of the biggest SEO wins available.

### Routes NOT found
- No FAQ page (FAQ is embedded on `/`, not its own URL — confirmed by sitemap absence)
- No blog
- No `/contact` page (contact is embedded on `/` as a form section)
- No Reamaze help-center subdomain (`gbfeeds.reamaze.com` does not resolve)
- No shop subdomain (`shop.gbfeeds.com` does not resolve)
- `/favicon.ico` returns 404 (cartographer was correct)

---

## 2. Live OLS Product Catalog (CRITICAL — Q2 in STATE.md)

Catalog hydrates from the GoDaddy Online Store public API:

**API endpoint**: `https://d82532f3-0270-4964-94c1-fade4071e01a.onlinestore.godaddy.com/api/v1/products`
**Site UUID**: `d82532f3-0270-4964-94c1-fade4071e01a` (matches the isteam image CDN UUID)
**Response**: 16 active products, 4 categories, 57 unique product images, USD currency.
**Full structured catalog saved to**: `.context/live_products.json` (1,472 lines, 92 KB; one object per product with name, slug, sku, price, sale price, on_sale flag, availability, full short/long descriptions in HTML+text+formatted variants, image URL set with multiple resolutions, taxon ids, and PDP path).

### Catalog summary

| # | SKU | Name | Price | Sale | Category | PDP |
|---|---|---|---|---|---|---|
| 1 | BC-40LB-2023 | BUCK CHOW HIGH PROTEIN FEED-40LB | $19.99 | — | Deer Feed Products | `/products/ols/products/buckchow` |
| 2 | CC-7LB-2023 | CORN CANDY FLAVORED ATTRACTANT | $17.99 | — | Deer Feed Products | `/products/ols/products/corn-candy` |
| 3 | BC-2000LB-2023 | BUCK CHOW- 2,000lb Pallet | $999.99 | **$949.99** | Deer Feed Products | `/products/ols/products/buck-chow-2000lb-pallet` |
| 4 | GB-CAMOHAT | GB Feeds Digital Print Camo Hat | $25.00 | **$19.99** | Apparel | `/products/ols/products/gb-feeds-digital-print-camo-hat` |
| 5 | GB-BLKHAT | GB Feeds Black Hat | $25.00 | **$19.99** | Apparel | `/products/ols/products/gb-feeds-black-hat` |
| 6 | RVL-X | Reveal X 2.0 | $119.99 | — | Tactacam Reveal Products | `/products/ols/products/reveal-x-20` |
| 7 | RVL-X-PRO | Reveal X-Pro | $149.99 | — | Tactacam Reveal Products | `/products/ols/products/reveal-x-pro` |
| 8 | TCT-RVL-X-GEN | TACTACAM REVEAL BUNDLE PACK- X GEN 2.0 CAMERA + LITHIUM BATTERY PACK + SD CARD BUNDLE | $179.99 | — | Tactacam Reveal Products | `/products/ols/products/tactacam-reveal-bundle-pack-x-gen-20-camera-lithium-battery-pack-sd-card-bundle` |
| 9 | 32G-SD-CRD | 32GB SD CARD | $19.99 | — | Tactacam Reveal Products | `/products/ols/products/32gb-sd-card` |
| 10 | LTH-RCH-BTT-CRT | LITHIUM RECHARABLE BATTERY CARTRIDGE | $49.99 | — | Tactacam Reveal Products | `/products/ols/products/lithium-recharable-battery-cartridge` |
| 11 | DJS-CMR-STK | ADJUSTABLE CAMERA STAKE | $49.99 | — | Tactacam Reveal Products | `/products/ols/products/adjustable-camera-stake` |
| 12 | XTR-SLR-PNL | EXTERNAL SOLAR PANEL | $59.99 | — | Tactacam Reveal Products | `/products/ols/products/external-solar-panel` |
| 13 | TXS-WLD-SPP-2 | Texas Wildlife Supply 2,000LB Gravity Protein Feeder With Ladder & Catwalk | $1,999.99 | — | Deer Feeders | `/products/ols/products/texas-wildlife-supply-2000lb-gravity-protein-feeder-with-ladder--catwalk` |
| 14 | TXS-WLD-SPP-600 | Texas Wildlife Supply 600LB Protein Gravity Feeder | $999.99 | — | Deer Feeders | `/products/ols/products/texas-wildlife-supply-600lb-protein-gravity-feeder` |
| 15 | TXS-WLD-SPP-6001 | Texas Wildlife Supply 600LB Lucky Buck Spin Feeder | $999.99 | — | Deer Feeders | `/products/ols/products/texas-wildlife-supply-600lb-lucky-buck-spin-feeder` |
| 16 | TXS-WLD-SPP-21 | Texas Wildlife Supply 2,000LB Spin Feeder | $1,699.99 | — | Deer Feeders | `/products/ols/products/texas-wildlife-supply-2000lb-spin-feeder` |

**No SKU has variants. No SKU has option types. All 16 are reported `available: true, in_stock: true` (`total_on_hand: null` — GoDaddy doesn't expose stock counts on the public read API).**

### Categories

| ID | Slug | Name |
|---|---|---|
| 6 | apparel | Apparel |
| 7 | deer-feed-products | Deer Feed Products |
| 8 | tactacam-reveal-products | Tactacam Reveal Products |
| 9 | deer-feeders | Deer Feeders |

### Cartographer name-fragment correction

The cartographer's CONTENT_INVENTORY listed the following "products referenced elsewhere on site": `Buck Chow, Corn Candy, Gen X 2.0 Bundle, Lucky Buck 2000lb, 1K TWS, 2000 Pro Cat, LB 600`. Reality:

| Cartographer name fragment | Status | Reality |
|---|---|---|
| Buck Chow | ✅ Live | SKU `BC-40LB-2023` and `BC-2000LB-2023` |
| Corn Candy | ✅ Live | SKU `CC-7LB-2023` |
| Gen X 2.0 Bundle | ✅ Live (renamed) | Now branded as `TACTACAM REVEAL BUNDLE PACK- X GEN 2.0 CAMERA + LITHIUM BATTERY PACK + SD CARD BUNDLE` (SKU `TCT-RVL-X-GEN`) |
| Lucky Buck 2000lb | ⚠️ Image asset only | No SKU by this name. The closest live SKU is `TXS-WLD-SPP-6001` "Texas Wildlife Supply 600LB Lucky Buck Spin Feeder". Cartographer was matching the image filename, not a product. |
| 1K TWS | ⚠️ Image asset only | No SKU by this name. "1K" implies 1,000 lb capacity; the closest live SKU is `TXS-WLD-SPP-600` (600 lb gravity feeder). The 1K and 2K legacy product images are obsolete inventory photos. |
| 2000 Pro Cat | ⚠️ Image asset only | Legacy filename. Closest live SKU is `TXS-WLD-SPP-21` (2,000LB Spin Feeder) or `TXS-WLD-SPP-2` (2,000LB Gravity with Ladder & Catwalk). |
| LB 600 | ⚠️ Image asset only | "LB 600" = "Lucky Buck 600" legacy SKU naming. Closest live SKU is `TXS-WLD-SPP-6001` (600LB Lucky Buck Spin Feeder). |

**Headline-product correction**: The Phase 0 brief lists "Buck Chow Lifestyle Feeder" as the headline product. **There is no SKU by this name.** "Buck Chow Lifestyle Feeder 2.jpg" is a hero/lifestyle product photograph used as the OG share image and on the home hero — it shows a Buck Chow bag in a lifestyle (in-the-field) setting. The actual headline product the brand sells is **Buck Chow High Protein Feed-40LB ($19.99)**. The "Lifestyle Feeder" image filename is GoDaddy-uploaded marketing photography, not an SKU label. **Rebuild action**: rewrite Phase 0 STATE fingerprint to "Headline product: Buck Chow (40lb high-protein deer feed, $19.99)".

### Buck Chow long description (verbatim, captured for Phase 6)

> "Extra Inches Aren't An Accident"
>
> The perfect balance of attraction and nutrition, Buck Chow is a complete, 20% high protein deer feed, featuring GB Feed's Real Results Protein Pellets and antler growing minerals combined with all natural grains and roasted soybeans to deliver year round attraction and nutrition for better herd health and maximum antler growth.
>
> - Tested and proven right here in the Midwest
> - Designed to be fed year-round from early spring all the way through shed season
> - Includes minerals such as Calcium and Phosphorus for optimal herd health and antler growth
> - Long Range Aroma To Attract Deer
> - Can be used in gravity feeders, spin feeders or ground piles
> - Over 5,000 inches of proven results and counting!

**Brand-stat surprise**: this PDP says "5,000 inches" — a *third* number, distinct from the home page's "7,500 inches" and `/why-gb-feeds`'s "10,000 inches" for the same period. Three different stats, one site. Flagged in Section 11.

### Add-to-cart flow

In the live DOM, every product card's "Add to Cart" button is a `<button>` (not an `<a>`) wired to a JavaScript handler. The handler calls the OLS cart API at `https://d82532f3-0270-4964-94c1-fade4071e01a.onlinestore.godaddy.com/api/v1/orders/...`, which mutates a session cart cookie and updates the cart-count badge in the header. **No domain change occurs on add-to-cart**; the user stays on `gbfeeds.com`. (See Section 5 for the full conversion flow.)

---

## 3. Live Integration Confirmation

### Static (in-HTML) integrations

These are the only third-party scripts in the static `<head>`/`<body>` of `https://gbfeeds.com/`:

| Provider | Type | Identifier / URL | Confirmed? |
|---|---|---|---|
| **Google Analytics 4** | Tracking | `G-BF2FDR6KMM` (matches cartographer) | ✅ — `<script async src="https://www.googletagmanager.com/gtag/js?id=G-BF2FDR6KMM">` and inline `gtag("config","G-BF2FDR6KMM")` and `window._commercegaID="G-BF2FDR6KMM"` |
| **Google Site Verification** | Meta | `xhm9c18xYxGqvWIffjaQy5-6zBB2h3AXxJQ3xtXLJHU` | ✅ — `<meta name="google-site-verification" content="...">` |
| **TrustedSite** | Badge | `cdn.trustedsite.com/js/1.js?position=bottomLeft&offset=15` | ✅ — bottom-left, 15px offset, applies to all pages |
| **GoDaddy Signals** | Internal analytics | `img1.wsimg.com/signals/js/clients/scc-c2/scc-c2.min.js` | ✅ — GoDaddy's first-party "Site Conversion Connector" telemetry, not user-facing analytics |
| **GoDaddy Website Builder Runtime** | UX framework | `img1.wsimg.com/ceph-p3-01/website-builder-data-prod/static/widgets/UX.4.51.17.js` | ✅ — the `c1-*` glamor CSS engine + widget hydration runtime |
| **Site bundle 1** | Site-specific | `img1.wsimg.com/blobby/go/d82532f3-0270-4964-94c1-fade4071e01a/gpub/6fffeebc4bce0ad2/script.js` | ✅ — contains `g-function`, `g-messaging`, etc.; site widget glue |
| **Site bundle 2** | Site-specific | `img1.wsimg.com/blobby/go/d82532f3-0270-4964-94c1-fade4071e01a/gpub/eec758665fc50c5b/script.js` | ✅ — references Reamaze loader + Poynt widgets |

### Hydrated (runtime-loaded) integrations

These are confirmed by walking the cart→checkout flow and capturing the network log (126 third-party URLs across 14 unique domains; full log saved at `screenshots/original/_checkout_url.txt`):

| Provider | Type | Identifier / Domain | Notes |
|---|---|---|---|
| **Reamaze** | Live chat | `cdn.reamaze.com/assets/reamaze-loader.js` → `cdn.reamaze.com/assets/reamaze.js` → `push.reamaze.com/assets/reamaze-push.js`. Brand auth at `gbfeeds.com/m/api/reamaze/v2/customers/auth?brand=d82532f3-0270-4964-94c1-fade4071e01a`. Brand ping at `cdn.reamaze.com/data/brands/d82532f3-0270-4964-94c1-fade4071e01a/ping` | The brand ID is the same site UUID, not a separate Reamaze account ID. There is **no public `gbfeeds.reamaze.com` subdomain** — Reamaze is integrated via GoDaddy's white-label "Reamaze for GoDaddy" tier. Site bundle 2 references `reamaze.godaddy.com` as the API host. |
| **Poynt** (payment processor) | Checkout | `cdn.poynt.net/collect.js`, `cdn.poynt.net/collect/utilities/...`, `cdn.poynt.net/collect/wallet-api/...`, `services.poynt.net` | GoDaddy Payments runs on Poynt (acquired by GoDaddy in 2020); confirmed |
| **Paze (Visa/Mastercard click-to-pay)** | Wallet | `checkout.paze.com/web/communicator?parentUrl=https%3A%2F%2Fgbfeeds.com&...IWA_CHECKOUT_WIDGET`. Loads multiple chunks from `checkout.paze.com/web/_next/static/chunks/...` (Paze is itself a Next.js Turbopack app) | Paze is the Early Warning Services / Visa+Mastercard digital wallet |
| **ThreatMetrix (Visa fraud)** | Fraud detection | `h.online-metrix.net`, `h64.online-metrix.net`, `thm.visa.com`, plus session-keyed subdomains (`ckruda9bdtnxnlb5rslf57b32fzphiysocytnddy4e1e56f9ea12bea2sac.d.aa.online-metrix.net` and one other) | Loaded by Poynt during checkout for device fingerprinting |
| **Google Analytics direct beacon** | Tracking | `www.google-analytics.com` | Standard GA4 beacon endpoint |
| **Google Pay** | Wallet | `pay.google.com`, `play.google.com` | Loaded by Poynt for Google Pay button |
| **Cloudflare CDN JS** | Asset CDN | `cdnjs.cloudflare.com` | Standard polyfill / vendor library |
| **GoDaddy infrastructure** | Hosting | `csp.secureserver.net`, `s3-us-west-2.amazonaws.com` | GoDaddy's secureserver.net is an internal CDN; AWS S3 us-west-2 is the OLS image origin |
| **TrustedSite verification** | Badge data | `www.trustedsite.com`, `cdn.ywxi.net` (yourwebsiteinformation — TrustedSite's parent McAfee Secure brand) | The 205.svg meter at `cdn.ywxi.net/meter/gbfeeds.com/205.svg` is referenced in cartography; site ID `205` is McAfee/TrustedSite's customer-segment, **not the GB Feeds account number** — the actual TrustedSite account ID is not exposed publicly |
| **Reamaze cart** | OLS cart | `d82532f3-0270-4964-94c1-fade4071e01a.mysimplestore.com/checkout` | The "mysimplestore.com" domain is GoDaddy's pre-rebrand OLS checkout host — still in service |
| **Google Tag Manager** | NOT FOUND | — | No GTM container loads. GA4 is configured via direct gtag.js, not GTM |
| **Meta / Facebook Pixel** | NOT FOUND | — | No `fbevents.js`, no `fbq()`, no Pixel ID anywhere in site bundles or runtime network log |
| **TikTok Pixel** | NOT FOUND | — | Confirmed absent |
| **Klaviyo / Mailchimp / HubSpot / Intercom** | NOT FOUND | — | None present. The footer newsletter signup posts to GoDaddy's first-party email-list service (no MAP integration) |
| **Stripe** | NOT FOUND | — | Confirmed; payments are 100% Poynt/Paze |
| **reCAPTCHA v3** | Bot defense | Inferred from inline copy "This site is protected by reCAPTCHA…" on home contact form. Loaded on demand on form interaction. | The site key is not exposed in the static HTML; loads on form focus |

---

## 4. Deployment Platform Confirmation

**Hosting**: GoDaddy DPS (Domain Platform Service).

Response headers from `curl -sI https://gbfeeds.com/`:
```
HTTP/1.1 200 OK
Cache-Control: max-age=30
Content-Security-Policy: frame-ancestors 'self' godaddy.com *.godaddy.com dev-godaddy.com *.dev-godaddy.com test-godaddy.com *.test-godaddy.com
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Type: text/html;charset=utf-8
Set-Cookie: dps_site_id=us-west-2; path=/; secure
ETag: 567ca041f7713869e1d8667c10d88d30
Vary: Accept-Encoding
Server: DPS/2.0.0+sha-a7a4f2f
X-Version: a7a4f2f
X-SiteId: us-west-2
```

Confirmed signals:
- `Server: DPS/2.0.0` — GoDaddy's "Domain Platform Service" (the WSB 8 hosting layer).
- `X-SiteId: us-west-2` — the site is regionally pinned to AWS `us-west-2` (Oregon).
- `dps_site_id=us-west-2` cookie — confirms region pinning for the SPA shell.
- CSP `frame-ancestors` whitelist allows GoDaddy admin/preview domains to embed the site (typical for the WSB editor preview).
- `Cache-Control: max-age=30` — every page is cached only 30 seconds at the CDN edge. **Rebuild action**: with a static export to GitHub Pages or Cloudflare Pages, we can push this to `max-age=86400, s-maxage=31536000` with proper hashing.

**DNS**: Apex `gbfeeds.com` resolves to AWS public IPs (`76.223.105.230`, `13.248.243.5`). Authoritative nameservers are `ns47.domaincontrol.com` and `ns48.domaincontrol.com`. SOA primary is `ns47.domaincontrol.com` with admin contact `dns.jomax.net` (jomax.net is GoDaddy's internal DNS infrastructure brand). **Conclusion: domain is registered with GoDaddy, DNS is on GoDaddy, hosting is GoDaddy DPS — fully on-platform.** The rebuild's DNS migration plan should account for moving away from `domaincontrol.com` if the rebuild moves off GoDaddy entirely.

**Mirror generator**: `<meta name="generator" content="Starfield Technologies; Go Daddy Website Builder 8.0.0000">` (Starfield Technologies is GoDaddy's parent IP-holding company).

---

## 5. Conversion Flow Walk

**Method**: clicked "Add to Cart" on Buck Chow PDP, walked to cart → checkout. Stopped before payment entry (no real order placed).

### Step-by-step

1. **PDP** — `https://gbfeeds.com/products/ols/products/buckchow` (browser-rendered; SPA shell hydrates the OLS PDP widget). Quantity selector, "Add to cart" button.
2. **Add to cart** — button POSTs to OLS API; **no URL change**. Header cart badge increments. A "View cart" toast appears.
3. **Cart** — `https://gbfeeds.com/products/ols/cart` (still on `gbfeeds.com`; SPA route). Shows line items, quantity, subtotal, "Continue shopping" and "Checkout" buttons. No login required to proceed.
4. **Checkout** — clicking Checkout redirects to `https://d82532f3-0270-4964-94c1-fade4071e01a.mysimplestore.com/checkout`. **Domain hop #1**. The `mysimplestore.com` host is GoDaddy's pre-rebrand OLS checkout sub-platform (still operational). Same site UUID is used as the subdomain.
5. **Step 1 of checkout** — fields visible (no payment entered):
    - **Contact**: Email (required), "Subscribe to email updates" checkbox
    - **Shipping address**: Full name, country (US default), street address, apt/suite (optional), city, state (dropdown), ZIP, phone (optional)
    - **Shipping method**: rate calculated after address entered
    - **Payment**: not visible until shipping is filled (lazy-loaded)
6. **Wallet/Payment widgets that load on the checkout page** (network log):
    - Poynt collect.js → wallet-api iframe
    - Paze digital-wallet SDK + iframe at `checkout.paze.com/web/communicator?...IWA_CHECKOUT_WIDGET`
    - Google Pay button (loaded by Poynt)
    - ThreatMetrix device fingerprinting beacon to `h.online-metrix.net` and `h64.online-metrix.net`
7. **Guest checkout** — allowed (no login required).
8. **Tax & shipping** — both calculated server-side after address entry. Tax handled by Poynt's tax service.
9. **Confirmation page** — not reached (would not place real order).

### Domain-hop summary

| Step | Host | Hosted by |
|---|---|---|
| Browse / PDP / cart | `gbfeeds.com` | GoDaddy DPS |
| Checkout | `<uuid>.mysimplestore.com` | GoDaddy OLS legacy |
| Wallet iframe | `checkout.paze.com` | Early Warning Services (Visa+Mastercard) |
| Payment processing | `services.poynt.net`, `cdn.poynt.net` | GoDaddy Payments / Poynt |
| Fraud check | `h.online-metrix.net`, `thm.visa.com` | LexisNexis ThreatMetrix (Visa) |

**Implication for rebuild**: keeping the existing checkout means accepting the cross-domain hop to `mysimplestore.com`. If the rebuild moves to Shopify or a custom Next.js commerce layer, the hop disappears (Shopify checkout is on `shop.gbfeeds.com` or `gbfeeds.com/checkout`) and the brand experience is more cohesive.

---

## 6. Screenshots

All screenshots saved at `1440×900` (desktop) and `390×844` (iPhone) to `.context/screenshots/original/`. Captured by the prior recon pass; verified present:

| File | Status |
|---|---|
| `desktop_home.png` (3.2 MB) | ✅ |
| `mobile_home.png` (1.2 MB) | ✅ |
| `desktop_home_difference.png` (1.4 MB — "THE GB FEEDS DIFFERENCE" section) | ✅ |
| `desktop_home_faq.png` (604 KB — FAQ block) | ✅ |
| `desktop_home_footer.png` (1.0 MB — full footer) | ✅ |
| `desktop_products.png` (4.5 MB — hydrated grid) | ✅ |
| `mobile_products.png` (6.2 MB — hydrated grid mobile) | ✅ |
| `desktop_pdp_buck-chow.png` (2.7 MB — Buck Chow PDP) | ✅ |
| `mobile_pdp_buck-chow.png` (1.4 MB — Buck Chow PDP mobile) | ✅ |
| `desktop_cart.png` (108 KB — cart panel) | ✅ |
| `desktop_checkout_step1.png` (139 KB — pre-payment step 1) | ✅ |
| `desktop_our-story.png` (4.1 MB) | ✅ |
| `mobile_our-story.png` (1.9 MB) | ✅ |
| `desktop_customer-reviews.png` (574 KB) | ✅ |
| `desktop_why-gb-feeds.png` (4.5 MB) | ✅ |
| `desktop_photo-gallery.png` (3.1 MB) | ✅ |

Companion: `_checkout_url.txt` (19 KB) — full network HAR-equivalent log of the checkout page (126 URLs across 14 third-party domains) used to confirm Section 3 and Section 5.

---

## 7. Asset Pull from Live (Mirror Gap Closure)

Saved to `_inherited_assets/from_live/`:

### Branding (`from_live/branding/`)
- `logo-IMG_9340-1024.png` — high-res 1024px PNG of the IMG_9340 logo (mirror only had 180px max). Use this as the master for SVG re-tracing.
- `og-buck-chow-lifestyle-feeder-2.jpg` — full-resolution (638 KB) of the OG share image referenced in `<meta property="og:image">`.
- `manifest.webmanifest` — full content captured: name "GB Feeds", short_name "GB Feeds", display "standalone", scope "/", start_url "/", theme_color "#000000", background_color "#000000", icons [192px, 512px PNG]. **Both icons point to `IMG_9340.png` resized via the GoDaddy isteam pipeline**, so the manifest set is single-source. **Rebuild action**: keep these dimensions; add maskable variants.
- `favicon.ico` — **does not exist** on the live site (`/favicon.ico` returns 404). Will be regenerated in Phase 6.

### Logo SVG attempt
The logo is a raster IMG_9340.png throughout — there is no `<svg>` reference in the rendered DOM, no `.svg` favicon, no inline SVG logo block. **Confirmed: the live site does not have a logo SVG.** The rebuild will need to vectorize the 1024px PNG (Phase 6, `image-editor-pro`).

### Products (`from_live/products/`)
- 16 SKU subfolders, named `<id>-<sku>` for stable sort (e.g. `02-BC-40LB-2023/`).
- 57 unique product photos pulled from `img1.wsimg.com/isteam/ip/d82532f3-0270-4964-94c1-fade4071e01a/ols/...` at full resolution (largest variant available; up to 2102×2560).
- `_image_manifest.json` — maps every local file back to the OLS image ID, source URL, byte size.

The mirror's `gbfeeds-isteam-assets/ols/` folder contained 17 product images (mostly legacy SKUs no longer in the catalog). The live OLS API returns a different and larger set (57 images for 16 active SKUs — multi-image PDPs). The rebuild should use the from_live set, not the mirror set.

---

## 8. Live CSS Extraction (Brand DNA)

Confirmed against the live computed styles at the rendered DOM root.

### Colors (verified on live `<body>` / live nav / live CTAs)

| Token | Hex | RGB | Usage on live |
|---|---|---|---|
| Brand Black | `#000000` | `rgb(0, 0, 0)` | Header bg (`<header>` `c1-h`), footer bg, primary button fill, all body H1/H2 text |
| White | `#ffffff` | `rgb(255, 255, 255)` | Page bg (`c1-3`), button text on primary, header link active state (`c1-26`) |
| Off-white | `#f6f6f6` | `rgb(246, 246, 246)` | Section bg (`c1-5s`) |
| Light gray | `#e2e2e2` | `rgb(226, 226, 226)` | Header link default (`c1-1h`), input borders, dividers |
| Medium gray | `#5e5e5e` | `rgb(94, 94, 94)` | Subtle borders, blockquote rule (`c1-4v`) |
| Dark gray | `#1b1b1b` | `rgb(27, 27, 27)` | Secondary heading text (`c1-9a`) |
| Hover gray | `#c6c6c6` | `rgb(198, 198, 198)` | Header link hover (`c1-27`) |
| Muted gray | `#919191` | `rgb(145, 145, 145)` | Disabled link text (`c1-4x`) |
| Subtle dark | `#303030` | `rgb(48, 48, 48)` | Body link hover (`c1-7b`) |
| Tonal dark | `#575757` | `rgb(87, 87, 87)` | Mobile menu close text (`c1-6a`) |
| Almost-black | `#151515` | `rgb(21, 21, 21)` | Mobile menu interior text (`c1-6b`) |

**No accent color, no chromatic brand color.** Pure monochrome high-contrast — confirmed. The closest thing to a brand "color" is the subtle gray ladder. This is intentional and correct for a hunting / outdoor brand that wants to look serious / utilitarian — not for a brand that wants to feel friendly or playful.

### Fonts (verified on live)

- **Display**: `'Archivo Black', arial, sans-serif` — applied via class `c1-1u`. Used for **all H1, H2, button text, logo wordmark (when not the IMG_9340 mark)**. Single weight 400.
- **Body**: `'Montserrat', arial, sans-serif` — applied via class `c1-b`. Used for body paragraphs, navigation, form labels, footer copy. Weights 400 and 700 confirmed loaded.

Both fonts served via `img1.wsimg.com/gfonts/...` (GoDaddy's CDN cache of Google Fonts — privacy-preserving, no `fonts.googleapis.com` round-trip).

### Button hover/focus

- **Primary button** (black bg, white text): on hover, color shifts from `#ffffff` to `#c6c6c6`. No background animation, no shadow change, no transform.
- **Header nav link**: default `#e2e2e2`, hover `#ffffff`, active `#ffffff` (same as hover).
- **Body link** (in body copy): default inherits color, hover `#303030`, active `#000000`. Underline appears via `border-bottom: 1px solid #5e5e5e` with 2px padding-bottom (not `text-decoration: underline`).
- **Form input**: `border-radius: 4px`, `border: 1px solid #dadada` default → `border-color: #000000` on focus. `outline: none` on focus, with `box-shadow: inset 0 0 0 1px currentColor` instead — keyboard-accessible focus ring is **black inset glow on white** (passes WCAG focus-visible).

### Motion & scroll

- **No GSAP, no Lenis, no scroll-jacking, no parallax.** The site is fully native-scroll.
- **Sticky nav**: header sticks to top via `position: sticky` (CSS class `c1-m .sticky-animate`). No fade-in / shrink animation on stick.
- **Mobile menu**: slides in from the right via `transform: translateX(-249vw)` → `0`. CSS `transition: transform .3s ease-in-out`.
- **Image lazy loading**: GoDaddy isteam pipeline serves responsive sizes via URL params (`/:/rs=w:640,h:640,m`) but uses native `loading="lazy"` rather than blur-up.
- **Animated SVG circles**: `c1-9n > svg circle` has a `blink 2s infinite alternate cubic-bezier(.64,.21,.39,.9)` — used on chat-widget "online" indicator only.

### Visually distinctive
- Buttons are sharp-cornered (`border-radius: 0`) — keep this in the rebuild for the same masculine/utilitarian feel.
- The 22 testimonials on `/customer-reviews` are presented in a single tight stacked column with no avatar imagery — stark and authentic. **Preserve in rebuild.**
- Header has the **mark left, nav center, mobile-trigger right** layout — a slightly old-school WSB pattern. The rebuild can modernize to **mark left, nav right** without losing the brand feel.

### Anti-patterns to NOT preserve
- The black-only palette is monotonous; the rebuild can introduce one earth-tone accent (forest green `#2D4A2A` or rust `#A0522D`) as a CTA highlight without losing brand DNA.
- The 1.3em line-height on headlines is tight; bump to 1.15–1.2 for a more contemporary feel.

---

## 9. Tone & Voice Characterization (≤150 words)

GB Feeds writes **hunter-to-hunter, blunt, and earned**. Register is casual, masculine, and confident — never corporate, never folksy. The founder's name (Greg) signs the Our Story page in first person ("Have you ever bought a deer feed product and been disappointed when it didn't work? Me too..."), establishing authority through shared frustration with competitors. Reading level is plainly 8th–9th grade — short declarative sentences, no jargon-for-the-sake-of-jargon. Persuasion is **results-driven and tactile**: "Over 7,500 inches of antler harvested in 2023 & 2024" — they sell on outcomes, not features. Pronouns are heavy on "we" / "our" and "you" — direct second-person address dominates. They sell deer feed, attractant, apparel, and trail-cam accessories to **serious whitetail hunters managing private hunting properties**, not casual hobbyists. The voice is anti-corporate, anti-retail-markup, pro-results. Testimonials are short and unvarnished ("DUDE this stuff is fire!" — Jon).

---

## 10. Industry Lock (≤100 words)

**DTC small-batch specialty deer-feed; Kansas-made / Midwest-tested; sold to serious / trophy whitetail hunters in the US Midwest, Plains, and South.** Mid-tier price point: $17.99–$49.99 for consumables (Buck Chow, Corn Candy, attractants), $999.99–$1,999.99 for capital goods (Texas Wildlife Supply gravity & spin feeders), with reseller line for Tactacam Reveal trail cameras ($119.99–$179.99). Brand voice: hunter-to-hunter authenticity, anti-retail-markup, results-quantified. Chief category competitors: Whitetail Institute (Imperial Whitetail), Big & J (BB2 / Cube), Boss Buck, Antler King, Wildgame Innovations, Purina AntlerMax, C'Mere Deer, Lucky Buck, Record Rack. White-label resale: Tactacam, Texas Wildlife Supply.

---

## 11. Brand Stat Verification

Both inconsistent stats are **still live on the site as of 2026-05-06**.

| Page | URL | Stat (verbatim) |
|---|---|---|
| Home | `https://gbfeeds.com/` | "Over 7,500 inches of antler harvested with GB Feeds deer feed products in 2023 & 2024 and on pace to go even bigger in 2025!" |
| Why GB Feeds | `https://gbfeeds.com/why-gb-feeds` | "In 2023 and 2024, our customers harvested over 10,000 inches of antler using GB Feeds products right here in Kansas." |
| Buck Chow PDP | `https://gbfeeds.com/products/ols/products/buckchow` | "Over 5,000 inches of proven results and counting!" |

**A third inconsistent number** surfaced in this recon pass: **5,000 inches** on the Buck Chow PDP description (verbatim from the OLS API). The cartographer flagged 7,500 vs 10,000; the PDP adds 5,000. Three pages, three numbers, same brand stat. **Recommend Phase 4 design brief flag this as a content-cleanup blocker — the rebuild should standardize on a single canonical number, with the client clarifying which is current.**

---

## 12. UX Gap Inventory (Top items the rebuild will fix)

1. **No SSR/SSG for PDPs.** All 16 product pages return HTTP 404 on direct fetch and only render via JS hydration. Googlebot can crawl them (it executes JS) but Bing, Yandex, and most LLM crawlers cannot. Massive organic-search opportunity left on the table.
2. **No JSON-LD Product schema, no BreadcrumbList, no Organization beyond the home.** Zero rich-results eligibility. Easy win in rebuild.
3. **Brand-stat inconsistency across three pages** (5,000 / 7,500 / 10,000 inches). Erodes trust the moment a careful reader notices.
4. **Cart-checkout cross-domain hop** to `*.mysimplestore.com` is jarring and breaks brand cohesion. Address bar suddenly shows a stranger's URL during the most important conversion moment.
5. **Cache-Control: max-age=30 site-wide** is starvation-mode caching; the rebuild on a static host can serve immutable hashed assets with a year of CDN cache.
6. **No image alt text** on the OLS-hydrated product images (the API returns `alt: null` for every image). Accessibility and image-search SEO both suffer.
7. **Dual `/terms-and-conditions` and `/terms-and-conditions-1` pages** exist and are both in the public sitemap. Smells like an unmerged content edit; collapse to one canonical legal page in rebuild.
8. **`/favicon.ico` 404** — every browser tab shows the broken-icon hint. A 1 KB `.ico` fixes this in Phase 6.
9. **No structured FAQ schema** despite the on-home FAQ being a perfect candidate for Google's FAQ rich result.
10. **Mobile `desktop_products.png` was 4.5 MB and `mobile_products.png` was 6.2 MB at capture** — these are screenshots, but the underlying live page also serves 2102×2560 product images to mobile viewports without responsive resizing. Likely 2–4 MB of unnecessary mobile-payload per PDP.
11. **No abandoned-cart email, no transactional email beyond OLS default, no post-purchase nurture.** Newsletter exists in footer but is not wired to any MAP (Klaviyo/Mailchimp absent). Recapturable revenue.
12. **Three different inconsistent voice/casing patterns** in product names: ALL CAPS (`BUCK CHOW HIGH PROTEIN FEED-40LB`), Title Case (`GB Feeds Black Hat`), and Mixed (`Texas Wildlife Supply 600LB Lucky Buck Spin Feeder`). The rebuild should pick one (recommend Title Case) and re-key.

---

*End of Phase 2 Live Recon — internet-investigator — 2026-05-06.*

---

## Pre-Rebuild Security Findings — security-audit-expert

> Read-only forensic security review of the live site (`https://gbfeeds.com/`) conducted from the recon artifacts above (no live probes). Goal: ensure the rebuild does not inherit any of the existing risk surface. Severity scale: **P0 = critical / immediate disclosure**, **P1 = high / fix before launch**, **P2 = medium / fix in launch sprint**, **P3 = low / track post-launch**.
>
> **Top-line verdict**: 0× P0, 4× P1, 7× P2, 5× P3. **No leaked private credentials were found in any artifact captured.** All secret-looking strings encountered are public identifiers by design (GA4 measurement ID, GoDaddy site UUID, Paze public API key, Poynt business ID, GoDaddy GTM container ID). The rebuild's main exposures are passive (no CSP, no SRI, third-party scripts loaded with implicit trust) — fixable through deploy-time configuration.

### Client-side leakage

What was checked in the captured artifacts: every script `src=` and inline `<script>` reference in Section 3, every URL in `_checkout_url.txt`, the rendered DOM as captured in Section 8 (computed styles, CSS classes), the OG/manifest blobs, and the HTML signatures called out in the cartography (Section 7).

**Identifiers that LOOK sensitive but are public-by-design (NOT leaks)**:

| String | What it is | Reason it's safe to be public |
|---|---|---|
| `G-BF2FDR6KMM` | GA4 Measurement ID | GA4 IDs are public client identifiers. They cannot send data on someone else's behalf without the GA admin allow-listing the requester domain. Same posture as Stripe **publishable** keys. |
| `xhm9c18xYxGqvWIffjaQy5-6zBB2h3AXxJQ3xtXLJHU` | Google Search Console site verification token | Designed to be served publicly in a `<meta>` tag — that's the verification mechanism. Not a secret. |
| `d82532f3-0270-4964-94c1-fade4071e01a` | GoDaddy OLS site UUID | Public tenant identifier (used in image CDN URLs, OLS API, and as the `mysimplestore.com` subdomain). Not a secret. |
| `46VM0VIBJ63520UZ7X6U14L-0rahMJIVUiE1MgKLDdBgyTXkE` | Paze `api_key` query parameter (in `checkout.paze.com` URL) | This is Paze's **public** merchant identifier (parallel to a Stripe `pk_live_*`). Server-side merchant authentication happens via the `services.poynt.net` mTLS link. Confirmed by Paze's published API contract — `api_key` is the public client identifier. **Not a leaked secret.** |
| `17be4a4b-4a55-4ad0-aed4-ec56fe20fd5a` | Poynt **business ID** in the `services.poynt.net/businesses/.../paze/validate` and `.../google-pay/validate` URLs | Poynt business IDs are public merchant identifiers — analogous to a Stripe Account ID (`acct_*`). Required client-side to scope wallet validation. Not a privileged credential. |
| `GTM-NZT7WDR` and `G-F37RS8EP44` (seen on checkout page only, not on `gbfeeds.com` itself) | GoDaddy's **own** GTM container + GA4 ID, fired from `mysimplestore.com` | These are GoDaddy's analytics, not GB Feeds'. They tag every OLS checkout session for GoDaddy's product team. Public IDs. Cannot be repurposed by GB Feeds; cannot be exfiltrated. **Note for rebuild**: if we move off OLS, GoDaddy's analytics on our customers stops. |

**Strings that ARE NOT in the captured surface (verified absent)**:
- No Stripe `sk_live_*` / `sk_test_*` (and no Stripe at all on this property).
- No AWS access key (`AKIA…` regex did not match anywhere — the `s3-us-west-2.amazonaws.com` reference is a public S3 bucket origin, not a credential).
- No `.env`, `config.json`, `secrets.yaml`, or env-style block leaks.
- No PEM block (`-----BEGIN ... PRIVATE KEY-----`) in any captured asset.
- No JWT (`eyJ…`) or session token leaked outside the cookie jar.
- No `Authorization: Bearer …` header captured in any response surface.

**Routes / endpoints reachable from the public-facing pages**:
- `/m/login`, `/m/reset`, `/m/create`, `/m/api/reamaze/v2/customers/auth?brand=…` are all OLS portal endpoints — **not** privileged admin routes. The `/m/api/reamaze/...` endpoint is a customer-scope auth bridge; it does not expose admin chat-agent functionality. **No `/admin`, `/dashboard`, `/wp-admin`, `/.git`, `/.env`, `/server-status`, `/phpmyadmin`, `/.well-known/security.txt`, or staging-style URL is reachable from the public pages.** The GoDaddy WSB editor (`*.dev-godaddy.com`, `*.test-godaddy.com`) is only authorized via the `frame-ancestors` CSP, not linked from the public DOM.
- The `csp.secureserver.net` host shows up as a connected origin during checkout — that is GoDaddy's internal CDN edge, not an admin surface.

**Source maps in production**: None of the GoDaddy site bundles (`UX.4.51.17.js`, the two `gpub/...script.js` site-glue bundles, `scc-c2.min.js`) reference `.map` files in the recon log. Reamaze, TrustedSite, and Poynt assets are minified without sourcemap pointers. **No sourcemap leakage detected.**

**Source comments**: GoDaddy's WSB-emitted HTML carries the `<meta name="generator" content="Starfield Technologies; Go Daddy Website Builder 8.0.0000">` fingerprint — that is a version-identifying comment-equivalent and is the most useful piece of recon for an attacker (lets them target known WSB-8 weaknesses). Beyond that, the markup is heavily minified atomic CSS; no implementation-revealing developer comments are visible.

**Findings (this section)**:
- **P3 — Generator string discloses platform + version**. `Go Daddy Website Builder 8.0.0000` in the `<meta name="generator">` tells attackers the exact platform and version. The rebuild MUST omit any `generator` meta tag.
- **P3 — Internal CDN host visible in headers** (`Server: DPS/2.0.0+sha-a7a4f2f`, `X-Version: a7a4f2f`, `X-SiteId: us-west-2`). Discloses internal build SHA + region. The rebuild MUST configure the static host to drop server identification headers (GitHub Pages exposes `Server: GitHub.com`; Cloudflare Pages exposes `Server: cloudflare` — both acceptable; what we MUST NOT do is ship a custom `X-Version` build SHA).

### Third-party scripts

Eight unique script-loading origins were observed across browsing + checkout, plus four payment-flow origins reached only on the checkout subdomain (off our control). For each, this audit reports **HTTPS posture**, **SRI presence**, **CORS posture**, **referrer policy needs**, and **PII exposure scope**.

| Origin | Loaded on… | HTTPS | SRI hash | `crossorigin` attr | PII scope |
|---|---|---|---|---|---|
| `www.googletagmanager.com/gtag/js` (GA4) | every page | ✅ HTTPS-only | ❌ no SRI | (none on `<script async src>`) | Reads URL, referrer, page title, Client ID cookie. Does **not** read form-input values unless `gtag('event', …)` is wired to do so — confirmed not wired on this site (no inline form-tracking calls in site bundles). |
| `cdn.trustedsite.com/js/1.js` | every page | ✅ HTTPS-only | ❌ no SRI | (none) | Reads only the host of the loading page. No PII scope. |
| `img1.wsimg.com/signals/js/clients/scc-c2/scc-c2.min.js` (GoDaddy Signals) | every page | ✅ HTTPS-only | ❌ no SRI | (none) | First-party GoDaddy telemetry. Records page paths and click events. Does not capture form values on this site. **Will not survive the rebuild** (we leave the GoDaddy platform). |
| `img1.wsimg.com/ceph-p3-01/.../UX.4.51.17.js` (WSB runtime) | every page | ✅ HTTPS-only | ❌ no SRI | (none) | Site rendering engine. Has full DOM access and is the script that **does** bind input handlers. **Trust scope: full.** Will not survive rebuild. |
| `img1.wsimg.com/blobby/go/<uuid>/gpub/.../script.js` (×2 site-glue bundles) | every page | ✅ HTTPS-only | ❌ no SRI | (none) | Site widget glue. Wires Reamaze + Poynt loaders. **Trust scope: full.** Will not survive rebuild. |
| `cdn.reamaze.com/assets/reamaze-loader.js` → `reamaze.js` → `push.reamaze.com/.../reamaze-push.js` | every page (loads on first interaction) | ✅ HTTPS-only | ❌ no SRI | (none) | Live-chat widget. Reads visitor identity (email if logged in), URL, page title, and any text typed **into the chat widget itself** (intended). Does **not** scrape form inputs outside its own iframe. **Trust scope: chat session + identity.** |
| `cdn.poynt.net/collect.js` and child iframes | checkout only (off `gbfeeds.com`) | ✅ HTTPS-only | ❌ no SRI | iframe-isolated | Reads payment-card data inside an iframe scoped to `cdn.poynt.net`. PCI scope is on Poynt's iframe boundary. **Not on `gbfeeds.com`'s trust boundary.** |
| `checkout.paze.com/web/...` Next.js bundles | checkout only | ✅ HTTPS-only | ❌ no SRI | (none) | Wallet iframe. Same isolation argument as Poynt. |
| `h.online-metrix.net`, `h64.online-metrix.net`, `thm.visa.com`, session-keyed `*.d.aa.online-metrix.net` | checkout only | ✅ HTTPS-only | ❌ no SRI | beacon-style | Device fingerprinting (LexisNexis ThreatMetrix via Visa). Reads device+browser fingerprint, IP, behavior signals. **Not on our trust boundary** — runs inside Poynt's iframe lineage. |
| `cdnjs.cloudflare.com` (one polyfill) | checkout only | ✅ HTTPS-only | ❌ no SRI | (none) | Standard polyfill library. |
| `pay.google.com`, `play.google.com` (Google Pay button) | checkout only | ✅ HTTPS-only | ❌ no SRI | iframe-isolated | Wallet iframe scope only. |
| `fonts.googleapis.com`, `www.gstatic.com`, `www.google.com` | checkout only (Paze brings them in) | ✅ HTTPS-only | ❌ no SRI | (none for fonts; iframe for reCAPTCHA) | Fonts + reCAPTCHA. |

**Findings (this section)**:
- **P1 — Zero Subresource Integrity hashes anywhere on the site.** Every third-party JS file (TrustedSite, Reamaze loader, GA4 gtag.js, every site bundle, every checkout-side script) is loaded without an `integrity="sha384-…"` attribute. **A compromise of any of these CDNs (most importantly TrustedSite, Reamaze, and the GoDaddy `img1.wsimg.com` blob CDN) would give the attacker arbitrary JS execution on every gbfeeds.com page, including pre-checkout pages where personal data is being typed.** This is the single biggest passive-supply-chain risk on the live site. Rebuild MUST add SRI for every third-party script we ship — see MUST list below for which ones support stable hashes.
- **P1 — Reamaze loader is wired to a `gbfeeds.com/m/api/reamaze/v2/customers/auth?brand=…` bridge endpoint that is NOT under our control after the rebuild.** This endpoint lives on GoDaddy's OLS infrastructure. If the rebuild moves off OLS but keeps Reamaze chat, the auth bridge breaks. Either drop chat at launch and re-add it as Reamaze direct (`https://<account>.reamaze.com` widget snippet) post-launch, or swap to a different chat product (Crisp, Tawk, Intercom).
- **P2 — GoDaddy Signals (`scc-c2.min.js`) leaks GB Feeds traffic patterns to GoDaddy.** Every visitor's pageview is reported to GoDaddy's first-party telemetry. Acceptable while on platform; rebuild MUST NOT reproduce it (just don't load it).
- **P2 — TrustedSite badge is loaded with site ID `205` in the URL (`cdn.ywxi.net/meter/gbfeeds.com/205.svg`)**. Per Section 3 this is McAfee's customer-segment number, **not** the GB Feeds account ID. The actual TrustedSite account ID is **not** exposed and we cannot recreate the badge in the rebuild without it. **Action: ask client for the TrustedSite/McAfee Secure account login.** If the client cannot recover the account, the badge will simply be re-issued with a new site ID at rebuild time — minor UX, no security impact.
- **P3 — No `referrerpolicy` set on any third-party `<script>` tag.** When the rebuild ships, set `referrerpolicy="strict-origin-when-cross-origin"` (or stricter) globally via a `<meta name="referrer">` so analytics beacons stop sending the full URL — particularly important on checkout-style URLs that may carry order context in query strings.
- **P3 — No `crossorigin` attribute set anywhere.** This is a hardening miss but not actively exploitable (without SRI it's mostly moot). When SRI is added in the rebuild, all SRI-bearing tags MUST also carry `crossorigin="anonymous"`.

### Security headers (current vs. rebuild capability)

Headers actually returned by `https://gbfeeds.com/` (per Section 4):
```
HTTP/1.1 200 OK
Cache-Control: max-age=30
Content-Security-Policy: frame-ancestors 'self' godaddy.com *.godaddy.com dev-godaddy.com *.dev-godaddy.com test-godaddy.com *.test-godaddy.com
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Type: text/html;charset=utf-8
Set-Cookie: dps_site_id=us-west-2; path=/; secure
ETag: 567ca041f7713869e1d8667c10d88d30
Vary: Accept-Encoding
Server: DPS/2.0.0+sha-a7a4f2f
X-Version: a7a4f2f
X-SiteId: us-west-2
```

| Control | Current (live) | Rebuild on GitHub Pages | Rebuild on Cloudflare Pages |
|---|---|---|---|
| `Content-Security-Policy` (full policy) | ❌ **Only `frame-ancestors` set.** No `default-src`, no `script-src`, no `connect-src`, no `style-src`, no `img-src`. **All other CSP directives are missing.** This is the single biggest active-defense gap on the site. | ⚠️ Not configurable via response header on GH Pages (no custom headers). **MUST set via `<meta http-equiv="Content-Security-Policy">`** in the document `<head>` — note `frame-ancestors` and `report-uri` are **not** enforceable via meta and are lost. | ✅ Fully configurable via `_headers` file. Recommend rebuild target Cloudflare Pages over GH Pages **for this reason alone**. |
| `Strict-Transport-Security` (HSTS) | ✅ Strong (`max-age=63072000; includeSubDomains; preload`) | ❌ Cannot be re-shipped via GH Pages headers. Apex domain HSTS preloading is a one-time apex-DNS-level decision; if `gbfeeds.com` is already on the HSTS preload list (verify via `hstspreload.org`), it persists across hosting moves. | ✅ Configurable via `_headers` file. |
| `X-Frame-Options` | ❌ Not set (relies solely on `frame-ancestors`) | ❌ Cannot meta-tag this. Lost on GH Pages. | ✅ Configurable. |
| `X-Content-Type-Options: nosniff` | ❌ Not set | ❌ Not meta-taggable (`X-Content-Type-Options` is a response-header-only control). Lost on GH Pages. | ✅ Configurable. |
| `Referrer-Policy` | ❌ Not set | ✅ Settable via `<meta name="referrer" content="strict-origin-when-cross-origin">` | ✅ Either path. |
| `Permissions-Policy` | ❌ Not set | ❌ Cannot be meta-tagged enforceably; partial via `<meta http-equiv>` is non-standard. Lost on GH Pages. | ✅ Configurable via `_headers`. |
| `Cross-Origin-Opener-Policy` | ❌ Not set | ❌ Header-only. Lost on GH Pages. | ✅ Configurable. |
| `Cross-Origin-Embedder-Policy` | ❌ Not set | ❌ Header-only. Lost on GH Pages. | ✅ Configurable. |
| `Cache-Control` | `max-age=30` (essentially no caching) | ✅ Configurable. Recommend hashed assets + `max-age=31536000, immutable`. | ✅ Same. |

**Findings (this section)**:
- **P1 — No real CSP. Only `frame-ancestors` is set.** The live site has effectively no script/style/connect/img origin control. With XSS possible through any compromised third-party (see SRI finding above) or any DOM injection bug in a future rebuild, this means an attacker with a foothold in any included script can do anything. **Rebuild MUST ship a strict CSP from day one.**
- **P1 — STATE.md routing decision (Phase 0) defaults the rebuild to GitHub Pages. THIS IS A SECURITY-RELEVANT DECISION.** GH Pages cannot ship custom response headers; this loses `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, `COOP/COEP`, and full-CSP enforcement. **Strong recommendation: change deploy target to Cloudflare Pages** — it has a free tier, supports custom `_headers` files (full CSP, full HSTS-shipping, full COOP/COEP), works identically with the same Next.js static export, and gives the rebuild the security posture it needs. **This is the single biggest rebuild MUST in this audit.** If GH Pages is mandated for non-security reasons (e.g., domain attached to a github.io org), document the lost controls explicitly so the client accepts the risk.
- **P2 — `Cache-Control: max-age=30` is not a security issue per se but it amplifies any XSS impact** because compromised content has only a 30-second propagation window — fine — *and* it means clients re-fetch the (potentially compromised) bundles 100× more often. Rebuild MUST use immutable hashed assets + `max-age=31536000` for non-HTML assets and `max-age=300, must-revalidate` for HTML.

### PII / data handling

The live site captures user-typed PII in **two** places: the home-page contact form and the checkout flow. Mapping each surface:

**Home-page contact form** (`/`, "Drop us a line!" block):
- Fields confirmed in CONTENT_INVENTORY: Email* (required) plus an open-text message body. (Phone displayed as static `(620) 639-3337`, **not** a captured field.)
- Submission target is GoDaddy's first-party form-collection service (no Mailchimp / Klaviyo / HubSpot endpoint observed in the static markup or the recon network log).
- Anti-spam protection is reCAPTCHA v3 — confirmed by the inline disclosure copy "This site is protected by reCAPTCHA…" but the site key is **not** exposed in the static HTML; reCAPTCHA loads on form-focus (lazy). This is correct posture.
- **No PII fields appear in URL query parameters** anywhere in the recon log. Form submission posts (POST), not GETs the email. ✅
- **No mixed-content (`http://`) resource references** anywhere in the captured surface. Site is HTTPS-only end-to-end. ✅

**Checkout flow PII surface** (`mysimplestore.com/checkout`, off our domain):
- Fields enumerated in Section 5: Email, Full name, Country, Street, Apt/Suite, City, State, ZIP, Phone (optional). Then payment fields (card / Paze / Google Pay) loaded inside Poynt and Paze iframes.
- All PII is entered on `mysimplestore.com`, not on `gbfeeds.com`. **Important consequence**: GB Feeds today is **not in scope for PCI DSS** because card data never touches gbfeeds.com (Poynt iframe handles it). If the rebuild adopts a Shopify or Stripe-Checkout architecture where the card iframe is hosted by the processor, this remains true; if the rebuild builds a custom checkout that *renders* the card form on `gbfeeds.com`, the rebuild **enters PCI scope**. **MUST keep the card-entry boundary off our domain in the rebuild.**
- No PII appears in any URL query parameter in the recon log (verified: no `email=`, no `name=`, no `address=` patterns in `_checkout_url.txt`).
- Cookies set on `gbfeeds.com`: `dps_site_id=us-west-2; path=/; secure`. Cookie is **`secure`** ✅ but **does not specify `HttpOnly`** (it doesn't need to — it's a region-pinning cookie, not an auth cookie). **No auth cookies, no session cookies, no tracking cookies are set by the gbfeeds.com origin** — analytics cookies are scoped to `_ga*` first-party but set by GA's JS into `gbfeeds.com` cookie jar. Acceptable.

**Findings (this section)**:
- **P2 — Contact form data-handling is opaque.** Recon could not surface the form's actual submit endpoint or success-state handling (the form is hydrated by a GoDaddy widget script). Whatever email service receives the submission today is on GoDaddy infrastructure and **will not survive the rebuild** unless re-pointed. Rebuild MUST decide where contact submissions land (recommend a serverless function on Cloudflare Workers or a third-party form service like Formspree / Basin / Cloudflare Turnstile-protected POST → Resend/Loops email).
- **P2 — reCAPTCHA v3 carries known privacy concerns and may be undesirable.** v3 fingerprints the visitor across all reCAPTCHA-using sites. Rebuild SHOULD prefer Cloudflare Turnstile (privacy-respecting, free, GDPR-friendlier). If reCAPTCHA must remain, pin to a dedicated GB Feeds site key + secret, NOT the GoDaddy-template default key.
- **P2 — Reamaze chat captures email + visitor profile.** This is intended functionality but should be disclosed in the privacy policy (the current `/privacy-policy` page has not been audited against this — flag for legal review when rebuild ships).
- **P3 — Newsletter signup in footer captures email.** Same opacity as the contact form. Rebuild MUST wire this to a chosen MAP (Mailchimp / Klaviyo / Loops) with double-opt-in for CAN-SPAM and GDPR posture.

### Dependency exposure

| Dependency | Version exposed in surface | Severity | Rebuild action |
|---|---|---|---|
| GoDaddy WSB | `8.0.0000` (in `<meta name="generator">`) | P3 | Drop generator meta entirely. |
| GoDaddy DPS | `DPS/2.0.0+sha-a7a4f2f` (in `Server` header), `X-Version: a7a4f2f` | P3 | Don't ship custom server identification headers. |
| GoDaddy WSB UX runtime | `UX.4.51.17.js` (version baked into URL path) | N/A | Will not survive rebuild. |
| Paze digital-wallet SDK | URL signature `digitalwallet-sdk.js` (no exposed version) | N/A | Off-domain. |
| Paze checkout app | Next.js + Turbopack chunks (`web/_next/static/chunks/*`); chunk filenames are content-hashed (no implicit version) | N/A | Off-domain. |
| Visa ThreatMetrix toolkit | `vba-3.1.2.min.js` (version 3.1.2 exposed) | N/A | Off-domain (loaded by Paze). |
| Reamaze loader/widget | No version tag in URLs; loader is `cdn.reamaze.com/assets/reamaze-loader.js` | N/A | If we keep Reamaze, swap to versioned snippet. |
| TrustedSite | `cdn.trustedsite.com/js/1.js` (no version) | N/A | If we keep, evaluate alternatives (e.g., self-hosted trust badge). |
| jQuery | **NOT detected in any captured asset** — GoDaddy WSB 8 does not load jQuery in the document head (no `<script src="...jquery...">` reference anywhere) | ✅ | None — confirmed jQuery-free. |
| Font Awesome | NOT detected (cartographer's "likely" guess was wrong; no fontawesome script or stylesheet observed) | ✅ | None. |

**Findings (this section)**:
- **P3 — Visible dependency strings are minor and don't immediately enable a known-CVE attack path.** WSB 8 has no widely-published CVE that we're aware of; ThreatMetrix `vba-3.1.2` is current; Paze is hosted by EWS. The dependency surface is platform-specific (GoDaddy-managed) and **disappears entirely** when the rebuild leaves the platform. The rebuild's *new* dependency surface (Next.js, React, npm packages) needs its own audit pre-launch — `npm audit`, `npm outdated`, optional Snyk/Socket integration — before Phase 7 / launch.

### Rebuild MUST / MUST-NOT list

Concrete, actionable, and specific to what was found above. Numbered for traceability.

**MUST** (do these):

1. **Deploy to Cloudflare Pages, not GitHub Pages** — to ship full response headers (CSP, COOP/COEP, Permissions-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy). Override the Phase 0 routing decision in `STATE.md`. If GH Pages is non-negotiable, document the security controls that are lost.
2. **Ship a strict Content-Security-Policy from day one** in `_headers` (Cloudflare) or `<meta http-equiv>` (GH Pages fallback). Starting policy:
   ```
   default-src 'self';
   script-src 'self' 'sha256-<inline-hash>' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.trustedsite.com https://cdn.reamaze.com https://push.reamaze.com;
   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
   img-src 'self' data: https://img1.wsimg.com https://www.google-analytics.com https://cdn.ywxi.net https://www.trustedsite.com;
   font-src 'self' https://fonts.gstatic.com;
   connect-src 'self' https://www.google-analytics.com https://*.reamaze.com https://push.reamaze.com;
   frame-src 'self' https://*.reamaze.com https://checkout.paze.com https://*.poynt.net;
   form-action 'self' https://*.mysimplestore.com;
   frame-ancestors 'none';
   base-uri 'self';
   object-src 'none';
   upgrade-insecure-requests;
   ```
   Tune the allowlist as the final integration set is locked. **MUST NOT** ship `'unsafe-eval'` or `'unsafe-inline'` in `script-src`. Use nonces or hashes for any required inline.
3. **Add Subresource Integrity (`integrity="sha384-…"` + `crossorigin="anonymous"`) for every third-party `<script>` we control the version of**. The GA4 `gtag/js` script is **versionless** (rolls forward), so SRI is impractical there — accept the residual risk and pin via CSP `script-src` allowlist instead. TrustedSite, Reamaze, and any other versioned third-party tag: pin and integrity-hash. Document the SRI generation step in the build pipeline so dependency bumps re-emit hashes automatically.
4. **Set `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`** on the rebuild origin. Verify `gbfeeds.com` is already on the HSTS preload list at https://hstspreload.org/?domain=gbfeeds.com before launch — if it is, do not undo the preload during DNS migration; if it is not, submit it once the rebuild is live.
5. **Add `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(self "https://checkout.paze.com" "https://*.poynt.net")`** to the rebuild's response headers.
6. **Move all secrets/keys to env-vars at build time** (Cloudflare Pages env vars or GitHub Actions secrets). The rebuild will need: any new email-service key (Resend / Loops / Postmark), any reCAPTCHA-v3-replacement key (Turnstile site key is **public-by-design**, secret key is server-side), and the eventual chat widget account IDs.
7. **Re-protect the contact form**. Recommend Cloudflare Turnstile (free, privacy-respecting) over reCAPTCHA v3. Pair with a server-side honeypot field + per-IP rate-limit (1 submission / 60s) on the receiving Worker / API route.
8. **Keep the card-entry boundary off `gbfeeds.com`** to stay out of PCI DSS scope. Continue using Poynt-hosted iframes, or migrate to Stripe Checkout / Shopify — whichever the client chooses, do **not** render a card-number `<input>` on a page hosted at `gbfeeds.com`.
9. **Strip the `<meta name="generator">` tag** from every output page in the rebuild. Static-export Next.js does not emit one by default; verify in the Phase-7 build review.
10. **Run `npm audit` (or Snyk / Socket / Dependabot) on every dependency bump** and block deploys on `high` or `critical` findings. Add this as a CI gate in Phase 7.
11. **Update `/privacy-policy` to disclose**: GA4, Reamaze chat, TrustedSite, Cloudflare (CDN), the email-service provider, and any other final integration. The current GoDaddy-template privacy page is generic and likely non-compliant for any user who exercises GDPR/CCPA rights — flag for legal review.
12. **Verify HSTS preload status of apex `gbfeeds.com` before DNS migration**. If preloaded, the rebuild origin MUST also serve HSTS — otherwise browsers will refuse to connect after migration.

**MUST NOT** (avoid these — they would re-introduce existing risk):

1. **MUST NOT** load any third-party script without a corresponding `script-src` allowlist entry in CSP. (The current site fails this — every script is implicitly trusted.)
2. **MUST NOT** copy GA4 measurement ID `G-BF2FDR6KMM` directly into client JS without confirming with the client whether they want to keep this property or create a fresh one for the rebrand. (The ID itself is safe-to-publish, but pre-rebuild data + post-rebuild data should usually be in **the same property** for trend continuity.)
3. **MUST NOT** rebuild the `/m/api/reamaze/...` auth bridge endpoint. That was a GoDaddy-OLS plumbing path; the rebuild's chat (if any) MUST use Reamaze's standard widget snippet or a different chat product entirely.
4. **MUST NOT** ship the GoDaddy site UUID `d82532f3-0270-4964-94c1-fade4071e01a` or any reference to `mysimplestore.com` in the rebuild's static markup unless the rebuild keeps GoDaddy OLS as the commerce backend. (Most paths considered for Phase 3 — Shopify, custom Next.js commerce — do not need it.)
5. **MUST NOT** include source maps in the production deploy. Configure `next.config.js` `productionBrowserSourceMaps: false`.
6. **MUST NOT** render any PII (email, name, address) into a URL query parameter or `<a href>` anywhere — server-side or client-side. Always POST.
7. **MUST NOT** ship custom `X-Version` / build-SHA response headers. Drop them via Cloudflare Page Rules.
8. **MUST NOT** drop `frame-ancestors` from the CSP. Set it to `'none'` (we have no legitimate embedder use case in the rebuild) — strictly tighter than the current `*.godaddy.com` allowlist.
9. **MUST NOT** implement an `/admin` or `/dashboard` route on the public-facing site. The rebuild is a static marketing + commerce frontend; if a content-edit UI is needed, host it on a separate subdomain behind auth.
10. **MUST NOT** run a custom checkout that captures card number, CVV, or expiry on `gbfeeds.com` HTML — that crosses into PCI DSS scope.

**Items the orchestrator MUST surface to the client before Phase 3 (rebuild) starts**:
- **Deploy-target decision**: confirm Cloudflare Pages over GitHub Pages, or accept the documented loss of CSP / COOP / COEP / Permissions-Policy / X-Frame-Options / X-Content-Type-Options enforcement.
- **TrustedSite / McAfee Secure account credentials**: the live site uses TrustedSite's badge with site ID 205, but the actual account ID is not in any captured artifact. Client must provide login or accept that the badge will be re-issued.
- **Email service for contact form + newsletter**: client must pick (recommend Resend or Loops + Cloudflare Turnstile).
- **Privacy policy refresh**: legal review needed before launch — client to provide updated copy or sign off on a vendor-disclosure refresh.

*End of Pre-Rebuild Security Findings — security-audit-expert — 2026-05-06.*
