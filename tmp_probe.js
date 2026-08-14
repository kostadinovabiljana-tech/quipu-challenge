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

  const cookies = await context.cookies('https://parabank.parasoft.com');
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');
  console.log('COOKIES', cookieHeader);

  const resp = await fetch('https://parabank.parasoft.com/parabank/services/bank/transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookieHeader,
      'Accept': 'application/json, text/plain, */*'
    },
    body: 'fromAccountId=54321&toAccountId=12345&amount=100'
  });

  console.log('STATUS', resp.status);
  console.log(await resp.text());

  await browser.close();
})();
