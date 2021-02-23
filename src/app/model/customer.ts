import { Address } from "../model/address";

export class Customer {
    id: number = 0;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    active: boolean = true;
    address: Address = new Address();

    constructor(properties?: Customer) {
        if (properties) {
            this.id = properties.id || 0;
            this.firstName = properties.firstName || '';
            this.lastName = properties.lastName || '';
            this.email = properties.email || '';
            
        }
    }
}

//Customer (id, firstName, lastName, email, address:Address, active)

