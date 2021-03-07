import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

declare var $: any;

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  testBill: Observable<Bill> = this.billService.get(1);

  cols: ITableCol[] = this.configService.billTableCols;

  columnHead: string = '';
  direction: boolean = false;
  sortColumn: string = '';
  sortDirect: string = 'asc';

  phrase: string = '';
  filterKey: string = 'orderID';
  filterKeys: string[] = Object.keys(new Bill()).slice(1);

  choosen: string = 'all';

  constructor(
    private billService: BillService,
    private notifyService : NotificationService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
  }

  showNotification(from: string, align: string, bill: Bill) {
    this.billService.remove(bill);

    const type = ['','info','success','warning','danger'];
    let color = 4;
    let title: string = "You have deleted this bill:";

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
                <td>${bill.orderID}</td>
                <td>${bill.amount}</td>
                <td>${bill.status}</td>
              </tr>
            </tbody>
          </table>
          </div>`
    });
  }

  onDelete(bill: Bill) {
    this.billService.remove(bill);
    this.notifyService.showSuccessWithTimeout(`
      <table class="table">
        <thead>
          <tr>
            <th>orderID</th>
            <th>amount</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-danger>
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

  currentHead: string = 'id';

  onColumnSelect(columnHead: string): void{
    this.sortColumn = columnHead;
    if (columnHead !== this.currentHead) {
      this.sortDirect = 'asc'
    }
    // this.direction = !this.direction;
    if (columnHead == this.currentHead) {
      this.sortDirect == 'asc' ?
      this.sortDirect = 'dsc' :
        this.sortDirect = 'asc';
    }
    this.currentHead = columnHead;
    }
}
