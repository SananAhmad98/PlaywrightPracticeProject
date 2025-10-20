class OrderPage{

constructor()
{

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



}

module.exports = {OrderPage};