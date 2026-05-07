// src/components/page/PhotoGalleryPage.tsx
// RSC — no 'use client'.
// Static photo grid. <GalleryLightbox> child is 'use client' for click-to-enlarge.
// Photos fade from grayscale on viewport entry — pure CSS @starting-style + IO fallback.
// Boundary: page/ imports composite/ + atomic/ + decoration/.

import { Heading } from '@/components/atomic/Heading';
import { Container } from '@/components/atomic/Container';
import { Section } from '@/components/atomic/Section';
import { Rule } from '@/components/atomic/Rule';
import { PaperGrain } from '@/components/decoration/PaperGrain';
import { GalleryLightbox } from '@/components/composite/GalleryLightbox';

// All available gallery photos from public/photos/
// Lifestyle photos for the gallery.
// EXCLUDED:
//   - lifestyle-luke.webp + lifestyle-luke-2.webp — both have "CUSTOMER REVIEW!"
//     overlay text baked into the JPEG (R13 audit P0).
//   - lifestyle-img-0018.webp — phone/trail-cam screenshot with a date/time HUD
//     overlay reading "8 70F 08/23/2021 08:00AM CAMERA1" — looks like a bug.
//   - lifestyle-img-4172.webp — iOS Photos app screenshot with status bar +
//     "20221103_205923.jpg" filename caption visible at the top.
const LIFESTYLE_PHOTOS = [
  {
    src: '/photos/lifestyle/lifestyle-img-0001.webp',
    alt: 'Hunter with a trophy mule deer harvested at night in a Kansas field',
    cropClassName: 'object-[50%_42%]',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-1091-1.webp',
    alt: 'Greg Brungardt with three mounted whitetail bucks',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-3622.webp',
    alt: 'Spin-feeder cup full of corn and Buck Chow pellets',
    cropClassName: 'object-[50%_58%]',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-4215.webp',
    alt: 'Two hunters with a mule deer harvest, Buck Chow and Corn Candy on the field',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-4433-1.webp',
    alt: 'Archery hunter with a wide-framed whitetail in a Kansas cornfield',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-4439.webp',
    alt: 'Young hunter posed with his first Kansas whitetail',
    cropClassName: 'object-[50%_38%]',
  },
  {
    src: '/photos/lifestyle/lifestyle-img-8584.webp',
    alt: 'Bow hunter at a Buck Chow station with deer mid-feed',
  },
  {
    src: '/photos/lifestyle/lifestyle-a733367.webp',
    alt: 'Close-up of Buck Chow grain blend texture',
  },
  {
    src: '/photos/lifestyle/lifestyle-dsc08089-c31e863.webp',
    alt: 'Hand pouring Buck Chow into a feeder at a Kansas property',
  },
  {
    src: '/photos/lifestyle/lifestyle-20231008-234054.webp',
    alt: 'Family portrait with a harvested whitetail at night',
    cropClassName: 'object-[50%_44%]',
  },
  {
    src: '/photos/lifestyle/lifestyle-07eb939d-6b5c-4f14-8c4b-a476a8c5b6b8.webp',
    alt: 'Couple with a Kansas whitetail harvested at night',
    cropClassName: 'object-[50%_38%]',
  },
];

// blob-16f87b2 / blob-93bef42 / blob-de1da36 omitted — those tiles have
// "CUSTOMER REVIEW!" / quote overlays baked into the JPEG and read as cluttered
// placeholder graphics in the rebuild's design context (Tyler R11 audit).
const GALLERY_PHOTOS = [
  {
    src: '/photos/gallery/blob-478b3b7.webp',
    alt: 'Boy with trophy buck and Corn Candy jug',
    cropClassName: 'scale-[1.12]',
  },
  {
    src: '/photos/gallery/blob-8085ecb.webp',
    alt: 'Customer trophy buck collage — four harvest scenes',
    cropClassName: 'scale-[1.2]',
  },
  {
    src: '/photos/gallery/blob-b7a2223.webp',
    alt: 'Handwritten thank-you note tied to a Buck Chow bag',
    cropClassName: 'scale-[1.18]',
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

      {/* ── PAGE TITLE ──────────────────────────────────────────────────── */}
      <section
        className="bg-white py-16 sm:py-20 lg:py-24"
        aria-label="Photo Gallery page header"
      >
        <Container variant="narrow">
          <Heading as="h1" size="display-lg" className="text-center tracking-[0.03em]">
            PHOTO GALLERY
          </Heading>
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
