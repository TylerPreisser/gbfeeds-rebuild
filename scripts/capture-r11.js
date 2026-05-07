// scripts/capture-r11.js — R11 audit screenshots
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:4173';
const OUT_DIR = '/Users/tylerpreisser/Downloads/gbfeeds.com-rebuilt/.context/screenshots/rebuild-r11';

const ROUTES = [
  { path: '/', slug: 'home', extraWait: 4000 },
  { path: '/products/', slug: 'products' },
  { path: '/products/buck-chow-40lb/', slug: 'products_buck-chow-40lb' },
  { path: '/our-story/', slug: 'our-story' },
  { path: '/why-gb-feeds/', slug: 'why-gb-feeds' },
  { path: '/customer-reviews/', slug: 'customer-reviews' },
  { path: '/photo-gallery/', slug: 'photo-gallery' },
];

const TABLET_ROUTES = [
  { path: '/', slug: 'home', extraWait: 4000 },
  { path: '/products/', slug: 'products' },
  { path: '/products/buck-chow-40lb/', slug: 'products_buck-chow-40lb' },
];

const VIEWPORTS = [
  { name: 'desktop_1440', width: 1440, height: 900, routes: ROUTES },
  { name: 'tablet_768', width: 768, height: 1024, routes: TABLET_ROUTES },
  { name: 'mobile_390', width: 390, height: 844, routes: ROUTES },
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
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
        const wait = route.extraWait || 800;
        await page.waitForTimeout(wait);
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
