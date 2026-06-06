import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:5179';
const OUT  = './audit-screenshots';
mkdirSync(OUT, { recursive: true });

const forceReveal = async (page) => {
  await page.evaluate(() => {
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')
      .forEach(el => el.classList.add('revealed'));
  });
  await page.waitForTimeout(400);
};

const snap = async (page, name) => {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  console.log(`  saved ${name}.png`);
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx     = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page    = await ctx.newPage();

  // ── HOME above fold
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(800);
  await snap(page, '01-home-hero');

  // ── HOME scroll sections
  await forceReveal(page);
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(300);
  await snap(page, '02-home-eq-band');

  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(300);
  await snap(page, '03-home-pillars');

  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(300);
  await snap(page, '04-home-programs');

  await page.evaluate(() => window.scrollTo(0, 3400));
  await page.waitForTimeout(300);
  await snap(page, '05-home-stats');

  await page.evaluate(() => window.scrollTo(0, 4200));
  await page.waitForTimeout(300);
  await snap(page, '06-home-booking-options');

  await page.evaluate(() => window.scrollTo(0, 999999));
  await page.waitForTimeout(300);
  await snap(page, '07-home-cta-footer');

  // ── SERVICES
  await page.goto(`${BASE}/services`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await forceReveal(page);
  await snap(page, '08-services-top');
  await page.evaluate(() => window.scrollTo(0, 999999));
  await page.waitForTimeout(300);
  await snap(page, '09-services-cards');

  // ── BOOK
  await page.goto(`${BASE}/book`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await forceReveal(page);
  await snap(page, '10-book-top');
  await page.evaluate(() => window.scrollTo(0, 999999));
  await page.waitForTimeout(300);
  await snap(page, '11-book-form');

  // ── TESTIMONIALS
  await page.goto(`${BASE}/testimonials`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await forceReveal(page);
  await snap(page, '12-stories-top');
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(300);
  await snap(page, '13-stories-card1');
  await page.evaluate(() => window.scrollTo(0, 999999));
  await page.waitForTimeout(300);
  await snap(page, '14-stories-end');

  // ── ABOUT
  await page.goto(`${BASE}/about`, { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await forceReveal(page);
  await snap(page, '15-about');

  await browser.close();
  console.log('\nAudit complete — screenshots in ./audit-screenshots/');
})();
