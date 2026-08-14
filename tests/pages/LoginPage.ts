import { Page } from '@playwright/test';

class LoginPage {
  readonly page: Page;
  readonly usernameInput = 'input[name="username"]';
  readonly passwordInput = 'input[name="password"]';
  readonly loginButton = 'input[value="Log In"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://parabank.parasoft.com');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username); 
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}

export default LoginPage;
