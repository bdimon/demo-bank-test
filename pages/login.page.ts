import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  loginResult = this.page.getByTestId('user-name');

  loginError = this.page.getByTestId('error-login-id');
  
  passwordError = this.page.getByTestId('error-login-password');
}
