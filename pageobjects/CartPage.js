class CartPage {

    constructor(productName, page) {

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

module.exports = { CartPage };