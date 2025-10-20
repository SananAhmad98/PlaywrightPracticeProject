const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const {OrderPage} = require('../pageobjects/OrderPage');
const {OrderConfirmationPage} = require("../pageobjects/OrderConfirmationPage");
const {OrderHistoryPage} = require("../pageobjects/OrderHistoryPage");
const {OrderDetailsPage} = require("../pageobjects/OrderDetailsPage");

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

//Page objects
const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(productName,page);
const cartPage = new CartPage(productName,page);
const orderPage = new OrderPage(page);
const orderConfirmationPage = new OrderConfirmationPage(page);
const orderHistoryPage = new OrderHistoryPage(page);
const orderDetails = new OrderDetailsPage(page);

//Go to login Page
await loginPage.landOnLoginPage("https://rahulshettyacademy.com/client/");
await loginPage.validLogin(email,password);

//Dashboard/products page actions
await dashboardPage.selectDesiredProduct();
await dashboardPage.navigateToAddToCart();

//Cart page actions
//we are waiting here because there is no automatic waiting mechanism for isVisible().
await cartPage.waitForCartItems(); 
const isProductAvailableInCart = await cartPage.isActualProductAvailableInCart();
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
await orderHistoryPage.validateOrderInOrderHistory(orderID);

//order details page actions
expect (await orderDetails.validateOrderDetails()).toHaveText("Thank you for Shopping With Us");

});