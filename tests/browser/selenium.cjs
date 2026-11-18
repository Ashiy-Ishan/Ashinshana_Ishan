const assert = require('node:assert/strict');
const { Builder, Browser, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function main() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const options = new chrome.Options().addArguments('--window-size=1440,900');
  if (process.env.HEADED !== '1') options.addArguments('--headless');

  const driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

  try {
    await driver.get(new URL('#skills', baseUrl).href);

    const developerButton = await driver.wait(
      until.elementLocated(By.css('#portfolio-map .map-node-developer[aria-pressed="true"]')), 10000
    );
    assert.equal(await developerButton.getText(), 'Developer');
    await driver.wait(until.elementLocated(By.css('#portfolio-map a[href="#skills"][aria-current="location"]')), 10000);

    const projects = await driver.findElement(By.css('#portfolio-map a[href="#projects"]'));
    await projects.click();
    await driver.wait(until.urlContains('#projects'), 10000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id('projects'))), 10000);

    await driver.get(new URL('#/admin', baseUrl).href);
    await driver.wait(until.elementLocated(By.id('admin-email')), 10000);
    assert.equal(await driver.findElements(By.css('.admin-root-container')).then(elements => elements.length), 0);
    console.log('Selenium passed: direct Skills link, Projects navigation, and the signed-out admin screen.');
  } finally {
    await driver.quit();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
