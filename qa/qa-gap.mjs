import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const errs = [];
const BASE = 'http://localhost:4173/lourde-matha-website';
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
d.on('pageerror', e => errs.push(e.message));
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
await d.waitForTimeout(1200);
await d.evaluate(async () => {
  await new Promise(r => {
    let y = 0;
    const t = setInterval(() => { y += 700; window.scrollTo(0, y); if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 50);
  });
});
await d.waitForTimeout(800);
// capture the Worship->ParishLife transition area
await d.evaluate(() => [...document.querySelectorAll('h2')].find(h => h.textContent.includes('The Life of Our Parish')).scrollIntoView({ block: 'center' }));
await d.waitForTimeout(900);
await d.screenshot({ path: '/tmp/g-desktop.png' });
const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })).newPage();
m.on('pageerror', e => errs.push('mobile: ' + e.message));
await m.goto(BASE + '/', { waitUntil: 'networkidle' });
await m.waitForTimeout(1200);
await m.evaluate(async () => {
  await new Promise(r => {
    let y = 0;
    const t = setInterval(() => { y += 700; window.scrollTo(0, y); if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 50);
  });
});
await m.waitForTimeout(800);
await m.evaluate(() => [...document.querySelectorAll('h2')].find(h => h.textContent.includes('The Life of Our Parish')).scrollIntoView({ block: 'center' }));
await m.waitForTimeout(900);
await m.screenshot({ path: '/tmp/g-mobile.png' });
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
