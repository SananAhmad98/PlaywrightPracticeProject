const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {CartPage} = require('../pageobjects/CartPage');
const {OrderPage} = require('../pageobjects/OrderPage');
const {OrderConfirmationPage} = require("../pageobjects/OrderConfirmationPage");
const {OrderHistoryPage} = require("../pageobjects/OrderHistoryPage");
const {OrderDetailsPage} = require("../pageobjects/OrderDetailsPage");

class BasePage
{

constructor (productName,page){

this.loginPage = new LoginPage(page);
this.dashboardPage = new DashboardPage(productName,page);
this.cartPage = new CartPage(productName,page);
this.orderPage = new OrderPage(page);
this.orderConfirmationPage = new OrderConfirmationPage(page);
this.orderHistoryPage = new OrderHistoryPage(page);
this.orderDetailsPage = new OrderDetailsPage(page);

}

async getLoginPage(){

    return await this.loginPage;

}

async getDashboardPage(){

    return await this.dashboardPage;

}

async getCartPage(){

    return await this.cartPage;
}

async getOrderPage(){

    return await this.orderPage;
}

async getOrderConfirmationPage(){


    return await this.orderConfirmationPage;
}

async getOrderHistoryPage(){


    return await this.orderHistoryPage;
}

async getOrderDetailsPage(){

    return await this.orderDetailsPage;

}

}

module.exports = {BasePage}