// src/data/testimonials.ts
// 22 verbatim testimonials from CONTENT_INVENTORY.md § /customer-reviews.
// RSC-only: no 'use client'. Do not import from client components.

import type { Testimonial } from '@/types/product';

/**
 * All 22 GB Feeds customer testimonials.
 * Verbatim quotes — no editing of text.
 * First-name attribution only — per brand identity (no avatars, no invented last names).
 * productMentioned is inferred from quote content for PDP filtering.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'aaron-1',
    quote: 'Let me tell you this stuff works! Thanks GB Feeds!',
    attribution: 'Aaron',
    productMentioned: null,
  },
  {
    id: 'trevor-1',
    quote: 'That Corn Candy works!',
    attribution: 'Trevor',
    productMentioned: 'corn-candy',
  },
  {
    id: 'kaden-1',
    quote: 'I am very happy with it, I\'ve got some big deer on camera. Quality product',
    attribution: 'Kaden',
    productMentioned: null,
  },
  {
    id: 'dylan-1',
    quote: 'This tall 8 missing since September, put out Buck Chow and he shows up!',
    attribution: 'Dylan',
    productMentioned: 'buck-chow',
  },
  {
    id: 'torrey-1',
    quote: 'Corn Candy out at 3:41PM and 6:15 a stud showed up, never saw him before.',
    attribution: 'Torrey',
    productMentioned: 'corn-candy',
  },
  {
    id: 'brandon-1',
    quote: 'I put some out for my ole lady and holy s#&t deer on that stuff all day!',
    attribution: 'Brandon',
    productMentioned: null,
  },
  {
    id: 'wayne-1',
    quote: 'These deer are loving the Buck Chow',
    attribution: 'Wayne',
    productMentioned: 'buck-chow',
  },
  {
    id: 'nathan-1',
    quote: 'I\'m SOLD! Will be buying more, same day results!!!',
    attribution: 'Nathan',
    productMentioned: null,
  },
  {
    id: 'brandon-2',
    quote: 'That Corn Candy has some serious smell',
    attribution: 'Brandon',
    productMentioned: 'corn-candy',
  },
  {
    id: 'adam-1',
    quote: 'Apparently the Buck Chow is lip lickin\' good',
    attribution: 'Adam',
    productMentioned: 'buck-chow',
  },
  {
    id: 'andy-1',
    quote: '7 hours after putting a bag out, they are showing up non-stop',
    attribution: 'Andy',
    productMentioned: null,
  },
  {
    id: 'jerry-1',
    quote: 'My bucks are loving this feed, antler growth is fantastsic',
    attribution: 'Jerry',
    productMentioned: null,
  },
  {
    id: 'jon-1',
    quote: 'DUDE this stuff is fire!',
    attribution: 'Jon',
    productMentioned: null,
  },
  {
    id: 'seth-1',
    quote: 'Put the camera up at new location at 7:20PM, bucks there at 8:15!',
    attribution: 'Seth',
    productMentioned: null,
  },
  {
    id: 'jake-1',
    quote: 'The one I was hoping for showed up',
    attribution: 'Jake',
    productMentioned: null,
  },
  {
    id: 'david-1',
    quote: 'They didn\'t wait around to come in, went through all 700lbs',
    attribution: 'David',
    productMentioned: null,
  },
  {
    id: 'nathan-2',
    quote: 'Got some studs hitting it',
    attribution: 'Nathan',
    productMentioned: null,
  },
  {
    id: 'john-1',
    quote: 'Dumped a bag at 6pm, bucks already eating on it at 6:30pm',
    attribution: 'John',
    productMentioned: null,
  },
  {
    id: 'blake-1',
    quote: 'First time seeing these bucks after putting out your attractant!',
    attribution: 'Blake',
    productMentioned: null,
  },
  {
    id: 'greg-l-1',
    quote: 'That corn candy is awesome! Mixed a little in, boom two bucks!',
    attribution: 'Greg L.',
    productMentioned: 'corn-candy',
  },
  {
    id: 'nathan-3',
    quote: 'This Corn Candy is impressive!',
    attribution: 'Nathan',
    productMentioned: 'corn-candy',
  },
  {
    id: 'mason-1',
    quote: 'GB Feeds brought him in, was gone for a month!',
    attribution: 'Mason',
    productMentioned: null,
  },
];

/** Get testimonials filtered by product mention */
export function getTestimonialsByProduct(
  product: 'buck-chow' | 'corn-candy',
): Testimonial[] {
  return testimonials.filter((t) => t.productMentioned === product);
}
