import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: EXE });
const p = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await p.waitForTimeout(2000);
const out = await p.evaluate(() => {
  const res = [];
  document.querySelectorAll('main > section').forEach((s, i) => {
    const wide = [...s.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > 392).slice(0, 3)
      .map(el => el.tagName + '.' + (el.className.baseVal ?? el.className).toString().slice(0,45));
    if (wide.length) res.push('section#' + i + ' ' + (s.querySelector('h2')?.textContent || '').slice(0,30) + ' -> ' + wide.join(' | '));
  });
  return res;
});
console.log(out.join('\n'));
await b.close();
