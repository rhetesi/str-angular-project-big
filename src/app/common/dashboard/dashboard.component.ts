import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bill } from 'src/app/model/bill';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { BillService } from 'src/app/service/bill.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
import { InfoCard } from '../info-card/info-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  productList$: BehaviorSubject<Product[]> = this.productService.list$;

  cards: InfoCard[] = [
    {
     title: 'Customers',
     content:
        this.customerList$.pipe(
          map(params => params.filter(item => item.active).length)
        ),
     cardClass: 'card-header-warning',
     footer: 'Number of active customers.',
     icon: 'account_circle',
    },
    {
     title: 'Products',
     content:
        this.productList$.pipe(
          map(params => params.filter(item => item.active).length)
        ),
     cardClass: 'card-header-success',
     footer: 'Number of active products.',
     icon: 'store',
    },
    {
     title: 'Orders',
     content:
        this.orderList$.pipe(
          map(params => params.filter(item => item.status!=='paid').length)
        ),
     cardClass: 'card-header-primary',
     footer: 'Number of unpaid orders.',
     icon: 'content_paste',
    },
    {
     title: 'Invoices',
     content:
        this.billList$.pipe(
          map(params => params.filter(item => item.status !== 'paid').
          reduce((acc, one) => acc +  + one.amount, 0))
        ),
      //  this.billList$.pipe(
      //     map(params => params.filter(item => item.status!=='paid').
      //     reduce((acc, one) => acc + parseInt('' + one.amount), 0))
      //   ),
     cardClass: 'card-header-info',
     footer: 'Amount of unpaid invoices in hungarian forint.',
     icon: 'library_books',
    }
  ]

  constructor(
    private billService: BillService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.productService.getAll();
  }

}
