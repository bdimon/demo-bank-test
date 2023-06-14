import { test, expect } from '@playwright/test';
test.describe('Pulpit tests', () => {
    test('quick payment with correct data', async ({ page }) => {

    await page.goto('https://demo-bank.vercel.app/index.html');
    await page.getByTestId('login-input').fill('test1234');
    await page.getByTestId('password-input').fill('test1234');
    await page.getByTestId('login-button').click();

    await page.goto('https://demo-bank.vercel.app/pulpit.html');
    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('120');
    await page.locator('#widget_1_transfer_title').fill('Cashback');
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 120,00PLN - Cashback' );
  });

})