# GB Feeds Rebuild — STATE

> Live operations log. The orchestrator owns this file. Every phase boundary updates it.

---

## Inputs (locked at engagement start)

| Field | Value |
|---|---|
| `LOCAL_DIR` | `/Users/tylerpreisser/Downloads/gbfeeds.com` |
| `LIVE_URL` | `https://gbfeeds.com/` |
| `EXTRA_CONTEXT` | _(none provided — defaults apply)_ |
| `NEW_DIR` | `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt` |
| Engagement start | 2026-05-06 |

---

## Fingerprint (Phase 0 result)

| Field | Value |
|---|---|
| Site name | GB Feeds |
| Tagline | "A small batch specialty deer feed company that specializes in creating the world's best deer feeds for the world's best deer hunters." |
| Industry | Specialty deer-feed brand — DTC, hunting / wildlife / outdoor / agriculture niche |
| Audience | Trophy / serious deer hunters in the US |
| Headline product | "Buck Chow Lifestyle Feeder" |
| Existing platform | GoDaddy Website Builder 8.0 (`Starfield Technologies; Go Daddy Website Builder 8.0.0000`) + GoDaddy Online Store module (OLS) |
| Existing styling | Proprietary GoDaddy CSS (glamor-generated `.x-el`, `.c1-*` atomic classes) |
| Mirror type | SiteSucker / wget rendered HTML mirror |
| Page count (estimated) | 14 HTML files in `gbfeeds.com/` |
| Live status | 200 OK |
| Visible third-parties | Poynt (payments), Reamaze (chat), TrustedSite, Google Analytics, Google Tag Manager, Visa fraud detection, Cloudflare |

---

## Routing decisions (see `ROUTING.md`)

- **NEW_BUILD_STACK** — Next.js 15 + React 19 + TypeScript + Tailwind v4 + Framer Motion + GSAP + Lenis, `output: 'export'` for GitHub Pages.
- **EXISTING_STACK_ADVISOR** — none (mirror is rendered HTML; no template/source extraction needed).
- **INDUSTRY_ADVISOR** — none. Outdoor/DTC commerce is not regulated like fintech/healthcare.
- **HOSTING** — GitHub Pages (default).

---

## Phase ledger

| Phase | Status | Lead | Started | Completed |
|---|---|---|---|---|
| 0 — Bootstrap & Routing | ✅ DONE | Explore + internet-investigator | 2026-05-06 | 2026-05-06 |
| 1 — Cartography | ✅ DONE (after corrective pass) | codebase-cartographer | 2026-05-06 | 2026-05-06 |
| 2 — Live Recon & Industry Lock | ✅ DONE | internet-investigator | 2026-05-06 | 2026-05-06 |
| 3 — Competitor Intelligence | ✅ DONE | internet-investigator (×8) + general-purpose synth + react-architect | 2026-05-06 | 2026-05-06 |
| 4 — Design Direction Brief | ✅ DONE | general-purpose + react-architect + clean-architecture-expert + perf-optim | 2026-05-06 | 2026-05-06 |
| 5 — Architecture & Plan | ✅ DONE | nextjs-expert + 4 advisors + Plan consolidator | 2026-05-06 | 2026-05-06 |
| 6 — Build Execution | ✅ DONE | web-code-executor + image-editor-pro | 2026-05-06 | 2026-05-06 |
| 7 — Quality Loop | ✅ DONE (3 rounds) | web-code-debug + ui-mobile + perf + quality + final trio | 2026-05-06 | 2026-05-06 |
| 8 — Integration Migration | ▶ in progress | documentation-specialist | 2026-05-06 | — |
| 9 — Deploy | pending | cicd-pipeline-architect | — | — |

---

## Open questions / blockers

| ID | Surface | Question | Owner | Status |
|---|---|---|---|---|
| Q1 | Phase 1+2 | **Brand stat inconsistency (THREE conflicting numbers)** — Home: "7,500 inches of antler harvested 2023 & 2024"; Why GB Feeds: "10,000 inches… in Kansas"; Buck Chow PDP: "5,000 inches." Must be reconciled to a single canonical figure for the rebuild. | Client | OPEN — flagged in Phase 4 design brief |
| Q1.1 | Phase 2 | **"Buck Chow Lifestyle Feeder" is a hero PHOTO, not a SKU** — Phase 0 fingerprint mistakenly identified it as the headline product. The actual SKUs are listed in `live_products.json`. The "Lifestyle Feeder" is a 1024×1024 lifestyle photograph used as the OG image. | Internal | RESOLVED — STATE corrected, naming locked |
| Q2.1 | Phase 2 | **Cart/checkout hosted on `<uuid>.mysimplestore.com`** — payment flow leaves the brand domain. Phase 5 must decide: keep this redirect (GoDaddy default), or migrate commerce to a same-domain pattern (Stripe Checkout / Shopify Storefront / Snipcart) so the brand experience holds end-to-end. | Phase 5 architect | OPEN |
| Q6 | Phase 2 | **Duplicate Terms & Conditions URL** — Both `/terms-and-conditions` and `/terms-and-conditions-1` exist publicly. Confirm which is canonical; consolidate in rebuild with 301-style client-side meta-refresh on the deprecated path. | Client + Phase 8 | OPEN |
| Q7 | Phase 2 | **TrustedSite badge re-attachment** — McAfee SECURE site ID 205 in the live URL is McAfee's segment, not the customer ID. The customer ID is stored in Tyler's TrustedSite/McAfee Secure dashboard. Phase 8 will scaffold the mount point with a `NEXT_PUBLIC_TRUSTEDSITE_ID` env var; Tyler supplies the value. | Client | DEFERRED to Phase 8 |
| Q8 | Phase 2 | **Email service for contact form + newsletter** — Today both flow through GoDaddy infrastructure that dies post-rebuild. Default architectural decision (Phase 5): Cloudflare Worker proxy → Resend / SES / mailgun. Tyler can override with Klaviyo / Mailchimp / HubSpot in EXTRA_CONTEXT or by editing the env file. | Phase 5 architect | OPEN — assigned to Phase 5 |
| Q9 | Phase 2 | **Privacy-policy refresh** — current `/privacy-policy` is GoDaddy-template and may not disclose all current vendors (GA4, Reamaze, Cloudflare, Poynt). Phase 8 `documentation-specialist` drafts a baseline replacement; Tyler reviews for compliance. | Client + Phase 8 | DEFERRED |
| Q10 | Phase 2 | **HOSTING DECISION LOCKED** — Cloudflare Pages selected over GitHub Pages so the rebuild can ship a strict `Content-Security-Policy`, HSTS, COOP/COEP, X-Frame-Options, Permissions-Policy via `_headers`. This is a passive-defense P1 the security-audit-expert flagged. Same static export, same cost ($0). | Internal | RESOLVED 2026-05-06 |
| Q2 | Phase 1 | **Live product catalog hydration** — `/products` and `/photo-gallery` are JS-hydrated GoDaddy OLS widgets. Static mirror has no SKUs, prices, photos, or descriptions. Phase 2 recon must extract product catalog from rendered DOM on the live site. | Phase 2 | OPEN — assigned to Phase 2 lead |
| Q3 | Phase 1 | **Logo SVG missing** — Only PNG variants present. Phase 2 should attempt to extract SVG from live site if available; else `image-editor-pro` re-traces in Phase 6. | Phase 2 / 6 | OPEN |
| Q4 | Phase 1 | **OG/social-share card missing** — No 1200×630 social card discovered. Will be generated in Phase 6 (`image-editor-pro`). | Phase 6 | DEFERRED |
| Q5 | Phase 1 | **`favicon.ico` missing** — PNG favicons present, `.ico` legacy file absent. Will be regenerated in Phase 6. | Phase 6 | DEFERRED |

---

## Decisions log

- **2026-05-06** — NEW_DIR set to `/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt`. Sibling of LOCAL_DIR per RAIL spec § Phase 0.
- **2026-05-06** — Confirmed default rebuild stack (Next 15 / React 19 / TS / Tailwind v4 / Framer / GSAP / Lenis / static export). No EXTRA_CONTEXT override.
- **2026-05-06** — No language/framework advisor needed in Phase 1 — source is a rendered static HTML mirror, not a template repo. Cartographer can extract content directly from rendered DOM.
- **2026-05-06** — No industry compliance advisor (`fintech-security-expert` / `healthcare-hipaa-expert`) needed — DTC outdoor commerce is unregulated beyond standard PCI handled by the chosen processor.
- **2026-05-06** — Hosting target switched from GitHub Pages to **Cloudflare Pages** per security-audit-expert (Phase 2 advisor) — needed for `_headers`-based CSP/HSTS/X-Frame-Options. Same Next.js static export. Free tier. Tyler's other brand sites already deploy there. ROUTING.md updated.
- **2026-05-06** — Aesthetic direction LOCKED (Phase 3C): **"Kansas Field Logbook."** Bone paper `#EDE7D9` + loam ink `#0F0E0B` + oxblood-brick accent `#B33A1A`. Editorial almanac aesthetic — rejects orange-camo/red-black hunter cliché. Single signature scroll-pinned home moment (antler-inches counter + Kansas county map). Restraint everywhere else. Canonical doc: `.context/03_competitors_synthesis.md`.
- **2026-05-06** — Production fonts LOCKED (Phase 3D): **Bebas Neue (display) + DM Serif Display (body) + JetBrains Mono (stamps)** — all free, all OFL-licensed, all on Google Fonts, ship via `next/font/google`. No commercial-license procurement needed. Substitutes the synthesis's Tusker Grotesk + GT Sectra Display call.
- **2026-05-06** — Live antler-inches counter data source LOCKED: **build-time JSON bake** at `public/data/harvests.json`. Greg edits + commits + Cloudflare Pages CI rebuilds. No server, no DB, no auth surface. Cloudflare-Worker upgrade path documented if Greg wants admin UI later.
