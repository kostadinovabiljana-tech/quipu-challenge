import { Page } from '@playwright/test';

class TransferFundsPage {
  readonly page: Page;
  readonly fromAccountSelect = '#fromAccountId';
  readonly toAccountSelect = '#toAccountId';
  readonly amountInput = '#amount';
  readonly transferButton = 'input[value="Transfer"]';
  readonly successMessage = 'h1.title';
  readonly errorMessage = 'p.error';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.click('text=Transfer Funds');
  }

  async transferFunds(fromAccount: string, toAccount: string, amount: string) {
    await this.page.waitForFunction(() => {
      const fromSelect = document.querySelector('#fromAccountId');
      const toSelect = document.querySelector('#toAccountId');
      return !!fromSelect && !!toSelect && fromSelect.options.length > 0 && toSelect.options.length > 0;
    });
    await this.page.selectOption(this.fromAccountSelect, fromAccount);
    await this.page.selectOption(this.toAccountSelect, toAccount);
    await this.page.fill(this.amountInput, amount);
    await this.page.click(this.transferButton);
  }

  getSuccessMessage() {
    return this.page.locator(this.successMessage).filter({ hasText: 'Transfer Complete!' });
  }

  getErrorMessage() {
    return this.page.locator(this.errorMessage).filter({ hasText: /Invalid amount|Insufficient funds|Please enter a valid amount|The amount cannot be empty/ });
  }
}

export default TransferFundsPage;
