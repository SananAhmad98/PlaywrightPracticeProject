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

    // New: fetch orders (or a specific order if orderID provided)
    async getOrderAPI(orderID) {

        let response = {};
        response.token = await this.getToken();

        const ordersResponse = await this.apiContext.get("https://rahulshettyacademy.com/api/ecom/order/get-orders",
            {
                headers: {
                    "Authorization": response.token,
                    "Content-Type": "application/json"
                }
            }
        );

        await expect(ordersResponse.ok()).toBeTruthy();

        const ordersJSON = await ordersResponse.json();
        // if caller provided an orderID, try to return that order; otherwise return full payload
        if (orderID) {
            const found = (ordersJSON.orders || []).find(o => (o._id || o).toString().includes(orderID.toString()));
            response.order = found ?? null;
        } else {
            response.orders = ordersJSON.orders ?? ordersJSON;
        }

        return response;
    }

    // New: delete an order by id
    async deleteOrderAPI(orderID) {

        let response = {};
        response.token = await this.getToken();

        // Delete Order API - using a RESTful DELETE endpoint
        const deleteResponse = await this.apiContext.delete(`https://rahulshettyacademy.com/api/ecom/order/delete-order/${orderID}`,
            {
                headers: {
                    "Authorization": response.token,
                    "Content-Type": "application/json"
                }
            }
        );

        await expect(deleteResponse.ok()).toBeTruthy();

        const deleteJSON = await deleteResponse.json();
        response.result = deleteJSON;
        return response;
    }

}

module.exports = {APIUtils};