const {test,expect} = require('@playwright/test');

test("E2E Testcase to dynamically Adidas original", async({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();

//login page locators
const userName = page.locator('#userEmail');
const userPass = page.locator('#userPassword');
const loginBtn = page.locator('#login');

//Dashboard/products page locators
const expectedProductName = page.locator("//div[@class='card-body']//h5/b[contains(text(),'ADIDAS ORIGINAL')]").textContent();
const expectedProductPrice = page.locator("//b[contains(text(),'ADIDAS ORIGINAL')]//..//..//div//div").textContent();
const productAddToCartBtn = page.locator("//b[contains(text(),'ADIDAS ORIGINAL')]//..//..//button[2]");
const cartLink = page.locator("button[routerlink *= 'cart']");

//Cart page locators
const actualProductName = page.locator("h3:has-text('ADIDAS ORIGINAL')"); // new playwright feature
const checkOutBtn = page.locator("//button[contains(text(),'Checkout')]");

//Order page locators
cvvField = page.locator("//div[@class='payment__cc']//div[2]//input[1]");
nameOnCardField = page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]");
applyCouponField = page.locator("//input[@name='coupon']");
applyCouponBtn = page.locator("//button[contains(text(),'Apply Coupon')]");
couponApplied = page.locator("//p[contains(text(),'* Coupon Applied')]");


//login page actions
await page.goto("https://rahulshettyacademy.com/client/");
await userName.fill("sananahmad98@gmail.com");
await userPass.fill("webdir123R");
await loginBtn.click();

//Dashboard/products page actions
await productAddToCartBtn.click();
//await page.pause();
await cartLink.click();

//Cart page actions
//we are waiting here because there is no automatic waiting mechanism for isVisible().
await page.locator("div li").first().waitFor(); 
const isProductAvailableInCart = await actualProductName.isVisible();
expect(isProductAvailableInCart).toBeTruthy();
await checkOutBtn.click();

//Order page actions
await cvvField.fill("123");
await nameOnCardField.fill("SANAN AHMAD");
await applyCouponField.fill("rahulshettyacademy");
await applyCouponBtn.click();
await page.locator("p[class='mt-1 ng-star-inserted']").waitFor();
//await expect(couponApplied.textContent().contains("coupon applied"))

});