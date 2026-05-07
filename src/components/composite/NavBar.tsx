// src/components/composite/NavBar.tsx
// Sticky header with bone-paper background.
// Desktop (lg:): inline horizontal nav (Home / Products / Why / Story / Reviews / Gallery)
// Mobile (lg:hidden): hamburger trigger that opens NavMobileDrawer
// The cart icon was removed — it pointlessly redirected to /products and confused users.
// The search and account icons were dropped too — neither has a backing service in the rebuild.
// Logo lives top-center on desktop, top-left on mobile.

import NextLink from 'next/link';
import { NavMobileDrawer } from './NavMobileDrawer';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products/', label: 'Products' },
  { href: '/why-gb-feeds/', label: 'Why GB Feeds' },
  { href: '/our-story/', label: 'Our Story' },
  { href: '/customer-reviews/', label: 'Reviews' },
  { href: '/photo-gallery/', label: 'Gallery' },
] as const;

/**
 * <NavBar> — bone-paper sticky header.
 *
 * Desktop (≥ lg / 1024px):
 *   [ Logo (left) ] ......... [ Inline nav links (right) ]
 *
 * Mobile / tablet (< lg):
 *   [ Hamburger (left) ]  [ Logo (centered) ]  [ spacer (right) ]
 *
 * The header is sticky on scroll with safe-area-inset padding for notched
 * iPhones. Nav links use display font (Bebas Neue) all-caps tracked tight.
 */
export function NavBar() {
  return (
    <header
      className="sticky top-0 z-50 w-full
        bg-[var(--color-paper)]
        border-b border-[var(--color-rule)]
        pt-[env(safe-area-inset-top)]"
    >
      <style>{`
        /* Nav link hover treatment — subtle underline animates 0→100% in 220ms */
        .nav-link {
          position: relative;
          padding: 0.5rem 0.75rem;
          color: var(--color-ink);
          font-family: var(--font-display);
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1;
          transition: color 200ms ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0.75rem;
          right: 0.75rem;
          bottom: 0.25rem;
          height: 1px;
          background: var(--color-accent);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover::after,
        .nav-link:focus-visible::after {
          transform: scaleX(1);
        }
        .nav-link:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 4px;
        }
      `}</style>

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═════════════ DESKTOP (lg+) ═════════════ */}
        <div className="hidden lg:flex items-center justify-between h-24">

          {/* Logo (left) */}
          <NextLink
            href="/"
            prefetch={false}
            aria-label="GB Feeds — Home"
            className="flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/buck-icon.png"
              alt="GB Feeds — black buck mark"
              width={228}
              height={368}
              className="h-10 w-auto"
              loading="eager"
            />
          </NextLink>

          {/* Inline nav (right) */}
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NextLink href={link.href} prefetch={false} className="nav-link">
                    {link.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ═════════════ MOBILE / TABLET (< lg) ═════════════ */}
        <div className="lg:hidden grid grid-cols-[auto_1fr_auto] items-center h-16 sm:h-20">

          {/* Hamburger (left) — drawer self-contains <button> + <dialog> */}
          <NavMobileDrawer />

          {/* Logo (centered) */}
          <div className="flex justify-center">
            <NextLink
              href="/"
              prefetch={false}
              aria-label="GB Feeds — Home"
              className="flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo-1024.png"
                alt="GB Feeds — Grow. Bigger. Bucks."
                width={220}
                height={80}
                className="h-12 sm:h-14 w-auto"
                loading="eager"
                style={{ mixBlendMode: 'multiply' }}
              />
            </NextLink>
          </div>

          {/* Spacer (right) — keeps logo true-centered against hamburger width */}
          <div className="w-11" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
