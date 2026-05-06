// src/app/not-found.tsx
// Root 404 page — must be at root app/ (NOT inside any route group).
// Editorial-logbook 404. Headline in Bebas Neue. No eyebrow stripe.
// Static. No motion. No JS required.
// Next.js static export: Cloudflare Pages serves out/404.html for all 404 routes.

import type { Metadata } from 'next';
import Link from 'next/link';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';

export const metadata: Metadata = {
  title: 'Page Not Found | GB Feeds',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--color-paper)] flex items-center justify-center relative overflow-hidden"
    >
      <PaperGrain />
      <HairlineRules />

      <div className="relative z-10 text-center px-6 py-20">
        {/* Monospace stamp */}
        <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-6">
          404 / NOT IN THE FIELD / RILEY COUNTY, KS
        </p>

        {/* Large 404 stamp */}
        <p
          className="font-display uppercase tracking-[0.02em] text-[clamp(8rem,20vw,16rem)] leading-none
            text-[var(--color-gray-100)] select-none"
          aria-hidden="true"
        >
          404
        </p>

        {/* Headline */}
        <h1
          className="font-display uppercase tracking-[0.02em] text-display-lg text-[var(--color-ink)]
            mt-4 mb-6"
        >
          Page Not in the Field
        </h1>

        {/* Sub-copy */}
        <p
          className="font-body italic text-body-lg text-[var(--color-ink-muted)] mb-8 max-w-md mx-auto"
        >
          We couldn&apos;t track this one. Try the main stand →
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3
            font-display uppercase tracking-[0.02em] text-body-md
            bg-[var(--color-ink)] text-[var(--color-paper)]
            border border-[var(--color-ink)]
            hover:bg-[var(--color-gray-900)] transition-colors duration-200
            focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        >
          Back to Home
        </Link>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/products"
            className="font-mono text-mono-xs tracking-[0.04em] uppercase
              text-[var(--color-ink-quiet)] hover:text-[var(--color-accent)]
              transition-colors duration-200
              focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            Products
          </Link>
          <Link
            href="/our-story"
            className="font-mono text-mono-xs tracking-[0.04em] uppercase
              text-[var(--color-ink-quiet)] hover:text-[var(--color-accent)]
              transition-colors duration-200
              focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            className="font-mono text-mono-xs tracking-[0.04em] uppercase
              text-[var(--color-ink-quiet)] hover:text-[var(--color-accent)]
              transition-colors duration-200
              focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
