import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {

  orderList$: BehaviorSubject<Bill[]> = this.orderService.list$;
  testBill: Observable<Bill> = this.billService.get(1);
  billService: any;

  constructor(
    private orderService: BillService,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  onDelete(order: Bill) {
    this.billService.delete(Bill);
  }
}
