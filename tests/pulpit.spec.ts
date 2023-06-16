import { test, expect } from '@playwright/test';
test.describe('Pulpit tests', () => {
  test.only('quick payment with correct data', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/index.html';
    const userId = 'test1234';
    const userPassword = 'test1234';
    const expectedUsername = 'Jan Demobankowy';

    const receiverId = '2';
    const transferAmount = '120';
    const transferTitle = 'Cashback';
    const expectedTransferReceiver = 'Chuck Demobankowy BUG';

    // Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);

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
     const url = 'https://demo-bank.vercel.app/';
     const userId = 'testerLO';
     const userPassword = '10987654';
 
     const topUpReceiver = '500 xxx xxx';
     const topUpAmount = '50';
     const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;
 
     // Act
     await page.goto(url);
     await page.getByTestId('login-input').fill(userId);
     await page.getByTestId('password-input').fill(userPassword);
     await page.getByTestId('login-button').click();
 
     await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiver);
     await page.locator('#widget_1_topup_amount').fill(topUpAmount);
     await page.locator('#uniform-widget_1_topup_agreement span').click();
     await page.getByRole('button', { name: 'doładuj telefon' }).click();
     await page.getByTestId('close-button').click();
 
     // Assert
     await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
