import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Tests for login', () => {

  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto('/');
  });

  test('login with correct credentials', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUsername = 'Jan Demobankowy';

    // await page.getByTestId('login-input').fill(userId);
    // await page.getByTestId('password-input').fill(userPassword);
    // await page.getByTestId('login-button').click();
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);
  });

  test('unsuccessful login with too short username', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(loginData.incorrectUserId);
    await loginPage.passwordInput.fill(loginData.userPassword);

    // await page.getByTestId('login-input').fill('tester');
    // await page.getByTestId('password-input').click();

    await expect(loginPage.loginError).toHaveText(
      'identyfikator ma min. 8 znaków'
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {


    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(loginData.userId);
    await loginPage.passwordInput.fill(loginData.incorrectUserPassword);
    await loginPage.passwordInput.blur();
    await expect(loginPage.passwordError).toHaveText(
      'hasło ma min. 8 znaków'


    // await page.getByTestId('login-input').fill('testerLO');
    // await page.getByTestId('password-input').fill(incorrectUserPassword);
    // await page.getByTestId('password-input');

    
    );
  });
});
