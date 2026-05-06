// src/components/composite/Footer.tsx
// RSC — no 'use client'.
// Three-column layout: brand block + nav columns + newsletter form mount.
// Bottom strip: copyright + Kansas origin + TrustedSite slot + social.
// Build date + harvests.json last_updated read at build time via direct import.
// Boundary: imports only atomic/ + data/ + composite/NewsletterForm (client child).

import NextLink from 'next/link';
import { nav } from '@/data/nav';
import { NewsletterForm } from './NewsletterForm';
import harvestsJson from '../../../public/data/harvests.json';

// Build date — baked at compile time (ISR-safe; static export rebuilds on change)
const BUILD_DATE = new Date().toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
}).toUpperCase();

const LAST_UPDATED = harvestsJson.updated_at;

/**
 * <Footer> — site-wide footer.
 * Three columns: brand | nav links | newsletter form.
 * Bottom strip with editorial mono-stamp of build date + harvests last_updated.
 */
export function Footer() {
  return (
    <footer
      className="bg-[var(--color-paper-2)] border-t-2 border-[var(--color-rule-strong)]"
      aria-label="Site footer"
    >
      {/* Main three-column grid */}
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Column 1 — Brand block */}
          <div className="flex flex-col gap-4">
            {/* prefetch={false} — prevents home chunk from prefetching on every route via Footer */}
            <NextLink href="/" prefetch={false} aria-label="GB Feeds — Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo.svg"
                alt="GB Feeds"
                width={120}
                height={40}
                className="h-10 w-auto"
                loading="lazy"
              />
            </NextLink>

            <p className="font-body text-body-sm text-[var(--color-ink-muted)] leading-[1.4] max-w-xs">
              A small batch specialty deer feed company that specializes in creating the
              world&apos;s best deer feeds for the world&apos;s best deer hunters.
            </p>

            {/* Greg signature */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/greg-signature.svg"
              alt="-Greg"
              width={80}
              height={28}
              className="h-7 w-auto"
              style={{ color: 'var(--color-accent)', filter: 'none' }}
              loading="lazy"
            />

            {/* Phone */}
            <a
              href="tel:6206393337"
              className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-muted)]
                hover:text-[var(--color-accent)] transition-colors duration-200 mt-1"
            >
              (620) 639-3337
            </a>
          </div>

          {/* Column 2 — Navigation links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Primary nav */}
            <nav aria-label="Shop navigation">
              <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
                Navigate
              </p>
              <ul className="flex flex-col gap-2">
                {nav.primary.map((item) => (
                  <li key={item.href}>
                    <NextLink
                      href={item.href}
                      className="font-body text-body-sm text-[var(--color-ink-muted)]
                        hover:text-[var(--color-accent)] transition-colors duration-200
                        underline decoration-[var(--color-rule)] hover:decoration-[var(--color-accent)]"
                    >
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Secondary nav + legal */}
            <nav aria-label="Supporting navigation">
              <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
                More
              </p>
              <ul className="flex flex-col gap-2">
                {nav.secondary.map((item) => (
                  <li key={item.href}>
                    <NextLink
                      href={item.href}
                      className="font-body text-body-sm text-[var(--color-ink-muted)]
                        hover:text-[var(--color-accent)] transition-colors duration-200
                        underline decoration-[var(--color-rule)] hover:decoration-[var(--color-accent)]"
                    >
                      {item.label}
                    </NextLink>
                  </li>
                ))}
                <li className="mt-2">
                  <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-2">
                    Seasons
                  </p>
                </li>
                {nav.seasons.map((item) => (
                  <li key={item.href}>
                    <NextLink
                      href={item.href}
                      className="font-body text-body-sm text-[var(--color-ink-muted)]
                        hover:text-[var(--color-accent)] transition-colors duration-200
                        underline decoration-[var(--color-rule)] hover:decoration-[var(--color-accent)]"
                    >
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 — Newsletter form */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
              Field Notes
            </p>
            <p className="font-body text-body-sm text-[var(--color-ink-muted)] leading-[1.4]">
              Greg sends a note when something actually happens. No spam, no schedule.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-[var(--color-rule)] bg-[var(--color-paper)]">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

            {/* Copyright + origin */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                &copy; {new Date().getFullYear()} GB Feeds
              </span>
              <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                Made in Kansas
              </span>
              {/* TrustedSite badge slot — Phase 6E.2 mounts <TrustedSiteBadge> in layout.tsx */}
              <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]">
                {/* TRUSTEDSITE_SLOT */}
              </span>
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-4">
              {nav.legal.map((item) => (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]
                    hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {item.label}
                </NextLink>
              ))}
              {/* Social — placeholder mailto */}
              <a
                href="mailto:info@gbfeeds.com"
                className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)]
                  hover:text-[var(--color-accent)] transition-colors duration-200"
                aria-label="Email GB Feeds"
              >
                Email
              </a>
            </div>
          </div>

          {/* Editorial mono-stamp: build date + harvests last_updated */}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] opacity-60">
              BUILT {BUILD_DATE}
            </span>
            <span className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] opacity-60">
              HARVESTS UPDATED {LAST_UPDATED}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
