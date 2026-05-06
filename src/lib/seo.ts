// src/lib/seo.ts
// SEO helpers: buildMetadata, canonical URL builder, and JSON-LD schema generators.
// RSC-only: no 'use client'.

import type { Metadata } from 'next';
import type { Product, FAQ, Testimonial, JournalEntry } from '@/types/product';

// ─── Site constants ───────────────────────────────────────────────────────────

const SITE_URL = (
  process.env['NEXT_PUBLIC_SITE_URL'] || 'https://gbfeeds.com'
).replace(/\/$/, '');

const SITE_NAME = 'GB Feeds';

const DEFAULT_OG_IMAGE = '/og/home.png';

// ─── Canonical URL helper ─────────────────────────────────────────────────────

/**
 * Builds an absolute canonical URL from a path.
 * Always appends a trailing slash (trailingSlash: true in next.config.ts).
 *
 * @example
 * canonical('/products/buck-chow') → 'https://gbfeeds.com/products/buck-chow/'
 */
export function canonical(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return `${SITE_URL}${withSlash}`;
}

// ─── buildMetadata ────────────────────────────────────────────────────────────

interface BuildMetadataOpts {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * Builds a valid Next.js Metadata object.
 * All fields are optional — omitted values fall back to site defaults.
 */
export function buildMetadata({
  title,
  description = "A small batch specialty deer feed company that specializes in creating the world's best deer feeds for the world's best deer hunters.",
  canonical: canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
}: BuildMetadataOpts = {}): Metadata {
  const canonicalUrl = canonicalPath ? canonical(canonicalPath) : undefined;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    ...(title ? { title } : {}),
    description,
    ...(canonicalUrl
      ? {
          alternates: { canonical: canonicalUrl },
        }
      : {}),
    openGraph: {
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      ...(title ? { title } : {}),
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title ?? SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      ...(title ? { title } : {}),
      description,
      images: [ogImageUrl],
    },
  };
}

// ─── JSON-LD schema generators ────────────────────────────────────────────────

/**
 * Organization JSON-LD for home page and about pages.
 */
export function orgSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GB Feeds',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.svg`,
    description:
      "A small batch specialty deer feed company that specializes in creating the world's best deer feeds for the world's best deer hunters.",
    foundingDate: '2017',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Manhattan',
        addressRegion: 'KS',
        addressCountry: 'US',
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-620-639-3337',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [],
  };
}

/**
 * WebSite + SearchAction JSON-LD for home page.
 */
export function webSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Product JSON-LD for PDP pages.
 */
export function productSchema(product: Product): Record<string, unknown> {
  const price = product.salePriceUsd ?? product.priceUsd;
  const availability = product.available
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.displayName,
    description: product.shortDescription,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'GB Feeds',
    },
    image: [`${SITE_URL}${product.primaryImage}`],
    url: canonical(`/products/${product.slug}`),
    offers: {
      '@type': 'Offer',
      url: canonical(`/products/${product.slug}`),
      priceCurrency: 'USD',
      price: price,
      availability,
      seller: {
        '@type': 'Organization',
        name: 'GB Feeds',
      },
    },
  };
}

/**
 * Article JSON-LD for journal article pages.
 */
export function articleSchema(article: JournalEntry): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.dek,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Greg Brungardt',
      url: canonical('/our-story'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'GB Feeds',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/logo.svg`,
      },
    },
    image: article.coverImage ? `${SITE_URL}${article.coverImage}` : undefined,
    url: canonical(`/journal/${article.slug}`),
    keywords: article.tags.join(', '),
  };
}

/**
 * FAQPage JSON-LD for /faq and home page FAQ section.
 */
export function faqSchema(faqs: FAQ[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Review list JSON-LD for /customer-reviews.
 * Embeds reviews inside the Organization entity.
 */
export function reviewListSchema(testimonials: Testimonial[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GB Feeds',
    url: SITE_URL,
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.attribution,
      },
      reviewBody: t.quote,
      ...(t.date ? { datePublished: t.date } : {}),
    })),
  };
}

/**
 * BreadcrumbList JSON-LD for product, journal, and category pages.
 */
export function breadcrumbSchema(
  items: Array<{ name: string; href: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonical(item.href),
    })),
  };
}

/**
 * AboutPage JSON-LD for /our-story.
 * Describes the page as the founder narrative.
 */
export function aboutPageSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Our Story — Greg Brungardt & GB Feeds',
    url: canonical('/our-story'),
    description:
      'Greg Brungardt founded GB Feeds in 2017 after years of testing deer feed formulas on Kansas whitetail properties. GB Feeds is a hunter-owned, hunter-tested specialty deer feed company based in Manhattan, Kansas.',
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: 'main',
      description:
        "Greg Brungardt's founder narrative: the origin of GB Feeds, the Buck Chow formula, and the mission to produce the world's best deer feed for serious Kansas hunters.",
    },
    author: {
      '@type': 'Person',
      name: 'Greg Brungardt',
      jobTitle: 'Founder, GB Feeds',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GB Feeds',
      url: SITE_URL,
    },
  };
}

/**
 * Service JSON-LD for /field-club.
 * Describes the Field Club membership as a recurring service.
 */
export function serviceSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GB Feeds Field Club',
    url: canonical('/field-club'),
    description:
      'Member-only seasonal deer feed subscription. A private-label Buck Chow formula — higher mineral density, same 20% protein — shipped direct to Kansas and Midwest properties before each season. Not available at retail.',
    provider: {
      '@type': 'Organization',
      name: 'GB Feeds',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: 'Deer Feed Subscription',
    category: 'Wildlife Feed',
    offers: {
      '@type': 'Offer',
      description: 'Seasonal Field Club membership — price TBD pre-launch',
      availability: 'https://schema.org/PreOrder',
      url: canonical('/field-club'),
    },
  };
}

/**
 * AboutPage JSON-LD for /why-gb-feeds.
 * Describes the page as the GB Feeds value-proposition / brand manifesto.
 */
export function whyGbFeedsPageSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Why GB Feeds — Proven Results, Quality, Value',
    url: canonical('/why-gb-feeds'),
    description:
      'Four pillars. Tested right here in Kansas. Over 7,500 inches of antler harvested using GB Feeds products. The case for why serious hunters choose GB Feeds.',
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: 'main',
      description:
        'GB Feeds four-pillar brand manifesto: quality ingredients, honest pricing, Kansas-tested formulas, and direct-to-consumer delivery.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GB Feeds',
      url: SITE_URL,
    },
  };
}

/**
 * ImageGallery (CollectionPage) JSON-LD for /photo-gallery.
 * Describes the page as a collection of wildlife and harvest photographs.
 */
export function photoGallerySchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Photo Gallery — GB Feeds in the Field',
    url: canonical('/photo-gallery'),
    description:
      'Trail cam photos, harvest photos, and field shots from GB Feeds customers across Kansas and the Midwest.',
    about: {
      '@type': 'Thing',
      name: 'GB Feeds Deer Feed Products',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GB Feeds',
      url: SITE_URL,
    },
  };
}

/**
 * Service JSON-LD for /feed-program.
 * Describes the personalized feed program wizard as a service offering.
 */
export function feedProgramSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'GB Feeds Personalized Feed Program Builder',
    url: canonical('/feed-program'),
    description:
      "Tell us your region, season, and goal — we'll build you a personalized GB Feeds deer feed program. Takes 60 seconds.",
    provider: {
      '@type': 'Organization',
      name: 'GB Feeds',
      url: SITE_URL,
    },
    serviceType: 'Deer Feed Consultation',
    category: 'Wildlife Feed',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  };
}

/**
 * ItemList JSON-LD for /products index and /season/* pages.
 * Provides a machine-readable list of products in a collection.
 */
export function itemListSchema(
  items: Array<{ name: string; url: string; position?: number }>,
  listName: string,
  listUrl: string,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    url: canonical(listUrl),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: item.position ?? index + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : canonical(item.url),
    })),
  };
}
