import { test, expect } from '@playwright/test';
test.describe('Pulpit tests', () => {
  test('quick payment with correct data', async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/index.html';
    const userId = 'test1234';
    const userPassword = 'test1234';
    const expectedUsername = 'Jan Demobankowy';
      
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('user-name')).toHaveText(expectedUsername);

    await page.goto('https://demo-bank.vercel.app/pulpit.html');
    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('120');
    await page.locator('#widget_1_transfer_title').fill('Cashback');
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 120,00PLN - Cashback' );
  });

  test('successful mobile top-up', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption('503 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
   
    await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 50,00PLN na numer 503 xxx xxx')
  });
});