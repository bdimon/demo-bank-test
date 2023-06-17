import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
test.describe('Pulpit tests', () => {

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUsername = 'Jan Demobankowy';

    await page.goto('/');
    // await page.getByTestId('login-input').fill(loginData.userId);
    // await page.getByTestId('password-input').fill(loginData.userPassword);
    // await page.getByTestId('login-button').click();
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);

  });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    
    const receiverId = '2';
    const transferAmount = '120';
    const transferTitle = 'Cashback';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);
    // const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    
    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    // await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
    await expect(page.locator('#money_value')).toHaveText(`${expectedBalance}`);
  });
});
