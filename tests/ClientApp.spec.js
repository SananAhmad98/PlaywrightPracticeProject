const {test,expect} = require('@playwright/test');

test("Rahul shetty client URL Test", async ({page}) => {

    const userName = page.locator('#userEmail');
    const userPass = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const cardTitles = page.locator(".card-body b");

    await page.goto("https://rahulshettyacademy.com/client/");
    await userName.fill("sananahmad98@gmail.com");
    await userPass.fill("webdir123R");
    await loginBtn.click();
    //It will wait until all requests under network tab are completed and page is loaded. However, it can be flaky.
    //await page.waitForLoadState('networkidle');
    //Second Method: It will only work for single element
    await cardTitles.last().waitFor(); 
    console.log(await cardTitles.allTextContents());

});