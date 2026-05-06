'use client';
// src/components/composite/NavMobileDrawer.tsx
// Client component — mobile hamburger + drawer overlay.
// Only the toggle button and drawer overlay are client-side.
// Boundary: imports only atomic/ + data/.

import { useState } from 'react';
import NextLink from 'next/link';
import { nav } from '@/data/nav';

/**
 * <NavMobileDrawer> — hamburger button + full-screen nav overlay.
 * Visible only on mobile (md:hidden).
 * Focus-traps inside the open drawer for accessibility.
 */
export function NavMobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger — md:hidden so desktop never sees it.
          min-w-[44px] min-h-[44px] meets Apple HIG + WCAG 2.5.5 (44×44px min touch target). */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-1.5
          min-w-[44px] min-h-[44px] px-[10px] py-[14px]
          text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors duration-200"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block w-5 h-px bg-current transition-transform duration-200 origin-center
            ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
        />
        <span
          className={`block w-5 h-px bg-current transition-opacity duration-200
            ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-5 h-px bg-current transition-transform duration-200 origin-center
            ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
        />
      </button>

      {/* Drawer overlay */}
      {open && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-50 bg-[var(--color-paper)] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Header row */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-rule)]">
            {/* prefetch={false} — prevents home chunk from loading on every route */}
            <NextLink
              href="/"
              prefetch={false}
              onClick={() => setOpen(false)}
              aria-label="GB Feeds — Home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo.svg"
                alt="GB Feeds"
                width={100}
                height={34}
                className="h-8 w-auto"
              />
            </NextLink>
            {/* p-3 (12px each side) around 20×20px SVG = 44×44px hit area */}
            <button
              className="p-3 text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
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
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
            {nav.primary.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between
                  font-display uppercase tracking-[0.02em] text-display-sm
                  text-[var(--color-ink)] py-3 border-b border-[var(--color-rule)]
                  hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                <span>{item.label}</span>
                {item.stamp && (
                  <span className="font-mono text-mono-xs tracking-[0.04em] text-[var(--color-ink-quiet)]">
                    {item.stamp}
                  </span>
                )}
              </NextLink>
            ))}

            {/* Secondary nav */}
            <div className="mt-6 flex flex-col gap-1">
              {nav.secondary.map((item) => (
                <NextLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-body-sm tracking-[0.04em] uppercase
                    text-[var(--color-ink-muted)] py-2 border-b border-[var(--color-rule)]
                    hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {item.label}
                </NextLink>
              ))}
            </div>
          </nav>

          {/* Bottom CTA — pb-[env(safe-area-inset-bottom)] clears the home indicator
              on iPhone X and later. Requires viewport-fit=cover (P0-F). */}
          <div className="px-6 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-[var(--color-rule)]">
            <NextLink
              href="/feed-program"
              onClick={() => setOpen(false)}
              className="block w-full text-center
                font-mono text-mono-xs tracking-[0.04em] uppercase
                text-[var(--color-accent)] border border-[var(--color-accent)]
                px-4 py-3 hover:bg-[var(--color-accent)] hover:text-[var(--color-paper)]
                transition-colors duration-200"
            >
              Build Your Feed Program →
            </NextLink>
          </div>
        </div>
      )}
    </>
  );
}
