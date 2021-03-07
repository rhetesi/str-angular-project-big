import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
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

  notPaidOrders = this.orderList$.pipe(
    map(params => params.filter(item => item.status === 'new' || item.status === 'shipped')?.length));

  activeCustomers = this.customerList$.pipe(
    map(params => params.filter(item => item.active)?.length));

  activeProducts = this.productList$.pipe(
    map(params => params.filter(item => item.active)?.length));

  notPaidBillsAmount = this.billList$.pipe(
    map(params => params.filter(item => item.status === 'new').
      reduce((acc, one) => acc + parseInt('' + one.amount), 0)));

  cards: InfoCard[] = [
    {
      title: 'Customers',
      content: this.activeCustomers,
      cardClass: 'card-header-warning',
      footer: 'Number of active customers.',
      icon: 'account_circle',
    },
    {
      title: 'Products',
      content: this.activeProducts,
      cardClass: 'card-header-success',
      footer: 'Number of active products.',
      icon: 'store',
    },
    {
      title: 'Orders',
      content: this.notPaidOrders,
      cardClass: 'card-header-primary',
      footer: 'Number of unpaid orders.',
      icon: 'content_paste',
    },
    {
      title: 'Invoices',
      content: this.notPaidBillsAmount,
      cardClass: 'card-header-info',
      footer: 'Amount of unpaid bills in HUF.',
      icon: 'library_books',
    }
  ];

  orderChartLabels: Label[] = [''];
  orderChartData: ChartDataSets[] = [
    {
      data: [0],
      label: 'new    ',
      borderColor: ['#fff'],
      borderWidth: [2]
    },
    {
      data: [0],
      label: 'shipped    ',
      borderColor: ['#fff'],
      borderWidth: [2]
    },
    {
      data: [0],
      label: 'paid',
      borderColor: ['#fff'],
      borderWidth: [2]
    },
  ];
  orderChartColor: Color[] = [
    { // first color
      // backgroundColor: ['#ff9800']
      backgroundColor: ['rgba(255,200,255,.8)']
    },
    { // second color
      // backgroundColor: ['#4caf50']
      backgroundColor: ['rgba(200,110,170,.8)']
    },
    { // third color
      // backgroundColor: ['#00bcd4']
      backgroundColor: ['rgba(210,160,210,.8)']
    },
  ];

  billChartData: ChartDataSets[] = [{ data: [0, 0] }];
  billChartLabels: Label[] = ['number of new bills', 'number of paid bills'];
  billChartColor: Color[] = [
    {
      // backgroundColor: ['#ff9800', '#4caf50', '#00bcd4']
      backgroundColor: ['rgba(0,230,230,.9)', 'rgba(10, 160, 180, 0.9)']
    }
  ];

  billSumChartLabels: Label[] = ['sum of new bills', 'sum of paid bills'];
  billSumChartData: ChartDataSets[] = [{ data: [0, 0] }];
  billSumChartColor: Color[] = [
    {
      // backgroundColor: ['#ff9800', '#8e24aa']
      backgroundColor: ['rgba(0,170,170,.9)', 'rgba(10, 110, 130, 0.9)']
    }
  ];

  productAllChartData: ChartDataSets[] = [];
  productAllChartLabels: Label[] = [];
  productAllChartColor: Color[] = [];

  productChartData: ChartDataSets[] = [
      {
        data: [0],
        label: 'active  ',
        borderColor: ['#fff'],
        borderWidth: [2]
      },
      {
        data: [0],
        label: 'featured  ',
        borderColor: ['#fff'],
        borderWidth: [2]
      },
      {
        data: [0],
        label: 'active & featured',
        borderColor: ['#fff'],
        borderWidth: [2]
      },
  ];
  productChartLabels: Label[] = [''];
  productChartColor: Color[] = [
    // {
    //   backgroundColor: ['#ff9800']
    // },
    // {
    //   backgroundColor: ['#8e24aa']
    // },
    // {
    //   backgroundColor: ['#00bcd4']76 175 80
    // },
    {
      backgroundColor: ['rgba(180, 250, 150, 0.9)']
    },
    {
      backgroundColor: ['rgba(110, 215, 110, 0.9)']
    },
    {
      backgroundColor: ['rgba(255,255,200,.8)']
    },
  ];

  customerChartData: ChartDataSets[] = [
    {
    data: [0, 0],
    // borderColor: ['#fff'],
    // borderWidth: [0]
  },
  ];
  customerChartLabels: Label[] = ['active customers', 'inactive customers'];
  customerChartColor: Color[] = [
    {
      backgroundColor: ['rgba(255, 190, 20, 0.9)', 'rgba(255,255,150,.8)']
      // backgroundColor: [ '#4caf50', '#00bcd4' ]
    }
  ];

  constructor(
    private billService: BillService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {

    this.orderList$.subscribe(
      data => {
        // Order chart.
        const newOrders: number =
          data.filter(o => o.status === 'new').length;
        const shippedOrders: number =
          data.filter(o => o.status === 'shipped').length;
        const paidOrders: number =
          data.filter(o => o.status === 'paid').length;

        this.orderChartData[0].data = [newOrders];
        this.orderChartData[1].data = [shippedOrders];
        this.orderChartData[2].data = [paidOrders];
      }
    );

    this.billList$.subscribe(
      data => {
        // Bill chart.
        const newBills: number =
          data.filter(o => o.status === 'new').length;
        const paidBills: number =
          data.filter(o => o.status === 'paid').length
        const newBillsSum: number =
          data.filter(o => o.status === 'new').
          reduce((acc, one) => acc + parseInt('' + one.amount), 0)
        const paidBillsSum: number =
          data.filter(o => o.status === 'paid').
            reduce((acc, one) => acc + parseInt('' + one.amount), 0)

        this.billChartData[0].data = [newBills, paidBills];
        this.billSumChartData[0].data = [newBillsSum, paidBillsSum];
        console.log(this.billChartData)
      }
    );

    this.productList$.subscribe(
      data => {
        // Product chart.
        const activeProducts: number =
          data.filter(o => o.active).length;
        const featuredProducts: number =
          data.filter(o => o.featured).length;
        const activeAndFeaturedProducts: number =
          data.filter(o => o.active && o.featured).length;

        data.forEach((o, i) => {
            Math.random()
            this.productAllChartData[i]=
              {
                data: [o.price],
                label: o.name,
                borderColor: ['#fff'],
                borderWidth: [2],
                backgroundColor: `rgba(${Math.floor(Math.random() * 255)},
                                       ${Math.floor(Math.random() * 255)},
                                       ${Math.floor(Math.random() * 255)},
                                       .7)`,
              };
            // this.productAllChartLabels[i] = [o.name];
          });

        this.productChartData[0].data = [ activeProducts ];
        this.productChartData[1].data = [ featuredProducts ];
        this.productChartData[2].data = [ activeAndFeaturedProducts ];
        console.log(this.productAllChartData, this.productAllChartLabels)
      }
    );

    this.customerList$.subscribe(
      data => {
        // Customer chart.
        const activeCustomers: number =
          data.filter(o => o.active).length;
        const inactiveCustomers: number =
          data.filter(o => o.active === false ).length;

        this.customerChartData[0].data = [ activeCustomers, inactiveCustomers ];
        // console.log(this.customerChartData)
      }
    );

    this.billService.getAll();
    this.customerService.getAll();
    this.orderService.getAll();
    this.productService.getAll();
  }

  // ngOnDestroy(): void {
  //   this.billList$.unsubscribe();
  //   this.customerList$.unsubscribe();
  //   this.orderList$.unsubscribe();
  //   this.productList$.unsubscribe();
  // }

}
