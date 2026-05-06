## 8. Black Rifle Coffee (Aspirational benchmark)

**URL:** https://blackriflecoffee.com/ — Veteran-founded (est. 2014), Salesforce Commerce Cloud + Builder.io headless rebuild (migrated off Shopify; the live frontend still serves through a `cdn/shop` path and uses Shopify's Customer Accounts portal at `/account`, suggesting a hybrid SFCC/Shopify-Plus stack mid-migration). React component library, Tailwind utility classes with custom `brcc-*` tokens.

### 1. Hero strategy
Above the fold: split-hero (`split-hero-content w-6/12`) — left half is solid black (`#1A2118`) panel with stenciled wordmark badge "VETERAN FOUNDED – EST. 2014" in yellow, then the headline **"AMERICA'S COFFEE®"** set in massive condensed display caps, sub-deck "Built by Veterans. Roasted with purpose. Fuel your mission with premium coffee that gives back to the people who serve.", a single yellow CTA button. Right half is a tight-cropped lifestyle still-life: bagged coffee (Beyond Black, AK-Espresso), a steaming enamel mug, an American flag — wood-table flat-lay, cinematic warm tungsten lighting. No founder-on-camera in the hero rotation captured today (founder/CEO Evan Hafer is reserved for the Our Story page and YouTube embeds). Top of page also runs a yellow `announcement-bar` with `animate-horizontal-scroll` ticker — "Free Shipping on orders over $59. America." A second below-the-fold band ("GREAT COFFEE. GREAT MISSION. NO COMPROMISE.") sits over a torn-paper edge transition with faded American-flag washout, a deliberately analog/punk visual cue.

### 2. Typography system
- **Display/heading:** **`Apotek`** (self-hosted via `cdn/shop/t/203/assets/Apotek_Black.woff2` and `Apotek_Semibold.woff2`). This is a wide, geometric, ultra-bold sans — *not* military stencil and *not* slab. It reads as condensed industrial grotesk; closer to Druk Wide / Knockout HTF-49 territory. CSS custom property: `--font-heading: 'Apotek'`. Tailwind class `font-barlow` is misleadingly named (legacy from a prior build that used Barlow) but actually maps to Apotek today. All display text is `uppercase` with `tracking-brcc-button` letter-spacing token. Headline class observed: `text-display-lg text-white uppercase font-barlow`.
- **Body:** **`Host Grotesk`** (self-hosted weights 400/500, also pulled from Shopify CDN). Neutral humanist grotesk; mid-contrast, friendly, very readable at small sizes. CSS: `--font-body: 'Host Grotesk'`. Body class `text-body-xs` dominates (475 occurrences) — most product card copy is small.
- **Scale:** Three discovered tokens — `text-display-lg` (hero), `text-body-md`, `text-body-sm`, `text-body-xs`. Tracking tokens are custom: `tracking-brcc-button`, `tracking-brcc-small`, `tracking-brcc-tight`. No serif. No script. Two fonts only. Fallback chain: `Apotek Fallback`, `Host Grotesk Fallback` (for FOIT prevention).

### 3. Color system
The system is darker and more earth-toned than the cliched "black + red" military trope — they avoid red almost entirely outside of product packaging and the flag photography:
- **Primary dark / canvas:** `#1A2118` (rgb 26,33,24) — a near-black with a green-olive undertone, mapped to `--color-primary-dark` and `--color-text`. Used for hero block, footer, and dark sections.
- **Light canvas:** `#ECEEEB` (rgb 236,238,235) — a warm off-white/bone, `--color-background` and `--color-primary-light`.
- **Accent gold (signature):** `#F6B519` (light) / `#D69A2D` (dark) — `--color-accent-one-light/dark`. This is the CTA yellow on every primary button and the announcement bar — chosen over red so the brand reads as "morning coffee + military tan/khaki" instead of "weapons company."
- **Olive (Tier 2):** `#41533B` (dark) / `#BAC1B8` (light) — `--color-accent-two-*`. Used for secondary surfaces and the dark-green Continue button on account pages.
- **Greens (rewards/loyalty UI):** `#298266`, `#68B631`, `#2C6415` — appear in subscription "Save X%" upsell badges via OrderGroove (`--og-upsell-color`).
- **Grayscale:** `#797263` (warm taupe text), `#151515`, `#272727` (deep black surfaces), `#FFFFFF`. Notable: their "black" backgrounds are almost never pure `#000`. They use `#1A2118` to read as "earthy" not "tech."
- Contrast: hero white-on-`#1A2118` is AAA. CTA: `#1A2118` text on `#F6B519` yellow is AAA.

### 4. Motion language
Confirmed from the rendered DOM, not speculation:
- **Horizontal ticker** (`animate-horizontal-scroll`) on the announcement bar — continuous loop, military-comms feel.
- **Vertical scroll ticker** (`animate-vertical-scroll`) used on category strips.
- **Hover micro-interactions** on buttons: `transition-all duration-200`, button color flips on hover (yellow → primary-dark fill, accent border stays).
- **Slide-in cart drawer:** `transform translate-x-full transition-transform` — right-edge drawer.
- **Modal popup motion:** `translate-y-full → 0` slide-up (the "WANT THE LATEST INTEL?" Klaviyo email modal that fires on collection pages).
- **Image hover scale:** `transform: translateY(-50%) scale(1.05)` on product card images.
- **Loading spinner:** `animate-spin border-b-2 border-brcc-primary` (rotating underline, not a generic spinner).
- **No GSAP, no Framer Motion, no Lenis.** All motion is CSS keyframes + Tailwind transition utilities. They prioritized Lighthouse score (Builder.io case study cites a +37-point improvement) over signature scroll choreography.

### 5. Component vocabulary
- **Buttons:** four variants observed — `button-primary-brand` (yellow fill, dark text, semibold uppercase Apotek, `tracking-[0.32px]`, `rounded-md`, `px-6 py-3`, `border-2`); `button-secondary` (transparent + border); `brcc-button-primary-block` (full-width); `klaviyo-bis-trigger` (back-in-stock). All buttons use Apotek uppercase; this is the single most consistent rule on the site.
- **Cards (product):** square aspect, dark or warm-photo background, product packaging shot face-on with attribute icons (origin, roast, caffeine) overlaid as small white rounds in the upper-right corner of the image. Below the image: title in Apotek uppercase, price, and a yellow "QUICK SHOP" button on the card (in-card add to cart, no PDP click required).
- **Nav:** four top-level tabs in the rendered header — `COFFEE & DRINKS`, `MERCH`, `DISCOVER`, `SUBSCRIBE` — plus right-side utilities `FIND YOUR COFFEE` (yellow fill, the primary discovery CTA), `WHERE TO BUY`, search icon, account icon, cart icon. Centered black-circle BRCC monogram logo. Sticky on scroll.
- **Forms:** Klaviyo-powered email capture (`klaviyo-button-container`) with single-line email input + yellow `EMAIL ME` button. Subscription/loyalty managed by **OrderGroove** (CSS variables `--og-tooltip-*`, `--og-upsell-*`). Account login is Shopify-hosted (white card, purple `Continue with shop` Shop Pay button, then `Continue` in dark-green — *not* themed; this is a brand-equity miss).
- **Modals:** centered light-colored card over dimmed (`rgba(0,0,0,0.6)`) backdrop, with X close in top-right and yellow CTA at bottom. The "WANT THE LATEST INTEL?" intel-themed copy + Bronco/American-flag background image is a brilliant tonal flex.
- **Badges:** on product cards — `product-badge-1` through `product-badge-17`. Tags include `tag-rwb` (red/white/blue bundle), `tag-flavored`. Limited-edition badges sit in the upper-left.
- **Irreverent copy styling:** all-caps Apotek display + earnest mil-comms phrasing ("LATEST INTEL", "GREAT COFFEE. GREAT MISSION. NO COMPROMISE", "AMERICA'S COFFEE®", "JOIN THE EXCLUSIVE COFFEE CLUB", "1773 ROAST" — referencing 1773 Boston Tea Party not 1776). Tone is sincere/blue-collar, *not* sarcastic — that earnestness is the differentiator from competitors trying to imitate.

### 6. Layout grid
12-column responsive grid with generous whitespace on desktop (`px-10 2xl:px-48` on large breakpoints). Hero is a strict 6/6 split (`w-6/12`); sections below alternate full-bleed photography + edge-to-edge dark blocks against `#ECEEEB` content blocks. Density is moderate — product grid is 4-up on desktop with `aspect-[1/1]` cards, 2-up on mobile. Asymmetry: the torn-paper section divider between dark hero and light shop band breaks the grid and serves as the brand's signature compositional move (combat-zone / distressed feel without being literal).

### 7. Photography / illustration style
- **Product shots:** dark wood / weathered metal / canvas backdrops, warm tungsten key light, packaging hero front-and-center, often staged with an enamel campfire mug, bullets/casings, an American flag, or a Bronco/Jeep tailgate. No white-cyc clinical studio shots.
- **Lifestyle / editorial:** documentary-style vets in the field, range days, ranch life, often desaturated with crushed shadows; a brown/orange-leaning color grade. This is shot like a Field & Stream feature, not a coffee commercial.
- **Founder-on-camera:** Evan Hafer carries the brand on YouTube and the Our Story page — used sparingly on the storefront (homepage stays product-forward) but heavily in CRM/email and editorial.
- **Illustration:** distressed eagles, 1773 woodcut-style typography on the Coffee Club tile, military-stencil numerals, occasional flag/Liberty motifs. Rough-edged, screen-printed feel — never vectorized clean.

### 8. Conversion mechanics
- **Top-right primary CTA: "FIND YOUR COFFEE"** — a quiz-style onboarding CTA pinned in the header on every page. Reduces "I don't know which roast" friction. This is the single most important persistent CTA on the site.
- **Coffee Club** (`/pages/exclusive-coffee-subscription`) — flagship sub program. Branded as "The Exclusive Coffee Club" with the **1773 Roast** as the lead member benefit. Copy: *"Step into the spirit of rebellion with 1773 BCS Roast, an Exclusive Coffee Subscription release inspired by grit, independence, and bold action."* The subscription is *named*, not described — "The Coffee Club" is treated as a club you join, not a checkbox you toggle. Save % shown via OrderGroove tooltip.
- **Loyalty Rewards** (`/pages/loyalty-rewards`, `/pages/rewards`) — points + tiers.
- **Build-A-Box** (`/pages/build-a-box`) — variety-pack configurator, lower commitment than full sub.
- **Free shipping ticker** (animated) — anchors the value prop above the headline.
- **Email capture modal ("WANT THE LATEST INTEL?")** — fires on collection pages, full-screen modal with Bronco/flag art. Klaviyo-powered.
- **Veteran/First-Responder verification** via ID.me (extra discount tier — also a tribal-identity move).
- **Quick-Shop on product cards** — single click to add from collection grid, no PDP detour.
- **Shop Pay** + Apple Pay accelerated checkout.

### 9. The one signature move BRCC does that's transferable to a deer-feed brand
**Tonal authority via *named* product tiers tied to a *named* membership.** BRCC doesn't sell a "subscription" — they sell **The 1773 Coffee Club**, where the *roast itself* is the reward. The Coffee Club isn't a logistics convenience; it's the *only way* to get 1773 Roast. The subscription is the product, not the delivery method. This works because every component reinforces a single coherent worldview: "America's Coffee, by veterans, for people who believe in this country, and the rebels' roast (1773) is reserved for members." Every word of body copy, every product name (Just Black, Beyond Black, AK-Espresso, Murdered Out, Tactisquatch, Freedom Fuel, Caf, Murdered Out), and every photo composition reinforces that tribal worldview. The mechanic is simple: **(a)** name your subscription as a club with a date/lore-rich identity, **(b)** create one or two **subscriber-exclusive products** that non-members cannot buy at any price, **(c)** keep the visual language consistent (one display font, one accent color, one photographic vocabulary) so every page reads as the same voice. For GB Feeds: a "Section Eight Club" or "Trophy Plot Society" with a member-only winterizer blend, exclusive bag art, and a tribal name carries the same weight as 1773 — the consumable becomes the badge.

### 10. Screenshots
All six PNGs saved to `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/competitors/black-rifle-coffee/`:
- `desktop_home.png` (1.7MB) — full hero, "GREAT COFFEE. GREAT MISSION. NO COMPROMISE" band, Shop Coffee 4-up grid with QUICK SHOP, "JOIN THE EXCLUSIVE COFFEE CLUB / 1773 ROAST" tile.
- `mobile_home.png` (394KB) — sticky header, hero, "WANT THE LATEST INTEL?" inline email capture, 2-up product grid, Coffee Club tile.
- `desktop_product.png` (1.2MB) — `/collections/coffee` PLP with filter sidebar, product cards with attribute icons, "WANT THE LATEST INTEL?" modal popup overlaid on flag/Bronco backdrop.
- `mobile_product.png` (343KB) — mobile collection grid + inline intel capture.
- `desktop_form.png` (48KB) — Shopify Customer Accounts sign-in (white, purple Shop Pay, dark-green Continue) — *not* themed by BRCC, equity gap.
- `mobile_form.png` (37KB) — same sign-in on mobile.

### Top 5 transferable principles, prioritized

1. **Name the subscription as a *club* with proprietary lore + a member-only flagship product.** "1773 Coffee Club / 1773 Roast" — for GB Feeds: a named member tier with an exclusive bag or blend nobody else can buy.
2. **Two fonts, one accent color, ruthlessly enforced.** Apotek (display, all-caps, always) + Host Grotesk (body) + `#F6B519` yellow CTA. Everything else is grayscale-on-dark. A deer-feed brand can run the same discipline with a single condensed display + neutral grotesk + one signal color (orange-blaze, not red).
3. **Avoid the cliche palette.** BRCC is *not* black-and-red — they use `#1A2118` (olive-black) + bone (`#ECEEEB`) + tan-gold yellow. The result reads premium and earthy, not edgy-merch. GB Feeds should avoid camo-on-orange and pick an unexpected anchor (deep loam-brown + cream + a single saturated accent).
4. **Persistent quiz/discovery CTA in the nav** ("FIND YOUR COFFEE"). Solves "I don't know what to buy" cold-traffic friction. For GB Feeds: "FIND YOUR FEED" — input the season, the goal (antler / herd-health / attractant), the region, get a recommendation.
5. **Tonal earnestness, not sarcasm.** Copy is sincere blue-collar mil-comms ("GREAT MISSION. NO COMPROMISE."), never wink-nudge ironic. Sincerity is the moat; competitors who imitate the aesthetic without the conviction read as costumes.

**Summary:** Black Rifle's design system is a two-font, two-color, one-yellow-CTA monolith that uses earnest blue-collar copy + a named subscription club with member-exclusive products to convert tribal identity into recurring revenue — and the directly transferable plays for GB Feeds are a named "Club" tier with an exclusive feed blend, a "FIND YOUR FEED" persistent nav CTA, and an unexpected non-cliche palette.
