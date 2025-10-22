import { test as baseTest } from "@playwright/test";

interface testDataForLoginPage {

    email: string;
    password: string;

}

interface testDataForDashboardPage {

    productName: string;

}

interface testDataForOrderPage {

    cvv: string,
    nameOnCard: string,
    couponValue: string,
    countryName: string

}

export const customTest = baseTest.extend<{ testDataForLoginPage: testDataForLoginPage, testDataForDashboardPage: testDataForDashboardPage,testDataForOrderPage:testDataForOrderPage }>(
    {
        testDataForLoginPage:

        {

            email: "sananahmad98@gmail.com",
            password: "webdir123R"

        },
        testDataForDashboardPage:

            { productName: "ADIDAS ORIGINAL" },

        testDataForOrderPage:
        {
            cvv: "1234",
            nameOnCard: "SANAN AHMAD",
            couponValue: "rahulshettyacademy",
            countryName: "Ind"
        }
    }
)
