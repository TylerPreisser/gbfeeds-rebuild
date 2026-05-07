// src/components/composite/Footer.tsx
// RSC — no 'use client'.
// Minimal footer matching original gbfeeds.com exactly:
// - 3 centered underlined legal links
// - Business name "GB Feeds" centered
// - Copyright line centered
// Per ORIGINAL_TRUTH.md § 2.5 — no multi-column sitemap, no newsletter, no seasons.

import { SocialLinks } from './SocialLinks';
import { withBasePath } from '@/lib/basePath';

/**
 * <Footer> — minimal footer matching the original gbfeeds.com.
 * Three legal links + business name + copyright — nothing more.
 */
export function Footer() {
  return (
    <footer
      className="bg-white border-t border-[var(--color-rule)] py-10 px-4"
      aria-label="Site footer"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5">
        <div>
          <p className="font-display uppercase text-[clamp(1.75rem,1.5rem+1vw,2.75rem)] leading-none tracking-[0.02em] text-[var(--color-ink)]">
            Connect with us
          </p>
          <SocialLinks className="mt-4 flex justify-center items-center gap-5 flex-wrap" />
        </div>

        {/* Legal links */}
        <nav aria-label="Legal navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a
            href={withBasePath('/terms/')}
            className="font-body text-body-sm text-[var(--color-ink-muted)] underline
              hover:text-[var(--color-ink)] transition-colors duration-200"
          >
            Terms and Conditions
          </a>
          <a
            href={withBasePath('/privacy/')}
            className="font-body text-body-sm text-[var(--color-ink-muted)] underline
              hover:text-[var(--color-ink)] transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </nav>

        {/* Business name */}
        <p className="font-body text-body-sm font-bold text-[var(--color-ink)]">
          GB Feeds, LLC
        </p>

        {/* Copyright */}
        <p className="font-body text-body-sm text-[var(--color-ink-muted)]">
          Copyright &copy; {new Date().getFullYear()} GB Feeds - All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
