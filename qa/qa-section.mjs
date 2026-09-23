import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: EXE });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
// scroll slowly to parish life section and wait
await page.evaluate(() => window.scrollTo(0, 2400));
await page.waitForTimeout(1500);
await page.screenshot({ path: './qa/qa-parishlife.png' });
await page.evaluate(() => window.scrollTo(0, 5200));
await page.waitForTimeout(1500);
await page.screenshot({ path: './qa/qa-events.png' });
await browser.close();
console.log('done');
