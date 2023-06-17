import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side.menu.component';

export class PulpitPage {
    constructor(private page: Page) {}
    // paymentButton = this.page.getByRole('link', { name: 'płatności' });
    sideMenu = new SideMenuComponent(this.page);

    transferId = this.page.locator('#widget_1_transfer_receiver');
    transferAmount =this.page.locator('#widget_1_transfer_amount');
    transferTitle = this.page.locator('#widget_1_transfer_title');

    transferButton = this.page.locator('#execute_btn');
    actionClose = this.page.getByTestId('close-button');

    messageTransfer = this.page.locator('#show_messages');

    topUpReceiver = this.page.locator('#widget_1_topup_receiver');
    topUpAmount = this.page.locator('#widget_1_topup_amount');
    topUpAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');
    topUpTitle = this.page.getByRole('button', { name: 'doładuj telefon' });
    actionEnd = this.page.getByTestId('close-button');

    topUpResult = this.page.locator('#money_value')





}
