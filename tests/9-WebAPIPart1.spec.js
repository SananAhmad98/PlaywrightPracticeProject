const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayload = { userEmail: "sananahmad98@gmail.com", userPassword: "webdir123R" };
const orderPayload = { orders: [{ country: "Pakistan", productOrderedId: "68a961959320a140fe1ca57e" }] };
let response;

//It will run before all the test methods in this spec
test.beforeAll("Login and create Order API test methods", async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrderAPI(orderPayload);

});

test("E2E Testcase to select Adidas original dynamically using API & UI", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Value of tokenValue parameter is passed as a second parameter of the functions which is actual token.
    await page.addInitScript((tokenValue) => {

        window.localStorage.setItem("token", tokenValue);

    }, response.token);

    //Hitting main URL but login page will be skipped and further execution will be started
    await page.goto("https://rahulshettyacademy.com/client/");

    //login page
    const email = "sananahmad98@gmail.com";

    //thanks page locators
    const orderHistoryPageLink = page.locator("button[routerlink*='myorders']");

    //order history page locators
    const orderTable = page.locator("table.table");
    const orderRows = page.locator("tbody tr");

    //Thanks page actions, order is created using API call
    await orderHistoryPageLink.click();

    //order history page actions
    await orderTable.waitFor();
    const orderCount = await orderRows.count();
    for (let order = 0; order < orderCount; ++order) {

        const orderIDText = await orderRows.nth(order).locator("th").textContent();
        console.log(orderIDText);
        if (response.orderID.includes(orderIDText)) {

            await orderRows.nth(order).locator("button.btn-primary").click();
            break;

        }
    }

    await page.pause();
});