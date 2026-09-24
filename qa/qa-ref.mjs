import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const errs = [];
const BASE = 'http://localhost:4173/lourde-matha-website';
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
d.on('pageerror', e => errs.push(e.message));
await d.goto(BASE + '/', { waitUntil: 'networkidle' });
await d.waitForTimeout(2000);
await d.screenshot({ path: '/tmp/r-top.png' }); // utility bar + hero
await d.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await d.waitForTimeout(1500);
await d.screenshot({ path: '/tmp/r-footer.png' }); // tri-bands + footer
const m = await (await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })).newPage();
m.on('pageerror', e => errs.push('mobile: ' + e.message));
await m.goto(BASE + '/', { waitUntil: 'networkidle' });
await m.waitForTimeout(1800);
await m.screenshot({ path: '/tmp/r-mob.png' }); // utility bar hidden on mobile
console.log('ERRORS:', JSON.stringify(errs));
await b.close();
