import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  testBill: Observable<Bill> = this.billService.get(1);

  phrase: string = '';
  filterKey: string = 'orderID';
  filterKeys: string[] = Object.keys(new Bill()).slice(1);

  constructor(
    private billService: BillService,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
  }

  onDelete(bill: Bill) {
    this.billService.remove(bill);
    this.notifyService.showSuccessWithTimeout(`
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
          <tr class="text-danger>
            <td>${bill.id}</td>
            <td>${bill.orderID} </td>
            <td>${bill.amount}</td>
            <td>${bill.status}</td>
          </tr>
        </tbody>
      </table>
      </span>`,
      "You have deleted this event:",
      5000)
  }
}
