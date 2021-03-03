import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { NotificationService } from 'src/app/service/notification.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

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
  filterKeys:string[] = ['firstName', 'lastName', 'email', 'street', 'zip', 'country', 'city', 'notes', 'active'];

  choosen: string = 'all';

  constructor(
    private customerService: CustomerService,
    private notifyService : NotificationService,
    private toastr: ToastrService
  ) { console.log(this.filterKeys);}

  ngOnInit(): void {
    this.customerService.getAll();
  } 

  showNotification(from: string, align: string, customer: Customer) {
    this.customerService.remove(customer);

    const type = ['','info','success','warning','danger'];
    let color = 4;
    let title: string = "You have deleted this customer:";

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
              <th>id</th> 
              <th>firstName</th>
              <th>lastName</th>
              <th>email</th>
              <th>address</th>
              <th>active</th>
              <th>Notes</th>
              
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>${customer.id}</td>
              <td>${customer.firstName} </td>
              <td>${customer.lastName}</td>
              <td>${customer.email}</td>
              <td>${customer.address}</td>
              <td>${customer.active}</td>
              <td>${customer.address.notes}</td>
              
              </tr>
            </tbody>
          </table>
          </div>`
    });
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
          <th>active</th>
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
      10000)
  }

}