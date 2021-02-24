import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  testCustomer: Observable<Customer> = this.customerService.get(1);

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
  } 

  onDelete(customer: Customer) {
    this.customerService.remove(customer);
  }

}