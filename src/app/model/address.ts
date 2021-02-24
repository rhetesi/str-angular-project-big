export class Address {
    zip: string = '';
    country: string = '';
    city: string = '';
    street: string = '';
    notes: string = '';

    constructor(properties?: Address) {
        if (properties) {
            this.zip = properties.zip || '';
            this.country = properties.country || '';
            this.city = properties.city || '';
            this.street = properties.street || '';
            this.notes = properties.notes || '';
        }
    }
}

//Address (zip, country, city, street, notes)