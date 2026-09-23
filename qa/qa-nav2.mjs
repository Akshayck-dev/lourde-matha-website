import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await d.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await d.evaluate(() => window.scrollTo(0, 1400));
await d.waitForTimeout(1200);
await d.screenshot({ path: '/tmp/nav-pill2.png', clip: { x: 700, y: 0, width: 740, height: 140 } });
await b.close();
