const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:4173';
const OUT_DIR = '/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/rebuild-current';

const DESKTOP_ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/products', slug: 'products' },
  { path: '/products/buck-chow-40lb', slug: 'products_buck-chow-40lb' },
  { path: '/our-story', slug: 'our-story' },
  { path: '/why-gb-feeds', slug: 'why-gb-feeds' },
  { path: '/customer-reviews', slug: 'customer-reviews' },
  { path: '/photo-gallery', slug: 'photo-gallery' },
  { path: '/contact', slug: 'contact' },
  { path: '/faq', slug: 'faq' },
  { path: '/field-club', slug: 'field-club' },
  { path: '/feed-program', slug: 'feed-program' },
  { path: '/journal', slug: 'journal' },
  { path: '/journal/stand-7b-riley', slug: 'journal_stand-7b-riley' },
  { path: '/season/rut', slug: 'season_rut' },
];

const TABLET_ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/products', slug: 'products' },
  { path: '/products/buck-chow-40lb', slug: 'products_buck-chow-40lb' },
];

const MOBILE_ROUTES = DESKTOP_ROUTES; // same as desktop

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900, routes: DESKTOP_ROUTES },
  { name: 'tablet_768', width: 768, height: 1024, routes: TABLET_ROUTES },
  { name: 'mobile_390', width: 390, height: 844, routes: MOBILE_ROUTES },
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
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(800);
        const outPath = path.join(dir, `${route.slug}.png`);
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`CAPTURED: ${viewport.name}/${route.slug}.png`);
        total++;
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
