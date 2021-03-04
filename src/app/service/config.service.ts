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
    { key: 'firstName', header: 'First Name'},
    { key: 'lastName', header: 'Last Name'},
    { key: 'email', header: 'Email'},
    { key: 'address', header: 'Address'},
    { key: 'notes', header: 'Notes'},
    { key: 'active', header: 'Active'}
  ];

  productTableCols: ITableCol[] = [
    { key: 'id', header: 'ProductID'},
    { key: 'catID', header: 'CatID'},
    { key: 'name', header: 'Name'},
    { key: 'description', header: 'Description'},
    { key: 'price', header: 'Price'},
    { key: 'featured', header: 'Featured'},
    { key: 'active', header: 'Active'},
    { key: 'image', header: 'Image'},
  ];

  orderTableCols: ITableCol[] = [
    { key: 'customerID', header: 'CustomerID'},
    { key: 'productID', header: 'ProductID'},
    { key: 'amount', header: 'Amount'},
    { key: 'status', header: 'Status'},
  ];

  billTableCols: ITableCol[] = [
    { key: 'orderID', header: 'OrderID'},
    { key: 'amount', header: 'Amount'},
    { key: 'status', header: 'Status'},
  ];

  constructor(
    //public http: HttpClient,
   ) { }
}


