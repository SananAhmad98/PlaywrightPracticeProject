class CartPage
{

constructor(productName)
{

 this.cartItems = page.locator("div li");
 this.actualProductName = page.locator("h3:has-text("+productName+")");
 this.checkOutBtn = page.locator("//button[contains(text(),'Checkout')]");
}

async getcartItems(){


    return await this.cartItems;

}

async isActualProductAvailableInCart(){

    return await this.actualProductName;

}

async clickCheckOutButton(){


    this.checkOutBtn.click();
}

}

module.exports = {CartPage};