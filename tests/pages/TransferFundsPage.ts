import { Page } from '@playwright/test';

class TransferFundsPage {
  readonly page: Page;
  readonly fromAccountSelect = '#fromAccountId';
  readonly toAccountSelect = '#toAccountId';
  readonly amountInput = '#amount';
  readonly transferButton = 'input[value="Transfer"]';
  readonly successMessage = '.title';
  readonly errorMessage = '.error';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.click('text=Transfer Funds');
  }

  async transferFunds(fromAccount: string, toAccount: string, amount: string) {
    await this.page.selectOption(this.fromAccountSelect, fromAccount);
    await this.page.selectOption(this.toAccountSelect, toAccount);
    await this.page.fill(this.amountInput, amount);
    await this.page.click(this.transferButton);
  }

  getSuccessMessage() {
    return this.page.locator(this.successMessage);
  }

  getErrorMessage() {
    return this.page.locator(this.errorMessage);
  }
}

export default TransferFundsPage;
