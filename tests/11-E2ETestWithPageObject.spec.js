const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');

test("E2E Testcase to dynamically Adidas original", async({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();

//login page constants
const email = "sananahmad98@gmail.com";
const password = "webdir123R";

//dashboard page constants
const productName = "ADIDAS ORIGINAL";

const loginPage = new LoginPage(page);
const dashboardPage = new DashboardPage(productName);
const cartPage = new CartPage(productName);

//Dashboard/products page locators
const expectedProductName = page.locator("//div[@class='card-body']//h5/b[contains(text(),'ADIDAS ORIGINAL')]").textContent();
const expectedProductPrice = page.locator("//b[contains(text(),'ADIDAS ORIGINAL')]//..//..//div//div").textContent();
const productAddToCartBtn = page.locator("//b[contains(text(),'ADIDAS ORIGINAL')]//..//..//button[2]");
const cartLink = page.locator("button[routerlink *= 'cart']");

//Cart page locators
const actualProductName = page.locator("h3:has-text('ADIDAS ORIGINAL')"); // new playwright feature
const checkOutBtn = page.locator("//button[contains(text(),'Checkout')]");

//Order page locators
const cvvField = page.locator("//div[@class='payment__cc']//div[2]//input[1]");
const nameOnCardField = page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]");
const applyCouponField = page.locator("//input[@name='coupon']");
const applyCouponBtn = page.locator("//button[contains(text(),'Apply Coupon')]");
const couponApplied = page.locator("//p[contains(text(),'* Coupon Applied')]");
const countryInput = page.locator("[placeholder*='Country']");
const dropdown = page.locator(".ta-results");
const placeOrderBtn = page.locator("//a[text() = 'Place Order ']");
const loginEmail = page.locator(".user__name  [type='text']").first();

//thanks page locators
const thanksMsg = page.locator(".hero-primary");
const orderHistoryPageLink = page.locator("button[routerlink*='myorders']");

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
await cartPage.getcartItems().first().waitFor(); 
const isProductAvailableInCart = await cartPage.isActualProductAvailableInCart().isVisible();
expect(isProductAvailableInCart).toBeTruthy();
await cartPage.clickCheckOutButton();

//Order page actions
await cvvField.fill("123");
await nameOnCardField.fill("SANAN AHMAD");
await applyCouponField.fill("rahulshettyacademy");
await applyCouponBtn.click();
await page.locator("p[class='mt-1 ng-star-inserted']").waitFor();
expect(couponApplied).toHaveText("* Coupon Applied");

//handling dynamic dropdown
await countryInput.pressSequentially("Ind",{delay:100}) //it will press each key unlike fill() and will have a delay of 150 ms between each key.
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for(let i=0; i < optionsCount; ++i){

    const text =  await dropdown.locator("button").nth(i).textContent()
    if(text === " India"){

        await dropdown.locator("button").nth(i).click();
        break;

    }
}

expect(loginEmail).toHaveText(email)
await placeOrderBtn.click();

//Thanks Page actions
expect(thanksMsg).toHaveText(" Thankyou for the order. ");
const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
await orderHistoryPageLink.click();

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