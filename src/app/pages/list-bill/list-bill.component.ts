import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  testBill: Observable<Bill> = this.billService.get(1);

  column: string = '';
  direction: boolean = false;
  sortColumn: string = '';
  sortDirect: string = 'asc';

  constructor(
    private billService: BillService,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
  }

  onDelete(bill: Bill) {
    this.billService.remove(bill);
  }

  onColumnSelect(columnHead: string): void{
    this.sortColumn = columnHead;
    this.direction = !this.direction;
    this.sortDirect == 'asc' ?
    this.sortDirect = 'dsc' :
    this.sortDirect = 'asc';
    }
}
