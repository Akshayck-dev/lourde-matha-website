import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const pages = ['/', '/about', '/mass-timings', '/events', '/gallery', '/offerings', '/contact'];
for (const route of pages) {
  await p.goto('http://localhost:4173' + route, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  const name = route === '/' ? 'home' : route.slice(1);
  await p.screenshot({ path: `/tmp/shots/${name}.png`, fullPage: true });
  console.log('shot', name);
}
await b.close();
