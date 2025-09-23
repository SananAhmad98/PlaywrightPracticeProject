const {test,expect} = require('@playwright/test');

test.only("Static dropdown Test", async ({page,browser}) =>{

    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const RB = page.locator('.radiotextsty')
    const termsCB = page.locator('#terms');
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
});