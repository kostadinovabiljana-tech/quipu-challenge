# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\transferFunds.spec.ts >> Transfer with insufficient funds
- Location: tests\ui\transferFunds.spec.ts:30:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h1.title').filter({ hasText: 'Transfer Complete!' })
Expected substring: "Invalid amount!"
Received string:    "Transfer Complete!"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h1.title').filter({ hasText: 'Transfer Complete!' })
    14 × locator resolved to <h1 class="title">Transfer Complete!</h1>
       - unexpected value "Transfer Complete!"

```

```yaml
- heading "Transfer Complete!" [level=1]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import LoginPage from '../pages/LoginPage.ts';
  3  | import TransferFundsPage from '../pages/TransferFundsPage.ts';
  4  | import accountsData from '../../test-data/accounts.json' with { type: 'json' };
  5  | 
  6  | interface TestAccounts {
  7  |   users: {
  8  |     [key: string]: { username: string; password: string };
  9  |   };
  10 |   accounts: {
  11 |     [key: string]: string;
  12 |   };
  13 | }
  14 | 
  15 | const accounts = accountsData as TestAccounts;
  16 | 
  17 | test('Successful fund transfer', async ({ page }) => {
  18 |   const loginPage = new LoginPage(page);
  19 |   const transferPage = new TransferFundsPage(page);
  20 | 
  21 |   await loginPage.goto();
  22 |   await loginPage.login(accounts.users['Technical Challenge'].username, accounts.users['Technical Challenge'].password);
  23 | 
  24 |   await transferPage.navigate();
  25 |   await transferPage.transferFunds(accounts.accounts.primary, accounts.accounts.secondary, '100');
  26 | 
  27 |   await expect(transferPage.getSuccessMessage()).toContainText('Transfer Complete!');
  28 | });
  29 | 
  30 | test('Transfer with insufficient funds', async ({ page }) => {
  31 |   const loginPage = new LoginPage(page);
  32 |   const transferPage = new TransferFundsPage(page);
  33 | 
  34 |   await loginPage.goto();
  35 |   await loginPage.login(accounts.users['Technical Challenge'].username, accounts.users['Technical Challenge'].password);
  36 | 
  37 |   await transferPage.navigate();
  38 |   await transferPage.transferFunds(accounts.accounts.lowBalance, accounts.accounts.secondary, '999999');
  39 | 
> 40 |   await expect(transferPage.getSuccessMessage()).toContainText('Invalid amount!');
     |                                                  ^ Error: expect(locator).toContainText(expected) failed
  41 | });
  42 | 
  43 | test('Transfer with invalid amount', async ({ page }) => {
  44 |   const loginPage = new LoginPage(page);
  45 |   const transferPage = new TransferFundsPage(page);
  46 | 
  47 |   await loginPage.goto();
  48 |   await loginPage.login(accounts.users['Technical Challenge'].username, accounts.users['Technical Challenge'].password);
  49 | 
  50 |   await transferPage.navigate();
  51 |   await transferPage.transferFunds(accounts.accounts.primary, accounts.accounts.secondary, '-50');
  52 | 
  53 |   await expect(transferPage.getSuccessMessage()).toContainText('Invalid amount!');
  54 | });
  55 | 
```