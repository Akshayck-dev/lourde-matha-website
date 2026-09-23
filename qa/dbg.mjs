import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await d.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await d.waitForTimeout(1500);
const info = await d.evaluate(() => {
  const el = [...document.querySelectorAll('header a')].find(a => a.textContent.includes('Visit Us'));
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return { tag: el.tagName, cls: el.className, w: r.width, h: r.height, display: cs.display, flexDir: cs.flexDirection, whiteSpace: cs.whiteSpace, parent: el.parentElement.tagName + '.' + el.parentElement.className.slice(0, 60) };
});
console.log(JSON.stringify(info, null, 1));
await b.close();
