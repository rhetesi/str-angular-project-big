import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  testOrder: Observable<Order> = this.orderService.get(1);

  phrase: string = '';
  filterKey: string = 'customerID';
  filterKeys: string[] = Object.keys(new Order());

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  onDelete(order: Order) {
    this.orderService.remove(order);
  }
}

