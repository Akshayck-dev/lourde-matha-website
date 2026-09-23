import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await d.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await d.waitForTimeout(2200);
await d.screenshot({ path: '/tmp/btn-round.png', clip: { x: 60, y: 560, width: 620, height: 160 } });
const radius = await d.evaluate(() => {
  const el = [...document.querySelectorAll('a')].find(a => a.textContent.includes('Explore Our Parish'));
  return getComputedStyle(el).borderRadius;
});
console.log('border-radius:', radius);
await b.close();
