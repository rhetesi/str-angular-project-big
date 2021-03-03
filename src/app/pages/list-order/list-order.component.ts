import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { NotificationService } from 'src/app/service/notification.service';

declare var $: any;

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
  column: string = '';
  direction: boolean = false;
  sortColumn: string = '';
  sortDirect: string = 'asc';

  choosen: string = 'all';

  constructor(
    private orderService: OrderService,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  showNotification(from: string, align: string, order: Order) {
    this.orderService.remove(order);

    const type = ['','info','success','warning','danger'];
    let color = 4;
    let title: string = "You have deleted this order:";

    $.notify({
        icon: "notifications",
        message: title
    },
      {
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: `<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">
          <button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>
          <i class="material-icons" data-notify="icon">notifications</i>
          <span data-notify="title">{1}</span>
          <span data-notify="message">{2}</span>
          <div class="progress" data-notify="progressbar">
            <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
          </div>
          <a href="{3}" target="{4}" data-notify="url"></a>
          <br>
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
              <tr>
                <td>${order.customerID}</td>
                <td>${order.productID} </td>
                <td>${order.amount}</td>
                <td>${order.status}</td>
              </tr>
            </tbody>
          </table>
          </div>`
    });
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

  onColumnSelect(columnHead: string): void{
    this.sortColumn = columnHead;
    this.direction = !this.direction;
    this.sortDirect == 'asc' ?
    this.sortDirect = 'dsc' :
    this.sortDirect = 'asc';
    }
}

