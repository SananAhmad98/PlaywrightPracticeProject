const {test,expect} = require('@playwright/test');


test("Static dropdown Test", async ({page,browser}) =>{

    //main page locators
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const RB = page.locator('.radiotextsty')
    const termsCB = page.locator('#terms');
    const freeAccessLink = page.locator("[href*='documents-request']");
    const okBtn = page.locator('#okayBtn');

    //Static dropdown
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropdown.selectOption("consult");
    //await page.pause();
    
    //Radio buttons
    await RB.last().click();
    await okBtn.click();
    //await page.pause();

    console.log(await RB.last().isChecked())
    await expect(RB.last()).toBeChecked();

    //Checkboxes
    await termsCB.check();
    await expect(termsCB).toBeChecked();
    await termsCB.uncheck();
    expect(await termsCB.isChecked()).toBeFalsy()

    //Blinking link
    await expect(freeAccessLink).toHaveAttribute("class","blinkingText");
});

test.only("Child Windows and Tabs test", async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //main page locators
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const RB = page.locator('.radiotextsty')
    const termsCB = page.locator('#terms');
    const freeAccessLink = page.locator("[href*='documents-request']");
    const okBtn = page.locator('#okayBtn');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Following line helps us to make sure that both steps execute asynchronously and then we would be able to work on a new tab.
    //newPage is wrapped up in brackets as action can open/return multiple tabs.
    const [newPage]  = await Promise.all([context.waitForEvent("page"),freeAccessLink.click()]);
    const textOfRedPara = await newPage.locator(".red").textContent();

    const mainTextRedParaArray = textOfRedPara.split("@");
    const domainName = mainTextRedParaArray[1].split(" ")[0];
    console.log(domainName);

    await userName.fill(domainName);
    await page.pause();
    console.log (await userName.textContent());

});

