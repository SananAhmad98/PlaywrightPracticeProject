import { expect, type Locator, type Page } from '@playwright/test';

export class OrderHistoryPage {

    page:Page;
    orderTable:Locator;
    orderRows:Locator;

    constructor(page:Page) {

        this.page = page;
        this.orderTable = page.locator("table.table");
        this.orderRows = page.locator("tbody tr");

    }

    async validateOrderInOrderHistory(orderID:any) {

        await this.orderTable.waitFor();
        const orderCount:number = await this.orderRows.count();
        for (let order = 0; order < orderCount; ++order) {

            let orderIDText:any = await this.orderRows.nth(order).locator("th").textContent();
            if (orderID.includes(orderIDText)) {

                await this.orderRows.nth(order).locator("button.btn-primary").click();
                break;

            }
        }

    }
}