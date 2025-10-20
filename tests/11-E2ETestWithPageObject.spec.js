const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const {OrderPage} = require('../pageobjects/OrderPage');
const {OrderConfirmationPage} = require("../pageobjects/OrderConfirmationPage");

test("E2E Testcase to dynamically Adidas original", async({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();

//login page constants
const email = "sananahmad98@gmail.com";
const password = "webdir123R";
//dashboard page constants
const productName = "ADIDAS ORIGINAL";
//Order page constants
const cvv = "1234";
const nameOnCard = "SANAN AHMAD";
const couponValue = "rahulshettyacademy";
const countryName = "Ind";

const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(productName);
const cartPage = new CartPage(productName);
const orderPage = new OrderPage(page);
const orderConfirmationPage = new OrderConfirmationPage(page);

//order history page locators
const orderTable = page.locator("table.table");
const orderRows = page.locator("tbody tr");

//order details page locators
const orderDetailsThanksMsg = page.locator("p.tagline");

//Go to login Page
await loginPage.landOnLoginPage("https://rahulshettyacademy.com/client/");
await loginPage.validLogin(email,password);

//Dashboard/products page actions
await dashboardPage.selectDesiredProduct();
await dashboardPage.navigateToAddToCart();

//Cart page actions
//we are waiting here because there is no automatic waiting mechanism for isVisible().
await cartPage.waitForCartItems(); 
const isProductAvailableInCart = await cartPage.isActualProductAvailableInCart().isVisible();
await expect(isProductAvailableInCart).toBeTruthy();
await cartPage.clickCheckOutButton();

//Order page actions
await orderPage.provideCardInformation(cvv,nameOnCard);
const appliedCoupon = await orderPage.applyAndValidateCoupon(couponValue);
await expect(appliedCoupon).toHaveText("* Coupon Applied");

//handling dynamic dropdown
await orderPage.selectCountry(countryName);
const orderEmail = await orderPage.validateLoginEmailOnOrderPage();
await expect(orderEmail).toHaveText(email)
await orderPage.placeOrder();

//Thanks Page actions
expect(await orderConfirmationPage.validateOrderConfirmation()).toHaveText(" Thankyou for the order. ");
const orderID = await orderConfirmationPage.getOrderID();
await orderConfirmationPage.navigateToOrderHistoryPage();

//order history page actions
await orderTable.waitFor();
const orderCount = await orderRows.count();
for(let order = 0; order < orderCount; ++order){

    const orderIDText = await orderRows.nth(order).locator("th").textContent();
    console.log(orderIDText);
    if(orderID.includes(orderIDText)){

        await orderRows.nth(order).locator("button.btn-primary").click();
        break;

    }
}

//order details page actions
expect (orderDetailsThanksMsg).toHaveText("Thank you for Shopping With Us");
await page.pause();

});