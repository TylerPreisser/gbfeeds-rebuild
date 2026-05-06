// src/components/page/PhotoGalleryPage.tsx
// RSC — no 'use client'.
// Static photo grid. <GalleryLightbox> child is 'use client' for click-to-enlarge.
// Photos fade from grayscale on viewport entry — pure CSS @starting-style + IO fallback.
// Boundary: page/ imports composite/ + atomic/ + decoration/.

import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { HairlineRules } from '@/components/decoration/HairlineRules';
import { GalleryLightbox } from '@/components/composite/GalleryLightbox';

// All available gallery photos from public/photos/
// Lifestyle photos come from _inherited_assets migration (Phase 6B.1)
const LIFESTYLE_PHOTOS = [
  {
    src: '/photos/lifestyle/lifestyle-img-0001.webp',
    alt: 'Buck feeding at dusk on a Kansas property',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-0018.webp',
    alt: 'Trail camera mounted on a tree in dense Kansas timber',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-1091-1.webp',
    alt: 'Mature 8-point buck on trail camera photo',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-3622.webp',
    alt: 'Kansas hunting property at sunset with open fields',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-4172.webp',
    alt: 'Buck Chow bag in the field next to a gravity feeder',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-4215.webp',
    alt: 'Deer tracks near a GB Feeds site in a Kansas pasture',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-4433-1.webp',
    alt: 'Multiple deer visiting a GB Feeds site at once',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-4439.webp',
    alt: 'Big-framed buck on a trail camera, pre-rut Kansas',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-8584.webp',
    alt: 'Hunter glassing a Kansas tree line from a field edge',
  },
  {
    src: '/photos/lifestyle/lifestyle-luke.webp',
    alt: 'Luke with a trophy buck harvested on GB Feeds property',
  },
  {
    src: '/photos/lifestyle/lifestyle-luke-2.webp',
    alt: 'Luke posing with his Kansas trophy buck close-up',
  },
  {
    src: '/photos/lifestyle/lifestyle-a733367.webp',
    alt: 'Harvested whitetail buck laid out in a Kansas field',
  },
  {
    src: '/photos/lifestyle/lifestyle-dsc08089-c31e863.webp',
    alt: 'Sunrise over a Kansas deer hunting property',
  },
  {
    src: '/photos/lifestyle/lifestyle-20231008-234054.webp',
    alt: 'Night trail camera shot of deer at a GB Feeds site',
  },
  {
    src: '/photos/lifestyle/lifestyle-07eb939d-6b5c-4f14-8c4b-a476a8c5b6b8.webp',
    alt: 'Wide-framed mature buck captured on trail camera',
  },
];

const GALLERY_PHOTOS = [
  {
    src: '/photos/gallery/blob-16f87b2.webp',
    alt: 'GB Feeds branded lifestyle photo — field scene',
  },
  {
    src: '/photos/gallery/blob-478b3b7.webp',
    alt: 'GB Feeds branded lifestyle photo — hunting property',
  },
  {
    src: '/photos/gallery/blob-8085ecb.webp',
    alt: 'GB Feeds branded lifestyle photo — Kansas landscape',
  },
  {
    src: '/photos/gallery/blob-93bef42.webp',
    alt: 'GB Feeds branded lifestyle photo — deer in field',
  },
  {
    src: '/photos/gallery/blob-b7a2223.webp',
    alt: 'GB Feeds branded lifestyle photo — trail cam setup',
  },
  {
    src: '/photos/gallery/blob-de1da36.webp',
    alt: 'GB Feeds branded lifestyle photo — autumn Kansas',
  },
];

const ALL_PHOTOS = [...LIFESTYLE_PHOTOS, ...GALLERY_PHOTOS];

/**
 * <PhotoGalleryPage> — static photo grid with grayscale-to-color fade on scroll.
 * Click-to-enlarge handled by <GalleryLightbox> client component.
 */
export function PhotoGalleryPage() {
  return (
    <main id="main-content">

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[var(--color-paper-2)] border-b border-[var(--color-rule)] overflow-hidden"
        aria-label="Photo gallery page header"
      >
        <HairlineRules />
        <PaperGrain />
        <Container>
          <div className="py-14 md:py-20">
            <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-4">
              KANSAS / MIDWEST / FIELD PHOTOS
            </p>
            <Heading as="h1" size="display-lg">
              Photo Gallery
            </Heading>
            <Text variant="body-lg" className="mt-4 max-w-xl text-[var(--color-ink-muted)]">
              Real hunters. Real properties. Real results.
            </Text>
          </div>
        </Container>
      </section>

      {/* ── PHOTO GRID ───────────────────────────────────────────────────── */}
      <Section bg="paper">
        <PaperGrain />
        <Container>
          <Rule weight="hair" className="mb-8" />
          <GalleryLightbox photos={ALL_PHOTOS} />
          <Rule weight="hair" className="mt-8" />
        </Container>
      </Section>

    </main>
  );
}
