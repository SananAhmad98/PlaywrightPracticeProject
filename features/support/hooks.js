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

After(function () {
  // Assuming this.driver is a selenium webdriver
 console.log("Hey, Im last")
});


AfterStep(async function({result}) {

if(result.status === Status.FAILED){


    await this.page.screenshot({path: 'screenshot1.png'});

}
})