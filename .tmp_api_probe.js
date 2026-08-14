const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill('input[name="username"]', 'john');
  await page.fill('input[name="password"]', 'demo');
  await page.click('input[value="Log In"]');
  await page.waitForURL(/overview\.htm/);
  await page.click('text=Transfer Funds');
  await page.waitForURL(/transfer\.htm/);

  const options = await page.locator('#fromAccountId option').evaluateAll((opts) => opts.map((o) => o.value));
  console.log('OPTIONS', options);

  const response = await page.request.post(
    `https://parabank.parasoft.com/parabank/services_proxy/bank/transfer?fromAccountId=${options[0]}&toAccountId=${options[options.length > 1 ? 1 : 0]}&amount=100`
  );

  console.log('STATUS', response.status());
  console.log('TEXT', await response.text());

  await browser.close();
})();
