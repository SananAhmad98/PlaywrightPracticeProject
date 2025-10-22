import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {

    page:Page;
    cartItems:Locator;
    actualProductName:Locator;
    checkOutBtn:Locator;

    constructor(productName:string, page:Page) {

        this.page = page;
        this.cartItems = page.locator("div li");
        this.actualProductName = page.locator(`h3:has-text('${productName}')`);
        this.checkOutBtn = page.locator("//button[contains(text(),'Checkout')]");
    }

    async waitForCartItems() {


        await this.cartItems.first().waitFor();

    }

    async isActualProductAvailableInCart() {

        return await this.actualProductName.isVisible();

    }

    async clickCheckOutButton() {


        this.checkOutBtn.click();
    }

}