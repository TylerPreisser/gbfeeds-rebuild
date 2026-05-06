# Phase 3 — Competitor & Aspirational Intelligence

> Phase 3A target picks. Lead: internet-investigator. Date: 2026-05-06.
> Direct comps benchmark cliché-avoidance; aspirational comps establish design lineage.
> 5 direct + 3 aspirational = 8 deep-dive targets for Phase 3B agents.

## Top 8 Reference Sites

| # | Type | Name | URL | Why relevant | One-sentence aesthetic descriptor |
|---|---|---|---|---|---|
| 1 | Direct | Whitetail Institute (Imperial Whitetail) | https://whitetailinstitute.com/ | Category king of trophy-whitetail nutrition (food plots + supplements), dedicated DTC site, sells the audience GB Feeds is competing for; the canonical comparison every GB Feeds buyer has already seen. | Legacy ag-supply catalog meets antler-stat bombardment — green/gold palette, dense trophy photography, magazine-ad-era layout. |
| 2 | Direct | Big & J | https://bigandj.com/ | Closest peer in positioning — small-brand, results-quantified deer attractant/supplement DTC line (BB2, Cube, Meltdown); GB Feeds and Big & J are routinely cross-shopped by the same buyer. | Orange-and-black hunter palette with stack-of-bag product hero — visceral, no-nonsense, made-for-Tractor-Supply aesthetic transposed online. |
| 3 | Direct | Antler King | https://antlerking.com/ | Small-batch, founder-led, "trophy results" deer-nutrition brand sold DTC and through outdoor retailers; nearly identical brand archetype to GB Feeds (hunter-founded, results-quantified, Midwest-coded). | Earthy brown/cream palette, big trophy bucks, dense product grid, mid-2010s ecommerce vibe — exactly the cliché GB Feeds must escape. |
| 4 | Direct | Boss Buck | https://www.bossbuck.com/ | Mid-market deer feeder + blind brand with full DTC presence; overlaps the capital-feeder line in GB Feeds' catalog ($999.99–$1,999.99 Texas Wildlife Supply units). | Black/orange hunter palette, hardware-store catalog density, function-over-form product photography. |
| 5 | Direct | Record Rack (Sportsman's Choice) | https://recordrack.com/ | Specialty deer-feed brand with own DTC marketing site at the same shelf-tier and price point as GB Feeds; direct cross-shop competitor for the consumable-feed line. | Burgundy/cream heritage palette, type-heavy bag-front photography, traditional ag-feed aesthetic with minimal motion. |
| 6 | Aspirational | YETI | https://www.yeti.com/ | The gold standard for premium-outdoor DTC web craft — heritage masculinity, cinematic field photography, story-led product pages, results-quantified copy ("kept ice for 6 days"); the exact emotional register GB Feeds wants to occupy at the Buck Chow PDP. | Cinematic black-on-white hero rigor, oversized type, slow-burn scroll storytelling, ambassador/field-story modules. |
| 7 | Aspirational | Sitka Gear | https://www.sitkagear.com/ | Premium hunting apparel — owns the "engineered for serious hunters" voice with technical-spec authority and gritty mountain/whitetail photography; aspirational lineage for how GB Feeds should treat ingredient/protein-spec storytelling. | Moody outdoor cinematography, terrain-coded color systems, technical-spec callouts laid over wildlife footage. |
| 8 | Aspirational | Black Rifle Coffee Company | https://blackriflecoffee.com/ | Anti-corporate, veteran/blue-collar voice, DTC consumable in a commodity category that competes on identity and authenticity rather than ingredient parity — the closest tonal lineage to GB Feeds' hunter-to-hunter / anti-retail-markup posture. | Black/red, military-stencil typography, founder-on-camera storytelling, irreverent product copy and bold full-bleed photography. |

## (per-target deep-dives appended below by Phase 3B agents)

---

## Synthesis Note

Direct-competitor web craft is **uniformly weak**. Whitetail Institute, Big & J, Antler King, Boss Buck, and Record Rack all run mid-2010s ecommerce templates: dense product grids, orange/black or green/gold "hunter" palettes, undersized type, no motion, catalog-style PDPs. None of them have invested in modern web craft, and copying their playbook would lock GB Feeds into category cliché. Treat them as the **cliché-avoidance benchmark** — what the rebuild must NOT look like.

The design lineage should come from the aspirational tier. **YETI** sets the bar for premium outdoor DTC; **Sitka Gear** shows how to layer technical-spec authority over cinematic field footage; **Black Rifle Coffee** is the closest tonal match — anti-corporate, results-quantified, blue-collar voice on a DTC consumable. Phase 4 should weight these three roughly 70% of the moodboard, with direct comps consulted only to flag what to *avoid*.

---

## Synthesis & Principles to Apply

> **Canonical document:** see `03_competitors_synthesis.md` for the full Phase 3C synthesis (12 cross-tabulated patterns, 8 signature moves to adapt, 13 clichés to avoid, the locked aesthetic-direction call, color/type/motion principles, and the signature move spec).

**Aesthetic direction (one-line summary):** **"Kansas Field Logbook"** — bone-paper canvas + loam-ink + a single oxblood-brick accent, **Tusker Grotesk** display + **GT Sectra Display** serif body + JetBrains Mono stamps, ONE scroll-pinned home-page moment (the live "ANTLER INCHES HARVESTED" counter ticking up over a Kansas county-pin map), restraint everywhere else. Reads as Greg's stand-by-stand farmer's almanac — never as a hunting catalog or a SaaS DTC clone.

**Core directives for Phase 4:**
1. **Reject every direct-comp default**: orange-and-camo palette, dead-buck photography, Slider Revolution carousels, Inter/Montserrat/Roboto body type, centered-logo + 6-link nav, trust-badge clutter, "Shop Now / Learn More" CTAs, "we are passionate about hunting" boilerplate.
2. **Adopt 8 signature moves** (sourced from aspirational tier + one direct), morphed for GB-specific voice: season-phase nav (Sitka), spec-as-hero PDP (Record Rack), Field Club + member-exclusive blend (BRCC), "Build Your Program" wizard (Sitka + BRCC), receipt-tape financing strip on $999+ feeders (Boss Buck), `/field-notes` editorial route (YETI + Whitetail), ticker-marquee testimonial wall (preserved from GB itself), persistent heritage-claim strip (Big & J + Whitetail).
3. **Resolve the brand-stat inconsistency** (5,000 / 7,500 / 10,000 inches across three pages) by replacing all three with a single live counter sourced from a JSON-pushed admin form. The signature move IS the trust signal.
4. **Build the discipline, not the decoration** — implementation is Next.js 15 + Tailwind v4 + Framer Motion + GSAP scroll-pin (gated to ONE moment) + Lenis smooth-scroll, static-export to Cloudflare Pages. Maximalism in the one moment; precision restraint everywhere else.
