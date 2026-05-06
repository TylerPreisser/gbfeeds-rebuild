'use client';
// src/components/composite/RouteChangeTracker.tsx
// 'use client' — uses usePathname + useEffect for GA4 SPA route tracking.
// Fires trackPageView(pathname) on every Next.js App Router navigation.
// No-op when NEXT_PUBLIC_GA_ID is unset (trackPageView guards internally).
// Boundary: imports only lib/.

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

/**
 * <RouteChangeTracker> — mounts in root layout inside MotionProvider.
 * Detects pathname changes (App Router soft navigations) and fires
 * the GA4 page_view event via window.gtag.
 *
 * The base gtag('config', GA_ID) is emitted by the <Script> inline in layout.tsx
 * on the initial page load. This component handles all subsequent navigations.
 */
export function RouteChangeTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Renders nothing — side-effect only.
  return null;
}
