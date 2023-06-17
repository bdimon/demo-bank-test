import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side.menu.component';

export class PaymentPage {
    constructor(private page: Page) {}
    // paymentButton = this.page.getByRole('link', { name: 'płatności' });
    sideMenu = new SideMenuComponent(this.page);
    // paymentStart = this.page.getByRole('link', { name: 'płatności' });
    paymentReceiver = this.page.getByTestId('transfer_receiver');
    paymentAddress = this.page.getByTestId('form_account_to');
    paymentAmount = this.page.getByTestId('form_amount');
    paymentProcess = this.page.getByRole('button', { name: 'wykonaj przelew' });
    paymentEnd = this.page.getByTestId('close-button');
    paymentResult = this.page.locator('#show_messages');

  }