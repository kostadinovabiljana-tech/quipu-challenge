import { test, expect } from '@playwright/test';

test('API transfer funds', async ({ page }) => {
  await page.goto('/parabank/index.htm');
  await page.fill('input[name="username"]', 'john');
  await page.fill('input[name="password"]', 'demo');
  await page.click('input[value="Log In"]');
  await page.waitForURL(/overview\.htm/);

  await page.click('text=Transfer Funds');
  await page.waitForURL(/transfer\.htm/);
  await page.waitForFunction(() => {
    const select = document.querySelector('#fromAccountId');
    return !!select && select.options.length > 1;
  });

  const fromAccountId = await page.locator('#fromAccountId option').nth(0).getAttribute('value');
  const toAccountId = await page.locator('#toAccountId option').nth(1).getAttribute('value');

  const response = await page.request.post('/parabank/services_proxy/bank/transfer', {
    params: {
      fromAccountId,
      toAccountId,
      amount: '100'
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain('Successfully transferred');
});
