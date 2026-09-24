import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await d.goto('https://stjosephchurchvadakkekotta.org/', { waitUntil: 'networkidle', timeout: 60000 });
await d.waitForTimeout(2500);
await d.screenshot({ path: '/tmp/ref-hero.png' });
await d.evaluate(() => window.scrollBy(0, 1100));
await d.waitForTimeout(1200);
await d.screenshot({ path: '/tmp/ref-mid.png' });
await d.evaluate(() => window.scrollBy(0, 2200));
await d.waitForTimeout(1200);
await d.screenshot({ path: '/tmp/ref-low.png' });
const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })).newPage();
await m.goto('https://stjosephchurchvadakkekotta.org/', { waitUntil: 'networkidle', timeout: 60000 });
await m.waitForTimeout(2000);
await m.screenshot({ path: '/tmp/ref-mob.png' });
// computed styles: header bg, body font, heading colors
const info = await d.evaluate(() => {
  const header = document.querySelector('header');
  const h1 = document.querySelector('h1');
  const cs = (el, p) => el ? getComputedStyle(el)[p] : null;
  return {
    headerBg: cs(header, 'backgroundColor'),
    bodyFont: getComputedStyle(document.body).fontFamily,
    h1Font: cs(h1, 'fontFamily'), h1Color: cs(h1, 'color'), h1Size: cs(h1, 'fontSize'),
    bodyBg: getComputedStyle(document.body).backgroundColor,
  };
});
console.log(JSON.stringify(info, null, 1));
await b.close();
