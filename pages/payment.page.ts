import { Page } from '@playwright/test';

export class PaymentPage {
    constructor(private page: Page) {}
  
    paymentReceiver = this.page.getByTestId('transfer_receiver');
    paymentAddress = this.page.getByTestId('form_account_to');
    paymentAmount = this.page.getByTestId('form_amount');
    paymentProcess = this.page.getByRole('button', { name: 'wykonaj przelew' });
    paymentEnd = this.page.getByTestId('close-button');

  }