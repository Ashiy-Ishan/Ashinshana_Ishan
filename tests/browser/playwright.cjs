const assert = require('node:assert/strict');
const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: process.env.HEADED !== '1' });

  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(process.env.BASE_URL || 'http://localhost:3000', { waitUntil: 'domcontentloaded' });

    const map = page.getByRole('navigation', { name: 'Portfolio map' });
    await map.getByRole('button', { name: 'Creator', exact: true }).click();
    assert.equal(await map.getByRole('button', { name: 'Creator', exact: true }).getAttribute('aria-pressed'), 'true');
    await map.getByRole('link', { name: 'Videos', exact: true }).click();
    await page.waitForURL('**/#videos');
    await page.locator('#videos').waitFor({ state: 'visible' });

    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await page.locator('html[data-theme="dark"]').waitFor({ state: 'attached' });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Switch to light mode' }).waitFor();

    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(hasOverflow, false, 'The Creator view should fit a 390 px viewport');
    console.log('Playwright passed: mobile role navigation, Videos link, saved theme, and layout.');
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
