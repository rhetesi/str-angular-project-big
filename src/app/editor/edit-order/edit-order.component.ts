import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { NotificationService } from 'src/app/service/notification.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  order$: Observable<Order> = this.activatedRoute.params.pipe(
    switchMap(params => this.orderService.get(params.id))
  );

  clicked: boolean = false;
  category: string = 'new';

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, order: Order): void {
    this.clicked = true;
    if (!order.id) {
      this.orderService.create(order);
      this.router.navigate(['orders']);
      } else {
        this.orderService.update(order).subscribe(
          () => this.router.navigate(['orders'])
          );
        }
        console.log('onUpdate:',form.value, order)
  }

  showHtmlToaster(order: Order) {
    let title: string = "You have updated this order:";
    if (!order.id) {
      title = "You have added this new order:";
    }
    this.notifyService.showSuccessWithTimeout(`
      <br>
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
          <tr class="text-success">
            <td>${order.customerID}</td>
            <td>${order.productID} </td>
            <td>${order.amount}</td>
            <td>${order.status}</td>
          </tr>
        </tbody>
      </table>`,
      title,
      10000)
  }

}
