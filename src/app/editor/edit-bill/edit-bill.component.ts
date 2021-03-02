import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Bill } from 'src/app/model/bill';
import { NotificationService } from 'src/app/service/notification.service';
import { BillService } from 'src/app/service/bill.service';

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
        console.log('onUpdate:',form.value, bill)
  }

  showHtmlToaster(bill: Bill) {
    let title: string = "You have updated this bill:";
    if (!bill.id) {
      title = "You have added this new bill:";
    }
    this.notifyService.showSuccessWithTimeout(`
      <br>
      <br>
      <table class="table">
        <thead>
          <tr>
            <th>id</th>
            <th>orderID</th>
            <th>amount</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-success">
            <td>${bill.id}</td>
            <td>${bill.orderID} </td>
            <td>${bill.amount}</td>
            <td>${bill.status}</td>
          </tr>
        </tbody>
      </table>`,
      title,
      10000)
  }

}
