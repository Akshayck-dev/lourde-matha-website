import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
for (const route of ['/', '/events', '/offerings', '/contact']) {
  const p = await ctx.newPage();
  await p.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  // slow scroll to trigger all reveals
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(120); }
  await p.waitForTimeout(800);
  const bad = await p.evaluate(() => {
    const vw = window.innerWidth, out = [];
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 2 || r.left < -2) {
        const cls = (el.className.baseVal ?? el.className).toString().slice(0, 50);
        out.push(el.tagName + '.' + cls + ' L=' + Math.round(r.left) + ' R=' + Math.round(r.right));
      }
    });
    return [...new Set(out)].slice(0, 8);
  });
  console.log(route, '->', JSON.stringify(bad));
  await p.close();
}
await b.close();
