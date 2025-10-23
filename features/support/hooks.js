const { Before, After, AfterStep,Status } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { BasePage } = require("../../pageobjects/BasePage");
const dashboardPageDataSet = JSON.parse(JSON.stringify(require("../support/dashboardPageTestData.json")));

//Do not utilize arrow functions in this as that will create issue with hooks
Before(async function() { 

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    //Base Page object
    this.basePage = new BasePage(dashboardPageDataSet.productName, this.page); //using this to keep it alive in other sections as well.

});

//{tags: "@Regression and @Smoke"} or can also be used. However, it will run with @Regression scenario only right now.
After({tags:"@Regression"},function () {
 

 console.log("Hey, Im the AFTER HOOK here")

});

//It will run with any scenario having either @regression or @smoke tag
AfterStep({tags: "@Regression or @Smoke"},async function({result}) {

if(result.status === Status.FAILED){


    await this.page.screenshot({path: 'screenshot1.png'});

}
})