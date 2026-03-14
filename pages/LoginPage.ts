import { Locator, Page } from "playwright-core";

export class LoginPage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.locator("#user_login");
    this.passwordInput = page.locator("#user_pass");
    this.loginButton = page.locator("#wp-submit");
  }
  async navigate() {
    await this.page.goto("http://localhost:8080/wp-login.php");
  }

  async login(user: string, pass: string) {
    await this.userNameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}
