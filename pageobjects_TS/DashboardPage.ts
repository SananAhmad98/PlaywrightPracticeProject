import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {

    page:Page;
    productAddToCartBtn:Locator;
    cartLink:Locator;

    constructor(productName:string,page:Page) {

        this.page = page;
        this.productAddToCartBtn = page.locator("//b[contains(text(), '"+ productName + "')]//..//..//button[2]");
        this.cartLink = page.locator("button[routerlink *= 'cart']");

    }


    async selectDesiredProduct() {

        await this.productAddToCartBtn.click();

    }

    async navigateToAddToCart() {


        await this.cartLink.click();
    }


}