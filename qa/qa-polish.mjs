import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const pages = ['/', '/about', '/mass-timings', '/events', '/gallery', '/offerings', '/contact'];
const errs = [];
for (const route of pages) {
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push(route + ': ' + e.message));
  await p.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  const slug = route === '/' ? 'home' : route.slice(1);
  await p.screenshot({ path: `/tmp/polish-${slug}-top.png` });
  const h = await p.evaluate(() => document.body.scrollHeight);
  await p.evaluate((y) => window.scrollTo(0, y), h * 0.35);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `/tmp/polish-${slug}-mid.png` });
  await p.close();
}
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
