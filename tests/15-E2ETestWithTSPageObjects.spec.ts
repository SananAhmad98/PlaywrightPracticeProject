import {test,expect} from '@playwright/test';
const {BasePage} = require("../pageobjects/BasePage");

//Data coming from external json files
const loginPageDataSet = JSON.parse(JSON.stringify(require("../testdata/loginPageTestData.json")));
const dashboardPageDataSet = JSON.parse(JSON.stringify(require("../testdata/dashboardPageTestData.json")));
const orderPageDataSet = JSON.parse(JSON.stringify(require("../testdata/orderPageTestData.json")));

//for multiple datasets in dashboardPageTestData.json
for(const dashboardPageData of dashboardPageDataSet){

test(`E2E Testcase to dynamically select ${dashboardPageData.productName}`, async({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();

//Base Page object
const basePage = new BasePage(dashboardPageData.productName,page);

//Go to login Page
const loginPage = await basePage.getLoginPage();
await loginPage.landOnLoginPage("https://rahulshettyacademy.com/client/");
await loginPage.validLogin(loginPageDataSet.email,loginPageDataSet.password);

//Dashboard/products page actions
const dashboardPage = await basePage.getDashboardPage();
await dashboardPage.selectDesiredProduct();
await dashboardPage.navigateToAddToCart();

//Cart page actions
//we are waiting here because there is no automatic waiting mechanism for isVisible().
const cartPage = await basePage.getCartPage();
await cartPage.waitForCartItems(); 
const isProductAvailableInCart = await cartPage.isActualProductAvailableInCart();
await expect(isProductAvailableInCart).toBeTruthy();
await cartPage.clickCheckOutButton();

//Order page actions
const orderPage = await basePage.getOrderPage();
await orderPage.provideCardInformation(orderPageDataSet.cvv,orderPageDataSet.nameOnCard);
const appliedCoupon = await orderPage.applyAndValidateCoupon(orderPageDataSet.couponValue);
await expect(appliedCoupon).toHaveText("* Coupon Applied");

//handling dynamic dropdown
await orderPage.selectCountry(orderPageDataSet.countryName);
const orderEmail = await orderPage.validateLoginEmailOnOrderPage();
await expect(orderEmail).toHaveText(loginPageDataSet.email);
await orderPage.placeOrder();

//Thanks Page actions
const orderConfirmationPage = await basePage.getOrderConfirmationPage();
await expect(await orderConfirmationPage.validateOrderConfirmation()).toHaveText(" Thankyou for the order. ");
const orderID = await orderConfirmationPage.getOrderID();
await orderConfirmationPage.navigateToOrderHistoryPage();

//order history page actions
const orderHistoryPage = await basePage.getOrderHistoryPage();
await orderHistoryPage.validateOrderInOrderHistory(orderID);

//order details page actions
const orderDetailsPage = await basePage.getOrderDetailsPage();
await expect (await orderDetailsPage.validateOrderDetails()).toHaveText("Thank you for Shopping With Us");

});

} //finishing for loop