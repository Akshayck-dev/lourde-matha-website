import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const BASE = 'http://localhost:4173/lourde-matha-website';
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
await d.waitForTimeout(1500);
// trigger reveals by scrolling through
await d.evaluate(async () => {
  await new Promise(r => {
    let y = 0;
    const t = setInterval(() => { y += 700; window.scrollTo(0, y); if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 50);
  });
});
await d.waitForTimeout(1000);
const H = await d.evaluate(() => document.body.scrollHeight);
console.log('page height:', H);
for (let i = 0, n = 0; i < H; i += 900, n++) {
  await d.evaluate(y => window.scrollTo(0, y), i);
  await d.waitForTimeout(700);
  await d.screenshot({ path: `/tmp/chunk-${n}.png` });
}
console.log('done');
await b.close();
