import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/model/order';
import { NotificationService } from 'src/app/service/notification.service';
import { OrderService } from 'src/app/service/order.service';

declare var $: any;

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

  showNotification(from:string, align:string, order: Order){
    const type = ['','info','success','warning','danger'];
    let color = 2;
    let title: string = "You have updated this order:";
    if (!order.id) {
      title = "You have added this new order:";
      color = 1;
    }

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
      5000)
  }

}
