const base = require("@playwright/test");

exports.customTest = base.test.extend(
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