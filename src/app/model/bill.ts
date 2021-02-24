export class Bill {
    id: number = 0;
    orderID: number = 0;
    amount: number = 0;
    status: "new" | "paid" = "new";


     constructor(properties?: Bill) {
        if (properties) {
            this.id = properties.id || 0;
            this.orderID = properties.orderID || 0;
            this.amount = properties.amount || 0;
        }
    } 
}

//Bill (id, orderID, amount, status:new|paid)
