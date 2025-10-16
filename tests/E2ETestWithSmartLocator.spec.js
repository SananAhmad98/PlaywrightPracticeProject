const {test,expect} = require('@playwright/test');

test("E2E Testcase using smart locators", async({browser}) => {

const context = await browser.newContext();
const page = await context.newPage();

//login page locators
const email = "sananahmad98@gmail.com";
const loginBtn = page.locator('.login-btn');

//login page actions
await page.goto("https://rahulshettyacademy.com/client/");
await page.getByPlaceholder("email@example.com").fill("sananahmad98@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("webdir123R");
await page.getByRole("button",{name:"Login"}).click();

//Dashboard/products page actions
await page.locator(".card-body").filter({hasText: "iphone 13 pro"}).getByRole("button",{name:"Add to Cart"}).click();
await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

//Cart page actions
//we are waiting here because there is no automatic waiting mechanism for isVisible().
await page.locator("div li").first().waitFor(); 
await expect(page.getByText("iphone 13 pro")).toBeVisible();
await page.getByRole("button",{name: "Checkout"}).click();

//Order page actions

//handling dynamic dropdown
//it will press each key unlike fill() and will have a delay of 150 ms between each key.
await page.getByPlaceholder("Select Country").pressSequentially("Ind",{delay:100});
await await page.getByRole("button",{name: "India"}).nth(1).click();

await page.getByText("PLACE ORDER").click();

//Thanks Page actions
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

//await page.pause();

});