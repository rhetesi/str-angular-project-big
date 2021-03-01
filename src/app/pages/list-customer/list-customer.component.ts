import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { NotificationService } from 'src/app/service/notification.service';



@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  testCustomer: Observable<Customer> = this.customerService.get(1);


  phrase: string = '';
  filterKey: string = 'firstName';
  filterKeys: string[] = Object.keys(new Customer()).slice(1);

  

  constructor(
    private customerService: CustomerService,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAll();
  } 

   onDelete(customer: Customer) {
    this.customerService.remove(customer);
    this.notifyService.showSuccessWithTimeout(`
      <table class="table">
        <thead>
          <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-danger>
          <td>${customer.id}</td>
          <td>${customer.firstName} </td>
          <td>${customer.lastName}</td>
          <td>${customer.email}</td>
          <td>${customer.address}</td>
          <td>${customer.address.notes}</td>
          </tr>
        </tbody>
      </table>
      </span>`,
      "You have deleted this event:",
      5000)
  }



  
  onCreate(customer: Customer) {
    const newCustomer: Customer = new Customer
  newCustomer.id = 0;
  console.log(newCustomer)
  this.customerService.create(newCustomer);
     this.notifyService.showSuccessWithTimeout(`
      <table class="table">
        <thead>
          <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-danger>
          <td>${customer.id}</td>
          <td>${customer.firstName} </td>
          <td>${customer.lastName}</td>
          <td>${customer.email}</td>
          <td>${customer.address}</td>
          <td>${customer.address.notes}</td>
          </tr>
        </tbody>
      </table>
      </span>`,
      "You have created this event:",
      5000)
  }

}