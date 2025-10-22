import { expect, type Locator, type Page } from '@playwright/test';
import { LoginPage } from '../pageobjects_TS/LoginPage';
import { DashboardPage } from '../pageobjects_TS/DashboardPage';
import { CartPage } from '../pageobjects_TS/CartPage';
import { OrderPage } from '../pageobjects_TS/OrderPage';
import { OrderConfirmationPage } from '../pageobjects_TS/OrderConfirmationPage';
import { OrderHistoryPage } from '../pageobjects_TS/OrderHistoryPage';
import { OrderDetailsPage } from '../pageobjects/OrderDetailsPage';

export class BasePage {

    page: Page;
    loginPage: LoginPage;
    dashboardPage:DashboardPage;
    cartPage:CartPage;
    orderPage:OrderPage;
    orderConfirmationPage:OrderConfirmationPage;
    orderHistoryPage:OrderHistoryPage;
    orderDetailsPage:OrderDetailsPage;

    constructor(productName: string, page: Page) {

        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(productName, page);
        this.cartPage = new CartPage(productName, page);
        this.orderPage = new OrderPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.orderDetailsPage = new OrderDetailsPage(page);

    }

    async getLoginPage() {

        return await this.loginPage;

    }

    async getDashboardPage() {

        return await this.dashboardPage;

    }

    async getCartPage() {

        return await this.cartPage;
    }

    async getOrderPage() {

        return await this.orderPage;
    }

    async getOrderConfirmationPage() {


        return await this.orderConfirmationPage;
    }

    async getOrderHistoryPage() {


        return await this.orderHistoryPage;
    }

    async getOrderDetailsPage() {

        return await this.orderDetailsPage;

    }

}