const { chromium } = require('playwright');
(async() => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('request', request => {
    const url = request.url();
    if (url.includes('login') || url.includes('transfer') || url.includes('services') || url.includes('overview')) {
      console.log('REQ', request.method(), url, request.postData() || '');
    }
  });
  page.on('response', async response => {
    const url = response.url();
    if (url.includes('login') || url.includes('transfer') || url.includes('services') || url.includes('overview')) {
      const text = await response.text().catch(() => '');
      console.log('RESP', response.status(), url, text.slice(0, 250));
    }
  });
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.fill('input[name="username"]', 'john');
  await page.fill('input[name="password"]', 'demo');
  await page.click('input[value="Log In"]');
  await page.waitForURL(/overview\.htm/);
  await page.click('text=Transfer Funds');
  await page.waitForURL(/transfer\.htm/);
  await page.waitForFunction(() => document.querySelectorAll('#fromAccountId option').length > 0);
  console.log('FROM OPTIONS', await page.locator('#fromAccountId option').evaluateAll((opts) => opts.map(o => ({ value: o.value, text: o.textContent.trim() }))));
  console.log('TO OPTIONS', await page.locator('#toAccountId option').evaluateAll((opts) => opts.map(o => ({ value: o.value, text: o.textContent.trim() }))));
  await page.selectOption('#fromAccountId', { index: 1 });
  await page.selectOption('#toAccountId', { index: 1 });
  await page.fill('#amount', '100');
  await page.click('input[value="Transfer"]');
  await page.waitForTimeout(3000);
  console.log('FINAL URL', page.url());
  console.log(await page.locator('body').innerText());
  await browser.close();
})();
