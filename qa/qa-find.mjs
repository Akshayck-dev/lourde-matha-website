import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await p.goto('http://localhost:4173/offerings', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const bad = await p.evaluate(() => {
  const vw = window.innerWidth, out = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > vw + 1 && r.width < vw + 400) out.push(el.tagName + '.' + (el.className.baseVal ?? el.className).toString().slice(0,60) + ' w=' + Math.round(r.width));
  });
  return [...new Set(out)].slice(0, 12);
});
console.log(JSON.stringify(bad, null, 1));
await b.close();
