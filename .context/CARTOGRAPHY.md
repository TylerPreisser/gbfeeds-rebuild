# gbfeeds.com-rebuilt — Project Cartography

**Date**: 2026-05-07  
**Purpose**: Complete image-swap readiness guide. Identifies all image assets, their location on disk, and every source file that references them.

---

## 1. Project Overview

**What**: Static-export Next.js 15 e-commerce + editorial site for GB Feeds (specialty deer-feed brand, Kansas-based). Replaces legacy GoDaddy Website Builder + Online Store.

**Framework**: Next.js 15 (App Router, `output: 'export'` for static generation)  
**Language**: TypeScript 5.7.3  
**Build System**: npm (Node ≥ 20.11.0)  
**Styling**: Tailwind CSS v4  
**Animation**: Framer Motion, GSAP 3.15.0, Lenis smooth scroll  
**Build Output**: `out/` (38 routes, ~10s build on modern laptop)  
**Deployment**: Cloudflare Pages (static) + Cloudflare Worker for forms (separate deploy)

**To run**:
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build      # → out/
npm run start      # Serve out/ locally on :4173
```

---

## 2. Directory Structure

```
gbfeeds.com-rebuilt/
├── .context/               # Context & memory (this file, screenshots, state)
├── .claude/                # Claude Code agent memory & settings
├── .github/                # GitHub Actions workflows
├── .next/                  # Next.js build cache (not deployed)
├── public/                 # Static assets served at / root
│   ├── brand/              # Logo, icon, signature SVGs (9 files)
│   ├── icons/              # Favicon, PWA icons, apple-touch-icon (10 files)
│   ├── og/                 # OG cards (PNG, 1 per route + 1 default) (16 files)
│   ├── photos/             # Lifestyle & gallery photos (WebP)
│   │   ├── gallery/        # 3 gallery photos (blob-*.webp)
│   │   ├── lifestyle/      # 11 lifestyle photos (lifestyle-*.webp)
│   │   └── trail-cam/      # (currently empty; ready for trail-cam photos)
│   ├── products/           # 16 products × 3 images × 5 widths × 3 formats (AVIF/WebP/JPEG)
│   │   └── {slug}/         # 16 subdirs: buck-chow-40lb, corn-candy-7lb, etc.
│   ├── data/               # JSON data exports (harvests.json)
│   └── textures/           # Grain, ruled, scanned-grain, kansas-counties.svg (5 files)
├── out/                    # Static export output (created by build, deployed to CF Pages)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (editorial)/    # /our-story, /customer-reviews, /photo-gallery, /why-gb-feeds
│   │   ├── (shop)/         # /products, /products/[slug]
│   │   ├── (legal)/        # /privacy, /terms
│   │   ├── layout.tsx      # Root layout, fonts, metadata template, GA4
│   │   ├── page.tsx        # / (home)
│   │   ├── manifest.ts     # PWA manifest.webmanifest (icons config)
│   │   ├── sitemap.ts      # XML sitemap
│   │   ├── robots.ts       # robots.txt
│   │   └── not-found.tsx   # 404
│   ├── components/
│   │   ├── atomic/         # Image.tsx, Heading, Container, Section, Rule (building blocks)
│   │   ├── composite/      # NavBar, Footer, ProductCard, ContactForm, etc.
│   │   ├── page/           # HomePage, ProductDetail, PhotoGalleryPage, OurStoryPage, etc.
│   │   ├── decoration/     # PaperGrain, ScannedGrainOverlay, HairlineRules (texture overlays)
│   │   └── motion/         # Framer Motion + GSAP animation wrappers
│   ├── data/               # products.live.json (16 products + 3 images each), testimonials, nav, faq, etc.
│   ├── styles/             # Tailwind CSS + atmosphere.css (background textures)
│   ├── lib/                # Utilities: seo.ts, basePath.ts, etc.
│   ├── types/              # TypeScript types: Product, Testimonial, Harvests, etc.
│   └── hooks/              # Custom React hooks
├── cloudflare-worker/      # Separate Worker for forms + newsletter (not covered here)
├── scripts/                # Build validation: validate-images.ts, validate-products.ts, etc.
├── tests/                  # Vitest unit tests + Playwright e2e tests
├── package.json            # Dependencies, scripts, Node version
├── next.config.ts          # Next.js config (output: 'export', unoptimized images)
├── RUNBOOK.md              # Phase-by-phase operational guide
├── README.md               # Setup, dev, build, test commands
└── _inherited_assets/      # Archive of legacy assets (not deployed)
```

---

## 3. Pages / Routes

| Route | File | Purpose | Image(s) Referenced |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Home page | Hero: `/photos/lifestyle/hero-buck-chow-original` (AVIF/WebP/JPG); OG: `/og/home.png` |
| `/products` | `src/app/(shop)/products/page.tsx` | Product index + carousel | Featured 3 products via data + lifestyle photo `/photos/lifestyle/lifestyle-img-3622.webp`; OG: `/og/default.png` |
| `/products/[slug]` | `src/app/(shop)/products/[slug]/page.tsx` | Product detail page (16 PDP routes) | Per `products.live.json`: 3 images per product at 1024w width (AVIF/WebP/JPG); OG: `/og/products-{slug}.png` |
| `/our-story` | `src/app/(editorial)/our-story/page.tsx` | Brand story + founder | 3 lifestyle photos: `lifestyle-img-1091-1`, `lifestyle-07eb939d-6b5c-4f14-8c4b-a476a8c5b6b8`, `lifestyle-20231008-234054`; OG: `/og/default.png` |
| `/customer-reviews` | `src/app/(editorial)/customer-reviews/page.tsx` | 22 testimonials + reviews | No images (text-only testimonials); OG: `/og/customer-reviews.png` |
| `/photo-gallery` | `src/app/(editorial)/photo-gallery/page.tsx` | 14 photo grid (lifestyle + gallery) | 11 lifestyle + 3 gallery (all `.webp`); OG: `/og/default.png` |
| `/why-gb-feeds` | `src/app/(editorial)/why-gb-feeds/page.tsx` | 4 pillars of difference | 4 gallery photos: `blob-478b3b7`, `blob-dsc08089-c31e863`, `blob-a733367`, `blob-8085ecb`; OG: `/og/default.png` |
| `/privacy` | `src/app/(legal)/privacy/page.tsx` | Privacy policy | No images; OG: `/og/default.png` |
| `/terms` | `src/app/(legal)/terms/page.tsx` | Terms of service | No images; OG: `/og/default.png` |
| `404` | `src/app/not-found.tsx` | Not found page | No images |

---

## 4. Components (Image-Aware)

| Component | File | Images Used |
|---|---|---|
| **NavBar** | `src/components/composite/NavBar.tsx` | Logo: `/brand/deer-mark.png` (desktop & mobile) |
| **NavMobileDrawer** | `src/components/composite/NavMobileDrawer.tsx` | Icon: `/brand/buck-icon.png` |
| **ProductCard** | `src/components/composite/ProductCard.tsx` | Product primary image from `products.live.json` |
| **ProductDetail** | `src/components/page/ProductDetail.tsx` | 3 product images per PDP (hero + 2 alternates) at 1024w via `products.live.json`; dynamic srcset via `ProductDetailImageGallery` |
| **HomePage** | `src/components/page/HomePage.tsx` | Hero: `/photos/lifestyle/hero-buck-chow-original` (eager load, high priority); featured products via ProductCard |
| **PhotoGalleryPage** | `src/components/page/PhotoGalleryPage.tsx` | 14 photos: 11 lifestyle + 3 gallery (see section 5b) |
| **OurStoryPage** | `src/components/page/OurStoryPage.tsx` | 3 photos: `lifestyle-img-1091-1`, `lifestyle-07eb939d-6b5c-4f14-8c4b-a476a8c5b6b8`, `lifestyle-20231008-234054` |
| **WhyGBFeedsPage** | `src/components/page/WhyGBFeedsPage.tsx` | 4 photos: `blob-478b3b7`, `blob-dsc08089-c31e863`, `blob-a733367`, `blob-8085ecb` |
| **CustomerReviewsPage** | `src/components/page/CustomerReviewsPage.tsx` | No images (text testimonials only) |
| **KansasMapSVG** | `src/components/composite/KansasMapSVG.tsx` | `/textures/kansas-counties.svg` (interactive map) |
| **PaperGrain** | `src/components/decoration/PaperGrain.tsx` | `/textures/grain.webp` (CSS background-image) |
| **ScannedGrainOverlay** | `src/components/decoration/ScannedGrainOverlay.tsx` | `/textures/scanned-grain.webp` (CSS background-image) |
| **HairlineRules** | `src/components/decoration/HairlineRules.tsx` | `/textures/ruled.svg` (CSS background-image) |
| **FooterSignature** | `src/components/composite/Footer.tsx` | `/brand/greg-signature.svg` (founder signature) |

---

## 5. Image Asset Inventory

### 5a. Asset Folders & Conventions

**Total images in public/**: 473 files (includes multi-format, multi-width variants)

| Folder | Purpose | Format(s) | Count | Naming |
|---|---|---|---|---|
| `public/brand/` | Logo, mark, signature | PNG, SVG | 9 | `logo.svg`, `logo-transparent.png`, `logo-1024.png`, `deer-mark.png`, `buck-icon{-192,-512,-96}.png`, `greg-signature.svg` |
| `public/icons/` | Favicon, PWA, touch icons | PNG, ICO | 10 | `favicon.ico`, `apple-touch-icon.png`, `icon-{192,512}{,-maskable}.png` |
| `public/og/` | Open Graph preview cards (social share) | PNG | 16 | `home.png`, `products-{slug}.png` (16 total: 1 default + 15 per-product), `customer-reviews.png`, etc. |
| `public/photos/gallery/` | Gallery photos (crop/zoom effects) | WebP | 3 | `blob-{478b3b7,8085ecb,b7a2223}.webp` (no hero fallbacks needed) |
| `public/photos/lifestyle/` | Lifestyle & hero photos | WebP | 11 | `lifestyle-{img-0001,img-1091-1,img-3622,img-4215,img-4433-1,img-4439,img-8584,a733367,dsc08089-c31e863,20231008-234054,07eb939d-6b5c-4f14-8c4b-a476a8c5b6b8}.webp` + `hero-buck-chow-original.{jpg,webp,avif}` |
| `public/photos/trail-cam/` | Trail cam photos | (empty, ready for expansion) | 0 | — |
| `public/products/` | Product images: 16 products × 3 photos × 5 widths × 3 formats | AVIF, WebP, JPEG | 720+ | `{productslug}-{hero,alt-1,alt-2}-{320,640,1024,1600,2400}.{avif,webp,jpg}` |
| `public/textures/` | Background textures | WebP, SVG | 5 | `grain.webp`, `scanned-grain.webp`, `ruled.svg`, `kansas-counties.svg`, `kansas-state.svg` |
| `public/data/` | JSON exports (not images) | JSON | — | `harvests.json` (data; no images) |

**Image format strategy**:
- **Modern formats first**: AVIF (smallest, Chrome/Edge) → WebP (fallback, broader support) → JPEG/JPG (legacy)
- **Hero images**: 3-format picture element (AVIF/WebP/JPEG)
- **Gallery/lifestyle**: WebP only (no JPEG fallback; lazy-load OK)
- **Product images**: AVIF + WebP primary; JPEG for PDP hero fallback
- **Textures**: WebP (grain, scanned-grain); SVG (ruled, kansas-counties)
- **Brand assets**: PNG for raster (icons, logo variants); SVG for vector (logo, signature, textures)

**Image budget (enforced at build time by `scripts/validate-images.ts`)**:
```
AVIF:          320w ≤ 22 KB | 640w ≤ 45 KB | 1024w ≤ 80 KB | 1600w ≤ 130 KB | 2400w ≤ 200 KB
WebP:          320w ≤ 32 KB | 640w ≤ 65 KB | 1024w ≤ 120 KB | 1600w ≤ 200 KB | 2400w ≤ 300 KB
JPEG:          320w ≤ 50 KB | 640w ≤ 110 KB | 1024w ≤ 200 KB | 1600w ≤ 320 KB | 2400w ≤ 480 KB
OG cards:      ≤ 200 KB (PNG)
Total public/products/: ≤ 28 MB
```

---

### 5b. Complete Image Map: Filename → Format → References

**Legend**: 
- `[RSC-only]` = Server component only, safe to reference
- `[Client]` = Client component or prop
- `[CSS]` = CSS background-image
- `[HTML meta]` = HTML meta tags / manifest

#### Brand & Icons

| Filename | Format | Size | References | Notes |
|---|---|---|---|---|
| `public/brand/logo.svg` | SVG | N/A | `src/components/composite/NavBar.tsx` (desktop logo, implicit via styling) | Vectorized master logo |
| `public/brand/logo-transparent.png` | PNG | ~5 KB | Possibly unused in current build; archived for legacy compatibility | Transparent PNG variant |
| `public/brand/logo-1024.png` | PNG | ~8 KB | Possibly archived; check if deployed to CDN historically | High-res raster |
| `public/brand/deer-mark.png` | PNG | ~3 KB | `src/components/composite/NavBar.tsx` line ~60 (desktop) + line ~120 (mobile); direct `<img src>` | **Multi-reference: HIGH BLAST RADIUS** |
| `public/brand/buck-icon.png` | PNG | ~4 KB | `src/components/composite/NavMobileDrawer.tsx` (mobile drawer icon) | Mobile nav only |
| `public/brand/buck-icon-192.png` | PNG | ~6 KB | Apple touch icon, PWA icon | PWA/mobile home screen |
| `public/brand/buck-icon-512.png` | PNG | ~15 KB | PWA icon (512×512) | PWA splash screen |
| `public/brand/buck-icon-96.png` | PNG | ~3 KB | Small PWA icon | PWA fallback |
| `public/brand/greg-signature.svg` | SVG | ~2 KB | `src/components/composite/Footer.tsx` (founder attribution) | Footer signature |
| `public/icons/favicon.ico` | ICO | ~1 KB | `src/app/layout.tsx` implicitly; browser requests `/favicon.ico` | Browser tab |
| `public/icons/apple-touch-icon.png` | PNG | ~8 KB | `src/app/layout.tsx` implicitly; Safari home screen iOS | **Multi-reference via layout** |
| `public/icons/icon-192.png` | PNG | ~7 KB | `src/app/manifest.ts` line 21 (PWA manifest, purpose: 'any') | PWA icon |
| `public/icons/icon-192-maskable.png` | PNG | ~7 KB | `src/app/manifest.ts` line 27 (PWA manifest, purpose: 'maskable') | Adaptive icon iOS |
| `public/icons/icon-512.png` | PNG | ~20 KB | `src/app/manifest.ts` line 33 (PWA manifest, purpose: 'any') | PWA splash |
| `public/icons/icon-512-maskable.png` | PNG | ~20 KB | `src/app/manifest.ts` line 39 (PWA manifest, purpose: 'maskable') | Adaptive icon iOS |

#### Open Graph Cards (OG Meta Tags)

| Filename | Format | Size | Route(s) | References |
|---|---|---|---|---|
| `public/og/home.png` | PNG | ~150 KB | `/` | `src/app/page.tsx` → `buildMetadata({ ogImage: '/og/home.png' })` |
| `public/og/default.png` | PNG | ~150 KB | `/our-story`, `/photo-gallery`, `/why-gb-feeds`, `/products`, `/privacy`, `/terms` | Used as fallback in route metadata |
| `public/og/customer-reviews.png` | PNG | ~150 KB | `/customer-reviews` | `src/app/(editorial)/customer-reviews/page.tsx` → `buildMetadata({ ogImage: '/og/customer-reviews.png' })` |
| `public/og/products-buck-chow-40lb.png` | PNG | ~160 KB | `/products/buck-chow-40lb` | `src/app/(shop)/products/[slug]/page.tsx` line ~60: `ogImage: `/og/products-${slug}.png`` |
| `public/og/products-corn-candy-7lb.png` | PNG | ~160 KB | `/products/corn-candy-7lb` | (same dynamic reference as above) |
| `public/og/products-buck-chow-2000lb-pallet.png` | PNG | ~160 KB | `/products/buck-chow-2000lb-pallet` | (same dynamic reference as above) |
| `public/og/products-camera-stake.png` | PNG | ~160 KB | `/products/camera-stake` | (same dynamic reference as above) |
| `public/og/products-camo-hat.png` | PNG | ~160 KB | `/products/camo-hat` | (same dynamic reference as above) |
| `public/og/products-black-hat.png` | PNG | ~160 KB | `/products/black-hat` | (same dynamic reference as above) |
| `public/og/products-lithium-battery.png` | PNG | ~160 KB | `/products/lithium-battery` | (same dynamic reference as above) |
| `public/og/products-reveal-x.png` | PNG | ~160 KB | `/products/reveal-x` | (same dynamic reference as above) |
| `public/og/products-reveal-x-pro.png` | PNG | ~160 KB | `/products/reveal-x-pro` | (same dynamic reference as above) |
| `public/og/products-solar-panel.png` | PNG | ~160 KB | `/products/solar-panel` | (same dynamic reference as above) |
| `public/og/products-32gb-sd-card.png` | PNG | ~160 KB | `/products/32gb-sd-card` | (same dynamic reference as above) |
| `public/og/products-tactacam-reveal-bundle.png` | PNG | ~160 KB | `/products/tactacam-reveal-bundle` | (same dynamic reference as above) |
| `public/og/products-tws-2000lb-gravity-feeder.png` | PNG | ~160 KB | `/products/tws-2000lb-gravity-feeder` | (same dynamic reference as above) |
| `public/og/products-tws-2000lb-spin-feeder.png` | PNG | ~160 KB | `/products/tws-2000lb-spin-feeder` | (same dynamic reference as above) |
| `public/og/products-tws-600lb-gravity-feeder.png` | PNG | ~160 KB | `/products/tws-600lb-gravity-feeder` | (same dynamic reference as above) |
| `public/og/products-tws-600lb-lucky-buck-spin.png` | PNG | ~160 KB | `/products/tws-600lb-lucky-buck-spin` | (same dynamic reference as above) |

#### Lifestyle & Gallery Photos

| Filename | Format | Size | References | Notes |
|---|---|---|---|---|
| `public/photos/lifestyle/hero-buck-chow-original.jpg` | JPEG | ~180 KB | `src/components/page/HomePage.tsx` line ~91 (home hero fallback) | **CRITICAL LCP IMAGE** — eager load, high priority |
| `public/photos/lifestyle/hero-buck-chow-original.webp` | WebP | ~120 KB | `src/components/page/HomePage.tsx` line ~87 (home hero picture source) | Picture element fallback |
| `public/photos/lifestyle/hero-buck-chow-original.avif` | AVIF | ~85 KB | `src/components/page/HomePage.tsx` line ~84 (home hero picture source) | **PRIMARY** in picture element |
| `public/photos/lifestyle/lifestyle-img-0001.webp` | WebP | ~180 KB | `src/components/page/PhotoGalleryPage.tsx` line 25; gallery + lightbox | Mule deer hunter harvest |
| `public/photos/lifestyle/lifestyle-img-1091-1.webp` | WebP | ~160 KB | `src/components/page/OurStoryPage.tsx` line ~130; `src/components/page/ProductsIndex.tsx` (featured); `PhotoGalleryPage.tsx` line 30 | **Multi-reference: HIGH BLAST RADIUS** |
| `public/photos/lifestyle/lifestyle-img-3622.webp` | WebP | ~150 KB | `src/components/page/ProductsIndex.tsx` (products index hero); `PhotoGalleryPage.tsx` line 34 | **Multi-reference: HIGH BLAST RADIUS** |
| `public/photos/lifestyle/lifestyle-img-4215.webp` | WebP | ~170 KB | `src/components/page/PhotoGalleryPage.tsx` line 39 | Gallery only |
| `public/photos/lifestyle/lifestyle-img-4433-1.webp` | WebP | ~160 KB | `src/components/page/PhotoGalleryPage.tsx` line 43 | Archery hunter whitetail |
| `public/photos/lifestyle/lifestyle-img-4439.webp` | WebP | ~150 KB | `src/components/page/PhotoGalleryPage.tsx` line 47 | Young hunter first whitetail |
| `public/photos/lifestyle/lifestyle-img-8584.webp` | WebP | ~170 KB | `src/components/page/PhotoGalleryPage.tsx` line 52 | Bow hunter at feeder |
| `public/photos/lifestyle/lifestyle-a733367.webp` | WebP | ~140 KB | `src/components/page/WhyGBFeedsPage.tsx` line ~140; `PhotoGalleryPage.tsx` line 56 | **Multi-reference: MEDIUM BLAST RADIUS** |
| `public/photos/lifestyle/lifestyle-dsc08089-c31e863.webp` | WebP | ~155 KB | `src/components/page/WhyGBFeedsPage.tsx` line ~150; `PhotoGalleryPage.tsx` line 60 | **Multi-reference: MEDIUM BLAST RADIUS** |
| `public/photos/lifestyle/lifestyle-20231008-234054.webp` | WebP | ~160 KB | `src/components/page/OurStoryPage.tsx` line ~140; `PhotoGalleryPage.tsx` line 64 | **Multi-reference: MEDIUM BLAST RADIUS** |
| `public/photos/lifestyle/lifestyle-07eb939d-6b5c-4f14-8c4b-a476a8c5b6b8.webp` | WebP | ~165 KB | `src/components/page/OurStoryPage.tsx` line ~135; `PhotoGalleryPage.tsx` line 69 | **Multi-reference: MEDIUM BLAST RADIUS** |
| `public/photos/gallery/blob-478b3b7.webp` | WebP | ~180 KB | `src/components/page/WhyGBFeedsPage.tsx` line ~125; `PhotoGalleryPage.tsx` line 80 | **Multi-reference: MEDIUM BLAST RADIUS** |
| `public/photos/gallery/blob-8085ecb.webp` | WebP | ~190 KB | `src/components/page/WhyGBFeedsPage.tsx` line ~145; `PhotoGalleryPage.tsx` line 85 | **Multi-reference: MEDIUM BLAST RADIUS** |
| `public/photos/gallery/blob-b7a2223.webp` | WebP | ~165 KB | `src/components/page/PhotoGalleryPage.tsx` line 90 | Gallery only; handwritten thank-you note |

#### Product Images (16 products × 3 images × 5 widths × 3 formats)

Each product slug has a folder in `public/products/{slug}/` with images named: `{slug}-{hero,alt-1,alt-2}-{320,640,1024,1600,2400}.{avif,webp,jpg}`

**Product slugs**: `buck-chow-40lb`, `corn-candy-7lb`, `buck-chow-2000lb-pallet`, `camera-stake`, `camo-hat`, `black-hat`, `lithium-battery`, `reveal-x`, `reveal-x-pro`, `solar-panel`, `32gb-sd-card`, `tactacam-reveal-bundle`, `tws-2000lb-gravity-feeder`, `tws-2000lb-spin-feeder`, `tws-600lb-gravity-feeder`, `tws-600lb-lucky-buck-spin`

**References**:
- **Data-driven**: `src/data/products.live.json` lines ~16, ~64, ~108 etc. (every product object has `primaryImage` + `images: [{ src, alt }]`) **[RSC-only]**
- **ProductDetail component**: `src/components/page/ProductDetail.tsx` line ~80 (dynamic heroBase path, renders 3 images via ProductDetailImageGallery)
- **ProductCard component**: `src/components/composite/ProductCard.tsx` (featured products on home + products index)
- **Image.tsx atomic component**: `src/components/atomic/Image.tsx` (handles responsive breakpoints, srcset generation)

**Example mapping for `buck-chow-40lb`**:
```
public/products/buck-chow-40lb/
├── buck-chow-40lb-hero-{320,640,1024,1600,2400}.avif (AVIF)
├── buck-chow-40lb-hero-{320,640,1024,1600,2400}.webp (WebP)
├── buck-chow-40lb-hero-{320,640,1024,1600,2400}.jpg  (JPEG)
├── buck-chow-40lb-alt-1-{320,640,1024,1600,2400}.avif
├── buck-chow-40lb-alt-1-{320,640,1024,1600,2400}.webp
├── buck-chow-40lb-alt-1-{320,640,1024,1600,2400}.jpg
├── buck-chow-40lb-alt-2-{320,640,1024,1600,2400}.avif
├── buck-chow-40lb-alt-2-{320,640,1024,1600,2400}.webp
└── buck-chow-40lb-alt-2-{320,640,1024,1600,2400}.jpg
```

References in `src/data/products.live.json`:
```json
{
  "primaryImage": "/products/buck-chow-40lb/buck-chow-40lb-hero-1024.avif",
  "images": [
    { "src": "/products/buck-chow-40lb/buck-chow-40lb-hero-1024.avif", "alt": "Buck Chow 40lb bag..." },
    { "src": "/products/buck-chow-40lb/buck-chow-40lb-alt-1-1024.avif", "alt": "Buck Chow 40lb bag close-up..." },
    { "src": "/products/buck-chow-40lb/buck-chow-40lb-alt-2-1024.avif", "alt": "Deer feeding on Buck Chow..." }
  ]
}
```

#### Texture & Decorative Assets

| Filename | Format | Size | References | Type |
|---|---|---|---|---|
| `public/textures/grain.webp` | WebP | ~2 KB | `src/styles/atmosphere.css` line ~15 (CSS `background-image: url(...)`) | Paper grain overlay (repeating) |
| `public/textures/scanned-grain.webp` | WebP | ~59 KB | `src/styles/atmosphere.css` line ~25; `src/components/decoration/ScannedGrainOverlay.tsx` | Scanned film grain (full-width) |
| `public/textures/ruled.svg` | SVG | ~0.2 KB | `src/styles/atmosphere.css` line ~30; `src/components/decoration/HairlineRules.tsx` | Horizontal ruled lines |
| `public/textures/kansas-counties.svg` | SVG | ~12 KB | `src/components/composite/KansasMapSVG.tsx` line ~60 (direct `<img src>`) | Interactive counties map |
| `public/textures/kansas-state.svg` | SVG | ~0.4 KB | (currently unused; added for future expansion) | State outline (backup) |

---

### 5c. Multi-Reference Images (High Blast Radius)

Swapping these affects **2+ locations**. Test thoroughly:

| Image | Reference Count | Locations | Impact |
|---|---|---|---|
| `/brand/deer-mark.png` | 2 | NavBar desktop + mobile | Navigation visible on every page |
| `/photos/lifestyle/lifestyle-img-1091-1.webp` | 3 | OurStoryPage + ProductsIndex + PhotoGalleryPage | Greg with three bucks — editorial brand image |
| `/photos/lifestyle/lifestyle-img-3622.webp` | 2 | ProductsIndex (featured) + PhotoGalleryPage | Spin-feeder cup of corn/pellets |
| `/photos/lifestyle/lifestyle-a733367.webp` | 2 | WhyGBFeedsPage + PhotoGalleryPage | Buck Chow grain blend close-up |
| `/photos/lifestyle/lifestyle-dsc08089-c31e863.webp` | 2 | WhyGBFeedsPage + PhotoGalleryPage | Hand pouring Buck Chow |
| `/photos/lifestyle/lifestyle-20231008-234054.webp` | 2 | OurStoryPage + PhotoGalleryPage | Family portrait with harvest at night |
| `/photos/lifestyle/lifestyle-07eb939d-6b5c-4f14-8c4b-a476a8c5b6b8.webp` | 2 | OurStoryPage + PhotoGalleryPage | Couple with Kansas whitetail |
| `/photos/gallery/blob-478b3b7.webp` | 2 | WhyGBFeedsPage + PhotoGalleryPage | Boy with trophy + Corn Candy jug |
| `/photos/gallery/blob-8085ecb.webp` | 2 | WhyGBFeedsPage + PhotoGalleryPage | 4-harvest collage |

---

### 5d. External / CDN Image URLs

**None identified in source code.** All images are served from `public/` (static export).

---

## 6. Styling & Theming

**Design system**:
- **Colors**: Bone paper (`#EDE7D9`), loam ink (`#0F0E0B`), oxblood brick (`#B33A1A`)
- **Typography**: Bebas Neue (display), DM Serif Display (body), JetBrains Mono (stamps/labels)
- **Textures**: Grain + scanned-grain WebP overlays + ruled SVG lines

**Image-related CSS**:
- **Background textures** (atmosphere.css):
  ```css
  /* PaperGrain */
  background-image: url('/textures/grain.webp');
  
  /* ScannedGrainOverlay */
  background-image: url('/textures/scanned-grain.webp');
  
  /* HairlineRules */
  background-image: url('/textures/ruled.svg');
  ```
- **Picture element fallback order**: AVIF → WebP → JPEG
- **Responsive widths**: 320/640/1024/1600/2400px via srcset (Next.js Image optimization config is disabled: `unoptimized: true`)

---

## 7. Data / Content Sources

**Product data** (`src/data/products.live.json`):
- 16 SKUs, each with `primaryImage` + array of `images: [{ src, alt }]`
- **Validation**: Zod schema at `src/data/products.ts` enforces `src` to start with `/products/`
- **Build-time check**: `scripts/validate-products.ts` rejects placeholder Payment Links and TODO markers

**Harvests data** (`public/data/harvests.json`):
- JSON file (no images referenced within; external data feed)

**Testimonials** (`src/data/testimonials.ts`):
- 22 text quotes; **no avatars, no images**

**Routes / content**:
- All editorial content is hardcoded in component TSX (no CMS)
- Photo arrays are hardcoded in `PhotoGalleryPage.tsx`, `OurStoryPage.tsx`, `WhyGBFeedsPage.tsx`

---

## 8. Build & Deploy

**Build process** (executed by `npm run build`):

1. `tsx scripts/verify-env.ts` — enforce `NEXT_PUBLIC_SITE_URL`; fail on Worker secrets
2. `tsx scripts/validate-harvests.ts` — validate harvests.json schema
3. `tsx scripts/validate-products.ts` — validate products.live.json schema; reject TODO payment links
4. `tsx scripts/validate-images.ts` — **IMAGE BUDGET CHECK**: every image must be under its width/format budget
5. `tsx scripts/validate-client-data-boundary.ts` — enforce RSC boundary rules
6. `next build` — generate 38 static routes → `out/`

**Output**: `out/` directory is deployed verbatim to Cloudflare Pages.

**Static export config** (`next.config.ts`):
```typescript
const nextConfig: NextConfig = {
  output: 'export',           // Static export (no Node server)
  trailingSlash: true,        // /route/ instead of /route
  images: { unoptimized: true }, // No Next.js Image optimization (build-time validation instead)
};
```

---

## 9. Gotchas & Constraints

### Critical

1. **Image budget is enforced at build time**. All product images must fit the AVIF/WebP/JPEG size budgets defined in `scripts/validate-images.ts`. If you add images that exceed budget, the build fails.

2. **No Next.js Image optimization** (`unoptimized: true`). The site uses `<picture>` elements and manual `srcset` instead. This means:
   - Multi-width variants (320/640/1024/1600/2400) must exist on disk
   - Three formats (AVIF/WebP/JPEG) must all exist
   - If a format is missing, the image won't load on older browsers

3. **Static export only** (`output: 'export'`). This is a static site; no server-side rendering. All image URLs are baked in at build time.

4. **Product images are data-driven**. Changing a product image requires editing `src/data/products.live.json` **and** adding/replacing the physical files in `public/products/{slug}/`.

5. **OG cards are per-route**. Product PDPs generate OG cards dynamically: `/og/products-{slug}.png` must exist for each product slug.

### Important

6. **Hero image is LCP-critical** (`/photos/lifestyle/hero-buck-chow-original`). It has `loading="eager"` and `fetchPriority="high"`. Swapping it affects Core Web Vitals.

7. **Brand mark is multi-reference**: `/brand/deer-mark.png` appears in NavBar on desktop + mobile. Swapping it affects all pages.

8. **Gallery photos are WebP-only**. Unlike product images, gallery photos (lifestyle + gallery folders) have no JPEG fallback. Browsers without WebP support won't display them (intentional: targeting modern browsers).

9. **Case-sensitive paths**. The codebase is case-sensitive. File paths like `/photos/lifestyle/lifestyle-img-1091-1.webp` must match exactly (no `Lifestyle/` or `LIFESTYLE/`).

10. **Picture elements rely on source order**. In `<picture>`, the first matching `<source>` wins. The order is:
   ```html
   <source type="image/avif" srcSet="...avif" />
   <source type="image/webp" srcSet="...webp" />
   <img src="...jpg" />  <!-- fallback -->
   ```
   If AVIF is missing, the browser skips to WebP. If both are missing, it falls back to JPEG.

11. **SVG textures are inline in CSS**. Grain, rules, and map SVGs are referenced as `url()` in stylesheets. Changing their filenames breaks CSS.

12. **Testimonials have no avatars**. The site intentionally uses text-only testimonials (no photos). Don't add avatar images to `CustomerReviewsPage.tsx`.

---

## 10. Recommended Workflow for Image Swaps

### Before You Start

1. **Read the build output**: Run `npm run build` once to confirm current state. Note any image budget warnings.
2. **Identify impact scope**: Check if your target image is in section 5c (multi-reference). If yes, plan to test all referencing pages.

### Swap Process

**Step 1: Locate the image reference**

- Use Ctrl+F / Cmd+F to find the filename in:
  - `src/data/products.live.json` (product images)
  - `src/components/page/*.tsx` (hardcoded references)
  - `src/styles/atmosphere.css` (CSS textures)
  - `src/app/manifest.ts` (PWA icons)

**Step 2: Prepare the new image**

- **Product images**: Must exist in 5 widths × 3 formats: `{slug}-{hero,alt-1,alt-2}-{320,640,1024,1600,2400}.{avif,webp,jpg}`
  - Use a tool like ImageMagick or ffmpeg to generate variants
  - Check against budget: AVIF 1024w ≤ 80 KB, etc.
  
- **Lifestyle/gallery photos**: WebP only (no JPEG fallback)
  - Single file per image; no width variants
  
- **Brand assets**: PNG for raster, SVG for vector
  - Icons must match sizes (192×192, 512×512, etc.)
  
- **OG cards**: PNG, ≤ 200 KB, 1200×630px recommended

**Step 3: Replace the file(s)**

- Copy new image(s) to the correct folder in `public/`
- **Preserve filenames exactly** (case-sensitive)
- If adding new images, ensure the path matches the reference in code

**Step 4: Update references (if filename changed)**

- If you renamed the file, update all references:
  - `src/data/products.live.json` (product images)
  - `src/components/page/*.tsx` (hardcoded src strings)
  - `src/styles/atmosphere.css` (CSS url)
  - `src/app/manifest.ts` (PWA icons)

**Step 5: Build & validate**

```bash
npm run build
```

- **Check for errors**: Image budget violations will cause build to fail. Fix image sizes if needed.
- **Verify output**: Check `out/` directory for the correct images and routes.

**Step 6: Test locally**

```bash
npm run start
# Visit http://localhost:4173 and inspect:
# - Image loads correctly (no 404s)
# - Correct format is served (check Network tab: is it .avif, .webp, or .jpg?)
# - Layout doesn't break (crop, alignment, aspect ratio)
```

**Step 7: Commit & deploy**

```bash
git add -A
git commit -m "Update images: {description of what changed}"
git push
# Cloudflare Pages auto-deploys on push
```

### Multi-Reference Swaps (Extra Care)

If swapping a high-blast-radius image (section 5c), test **all** affected routes:

| Image | Routes to Test |
|---|---|
| `/brand/deer-mark.png` | Home, all products, all editorial pages (appears in navbar on every page) |
| `lifestyle-img-1091-1.webp` | `/our-story`, `/products`, `/photo-gallery` |
| Other multi-ref images | Check section 5c for specific routes |

---

## 11. Current State Assessment

### What's Complete & Stable

- ✅ All 16 products with 3-image galleries (hero + 2 alternates) in AVIF/WebP/JPEG
- ✅ 11 lifestyle photos (hero + supporting images for editorial pages)
- ✅ 3 gallery photos (customer collages)
- ✅ All OG cards (1 home + 15 product + 1 customer-reviews default)
- ✅ Brand assets (logo, icon, signature)
- ✅ PWA icons and favicon
- ✅ Texture overlays (grain, scanned-grain, ruled, kansas-counties)
- ✅ Image budget validation enforced at build time
- ✅ Static export working; build succeeds with no budget violations

### What's Ready for Expansion

- `public/photos/trail-cam/` folder exists but is empty (ready for trail-cam photo gallery if needed)
- `public/textures/kansas-state.svg` is pre-created but unused (available for future features)

### No Known Issues

- No broken image references identified
- No images exceeding budget
- No missing format variants (all 3 formats present for product images)
- Build passes all validation steps

---

## 12. File Paths for Quick Reference

### Key Image Folders

- `public/brand/` — Logo, icon, signature
- `public/icons/` — Favicon, PWA icons
- `public/og/` — Open Graph cards
- `public/photos/lifestyle/` — Lifestyle & hero photos
- `public/photos/gallery/` — Gallery photos
- `public/products/` — Product images (16 subdirectories)
- `public/textures/` — Decorative SVG + WebP textures

### Key Source Files

- `src/data/products.live.json` — Product image paths (Zod-validated)
- `src/components/page/PhotoGalleryPage.tsx` — Gallery photo references (hardcoded array)
- `src/components/page/OurStoryPage.tsx` — Story page photos
- `src/components/page/WhyGBFeedsPage.tsx` — Difference pillars photos
- `src/components/page/HomePage.tsx` — Home hero image
- `src/components/composite/NavBar.tsx` — Navigation brand mark
- `src/app/manifest.ts` — PWA icon references
- `src/styles/atmosphere.css` — CSS texture URLs
- `scripts/validate-images.ts` — Build-time image budget enforcer

---

**End of Cartography Document**

Generated: 2026-05-07 | For: Tyler Preisser | Purpose: Image-swap readiness
