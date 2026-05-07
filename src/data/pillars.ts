// src/data/pillars.ts
// The four-pillar GB Feeds Difference content.
// Verbatim from CONTENT_INVENTORY.md — /why-gb-feeds section (expanded version).
// RSC-only: no 'use client'.

import type { Pillar } from '@/types/product';

/**
 * The four pillars of the GB Feeds Difference.
 * Two text sources in CONTENT_INVENTORY:
 *   - Home page (shorter): used for the four-pillar block on /
 *   - Why GB Feeds page (expanded): used on /why-gb-feeds
 *
 * We store the EXPANDED /why-gb-feeds copy here (it's more complete).
 * The home page block truncates to the first sentence in rendering.
 *
 * Verbatim from CONTENT_INVENTORY.md § /why-gb-feeds.
 */
export const pillars: Pillar[] = [
  {
    number: '01',
    eyebrow: 'PILLAR 01',
    heading: 'Proven Results',
    body: 'When we say we help hunters create their once in a lifetime story, we mean it. It\'s the foundation of our company and it\'s who we are. In 2023 and 2024, our customers harvested over 7,500 inches of antler using GB Feeds products right here in Kansas.',
  },
  {
    number: '02',
    eyebrow: 'PILLAR 02',
    heading: 'Quality Products',
    body: "Every component that goes into a Bag of Buck Chow or a Bag of Corn Candy has a \"reason to be\". It's simple, if it doesn't increase the nutrition, attraction, antler growth or herd health, it doesn't make the cut. Innovation and quality are all we know and cutting corners will never be an option.",
  },
  {
    number: '03',
    eyebrow: 'PILLAR 03',
    heading: 'Unmatched Value',
    body: 'We offer our products directly to you, which eliminates the retail markup and allows us to increase the quality of the components that go into every bag of Buck Chow or bag of Corn Candy. This means better components, higher protein contents, increased nutritional values and more pounds of product for your money.',
  },
  {
    number: '04',
    eyebrow: 'PILLAR 04',
    heading: 'Superior Customer Service',
    body: "Customer service is our thing. If you're not totally satisfied with your purchase, just pick up the phone or send us a message on social media and we'll make it right. We also love your feedback, love your trail camera and harvest photos, and are just a phone call away if you need advice on how to put our products to work for you on your hunting property.",
  },
];
