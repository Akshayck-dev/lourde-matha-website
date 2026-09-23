import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const errs = [];
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
d.on('pageerror', e => errs.push(e.message));
await d.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await d.waitForTimeout(2500);
await d.screenshot({ path: '/tmp/hero-desktop.png' });
const deskSrc = await d.evaluate(() => {
  const imgs = [...document.querySelectorAll('section img')].slice(0, 2);
  return imgs.map(i => ({ src: i.currentSrc.split('/').pop(), visible: i.offsetParent !== null }));
});
const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
m.on('pageerror', e => errs.push('mobile: ' + e.message));
await m.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await m.waitForTimeout(2500);
await m.screenshot({ path: '/tmp/hero-mobile.png' });
const mobSrc = await m.evaluate(() => {
  const imgs = [...document.querySelectorAll('section img')].slice(0, 2);
  return imgs.map(i => ({ src: i.currentSrc.split('/').pop(), visible: i.offsetParent !== null }));
});
console.log('desktop:', JSON.stringify(deskSrc));
console.log('mobile:', JSON.stringify(mobSrc));
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
