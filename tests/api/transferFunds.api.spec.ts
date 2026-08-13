import { test, expect } from '@playwright/test';

test('API transfer funds', async ({ request }) => {
  const response = await request.post('/parabank/services/bank/transfer', {
    data: {
      fromAccountId: 12345,
      toAccountId: 67890,
      amount: 100
    }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.message).toContain('Transfer Complete');
});
