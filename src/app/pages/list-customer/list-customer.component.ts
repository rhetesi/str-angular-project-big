import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { NotificationService } from 'src/app/service/notification.service';
import { ToastrService } from 'ngx-toastr';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

declare var $: any;

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;
  testCustomer: Observable<Customer> = this.customerService.get(1);

  cols: ITableCol[] = this.configService.customerTableCols;

  columnHead: string = '';
  direction: boolean = false;
  sortColumn: string = '';
  sortDirect: string = 'asc';

  phrase: string = '';
  filterKey: string = 'firstName';
  filterKeys:string[] = ['firstName', 'lastName', 'email', 'street', 'zip', 'country', 'city', 'notes', 'active'];

  choosen: string = 'all';

  draggedColumnIndex: number = 0;

  constructor(
    private customerService: CustomerService,
    private notifyService : NotificationService,
    private toastr: ToastrService,
    private configService: ConfigService,
  ) { console.log(this.filterKeys);}

  ngOnInit(): void {
    this.customerService.getAll();
  }

  public arrayMove(arr: any[], from: number, to: any) {
    let cutOut = arr.splice(from, 1)[0]; // remove the dragged element at index 'from'
    arr.splice(to, 0, cutOut);            // insert it at index 'to'
  }

  public dragStartColumn(index: any) {
    this.draggedColumnIndex = index;
  }

  public allowDrop(event: any) {
    event.preventDefault();
  }

  public dropColumn(index: any) {
    this.arrayMove(this.cols, this.draggedColumnIndex, index);
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
          <table class="table-responsive table-bordered">
          <thead>
            <tr>
            
            <th scope="col">firstName</th>
            <th scope="col">lastName</th>
            <th scope="col">email</th>
            <th scope="col">address</th>
            <th scope="col">active</th>
            <th scope="col">notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td scope="row">${customer.firstName} </td>
            <td scope="row">${customer.lastName}</td>
            <td scope="row">${customer.email}</td>
            <td scope="row">${customer.address.zip+customer.address.country+customer.address.city+customer.address.street}</td>
            <td scope="row">${customer.active}</td>
            <td scope="row">${customer.address.notes}</td>
            <td></td>
            </tr>
          </tbody>
        </table>
          </div>`
    });
  }





   onDelete(customer: Customer) {
    this.customerService.remove(customer);
    this.notifyService.showSuccessWithTimeout(`
    <table class="table-responsive table-bordered">
    <thead>
      <tr>
      <th scope="col">firstName</th>
      <th scope="col">lastName</th>
      <th scope="col">email</th>
      <th scope="col">address</th>
      <th scope="col">active</th>
      <th scope="col">notes</th>
      </tr>
    </thead>
    <tbody>
          <tr class="text-danger>
          <td scope="row">${customer.firstName} </td>
          <td scope="row">${customer.lastName}</td>
          <td scope="row">${customer.email}</td>
          <td scope="row">${customer.address.zip+customer.address.country+customer.address.city+customer.address.street}</td>
          <td scope="row">${customer.active}</td>
          <td scope="row">${customer.address.notes}</td>
          <td></td>
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
      <table class="table-responsive table-bordered">
        <thead>
          <tr>
          
          <th scope="col">firstName</th>
      <th scope="col">lastName</th>
      <th scope="col">email</th>
      <th scope="col">address</th>
      <th scope="col">active</th>
      <th scope="col">notes</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-danger>
          
          <td scope="row">${customer.firstName} </td>
          <td scope="row">${customer.lastName}</td>
          <td scope="row">${customer.email}</td>
          <td scope="row">${customer.address.zip+customer.address.country+customer.address.city+customer.address.street}</td>
          <td scope="row">${customer.active}</td>
          <td scope="row">${customer.address.notes}</td>
          <td></td>
          </tr>
        </tbody>
      </table>
      </span>`,
      "You have created this event:",
      10000)
  }

  onColumnSelect(columnHead: string): void{
    this.sortColumn = columnHead;
    this.direction = !this.direction;
    this.sortDirect == 'asc' ?
    this.sortDirect = 'dsc' :
    this.sortDirect = 'asc';
    }

}
