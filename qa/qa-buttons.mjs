import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const errs = [];
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
d.on('pageerror', e => errs.push(e.message));
await d.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await d.waitForTimeout(2200);
await d.screenshot({ path: '/tmp/btn-hero.png' });
// hover the gold button to see the lift effect
await d.hover('text=Explore Our Parish');
await d.waitForTimeout(500);
await d.screenshot({ path: '/tmp/btn-hover.png', clip: { x: 60, y: 560, width: 560, height: 160 } });
const btnCount = await d.evaluate(() => document.querySelectorAll('a[class*="bg-gold"], a[class*="bg-maroon"], button[class*="bg-maroon"]').length);
console.log('styled buttons on home:', btnCount);
// check a few pages render buttons
for (const r of ['/about', '/offerings', '/contact']) {
  await d.goto('http://localhost:4173' + r, { waitUntil: 'networkidle' });
  await d.waitForTimeout(900);
}
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
