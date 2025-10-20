class DashboardPage {

    constructor(productName,page) {

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

module.exports = {DashboardPage};