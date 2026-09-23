import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2000);
const trace = await p.evaluate(() => {
  // walk down from body to find the narrowest chain causing scrollWidth > vw
  let el = document.documentElement;
  const chain = [];
  while (true) {
    chain.push(el.tagName + '.' + (el.className.baseVal ?? el.className).toString().slice(0,40) + ' sw=' + el.scrollWidth);
    const kids = [...el.children].filter(c => c.scrollWidth > window.innerWidth);
    if (!kids.length) break;
    // pick the widest offender
    el = kids.sort((a,b) => b.scrollWidth - a.scrollWidth)[0];
    if (chain.length > 12) break;
  }
  return chain;
});
console.log(trace.join('\n'));
await b.close();
