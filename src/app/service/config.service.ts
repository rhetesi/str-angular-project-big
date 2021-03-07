import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http'

export interface ITableCol {
  key: string;
  header: string;
  editable?: boolean;
  visible?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = 'http://localhost:3000';

  customerTableCols: ITableCol[] = [
    { key: 'id', header: 'Customer ID'},
    { key: 'firstName', header: 'First Name'},
    { key: 'lastName', header: 'Last Name'},
    { key: 'email', header: 'Email'},
    { key: 'address', header: 'Address'},
    { key: 'notes', header: 'Notes'},
    { key: 'active', header: 'Active'}
  ];

  productTableCols: ITableCol[] = [
    { key: 'id', header: 'Product ID'},
    { key: 'catID', header: 'Cat ID'},
    { key: 'name', header: 'Name'},
    { key: 'description', header: 'Description'},
    { key: 'price', header: 'Price'},
    { key: 'featured', header: 'Featured'},
    { key: 'active', header: 'Active'},
    { key: 'image', header: 'Image'},
  ];

  orderTableCols: ITableCol[] = [
    { key: 'id', header: 'Order ID'},
    { key: 'customerID', header: 'Customer ID'},
    { key: 'productID', header: 'Product ID'},
    { key: 'amount', header: 'Amount'},
    { key: 'status', header: 'Status'},
  ];

  billTableCols: ITableCol[] = [
    { key: 'id', header: 'Bill ID'},
    { key: 'orderID', header: 'Order ID'},
    { key: 'amount', header: 'Amount'},
    { key: 'status', header: 'Status'},
  ];

  constructor(
    //public http: HttpClient,
   ) { }
}


