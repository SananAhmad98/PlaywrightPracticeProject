import { expect, type Locator, type Page } from '@playwright/test';

export class OrderConfirmationPage
{

    page:Page;
    thanksMsg:Locator;
    orderHistoryPageLink:Locator;

constructor(page:Page)
{

    this.page = page;
    this.thanksMsg = page.locator(".hero-primary");
    this.orderHistoryPageLink = page.locator("button[routerlink*='myorders']");

}

async validateOrderConfirmation(){

    return await this.thanksMsg;

}

async getOrderID(){

return await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();

}

async navigateToOrderHistoryPage(){


    await this.orderHistoryPageLink.click();
}

}