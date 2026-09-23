import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: EXE });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
await page.goto('http://localhost:4174/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.evaluate(() => {
  const els = [...document.querySelectorAll('h2')];
  const t = els.find((e) => e.textContent.includes('Visit Our Parish'));
  t.scrollIntoView({ block: 'center' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: './qa/qa-location-new.png' });
console.log(errs.length ? 'ERRORS: ' + errs.join('|') : 'ok');
await browser.close();
