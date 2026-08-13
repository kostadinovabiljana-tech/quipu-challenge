# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\api\transferFunds.api.spec.ts >> API transfer funds
- Location: tests\api\transferFunds.api.spec.ts:3:5

# Error details

```
TypeError: apiRequestContext.post: Invalid URL
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('API transfer funds', async ({ request }) => {
> 4  |   const response = await request.post('/parabank/services/bank/transfer', {
     |                                  ^ TypeError: apiRequestContext.post: Invalid URL
  5  |     data: {
  6  |       fromAccountId: 12345,
  7  |       toAccountId: 67890,
  8  |       amount: 100
  9  |     }
  10 |   });
  11 |   expect(response.status()).toBe(200);
  12 |   const body = await response.json();
  13 |   expect(body.message).toContain('Transfer Complete');
  14 | });
  15 | 
```