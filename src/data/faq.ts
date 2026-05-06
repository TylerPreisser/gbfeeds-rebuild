// src/data/faq.ts
// 4 verbatim FAQs from CONTENT_INVENTORY.md § Frequently Asked Questions.
// RSC-only: no 'use client'. Used on home page AND /faq route.

import type { FAQ } from '@/types/product';

/**
 * All 4 GB Feeds FAQs — verbatim from the live site.
 * Displayed on the home page section AND the dedicated /faq route.
 * JSON-LD FAQPage schema generated from this array by seo.ts faqSchema().
 */
export const faqs: FAQ[] = [
  {
    id: 'faq-gravity-spin',
    question: 'Will GB Feeds products work in both gravity and spin feeders?',
    answer:
      'Yes, Buck Chow and Corn Candy have been tested to work in both gravity and spin feeders.',
  },
  {
    id: 'faq-protein-content',
    question: 'What is the protein content in Buck Chow?',
    answer: 'Buck Chow provides an industry leading 20% protein content.',
  },
  {
    id: 'faq-corn-coverage',
    question: 'How much corn does a bag of Corn Candy treat?',
    answer:
      'Each bag of Corn Candy enhances the aroma, flavor and nutrition of approximately 400-500lbs of corn.',
  },
  {
    id: 'faq-shipping',
    question: 'Do you ship anywhere in the United States?',
    answer:
      'We can ship Corn Candy (No Minimum) anywhere in the US and Buck Chow via pallet orders (Minimum 25 bags) anywhere in the US.',
  },
];
