import { expect, type Locator, type Page } from '@playwright/test';

export class OrderDetailsPage {

    page: Page;
    orderDetailsThanksMsg: Locator;

    constructor(page: Page) {

        this.page = page;
        this.orderDetailsThanksMsg = page.locator("p.tagline");


    }

    async validateOrderDetails() {


        return await this.orderDetailsThanksMsg;

    }

}
