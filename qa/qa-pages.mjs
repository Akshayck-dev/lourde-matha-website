import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: EXE });

async function slowScroll(page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(280);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

const jobs = [
  { route: '/about', name: 'about', vp: { width: 1440, height: 900 }, stops: [600, 1800, 3200, 4400] },
  { route: '/mass-timings', name: 'mass', vp: { width: 1440, height: 900 }, stops: [700, 1500] },
  { route: '/events', name: 'events', vp: { width: 1440, height: 900 }, stops: [700, 1600] },
  { route: '/gallery', name: 'gallery', vp: { width: 1440, height: 900 }, stops: [700, 1700] },
  { route: '/contact', name: 'contact', vp: { width: 1440, height: 900 }, stops: [700, 1600, 2300] },
  { route: '/contact', name: 'contact-m', vp: { width: 390, height: 844 }, stops: [700, 1800, 2800] },
];

for (const j of jobs) {
  const page = await browser.newPage({ viewport: j.vp });
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.goto('http://localhost:4173' + j.route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await slowScroll(page);
  for (const s of j.stops) {
    await page.evaluate((yy) => window.scrollTo(0, yy), s);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `./qa/qa-${j.name}-${s}.png` });
  }
  console.log(j.name, errors.length ? 'ERRORS: ' + errors.join('|') : 'ok');
  await page.close();
}
await browser.close();
