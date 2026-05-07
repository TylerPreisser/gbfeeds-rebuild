'use client';
// src/components/composite/NavMobileDrawer.tsx
// Client component — hamburger button + slide-out drawer.
// Visible on ALL viewports (desktop AND mobile) — matches original gbfeeds.com.
// Drawer contains the 6-item nav from the original site.

import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { drawerNav } from '@/data/nav';

/**
 * <NavMobileDrawer> — hamburger button + full-screen drawer overlay.
 * Shown on ALL viewports — the original site uses hamburger-only, no inline desktop nav.
 */
export function NavMobileDrawer() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Hamburger button — visible only on mobile/tablet (lg:hidden) */}
      <button
        className="flex flex-col justify-center items-center gap-[5px]
          min-w-[44px] min-h-[44px] px-[10px]
          text-[var(--color-ink)] hover:opacity-70 transition-opacity duration-200
          focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="nav-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block w-5 h-px bg-current transition-transform duration-250 origin-center
            ${open ? 'rotate-45 translate-y-[6px]' : ''}`}
        />
        <span
          className={`block w-5 h-px bg-current transition-opacity duration-250
            ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-5 h-px bg-current transition-transform duration-250 origin-center
            ${open ? '-rotate-45 -translate-y-[6px]' : ''}`}
        />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out drawer */}
      <div
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed top-0 left-0 z-50 h-full w-[min(320px,85vw)]
          bg-[var(--color-ink)] text-white
          flex flex-col
          shadow-xl
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
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
              height={44}
              className="h-11 w-auto"
            />
          </NextLink>
          <button
            className="flex items-center justify-center min-w-[44px] min-h-[44px]
              text-white hover:opacity-70 transition-opacity duration-200
              focus-visible:outline-2 focus-visible:outline-white"
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

        {/* Nav links — the original 6 items in exact order */}
        <nav className="flex-1 overflow-y-auto px-6 py-6 flex flex-col" aria-label="Primary navigation">
          {drawerNav.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={() => setOpen(false)}
              className="
                font-display uppercase tracking-[0.04em]
                text-[clamp(1.4rem,4vw,1.75rem)]
                text-white py-4 border-b border-white/10
                hover:opacity-70 transition-opacity duration-200
                focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
              "
            >
              {item.label}
            </NextLink>
          ))}
        </nav>

        {/* Bottom — phone number */}
        <div className="px-6 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t border-white/10">
          <a
            href="tel:6206393337"
            className="block font-mono text-xs tracking-[0.08em] uppercase
              text-white/70 hover:text-white transition-colors duration-200"
          >
            (620) 639-3337
          </a>
        </div>
      </div>
    </>
  );
}
