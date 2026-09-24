import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const BASE = 'http://localhost:4173/lourde-matha-website';
const pages = ['', 'about', 'mass-timings', 'events', 'gallery', 'offerings', 'contact'];
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
for (const p of pages) {
  await d.goto(BASE + '/' + p, { waitUntil: 'networkidle' });
  await d.waitForTimeout(1200);
  // scroll through to trigger all reveals, then back to top
  await d.evaluate(async () => {
    await new Promise(r => {
      let y = 0;
      const t = setInterval(() => { y += 600; window.scrollTo(0, y); if (y > document.body.scrollHeight) { clearInterval(t); r(); } }, 60);
    });
    window.scrollTo(0, 0);
  });
  await d.waitForTimeout(800);
  const name = p === '' ? 'home' : p;
  await d.screenshot({ path: `/tmp/b-${name}-d.png`, fullPage: true });
  console.log('shot', name);
}
await b.close();
