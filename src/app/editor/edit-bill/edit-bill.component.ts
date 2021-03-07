import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Bill } from 'src/app/model/bill';
import { NotificationService } from 'src/app/service/notification.service';
import { BillService } from 'src/app/service/bill.service';

declare var $: any;

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {

  bill$: Observable<Bill> = this.activatedRoute.params.pipe(
    switchMap(params => this.billService.get(params.id))
  );

  clicked: boolean = false;
  category: string = 'new';

  constructor(
    private activatedRoute: ActivatedRoute,
    private billService: BillService,
    private router: Router,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, bill: Bill): void {
    this.clicked = true;
    if (!bill.id) {
      this.billService.create(bill);
      this.router.navigate(['bills']);
      } else {
        this.billService.update(bill).subscribe(
          () => this.router.navigate(['bills'])
          );
        }
        // console.log('onUpdate:',form.value, bill)
  }

  showNotification(from:string, align:string, bill: Bill){
    const type = ['','info','success','warning','danger'];
    let color = 2;
    let title: string = "You have updated this invoice:";
    if (!bill.id) {
      title = "You have added this new invoice:";
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
                <th>orderID</th>
                <th>amount</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${bill.orderID} </td>
                <td>${bill.amount}</td>
                <td>${bill.status}</td>
              </tr>
            </tbody>
          </table>
          </div>`
    });
  }

  showHtmlToaster(bill: Bill) {
    let title: string = "You have updated this invoice:";
    if (!bill.id) {
      title = "You have added this new invoice:";
    }
    this.notifyService.showSuccessWithTimeout(`
      <br>
      <br>
      <table class="table">
        <thead>
          <tr>
            <th>orderID</th>
            <th>amount</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-success">
            <td>${bill.orderID} </td>
            <td>${bill.amount}</td>
            <td>${bill.status}</td>
          </tr>
        </tbody>
      </table>`,
      title,
      5000)
  }

}
