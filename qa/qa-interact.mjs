import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: EXE });

// 1. mobile menu
let page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.getByRole('button', { name: 'Open menu' }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: './qa/qa-menu-open.png' });
await page.getByRole('link', { name: /Mass Timings/ }).first().click();
await page.waitForTimeout(1200);
console.log('menu nav ->', page.url());
await page.close();

// 2. lightbox
page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4173/gallery', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(900);
await page.getByRole('button', { name: /Open image/ }).first().click();
await page.waitForTimeout(900);
await page.screenshot({ path: './qa/qa-lightbox.png' });
await page.keyboard.press('ArrowRight');
await page.waitForTimeout(700);
await page.keyboard.press('Escape');
await page.waitForTimeout(500);
console.log('lightbox ok');
await page.close();

// 3. event modal
page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4173/events', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 800));
await page.waitForTimeout(900);
await page.getByRole('button', { name: /View details — Feast of Our Lady/ }).first().click();
await page.waitForTimeout(900);
await page.screenshot({ path: './qa/qa-eventmodal.png' });
await page.close();

// 4. footer (home bottom)
page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0; const h = document.body.scrollHeight;
    const t = setInterval(() => { y += 700; window.scrollTo(0, y); if (y >= h) { clearInterval(t); res(); } }, 300);
  });
});
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
await page.screenshot({ path: './qa/qa-footer.png' });
await page.close();

await browser.close();
console.log('interactions done');
