// src/app/page.tsx
// RSC — no 'use client'.
// Home page route. Reads harvests.json server-side and passes to <HomePage>.
// Metadata via buildMetadata; JSON-LD emitted inside <HomePage>.

import type { Metadata } from 'next';
import { HomePage } from '@/components/page/HomePage';
import { buildMetadata } from '@/lib/seo';
import harvestsJson from '../../public/data/harvests.json';
import type { HarvestsFile } from '@/types/harvests';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: 'GB Feeds — Kansas-Made Specialty Deer Feed',
  description:
    "A small batch specialty deer feed company that specializes in creating the world's best deer feeds for the world's best deer hunters.",
  canonical: '/',
  ogImage: '/og/home.png',
});

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  // Read harvests at build time via static JSON import (resolveJsonModule: true).
  // The data is baked into the static HTML — no runtime fetch needed.
  const harvests = harvestsJson as HarvestsFile;

  return (
    <>
      {/*
       * Preload the LCP hero AVIF so the browser discovers it before HTML
       * parsing reaches the <picture> element. Without this preload, the
       * browser must parse to the <section> before the image download starts,
       * adding ~300-500ms to LCP on a cold load.
       *
       * Next.js App Router hoists any <link> elements returned from RSCs into
       * <head> automatically — no custom Document needed.
       */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link
        rel="preload"
        as="image"
        href="/photos/lifestyle/hero-buck-chow-original.avif"
        type="image/avif"
      />
      <HomePage harvests={harvests} />
    </>
  );
}
