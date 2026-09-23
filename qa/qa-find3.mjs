import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
for (const route of ['/', '/contact']) {
  const p = await ctx.newPage();
  await p.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(150); }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(2500); // let all animations settle
  const r = await p.evaluate(() => ({
    sw: document.documentElement.scrollWidth, vw: window.innerWidth,
    bad: [...document.querySelectorAll('body *')].filter(el => {
      const b = el.getBoundingClientRect();
      return b.right > window.innerWidth + 2;
    }).map(el => el.tagName + '.' + (el.className.baseVal ?? el.className).toString().slice(0,40)).slice(0,5)
  }));
  console.log(route, JSON.stringify(r));
  await p.close();
}
await b.close();
