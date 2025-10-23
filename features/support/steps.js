const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


//By default cucumber will 5 sec for each chunk, if your piece of code takes more time than that, it will fail. Hence, increase timeout.

Given('a login to e-commerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    //Go to login Page
    const loginPage = await this.basePage.getLoginPage();
    await loginPage.landOnLoginPage("https://rahulshettyacademy.com/client/");
    await loginPage.validLogin(username, password);
});

When('Add product to cart', async function () {
    // Write code here that turns the phrase above into concrete actions
    const dashboardPage = await this.basePage.getDashboardPage();
    await dashboardPage.selectDesiredProduct();
    await dashboardPage.navigateToAddToCart();
});

Then('Verify product is displayed in the cart', async function () {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = await this.basePage.getCartPage();
    await cartPage.waitForCartItems();
    const isProductAvailableInCart = await cartPage.isActualProductAvailableInCart();
    await expect(isProductAvailableInCart).toBeTruthy();
    await cartPage.clickCheckOutButton();
});

When('Enter valid details such as {string}, {string}, {string}, {string}, and then place the Order', async function (cvv, nameOnCard, couponValue, countryName) {
    // Write code here that turns the phrase above into concrete actions
    this.orderPage = await this.basePage.getOrderPage();
    await this.orderPage.provideCardInformation(cvv, nameOnCard);
    const appliedCoupon = await this.orderPage.applyAndValidateCoupon(couponValue);
    await expect(appliedCoupon).toHaveText("* Coupon Applied");

    await this.orderPage.selectCountry(countryName);
    await this.orderPage.placeOrder();
});

Then('Verify if order is present in Order History', async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderConfirmationPage = await this.basePage.getOrderConfirmationPage();
    await expect(await orderConfirmationPage.validateOrderConfirmation()).toHaveText(" Thankyou for the order. ");
    const orderID = await orderConfirmationPage.getOrderID();
    await orderConfirmationPage.navigateToOrderHistoryPage();

    //order history page actions
    const orderHistoryPage = await this.basePage.getOrderHistoryPage();
    await orderHistoryPage.validateOrderInOrderHistory(orderID);
});

Given('a login to e-commerce application-2 with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const userName = this.page.locator('#username');
    const pswd = this.page.locator("[type='password']");
    const signInBtn = this.page.locator('#signInBtn');

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill(username);
    await pswd.fill(password);
    await signInBtn.click();
});

Then('Verify error message is diplayed', async function () {
    
    console.log(await this.page.locator('[style*=none]').textContent());
    await expect(this.page.locator('[style*=none]')).toContainText("Incorrect");

});

Given('a login to e-commerce application-3 with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const userName = this.page.locator('#username');
    const pswd = this.page.locator("[type='password']");
    const signInBtn = this.page.locator('#signInBtn');

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill(username);
    await pswd.fill(password);
    await signInBtn.click();
});

Then('Verify all crendentials are incorrect', async function () {
    
    console.log(await this.page.locator('[style*=none]').textContent());
    await expect(this.page.locator('[style*=none]')).toContainText("Incorrect");

});