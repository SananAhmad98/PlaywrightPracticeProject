const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "sananahmad98@gmail.com", userPassword: "webdir123R" };
const orderPayload = { orders: [{ country: "Pakistan", productOrderedId: "68a961959320a140fe1ca57e" }] };
let orderID;
let actualToken;

//It will run before all the test methods in this spec
test.beforeAll("@Login and create Order API test methods", async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });
    await expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJSON = await loginResponse.json();
    actualToken = loginResponseJSON.token; //It is being utilized in actual E2E test

    //Create Order API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",

        {
            data: orderPayload,
            headers: {

                "Authorization": actualToken,
                "Content-Type": "application/json"
            }

        });

    const orderResponseJSON = await orderResponse.json();
    orderID = orderResponseJSON.orders[0];
    console.log(orderID);

});

test("E2E Testcase to select Adidas original dynamically using API & UI", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    //Value of tokenValue parameter is passed as a second parameter of the functions which is actual token.
    await page.addInitScript((tokenValue) => {

        window.localStorage.setItem("token", tokenValue);

    }, actualToken);

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
        if (orderID.includes(orderIDText)) {

            await orderRows.nth(order).locator("button.btn-primary").click();
            break;

        }
    }

    await page.pause();
});