import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const errs = [];
const BASE = 'http://localhost:4173/lourde-matha-website';
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
d.on('pageerror', e => errs.push(e.message));
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
await d.waitForTimeout(2200);
await d.screenshot({ path: '/tmp/f-hero.png' });
const fonts = await d.evaluate(() => {
  const h1 = getComputedStyle(document.querySelector('h1')).fontFamily;
  const p = getComputedStyle(document.querySelector('section p')).fontFamily;
  return { h1, p };
});
console.log('FONTS:', JSON.stringify(fonts));
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
