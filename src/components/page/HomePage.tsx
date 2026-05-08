// src/components/page/HomePage.tsx
// RSC — no 'use client'.
// Home page orchestrator. 9 sections matching ORIGINAL_TRUTH.md § 2 exactly.
// Section order:
//   1. Hero (full-bleed lifestyle photo, NO text overlay)
//   2. FEATURED PRODUCTS (horizontal-scroll carousel)
//   3. CUSTOMER REVIEWS (photo gallery strip + MORE CUSTOMER REVIEWS button)
//   4. THE GB FEEDS DIFFERENCE (two-column: photo collage left, 4 pillars right)
//   5. Our Story teaser (image + founder headline + Learn more)
//   6. FREQUENTLY ASKED QUESTIONS (4 collapsible accordions)
//   7. Contact Us (form left, phone right)
//   8. Footer (social links + legal)
// Boundary: page/ may import composite/ + motion/ (via dynamic) + decoration/ + atomic/ + data/ + lib/.

import { faqs } from '@/data/faq';
import { getProductBySlug } from '@/data/products';
import type { HarvestsFile } from '@/types/harvests';
import { Heading } from '@/components/atomic/Heading';
import { Container } from '@/components/atomic/Container';
import { Rule } from '@/components/atomic/Rule';
import { FAQItem } from '@/components/composite/FAQItem';
import { ContactForm } from '@/components/composite/ContactForm';
import { ProductCard } from '@/components/composite/ProductCard';
import { orgSchema, webSiteSchema, faqSchema } from '@/lib/seo';
import { SignatureMoveLoader } from '@/components/motion/SignatureMoveLoader';
import { HomeReveal } from '@/components/motion/HomeReveal';
import { withBasePath } from '@/lib/basePath';

// ─── Props ────────────────────────────────────────────────────────────────────

interface HomePageProps {
  harvests: HarvestsFile;
}

// CUSTOMER_GALLERY_PHOTOS + COLLAGE_PHOTOS were removed — they referenced
// blob-16f87b2 / blob-93bef42 / blob-de1da36 which carry baked-in
// "CUSTOMER REVIEW!" / quote overlay text. The home no longer renders a
// standalone customer photo strip (consolidated into the Kansas signature)
// or a GB Feeds Difference collage (lives at /why-gb-feeds), so neither
// array is needed here anymore.

// ─── Component ───────────────────────────────────────────────────────────────

export function HomePage({ harvests }: HomePageProps) {
  const homeFaqs = faqs.slice(0, 4);
  const featuredProducts = [
    'buck-chow-40lb',
    'corn-candy-7lb',
    'buck-chow-2000lb-pallet',
  ]
    .map((slug) => getProductBySlug(slug))
    .filter((product) => product !== null);

  return (
    <>
      {/* JSON-LD: Organization + WebSite + FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />

      <main id="main-content">

        {/* ══════════════════════════════════════════════════════════════════
            1. HERO — full-bleed lifestyle photo, NO text overlay
            Per ORIGINAL_TRUTH.md § 2.1 item 1: "NO text overlay, NO headline, NO CTA."
            100svh on mobile, fixed tall height on desktop.
            ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden h-[45svh] sm:h-[clamp(500px,82svh,760px)]"
          aria-label="GB Feeds hero image"
        >
          <picture>
            <source
              type="image/avif"
              srcSet="/photos/lifestyle/hero-buck-chow-original.avif"
            />
            <source
              type="image/webp"
              srcSet="/photos/lifestyle/hero-buck-chow-original.webp"
            />
            <img
              src="/photos/lifestyle/hero-buck-chow-original.jpg"
              alt="Buck Chow deer-feed bag in a wooded Kansas field"
              width={2200}
              height={1760}
              className="gb-hero-drift absolute inset-0 w-full h-full object-cover object-[center_100%] sm:object-[center_62%]"
              loading="eager"
              fetchPriority="high"
            />
          </picture>

          {/* Dark overlay so hero text stays legible across the photograph */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,14,11,0.62) 0%, rgba(15,14,11,0.38) 22%, rgba(15,14,11,0.22) 50%, rgba(15,14,11,0.38) 78%, rgba(15,14,11,0.62) 100%)',
            }}
          />

          {/* Centered hero text — "GB FEEDS / GROW BIGGER BUCKS" */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
            <p className="font-mono text-mono-xs sm:text-body-sm tracking-[0.18em] uppercase text-white/85 mb-5">
              Manhattan, KS · Est. 2017 · Field-Tested
            </p>
            <h1
              className="font-display uppercase text-white leading-[0.92] tracking-[0.01em]"
              style={{
                fontSize: 'clamp(3.25rem, 10vw, 9.5rem)',
                textShadow: '0 4px 28px rgba(0,0,0,0.55)',
                letterSpacing: '0.005em',
              }}
            >
              GB Feeds
            </h1>
            <p
              className="font-display uppercase text-white/95 mt-2 leading-[1.0]"
              style={{
                fontSize: 'clamp(1.5rem, 4.4vw, 4rem)',
                letterSpacing: '0.04em',
                textShadow: '0 2px 18px rgba(0,0,0,0.55)',
              }}
            >
              Grow. Bigger. Bucks.
            </p>
          </div>
        </section>

        <Rule weight="hair" />

        {/* ══════════════════════════════════════════════════════════════════
            2. FEATURED PRODUCTS — horizontally scrollable carousel
            Per ORIGINAL_TRUTH.md § 2.1 item 2
            ══════════════════════════════════════════════════════════════════ */}
        <HomeReveal>
        <section
          id="featured-products"
          className="bg-white py-20 sm:py-24 lg:py-32"
          aria-label="Featured GB Feeds products"
        >
          <Container>
            <Heading
              as="h2"
              size="display-sm"
              className="text-center mb-10 tracking-[0.04em]"
            >
              FEATURED PRODUCTS
            </Heading>

            {/* Featured products grid — the three core feed cards only.
                Mobile: horizontal-scroll snap row (swipeable, no arrows).
                  - data-lenis-prevent: exempts this element from Lenis smooth-scroll
                    hijacking so native horizontal swipe works correctly on iOS/Android.
                  - touch-pan-x: tells the browser this element handles horizontal panning,
                    preventing any outer gesture handler from claiming the swipe.
                  - px-4 scroll-px-4: inset padding so first card isn't flush to screen edge;
                    scroll-snap padding matches so snap stops respect the inset.
                Desktop (md+): auto-fit grid, 3 columns at ~68rem container.
                pb-2 reserves room so the scrollbar doesn't clip card shadows on mobile. */}
            <div
              data-lenis-prevent
              className={[
                /* ── Mobile: horizontal scroll row ── */
                'flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 scroll-px-4',
                /* ── md+: revert to the existing auto-fit grid ── */
                'md:overflow-visible md:grid md:gap-5 lg:gap-6',
                'md:[grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))]',
                'md:max-w-[68rem] md:mx-auto md:px-0 md:pb-0 md:scroll-px-0',
              ].join(' ')}
              aria-label="Featured GB Feeds products"
            >
              {featuredProducts.map((product, i) => (
                /* Mobile: fixed-width snap target (74vw gives clear peek of next card,
                   capped at 20rem so it doesn't over-expand on tablet).
                   Desktop (md+): normal flow inside grid. */
                <div
                  key={product.slug}
                  className="flex-none basis-[74vw] max-w-[20rem] snap-start md:flex-auto md:basis-auto md:max-w-none md:h-full"
                >
                  <ProductCard product={product} priority={i < 3} density="compact" />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href={withBasePath('/products/')}
                className="inline-flex items-center justify-center px-8 py-3
                  font-display uppercase tracking-[0.04em]
                  bg-[var(--color-ink)] border border-[var(--color-ink)]
                  hover:bg-[var(--color-gray-900)]
                  transition-colors duration-200
                  focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
                style={{ color: '#ffffff' }}
              >
                SHOP ALL PRODUCTS
              </a>
            </div>
          </Container>
        </section>
        </HomeReveal>

        <Rule weight="hair" />

        {/* ══════════════════════════════════════════════════════════════════
            3. CUSTOMER REVIEWS — consolidated into the Kansas signature.
            The standalone photo strip + duplicate "more reviews" CTA were
            removed — Tyler's note: "the customer review section IS the
            Kansas signature, there shouldn't be a separate one." The
            SignatureMove now carries the heading + photo cycle (clipped
            inside Kansas) + text crossfade + CTA below.
            ══════════════════════════════════════════════════════════════════ */}
        <section
          id="customer-reviews"
          className="signature-pin bg-[var(--color-paper)] pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-12"
          aria-label="Customer reviews — antler inches harvested with GB Feeds"
        >
          <SignatureMoveLoader
            total={harvests.total_inches}
            asOf={harvests.updated_at}
            pins={harvests.pins}
          />

          <Container>
            <div className="mt-8 sm:mt-10 text-center">
              <a
                href={withBasePath('/customer-reviews/')}
                className="inline-flex min-h-12 items-center justify-center px-8 py-4
                  font-display uppercase leading-none tracking-[0.04em]
                  bg-[var(--color-ink)] border border-[var(--color-ink)]
                  text-[var(--color-paper)]
                  hover:bg-[var(--color-gray-900)]
                  transition-colors duration-200
                  focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
              >
                READ ALL CUSTOMER REVIEWS
              </a>
            </div>
          </Container>
        </section>

        <Rule weight="hair" />

        {/* GB FEEDS DIFFERENCE + OUR STORY teasers were removed from the home —
            both have their own dedicated routes (/why-gb-feeds, /our-story).
            Duplicating their content on the home was redundant per Tyler. */}


        {/* ══════════════════════════════════════════════════════════════════
            6. FREQUENTLY ASKED QUESTIONS — 4 accordion rows
            Per ORIGINAL_TRUTH.md § 2.3 verbatim
            ══════════════════════════════════════════════════════════════════ */}
        <HomeReveal>
        <section
          id="faq"
          className="bg-white py-20 sm:py-24 lg:py-32"
          aria-label="Frequently asked questions"
        >
          <Container variant="narrow">
            <Heading
              as="h2"
              size="display-sm"
              className="text-center mb-10 tracking-[0.04em]"
            >
              FREQUENTLY ASKED QUESTIONS
            </Heading>

            <div className="flex flex-col">
              {homeFaqs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>
          </Container>
        </section>
        </HomeReveal>

        <Rule weight="hair" />

        {/* ══════════════════════════════════════════════════════════════════
            7. CONTACT US
            ══════════════════════════════════════════════════════════════════ */}
        <HomeReveal>
        <section
          id="contact"
          className="bg-[var(--color-paper-3)] py-16 sm:py-20 lg:py-24"
          aria-label="Contact GB Feeds"
        >
          <Container>
            <div className="py-10 sm:py-12 lg:py-14 max-w-2xl mx-auto">
              {/* Heading block — centered, unified */}
              <div className="text-center mb-10 sm:mb-12">
                <p className="font-mono text-mono-xs tracking-[0.14em] uppercase text-[var(--color-ink-muted)] mb-3">
                  Questions, orders, field photos
                </p>
                <Heading as="h2" size="display-lg" className="tracking-[0.03em]">
                  Contact Us
                </Heading>
                <p className="font-body text-body-md text-[var(--color-ink-muted)] mt-4">
                  Ask us anything. We know this feed.
                </p>
              </div>

              {/* Contact form */}
              <div className="mb-10 sm:mb-12">
                <p className="font-display uppercase tracking-[0.02em] text-center text-[var(--color-ink-muted)] text-body-sm mb-6">
                  Send a message
                </p>
                <ContactForm />
              </div>

              {/* Separator — between form and phone CTA, matching phone row border token */}
              <div
                className="border-t border-[var(--color-rule)] my-10 sm:my-12"
                aria-hidden="true"
              />

              {/* Phone CTA */}
              <div>
                <p className="font-display uppercase tracking-[0.02em] text-center text-[var(--color-ink-muted)] text-body-sm mb-3">
                  Better yet, give us a call.
                </p>
                <div className="border-t border-[var(--color-rule)]">
                  <a
                    href="tel:6206393337"
                    className="flex items-center justify-between gap-4 py-5 font-display uppercase text-[clamp(1.75rem,1.35rem+1.2vw,2.75rem)] leading-none tracking-[0.02em] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors duration-200"
                    aria-label="Call GB Feeds at (620) 639-3337"
                  >
                    <span>(620) 639-3337</span>
                    <span className="font-mono text-mono-xs tracking-[0.08em]" aria-hidden="true">
                      Reach out
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
        </HomeReveal>

        <Rule weight="hair" />

        {/* ══════════════════════════════════════════════════════════════════
            9. FEATURED PRODUCTS — second instance per original
            Per ORIGINAL_TRUTH.md § 2.1 item 9:
            "yes, the home renders FEATURED PRODUCTS a SECOND TIME below the social row"
            ══════════════════════════════════════════════════════════════════ */}
        {/* The original site renders FEATURED PRODUCTS a second time at the
            bottom of home — but that's a redundant duplication that confused
            users (Tyler called it "stupid"). Removed. */}

      </main>
    </>
  );
}
