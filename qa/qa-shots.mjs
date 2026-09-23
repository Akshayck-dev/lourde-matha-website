import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';

const browser = await chromium.launch({ executablePath: EXE });
const shots = [
  { route: '/', name: 'home-hero', viewport: { width: 1440, height: 900 }, full: false },
  { route: '/', name: 'home-full', viewport: { width: 1440, height: 900 }, full: true },
  { route: '/', name: 'home-mobile', viewport: { width: 390, height: 844 }, full: false },
  { route: '/about', name: 'about-full', viewport: { width: 1440, height: 900 }, full: true },
  { route: '/mass-timings', name: 'mass-full', viewport: { width: 1440, height: 900 }, full: true },
  { route: '/events', name: 'events-full', viewport: { width: 1440, height: 900 }, full: true },
  { route: '/gallery', name: 'gallery-full', viewport: { width: 1440, height: 900 }, full: true },
  { route: '/contact', name: 'contact-full', viewport: { width: 1440, height: 900 }, full: true },
  { route: '/contact', name: 'contact-mobile', viewport: { width: 390, height: 844 }, full: true },
];

for (const s of shots) {
  const page = await browser.newPage({ viewport: s.viewport });
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 120)); });
  await page.goto('http://localhost:4173' + s.route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  // scroll through to trigger reveals for full-page shots
  if (s.full) {
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const t = setInterval(() => { y += 600; window.scrollTo(0, y); if (y > document.body.scrollHeight) { clearInterval(t); res(); } }, 120);
      });
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
  }
  await page.screenshot({ path: `./qa/qa-${s.name}.png`, fullPage: s.full });
  if (errors.length) console.log(s.name, 'ERRORS:', errors.join(' | '));
  else console.log(s.name, 'ok');
  await page.close();
}
await browser.close();
