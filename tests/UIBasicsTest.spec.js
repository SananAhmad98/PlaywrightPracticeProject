const {test,expect} = require('@playwright/test');

//This test keyword comes from the package we imported at the start.
//This browser parameter is actually a playwright fixture.
test('Fresh browser context Test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signInBtn.click();
    console.log(await page.locator('[style*=none]').textContent());
    await expect(page.locator('[style*=none]')).toContainText("Incorrect");

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signInBtn.click();
    //console.log(await cardTitles.last().textContent());//Playwright automatically waits for this function.
    //console.log(await cardTitles.nth(0).textContent()); //Playwright automatically waits for this function.
    const cardTitlesText =  await cardTitles.allTextContents(); // playwright does not automatically wait for it
    console.log(cardTitlesText);


});

//This page parameter is actually a playwright fixture as well.
test('page playwright fixture Test', async ({page}) => {

    //This is for fresh browser context and there is no cookies stored in it. Then, we can simply use Page fixture directly.
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://google.com");
});

//Now, only this test method will run out of all the methods in this tests folder.
// test.only('test only feature of playwright test', async ({page}) => {

//     await page.goto("https://playwright.dev/docs/test-projects");
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Projects | Playwright");

// });