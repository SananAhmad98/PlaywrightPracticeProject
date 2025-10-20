class OrderDetailsPage
{

constructor(page){

this.orderDetailsThanksMsg = page.locator("p.tagline");


}

async validateOrderDetails(){


    return await this.orderDetailsThanksMsg;

}

}

module.exports = {OrderDetailsPage};