// src/components/composite/NavBar.tsx
// Sticky header with bone-paper background.
// Desktop (lg:): inline horizontal nav (Home / Products / Why / Story / Reviews / Gallery)
// Mobile (lg:hidden): hamburger trigger that opens NavMobileDrawer
// The cart icon was removed — it pointlessly redirected to /products and confused users.
// The search and account icons were dropped too — neither has a backing service in the rebuild.
// Logo lives top-center on desktop, top-left on mobile.

import { NavMobileDrawer } from './NavMobileDrawer';
import { withBasePath } from '@/lib/basePath';

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
          padding: 0.75rem 0.95rem;
          color: var(--color-ink);
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 1rem + 0.45vw, 1.65rem);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1;
          transition: color 200ms ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0.95rem;
          right: 0.95rem;
          bottom: 0.45rem;
          height: 2px;
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

      <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═════════════ DESKTOP (lg+) ═════════════ */}
        <div className="hidden lg:flex items-center justify-between h-24">

          {/* Logo (left) */}
          <a
            href={withBasePath('/')}
            aria-label="GB Feeds — Home"
            className="flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/deer-mark.png"
              alt="GB Feeds"
              width={1024}
              height={1024}
              className="h-20 w-20 object-cover"
              loading="eager"
            />
          </a>

          {/* Inline nav (right) */}
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={withBasePath(link.href)} className="nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ═════════════ MOBILE / TABLET (< lg) ═════════════ */}
        <div className="lg:hidden grid grid-cols-[auto_1fr_auto] items-center h-20 sm:h-24">

          {/* Hamburger (left) — drawer self-contains <button> + <dialog> */}
          <NavMobileDrawer />

          {/* Logo (centered) */}
          <div className="flex justify-center">
            <a
              href={withBasePath('/')}
              aria-label="GB Feeds — Home"
              className="flex items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/deer-mark.png"
                alt="GB Feeds"
                width={1024}
                height={1024}
                className="h-16 w-16 sm:h-20 sm:w-20 object-cover"
                loading="eager"
              />
            </a>
          </div>

          {/* Spacer (right) — keeps logo true-centered against hamburger width */}
          <div className="w-11" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
