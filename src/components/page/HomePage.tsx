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

// ─── Customer photos available for the gallery strip ─────────────────────────
const CUSTOMER_GALLERY_PHOTOS = [
  { src: '/photos/gallery/blob-16f87b2.webp', alt: 'Customer harvest photo' },
  { src: '/photos/gallery/blob-478b3b7.webp', alt: 'Customer buck at feeder' },
  { src: '/photos/gallery/blob-8085ecb.webp', alt: 'Hunter with harvested deer' },
  { src: '/photos/gallery/blob-93bef42.webp', alt: 'Trail cam deer photo' },
  { src: '/photos/gallery/blob-b7a2223.webp', alt: 'Customer with trophy buck' },
  { src: '/photos/gallery/blob-de1da36.webp', alt: 'Big buck at GB Feeds station' },
];

// Photos for the "Proven Results" collage in GB Feeds Difference section
const COLLAGE_PHOTOS = [
  { src: '/photos/lifestyle/lifestyle-img-4172.webp', alt: 'Hunter with harvested whitetail' },
  { src: '/photos/lifestyle/lifestyle-img-4433-1.webp', alt: 'Trophy buck in Kansas field' },
  { src: '/photos/lifestyle/lifestyle-luke-2.webp', alt: 'Young hunter with first deer' },
  { src: '/photos/lifestyle/lifestyle-luke.webp', alt: 'Successful season harvest' },
];

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
          style={{ height: 'clamp(480px, 100svh, 900px)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/lifestyle/lifestyle-img-4172.webp"
            alt="Hunter holding a Buck Chow 40lb bag in a wooded Kansas field"
            width={1600}
            height={900}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          {/* Subtle bottom fade so next section transitions cleanly */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))' }}
            aria-hidden="true"
          />
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

            {/* Horizontal scroll container */}
            <div
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory
                scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              aria-label="Featured products carousel"
            >
              {featuredProducts.map((product, i) => (
                <div
                  key={product.slug}
                  className="snap-start shrink-0 w-[280px] sm:w-[320px]"
                >
                  <ProductCard product={product} priority={i < 2} />
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
            3. CUSTOMER REVIEWS — horizontal photo gallery strip
            Per ORIGINAL_TRUTH.md § 2.1 item 3
            Below gallery: antler counter + Kansas map (SignatureMoveLoader)
            ══════════════════════════════════════════════════════════════════ */}
        <section
          id="customer-reviews"
          className="bg-white py-20 sm:py-24 lg:py-32"
          aria-label="Customer reviews photo gallery"
        >
          <Container>
            <Heading
              as="h2"
              size="display-sm"
              className="text-center mb-10 tracking-[0.04em]"
            >
              CUSTOMER REVIEWS
            </Heading>
          </Container>

          {/* Full-bleed horizontal photo strip — explicit height to prevent collapse */}
          <div
            className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory
              -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label="Customer harvest photos"
          >
            {CUSTOMER_GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="snap-start shrink-0"
                style={{ width: '320px', height: '320px', flexShrink: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={400}
                  className="object-cover"
                  style={{ width: '320px', height: '320px', display: 'block' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* MORE CUSTOMER REVIEWS CTA — per original */}
          <Container>
            <div className="mt-8 text-center">
              <Link
                href="/customer-reviews"
                className="inline-flex items-center justify-center px-8 py-3
                  font-display uppercase tracking-[0.04em]
                  bg-[var(--color-ink)] border border-[var(--color-ink)]
                  hover:bg-[var(--color-gray-900)]
                  transition-colors duration-200
                  focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
                style={{ color: '#ffffff' }}
              >
                MORE CUSTOMER REVIEWS
              </Link>
            </div>
          </Container>
        </section>

        {/* Antler counter + Kansas map signature */}
        <section
          className="signature-pin bg-[var(--color-paper)]"
          style={{ minHeight: '58svh' }}
          aria-label="Antler inches harvested — GB Feeds"
        >
          <SignatureMoveLoader
            total={harvests.total_inches}
            asOf={harvests.updated_at}
            pins={harvests.pins}
          />
        </section>

        <Rule weight="hair" />

        {/* ══════════════════════════════════════════════════════════════════
            4. THE GB FEEDS DIFFERENCE — two-column per original
            Per ORIGINAL_TRUTH.md § 2.1 item 4 + § 2.2
            LEFT: photo collage | RIGHT: 4 pillars with copy
            ══════════════════════════════════════════════════════════════════ */}
        <section
          id="gb-feeds-difference"
          className="bg-white py-20 sm:py-24 lg:py-32"
          aria-label="The GB Feeds Difference"
        >
          <Container>
            <Heading
              as="h2"
              size="display-sm"
              className="text-center mb-12 tracking-[0.04em]"
            >
              THE GB FEEDS DIFFERENCE
            </Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* LEFT — 2×2 photo collage — explicit pixel dimensions prevent collapse */}
              <div
                className="grid grid-cols-2 gap-2"
                aria-label="Customer harvest photo collage"
                style={{ minHeight: '360px' }}
              >
                {COLLAGE_PHOTOS.map((photo) => (
                  <div
                    key={photo.src}
                    className="overflow-hidden"
                    style={{ height: '175px' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={400}
                      height={400}
                      className="object-cover"
                      style={{ width: '100%', height: '175px', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* RIGHT — 4 pillars */}
              <div className="flex flex-col gap-12 lg:gap-16">
                {pillars.map((pillar, index) => (
                  <div key={pillar.number} className="flex flex-col gap-2">
                    <Heading as="h3" size="display-sm" className="tracking-[0.02em]">
                      {pillar.heading}
                    </Heading>
                    <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5]">
                      {pillar.body}
                    </Text>
                    {/* "Proven Results" gets the Learn more CTA per original */}
                    {index === 0 && (
                      <Link
                        href="/why-gb-feeds"
                        className="inline-flex items-center
                          font-display uppercase tracking-[0.04em] text-body-sm
                          text-[var(--color-ink)] underline hover:no-underline
                          transition-all duration-200 mt-1"
                      >
                        LEARN MORE
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <Rule weight="hair" />

        {/* ══════════════════════════════════════════════════════════════════
            5. OUR STORY TEASER
            Per ORIGINAL_TRUTH.md § 2.1 item 5
            Image + headline "A deer feed company founded for hunters, by hunters"
            ══════════════════════════════════════════════════════════════════ */}
        <section
          id="our-story"
          className="bg-white py-20 sm:py-24 lg:py-32"
          aria-label="Our Story teaser"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Greg portrait image */}
              <div className="overflow-hidden aspect-[4/3] lg:aspect-[3/2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/lifestyle/lifestyle-img-1091-1.webp"
                  alt="Greg Brungardt with three mounted whitetail bucks"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text block */}
              <div className="text-center lg:text-left">
                <Heading as="h2" size="display-md" className="mb-4">
                  A deer feed company founded for hunters, by hunters
                </Heading>
                <Text variant="body-md" className="text-[var(--color-ink-muted)] leading-[1.5] mb-6">
                  In 2017, Greg Brungardt began to envision a deer feed company unlike any other —
                  tested right here in the Midwest with a proven track record of success.
                </Text>
                <Link
                  href="/our-story"
                  className="inline-flex items-center justify-center lg:justify-start px-8 py-3
                    font-display uppercase tracking-[0.04em]
                    bg-[var(--color-ink)] border border-[var(--color-ink)]
                    hover:bg-[var(--color-gray-900)]
                    transition-colors duration-200
                    focus-visible:outline-2 focus-visible:outline-[var(--color-ink)]"
                  style={{ color: '#ffffff' }}
                >
                  LEARN MORE
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <Rule weight="hair" />

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
                href="#"
                aria-label="GB Feeds on Facebook"
                className="flex items-center justify-center w-12 h-12 transition-opacity duration-200 hover:opacity-75"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram — gradient */}
              <a
                href="#"
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
                href="#"
                aria-label="GB Feeds on TikTok"
                className="flex items-center justify-center w-12 h-12 transition-opacity duration-200 hover:opacity-75"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#000000" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.54a8.16 8.16 0 004.77 1.52V7.62a4.85 4.85 0 01-1-.93z"/>
                </svg>
              </a>

              {/* YouTube — #FF0000 */}
              <a
                href="#"
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
        <section
          className="bg-white py-16 sm:py-20 lg:py-24"
          aria-label="Featured products — second display"
        >
          <Container>
            <Heading
              as="h2"
              size="display-sm"
              className="text-center mb-10 tracking-[0.04em]"
            >
              FEATURED PRODUCTS
            </Heading>

            <div
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory
                -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              aria-label="Featured products carousel"
            >
              {featuredProducts.map((product) => (
                <div
                  key={`second-${product.slug}`}
                  className="snap-start shrink-0 w-[280px] sm:w-[320px]"
                >
                  <ProductCard product={product} priority={false} />
                </div>
              ))}
            </div>
          </Container>
        </section>

      </main>
    </>
  );
}
