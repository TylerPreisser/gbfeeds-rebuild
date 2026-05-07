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
          className="relative overflow-hidden"
          aria-label="GB Feeds hero image"
          style={{ height: 'clamp(500px, 82svh, 760px)' }}
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
              className="gb-hero-drift absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 62%' }}
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

            {/* Featured products grid — the three core feed cards only. */}
            <div
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,15.5rem),1fr))] gap-4 lg:gap-5 max-w-[58rem] mx-auto"
              aria-label="Featured GB Feeds products"
            >
              {featuredProducts.map((product, i) => (
                <div key={product.slug} className="h-full">
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

        <Rule weight="hair" />

        {/* ══════════════════════════════════════════════════════════════════
            7. CONTACT US
            ══════════════════════════════════════════════════════════════════ */}
        <section
          id="contact"
          className="bg-white py-16 sm:py-20 lg:py-24"
          aria-label="Contact GB Feeds"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 max-w-5xl mx-auto items-start">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-mono-xs tracking-[0.14em] uppercase text-[var(--color-accent)] mb-3">
                  Talk with GB Feeds
                </p>
                <Heading as="h2" size="display-md" className="leading-[0.98] tracking-[0.01em] mb-5">
                  Let&apos;s talk through your setup.
                </Heading>
                <p className="font-body text-body-md text-[var(--color-ink-muted)] leading-[1.55] max-w-md">
                  Tell us what you&apos;re feeding, how often you&apos;re filling,
                  and what kind of deer activity you&apos;re trying to build.
                  We&apos;ll help you make the next bag or feeder count.
                </p>

                <div className="mt-8 border-y border-[var(--color-rule)] divide-y divide-[var(--color-rule)] max-w-md">
                  <a
                    href="tel:6206393337"
                    className="flex items-center justify-between gap-4 py-4 font-display uppercase text-[clamp(1.5rem,1.25rem+0.8vw,2.25rem)] leading-none tracking-[0.02em] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors duration-200"
                    aria-label="Call GB Feeds at (620) 639-3337"
                  >
                    <span>(620) 639-3337</span>
                    <span aria-hidden="true">Call</span>
                  </a>
                  <p className="py-4 font-mono text-mono-xs uppercase tracking-[0.08em] text-[var(--color-ink-quiet)]">
                    Manhattan, Kansas · Real products · Real field results
                  </p>
                </div>
              </div>

              <div className="border border-[var(--color-rule)] bg-[var(--color-paper-3)] p-5 sm:p-7 lg:p-8">
                <Heading as="h3" size="display-sm" className="mb-2">
                  Send a message
                </Heading>
                <p className="font-body text-body-sm text-[var(--color-ink-muted)] mb-6">
                  Property size, feeder type, season, and goal are the details that help.
                </p>
                <ContactForm />
              </div>
            </div>
          </Container>
        </section>

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
