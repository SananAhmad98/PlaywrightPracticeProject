const {test,expect} = require('@playwright/test');

test("Smart Locators in Playwright", async ({page}) => {


    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    
    //Even though its a label, but playwright will smartly select the checkbox. More suitable for checboxes, radio buttons, dropdowns.
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");

    //getByPlacholder
    await page.getByPlaceholder("Password").fill("webdir123R");

    //getByRole for button
    await page.getByRole("button",{name:"Submit"}).click();

    //getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //getByRole for link
    await page.getByRole("link",{name:"Shop"}).click();

    //filtering and chaining methods
    await page.locator("app-card").filter({hasText: "Samsung Note 8"}).getByRole("button",{name: "Add "}).click();

});