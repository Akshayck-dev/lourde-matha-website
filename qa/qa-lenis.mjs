import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const errs = [];
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
d.on('pageerror', e => errs.push(e.message));
await d.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await d.waitForTimeout(1500);
await d.screenshot({ path: '/tmp/lenis-top.png' });
const lenisOn = await d.evaluate(() => document.documentElement.classList.contains('lenis'));
console.log('lenis active:', lenisOn);
// smooth-scroll down via wheel events, then screenshot the pill
await d.evaluate(() => window.scrollTo(0, 1400));
await d.waitForTimeout(2200);
await d.screenshot({ path: '/tmp/lenis-pill.png' });
const pillVisible = await d.evaluate(() => {
  const h = document.querySelector('header');
  return h ? getComputedStyle(h).borderRadius : 'no header';
});
console.log('header border-radius when scrolled:', pillVisible);
await d.close();
// mobile: scrolled pill + menu
const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
m.on('pageerror', e => errs.push('mobile: ' + e.message));
await m.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await m.waitForTimeout(1200);
await m.evaluate(() => window.scrollTo(0, 1200));
await m.waitForTimeout(2000);
await m.screenshot({ path: '/tmp/lenis-mobile-pill.png' });
await m.evaluate(() => window.scrollTo(0, 0));
await m.waitForTimeout(1500);
await m.click('button[aria-label="Open menu"]');
await m.waitForTimeout(900);
await m.screenshot({ path: '/tmp/lenis-mobile-menu.png' });
// navigate via menu link, check scroll resets to top
await m.click('nav[aria-label="Mobile"] ul li:first-child a');
await m.waitForTimeout(1500);
const sy = await m.evaluate(() => window.scrollY);
console.log('scrollY after nav:', sy);
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
