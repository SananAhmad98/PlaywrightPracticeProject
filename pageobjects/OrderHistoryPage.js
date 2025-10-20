class OrderHistoryPage {


    constructor(page) {

        this.page = page;
        this.orderTable = page.locator("table.table");
        this.orderRows = page.locator("tbody tr");

    }

    async validateOrderInOrderHistory(orderID) {

        await this.orderTable.waitFor();
        const orderCount = await this.orderRows.count();
        for (let order = 0; order < orderCount; ++order) {

            const orderIDText = await this.orderRows.nth(order).locator("th").textContent();
            if (orderID.includes(orderIDText)) {

                await this.orderRows.nth(order).locator("button.btn-primary").click();
                break;

            }
        }

    }
}

module.exports = { OrderHistoryPage };