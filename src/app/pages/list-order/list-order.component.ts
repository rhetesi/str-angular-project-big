import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { NotificationService } from 'src/app/service/notification.service';

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
  filterKeys: string[] = Object.keys(new Order()).slice(1);

  choosen: string = 'all';

  constructor(
    private orderService: OrderService,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  onDelete(order: Order) {
    this.orderService.remove(order);
    this.notifyService.showSuccessWithTimeout(`
      <table class="table">
        <thead>
          <tr>
            <th>customerID</th>
            <th>productID</th>
            <th>amount</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-danger">
            <td>${order.customerID}</td>
            <td>${order.productID} </td>
            <td>${order.amount}</td>
            <td>${order.status}</td>
          </tr>
        </tbody>
      </table>
      </span>`,
      "You have deleted this event:",
      5000)
  }
}

