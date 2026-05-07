// src/components/composite/NavBar.tsx
// RSC outer shell. Drawer is a 'use client' child (NavMobileDrawer).
// Three-column: hamburger (left) | logo centered | icons (right)
// Matches ORIGINAL_TRUTH.md § 1 exactly: hamburger on BOTH desktop AND mobile.
// No inline nav links on desktop — all links are inside the drawer.

import NextLink from 'next/link';
import { NavMobileDrawer } from './NavMobileDrawer';

/**
 * <NavBar> — hamburger-only header, identical on desktop and mobile.
 * Header layout: [Hamburger] [Logo centered] [Search, Cart, Account]
 * Sticky. Background transitions from transparent → bone-paper on scroll
 * via CSS animation-timeline (progressive enhancement).
 */
export function NavBar() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-[var(--color-ink)] border-b border-[var(--color-rule)]
        pt-[env(safe-area-inset-top)]"
    >
      <style>{`
        /* Scroll-driven background opacity — progressive enhancement */
        @supports (animation-timeline: scroll()) {
          .navbar-inner {
            animation: navBg linear both;
            animation-timeline: scroll(root block);
            animation-range: 0px 60px;
          }
          @keyframes navBg {
            from { --nav-bg-opacity: 0.92; }
            to   { --nav-bg-opacity: 1; }
          }
        }

        /* Icon hover */
        .nav-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 44px;
          color: #ffffff;
          transition: opacity 200ms ease;
        }
        .nav-icon-btn:hover {
          opacity: 0.7;
        }
        .nav-icon-btn:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
      `}</style>

      <div className="navbar-inner max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Three-column grid:
          - col 1 (auto): hamburger button
          - col 2 (1fr): logo, centered
          - col 3 (auto): icons cluster
        */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 sm:h-20 lg:h-24">

          {/* LEFT — Hamburger, triggers drawer on all viewports */}
          <NavMobileDrawer />

          {/* CENTER — GB Feeds logo, centered via justify-self */}
          <div className="flex justify-center">
            <NextLink
              href="/"
              prefetch={false}
              aria-label="GB Feeds — Home"
              className="flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo.svg"
                alt="GB Feeds"
                width={160}
                height={72}
                className="h-14 sm:h-16 lg:h-20 w-auto"
                loading="eager"
              />
            </NextLink>
          </div>

          {/* RIGHT — Search, Cart, Account icons */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Search icon — visual placeholder (no search backend) */}
            <button
              type="button"
              className="nav-icon-btn"
              aria-label="Search (coming soon)"
              style={{ cursor: 'not-allowed' }}
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Cart icon — links to /products (no cart backend yet) */}
            <NextLink
              href="/products"
              className="nav-icon-btn"
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

            {/* Account icon — visual placeholder */}
            <button
              type="button"
              className="nav-icon-btn"
              aria-label="Account (coming soon)"
              style={{ cursor: 'not-allowed' }}
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
