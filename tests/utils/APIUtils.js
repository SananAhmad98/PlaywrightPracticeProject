const {expect} = require("@playwright/test");

class APIUtils {

    constructor(apiContext,loginPayload){

        this.apiContext = apiContext;
        this.loginPayload = loginPayload;

    }

    async getToken() {


        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayload });
        await expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJSON = await loginResponse.json();
        const actualToken = loginResponseJSON.token; //It is being utilized in actual E2E test
        return actualToken;

    }

    async createOrderAPI(orderPayload){

        let response = {};
        response.token = await this.getToken();

        //Create Order API
            const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        
                {
                    data: orderPayload,
                    headers: {
        
                        "Authorization": response.token,
                        "Content-Type": "application/json"
                    }
        
                });
        
            const orderResponseJSON = await orderResponse.json();
            const orderID = orderResponseJSON.orders[0];
            response.orderID = orderID;
            return response;

    }

}

module.exports = {APIUtils};