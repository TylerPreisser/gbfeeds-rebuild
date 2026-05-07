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
//   8. CONNECT WITH US (4 social icons native brand colors)
//   9. FEATURED PRODUCTS (second instance — per original truth)
// Boundary: page/ may import composite/ + motion/ (via dynamic) + decoration/ + atomic/ + data/ + lib/.

import Link from 'next/link';
import { pillars } from '@/data/pillars';
import { faqs } from '@/data/faq';
import { getAllProducts } from '@/data/products';
import type { HarvestsFile } from '@/types/harvests';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Rule } from '@/components/atomic/Rule';
import { FAQItem } from '@/components/composite/FAQItem';
import { ContactForm } from '@/components/composite/ContactForm';
import { ProductCard } from '@/components/composite/ProductCard';
import { orgSchema, webSiteSchema, faqSchema } from '@/lib/seo';
import { SignatureMoveLoader } from '@/components/motion/SignatureMoveLoader';

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
  const allProducts = getAllProducts();
  // Featured: first 6 products for carousel
  const featuredProducts = allProducts.slice(0, 6);

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
          style={{ height: 'clamp(560px, 92svh, 880px)' }}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photos/lifestyle/hero-buck-chow-original.jpg"
              alt="Buck Chow deer-feed bag in a wooded Kansas field"
              width={2200}
              height={1760}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 38%' }}
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

            {/* Featured products grid — uniform sizing, no horizontal scroll on lg+ */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
              aria-label="Featured GB Feeds products"
            >
              {featuredProducts.slice(0, 4).map((product, i) => (
                <div key={product.slug} className="h-full">
                  <ProductCard product={product} priority={i < 4} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3
                  font-display uppercase tracking-[0.04em]
                  bg-[var(--color-ink)] border border-[var(--color-ink)]
                  hover:bg-[var(--color-gray-900)]
                  transition-colors duration-200
                  focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
                style={{ color: '#ffffff' }}
              >
                SHOP ALL PRODUCTS
              </Link>
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
          className="signature-pin bg-[var(--color-paper)] pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20"
          aria-label="Customer reviews — antler inches harvested with GB Feeds"
        >
          <Container>
            <p className="font-mono text-mono-xs tracking-[0.12em] uppercase text-[var(--color-ink-quiet)] text-center mb-2">
              From hunters across Kansas
            </p>
            <Heading
              as="h2"
              size="display-md"
              className="text-center mb-3 tracking-[0.02em]"
            >
              CUSTOMER REVIEWS
            </Heading>
          </Container>

          <SignatureMoveLoader
            total={harvests.total_inches}
            asOf={harvests.updated_at}
            pins={harvests.pins}
          />

          <Container>
            <div className="mt-12 text-center">
              <Link
                href="/customer-reviews"
                className="inline-flex items-center justify-center px-8 py-3
                  font-display uppercase tracking-[0.04em]
                  bg-[var(--color-ink)] border border-[var(--color-ink)]
                  text-[var(--color-paper)]
                  hover:bg-[var(--color-gray-900)]
                  transition-colors duration-200
                  focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
              >
                READ ALL CUSTOMER REVIEWS
              </Link>
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
            7. CONTACT US — form left, phone right
            Per ORIGINAL_TRUTH.md § 2.4 verbatim
            ══════════════════════════════════════════════════════════════════ */}
        <section
          id="contact"
          className="bg-white py-20 sm:py-24 lg:py-32"
          aria-label="Contact GB Feeds"
        >
          <Container>
            <Heading
              as="h2"
              size="display-sm"
              className="text-center mb-10 tracking-[0.04em]"
            >
              Contact Us
            </Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-4xl mx-auto">

              {/* LEFT: form */}
              <div>
                <Heading as="h3" size="display-sm" className="mb-6">
                  Drop us a line!
                </Heading>
                <ContactForm />
              </div>

              {/* RIGHT: phone */}
              <div className="flex flex-col justify-center">
                <Heading as="h3" size="display-sm" className="mb-4">
                  Better yet, give us a call!
                </Heading>
                <a
                  href="tel:6206393337"
                  className="font-display uppercase tracking-[0.02em] text-display-sm
                    text-[var(--color-ink)] hover:text-[var(--color-accent)]
                    transition-colors duration-200 whitespace-nowrap"
                  aria-label="Call GB Feeds at (620) 639-3337"
                >
                  (620) 639-3337
                </a>
              </div>
            </div>
          </Container>
        </section>

        <Rule weight="hair" />

        {/* ══════════════════════════════════════════════════════════════════
            8. CONNECT WITH US — 4 social icons, native brand colors
            Per ORIGINAL_TRUTH.md § 2.5
            ══════════════════════════════════════════════════════════════════ */}
        <section
          id="connect"
          className="bg-white py-20 sm:py-24"
          aria-label="Connect with GB Feeds on social media"
        >
          <Container>
            <Heading
              as="h2"
              size="display-sm"
              className="text-center mb-8 tracking-[0.04em]"
            >
              CONNECT WITH US
            </Heading>

            <div className="flex justify-center items-center gap-8 flex-wrap">

              {/* Facebook — #1877F2 */}
              <a
                href="https://www.facebook.com/107773225146812"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GB Feeds on Facebook"
                className="flex items-center justify-center w-12 h-12 transition-opacity duration-200 hover:opacity-75"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram — gradient */}
              <a
                href="https://www.instagram.com/gb_feeds"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GB Feeds on Instagram"
                className="flex items-center justify-center w-12 h-12 transition-opacity duration-200 hover:opacity-75"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                  <defs>
                    <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497"/>
                      <stop offset="5%" stopColor="#fdf497"/>
                      <stop offset="45%" stopColor="#fd5949"/>
                      <stop offset="60%" stopColor="#d6249f"/>
                      <stop offset="90%" stopColor="#285AEB"/>
                    </radialGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad)"/>
                  <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                </svg>
              </a>

              {/* TikTok — #000000 */}
              <a
                href="https://www.tiktok.com/@gb_feeds"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GB Feeds on TikTok"
                className="flex items-center justify-center w-12 h-12 transition-opacity duration-200 hover:opacity-75"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.54a8.16 8.16 0 004.77 1.52V7.62a4.85 4.85 0 01-1-.93z"/>
                </svg>
              </a>

              {/* YouTube — #FF0000 */}
              <a
                href="https://www.youtube.com/@gbfeeds7593"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GB Feeds on YouTube"
                className="flex items-center justify-center w-12 h-12 transition-opacity duration-200 hover:opacity-75"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

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
