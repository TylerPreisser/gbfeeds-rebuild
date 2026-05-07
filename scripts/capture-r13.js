// scripts/capture-r13.js — R13 audit screenshots
// - Desktop 1440×900: 7 routes
// - Tablet 768×1024: 4 routes (incl. customer-reviews)
// - Mobile 390×844: 7 routes
// - Home gets TWO captures: pre-counter (immediate networkidle) + post-counter (4s wait)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:4173';
const OUT_DIR = '/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/rebuild-r13';

const FULL_ROUTES = [
  { path: '/', slug: 'home' }, // home special-cased below
  { path: '/products/', slug: 'products' },
  { path: '/products/buck-chow-40lb/', slug: 'products_buck-chow-40lb' },
  { path: '/our-story/', slug: 'our-story' },
  { path: '/why-gb-feeds/', slug: 'why-gb-feeds' },
  { path: '/customer-reviews/', slug: 'customer-reviews' },
  { path: '/photo-gallery/', slug: 'photo-gallery' },
];

const TABLET_ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/products/', slug: 'products' },
  { path: '/products/buck-chow-40lb/', slug: 'products_buck-chow-40lb' },
  { path: '/customer-reviews/', slug: 'customer-reviews' },
];

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900, routes: FULL_ROUTES },
  { name: 'tablet_768', width: 768, height: 1024, routes: TABLET_ROUTES },
  { name: 'mobile_390', width: 390, height: 844, routes: FULL_ROUTES },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  let total = 0;

  for (const viewport of VIEWPORTS) {
    const dir = path.join(OUT_DIR, viewport.name);
    fs.mkdirSync(dir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const route of viewport.routes) {
      const url = BASE_URL + route.path;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        if (route.slug === 'home') {
          // 1) Pre-counter snapshot — taken IMMEDIATELY at networkidle
          //    (no extra wait so we capture the SSR-first-paint state of the counter).
          const prePath = path.join(dir, 'home_pre-counter.png');
          await page.screenshot({ path: prePath, fullPage: true });
          console.log(`CAPTURED: ${viewport.name}/home_pre-counter.png`);
          total++;

          // 2) Post-animation: scroll the counter into view, wait 4s for tween + photo cycles.
          await page.evaluate(() => {
            const counter = document.querySelector('#customer-reviews');
            if (counter) counter.scrollIntoView({ behavior: 'instant', block: 'center' });
          });
          await page.waitForTimeout(4500);
          // Scroll back up so full-page screenshot starts from top
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(400);
          const postPath = path.join(dir, 'home_post-counter.png');
          await page.screenshot({ path: postPath, fullPage: true });
          console.log(`CAPTURED: ${viewport.name}/home_post-counter.png`);
          total++;
        } else {
          await page.waitForTimeout(800);
          const outPath = path.join(dir, `${route.slug}.png`);
          await page.screenshot({ path: outPath, fullPage: true });
          console.log(`CAPTURED: ${viewport.name}/${route.slug}.png`);
          total++;
        }
      } catch (err) {
        console.error(`FAILED: ${viewport.name}/${route.slug} — ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nTotal screenshots captured: ${total}`);
}

run().catch(console.error);
