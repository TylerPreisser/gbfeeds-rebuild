import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { RouteChangeTracker } from '@/components/composite/RouteChangeTracker';
import { TrustedSiteBadge } from '@/components/composite/TrustedSiteBadge';
import { NavBar } from '@/components/composite/NavBar';
import { Footer } from '@/components/composite/Footer';
// Pattern: MotionProvider is imported directly (not via dynamic() with ssr:false).
// layout.tsx is an RSC; importing a 'use client' component from an RSC is valid —
// Next.js App Router handles the boundary. MotionProvider's Lenis init runs inside
// useEffect (client-only) so there is no SSR/hydration issue. This is cleaner than
// dynamic() + ssr:false (which is not needed in App Router and adds an extra async
// chunk boundary for no gain on a component that already self-guards with useEffect).

// ─── Font configuration ────────────────────────────────────────────────────
// Bebas Neue: display — H1, H2, all-caps labels, counter, navigation, buttons
// Preload: true — on the LCP critical path for every page
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-display',
});

// DM Serif Display: editorial body — hero lede, paragraphs, testimonials, journal
// Variable name: --font-body (consumed by tokens.css var(--font-body))
// Preload: false — loaded after LCP; swap handles FOUT gracefully on bone-paper bg
const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-body',
});

// JetBrains Mono: stamps — dates, SKU codes, lot stamps, bag labels, price labels
// Preload: false — not on critical path
const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-mono',
});

// ─── Viewport ─────────────────────────────────────────────────────────────────
// viewport-fit=cover enables env(safe-area-inset-*) to resolve non-zero values
// on notched/Dynamic Island iPhones. Without it, all safe-area-inset values are
// 0 — fixed/sticky elements (NavBar, PDP sticky bar, mobile drawer) overlap the
// Dynamic Island and home indicator on iPhone X and later.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0F0E0B',
};

// ─── Root metadata ─────────────────────────────────────────────────────────
// Phase 6C.8 fully populates per-route metadata via buildMetadata().
// This is the canonical template; all routes inherit the template title.
export const metadata: Metadata = {
  title: {
    default: 'GB Feeds — World-Class Deer Feed, Kansas-Made',
    template: '%s | GB Feeds',
  },
  description:
    "A small batch specialty deer feed company that specializes in creating the world's best deer feeds for the world's best deer hunters.",
  metadataBase: new URL(process.env['NEXT_PUBLIC_SITE_URL'] || 'https://gbfeeds.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: 'GB Feeds',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Google site verification from Phase 2 live recon (live ID preserved for continuity)
    google: 'xhm9c18xYxGqvWIffjaQy5-6zBB2h3AXxJQ3xtXLJHU',
  },
};

// ─── GA4 configuration ────────────────────────────────────────────────────────
// GA_ID is read at build time. When unset, no gtag.js script is rendered.
const GA_ID = process.env['NEXT_PUBLIC_GA_ID'];

// ─── Root layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // light-only: bone-paper aesthetic; next-themes is explicitly excluded
      style={{ colorScheme: 'light only' } as React.CSSProperties}
    >
      <body
        className={`${bebasNeue.variable} ${dmSerifDisplay.variable} ${jetBrainsMono.variable}`}
      >
        {/* ─── GA4 scripts — gated by NEXT_PUBLIC_GA_ID ─────────────────── */}
        {GA_ID && (
          <>
            {/*
             * Load gtag.js with afterInteractive strategy so it doesn't block
             * the initial paint. The inline script must fire after this loads.
             */}
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
              id="gtag-script"
            />
            {/*
             * Inline initialization script — sets up the dataLayer and fires
             * the initial page_view config call. Route-change tracking is handled
             * by <RouteChangeTracker> in React (usePathname + useEffect).
             */}
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                `.trim(),
              }}
            />
          </>
        )}

        {/* ─── Turnstile API — gated by NEXT_PUBLIC_TURNSTILE_SITE_KEY ─── */}
        {/*
         * Loaded lazily — only after the page is interactive. The Turnstile
         * widget elements (cf-turnstile divs in each form) are rendered during
         * SSR; the Turnstile script picks them up on load and activates the
         * challenge iframe. This async load prevents blocking LCP.
         */}
        {process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'] && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            id="turnstile-script"
            async
            defer
          />
        )}

        <MotionProvider>
          {/* Route-change tracker: fires trackPageView on every App Router navigation */}
          <RouteChangeTracker />
          <NavBar />
          {children}
          <Footer />
        </MotionProvider>

        {/*
         * TrustedSite badge — mounted after <Footer> (which is inside children).
         * Renders null when NEXT_PUBLIC_TRUSTEDSITE_ID is unset (no network calls).
         * Positioned after body children so it never blocks above-fold paint.
         */}
        <TrustedSiteBadge />
      </body>
    </html>
  );
}
