export class Product {
    id: number = 0;
    catID: number = 0;
    name: string = '';
    type: string = '';
    description: string = '';
    price: number = 0;
    featured: boolean = false;
    active: boolean = true;
    image?: string = '';

    constructor(properties?: Product) {
        if (properties) {
          this.id = properties.id || 0;
          this.catID = properties.catID || 0;
          this.name = properties.name || '';
          this.type = properties.type || '';
          this.description = properties.description || '';
          this.price = properties.price || 0;
          this.featured = properties.featured || false;
          this.active = properties.active || false;
          this.image = properties.image || '';
        }
      }
    
}

//Product (id, name, type, catID, description, price, featured, active)