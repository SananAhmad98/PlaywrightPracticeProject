const {test,expect} = require('@playwright/test');

test("Hidden element Validation", async({page,browser}) => {

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//await page.goto("https://www.google.com/");

//await page.goBack(); navigate to next page which is google in this case.
//await page.goForward(); navigate to previous page which is automation practice in this case.

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();

});


test("alert/pop-up handling", async({page,browser}) => {

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//This will accept the dialog whenever it appears in the script just like line 22
page.on("dialog",dialog => dialog.accept()); 
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();

});

test.only("Frames/iFrames handling", async({page,browser}) => {

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

const childFramePage = page.frameLocator("#courses-iframe");
//Following line will only consider the visible element and will ignore the invisible one
childFramePage.locator("li>a[href*='lifetime']:visible").click();
const textCheck = await childFramePage.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1]);

});