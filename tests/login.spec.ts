import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Tests for login', () => {
let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('login with correct credentials', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUsername = 'Jan Demobankowy';

    // const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await expect(loginPage.loginResult).toHaveText(expectedUsername);

  });

  test('unsuccessful login with too short username', async ({ page }) => {

    // const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(loginData.incorrectUserId);
    await loginPage.passwordInput.fill(loginData.userPassword);

    await expect(loginPage.loginError).toHaveText(
      'identyfikator ma min. 8 znaków'
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {


    // const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(loginData.userId);
    await loginPage.passwordInput.fill(loginData.incorrectUserPassword);
    await loginPage.passwordInput.blur();
    await expect(loginPage.passwordError).toHaveText(
      'hasło ma min. 8 znaków'

    );
  });
});
