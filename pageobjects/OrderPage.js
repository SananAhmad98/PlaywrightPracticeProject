class OrderPage{

constructor(page)
{

    this.page = page;
    this.cvvField = page.locator("//div[@class='payment__cc']//div[2]//input[1]");
    this.nameOnCardField = page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]");
    this.applyCouponField = page.locator("//input[@name='coupon']");
    this.applyCouponBtn = page.locator("//button[contains(text(),'Apply Coupon')]");
    this.couponApplied = page.locator("//p[contains(text(),'* Coupon Applied')]");
    this.countryInput = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.placeOrderBtn = page.locator("//a[text() = 'Place Order ']");
    this.loginEmail = page.locator(".user__name  [type='text']").first();

}

async provideCardInformation(cvv,nameOnCard){

await this.cvvField.fill(cvv);
await this.nameOnCardField.fill(nameOnCard);

}

async selectCountry(countryName){

//it will press each key unlike fill() and will have a delay of 150 ms between each key.    
await this.countryInput.pressSequentially(countryName,{delay:100}) 
await this.dropdown.waitFor();
const optionsCount = await this.dropdown.locator("button").count();
for(let i=0; i < optionsCount; ++i){

    const text =  await this.dropdown.locator("button").nth(i).textContent()
    if(text === " India"){

        await this.dropdown.locator("button").nth(i).click();
        break;

    }
}
}

async applyAndValidateCoupon(counponValue){

await this.applyCouponField.fill(counponValue);
await this.applyCouponBtn.click();
await this.page.locator("p[class='mt-1 ng-star-inserted']").waitFor();
return await this.couponApplied; 

}

async validateLoginEmailOnOrderPage(){


    return await this.loginEmail;
}

async placeOrder(){


    await this.placeOrderBtn.click();
}

}

module.exports = {OrderPage};