// src/components/composite/NavBar.tsx
// RSC outer shell. Mobile drawer is a small 'use client' child (NavMobileDrawer).
// Sticky via position:sticky + CSS transition on height after 80px scroll.
// Nav link hover: monospace stamp slides up below the link — pure CSS.
// Boundary: imports only atomic/ + data/ + the NavMobileDrawer client child.

import NextLink from 'next/link';
import { nav } from '@/data/nav';
import { NavMobileDrawer } from './NavMobileDrawer';

/**
 * <NavBar> — thin eyebrow + main nav row.
 * Main row: logo (left) + horizontal nav (center) + cart icon (right, links /products).
 * Mobile: hamburger opens <NavMobileDrawer> overlay.
 * Sticky: CSS-only scroll-driven height reduction via @keyframes scroll-linked (no JS).
 */
export function NavBar() {
  return (
    // pt-[env(safe-area-inset-top)] ensures Dynamic Island / notch on iPhone 14 Pro+
    // does not overlap the logo or hamburger when the header is sticky at top-0.
    // Requires viewport-fit=cover in layout.tsx viewport export (P0-F).
    <header
      className="sticky top-0 z-50 w-full bg-[var(--color-paper)] border-b border-[var(--color-rule)]
        pt-[env(safe-area-inset-top)]"
      style={{ transition: 'padding 200ms ease' }}
    >
      {/* ── Scroll-aware height reduction via CSS animation-timeline ────────── */}
      <style>{`
        @supports (animation-timeline: scroll()) {
          header.sticky {
            animation: navShrink linear both;
            animation-timeline: scroll(root block);
            animation-range: 0px 80px;
          }
          @keyframes navShrink {
            from { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            to   { padding-top: 0.375rem; padding-bottom: 0.375rem; }
          }
        }

        /* Nav link hover: monospace stamp slides up below the link */
        .nav-link-group {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }
        .nav-link-stamp {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          transition: opacity 240ms ease, transform 240ms ease;
          font-family: var(--font-mono), monospace;
          font-size: clamp(0.6875rem, 0.625rem + 0.25vw, 0.75rem);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--color-ink-quiet);
          padding: 1px 4px;
          border: 1px solid var(--color-rule);
          background: var(--color-paper);
          line-height: 1.2;
        }
        .nav-link-group:hover .nav-link-stamp,
        .nav-link-group:focus-within .nav-link-stamp {
          opacity: 1;
          transform: translateX(-50%) translateY(2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-link-stamp {
            transition: none;
            transform: translateX(-50%) translateY(2px);
          }
        }

        /* Accent underline on hover */
        .nav-link-anchor {
          position: relative;
          text-decoration: none;
          color: var(--color-ink);
          font-family: var(--font-display), sans-serif;
          font-size: clamp(0.875rem, 0.8125rem + 0.3125vw, 1rem);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .nav-link-anchor::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 0;
          height: 1px;
          background: var(--color-accent);
          transition: width 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link-anchor:hover::after,
        .nav-link-anchor:focus::after {
          width: 100%;
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-link-anchor::after { transition: none; }
        }
      `}</style>

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">

          {/* Logo — prefetch={false} prevents Next.js from auto-prefetching the home
              page chunk (which includes SignatureMoveLoader ~4KB gz) on every route. */}
          <NextLink
            href="/"
            prefetch={false}
            className="flex items-center shrink-0"
            aria-label="GB Feeds — Home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.svg"
              alt="GB Feeds"
              width={120}
              height={40}
              className="h-8 w-auto"
              loading="eager"
            />
          </NextLink>

          {/* Desktop nav — hidden on mobile */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {nav.primary.map((item) => (
              <div key={item.href} className="nav-link-group">
                <NextLink href={item.href} className="nav-link-anchor">
                  {item.label}
                </NextLink>
                {item.stamp && (
                  <span className="nav-link-stamp" aria-hidden="true">
                    {item.stamp}
                  </span>
                )}
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* BUILD YOUR PROGRAM persistent CTA */}
            <NextLink
              href="/feed-program"
              className="hidden lg:inline-flex items-center gap-1
                font-mono text-mono-xs tracking-[0.04em] uppercase
                text-[var(--color-accent)] border border-[var(--color-accent)]
                px-3 py-1.5 hover:bg-[var(--color-accent)] hover:text-[var(--color-paper)]
                transition-colors duration-200"
              aria-label="Build your feed program"
            >
              Build Program →
            </NextLink>

            {/* Cart icon — links to /products (visual parity).
                p-[12px] around 20×20px SVG = 44×44px min touch target (Apple HIG / WCAG 2.5.5). */}
            <NextLink
              href="/products"
              className="flex items-center justify-center p-[12px] -m-[12px]
                text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors duration-200"
              aria-label="Shop products"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </NextLink>

            {/* Mobile menu button — client-side */}
            <NavMobileDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
