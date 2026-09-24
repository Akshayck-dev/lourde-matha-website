import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const errs = [];
const BASE = 'http://localhost:4173/lourde-matha-website';
// mobile: pillars slider
const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })).newPage();
m.on('pageerror', e => errs.push('mobile: ' + e.message));
await m.goto(BASE + '/', { waitUntil: 'networkidle' });
await m.waitForTimeout(1500);
await m.evaluate(() => [...document.querySelectorAll('h2')].find(h => h.textContent.includes('The Life of Our Parish')).scrollIntoView({ block: 'center' }));
await m.waitForTimeout(1200);
const s0 = await m.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(x => x.textContent.includes('The Life of Our Parish'));
  const row = h.closest('section').querySelector('[class*="overflow-x-auto"]');
  return { cls: row.className.slice(0, 80), scrollW: row.scrollWidth, clientW: row.clientWidth, left0: row.scrollLeft };
});
await m.waitForTimeout(4200); // let auto-slide advance
const s1 = await m.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(x => x.textContent.includes('The Life of Our Parish'));
  return h.closest('section').querySelector('[class*="overflow-x-auto"]').scrollLeft;
});
await m.screenshot({ path: '/tmp/s-mobile.png' });
console.log('slider row:', JSON.stringify(s0), 'scrollLeft after 4.2s:', s1);
// desktop: grid intact
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
d.on('pageerror', e => errs.push('desktop: ' + e.message));
await d.goto(BASE + '/about', { waitUntil: 'networkidle' });
await d.waitForTimeout(1500);
const dg = await d.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(x => x.textContent.includes('Sacraments'));
  const row = h.closest('section').querySelector('[class*="overflow-x-auto"]');
  const cs = getComputedStyle(row);
  return { display: cs.display, cols: cs.gridTemplateColumns.split(' ').length };
});
console.log('desktop sacraments:', JSON.stringify(dg));
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
