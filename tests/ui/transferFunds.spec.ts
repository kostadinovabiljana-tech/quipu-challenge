import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.ts';
import TransferFundsPage from '../pages/TransferFundsPage.ts';
import accountsData from '../../test-data/accounts.json' with { type: 'json' };

interface TestAccounts {
  users: {
    [key: string]: { username: string; password: string };
  };
  accounts: {
    [key: string]: string;
  };
}

const accounts = accountsData as TestAccounts;

test('Successful fund transfer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transferPage = new TransferFundsPage(page);

  await loginPage.goto();
  await loginPage.login(accounts.users['Technical Challenge'].username, accounts.users['Technical Challenge'].password);

  await transferPage.navigate();
  await transferPage.transferFunds(accounts.accounts.primary, accounts.accounts.secondary, '100');

  await expect(transferPage.getSuccessMessage()).toContainText('Transfer Complete!');
});

test('Transfer with insufficient funds', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transferPage = new TransferFundsPage(page);

  await loginPage.goto();
  await loginPage.login(accounts.users['Technical Challenge'].username, accounts.users['Technical Challenge'].password);

  await transferPage.navigate();
  await transferPage.transferFunds(accounts.accounts.lowBalance, accounts.accounts.secondary, '999999');

  await expect(transferPage.getErrorMessage()).toContainText('Insufficient funds');
});

test('Transfer with invalid amount', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const transferPage = new TransferFundsPage(page);

  await loginPage.goto();
  await loginPage.login(accounts.users['Technical Challenge'].username, accounts.users['Technical Challenge'].password);

  await transferPage.navigate();
  await transferPage.transferFunds(accounts.accounts.primary, accounts.accounts.secondary, '-50');

  await expect(transferPage.getErrorMessage()).toContainText('Invalid amount');
});
