import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { NotificationService } from 'src/app/service/notification.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => this.customerService.get(params.id))
  );

  choosen: string = 'all';

  id: number = 0; 
  updating: boolean = false;


  customer: Customer = new Customer();

  
 



  clicked: boolean = false;
  category: string = 'new';
 

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private notifyService: NotificationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => this.id = params.id);
    this.customerService.get(this.id).subscribe(customer => this.customer = customer)
  }

  
 

  onUpdate(form: NgForm, customer: Customer): void {
    this.clicked = true;
    if (!customer.id) {
      this.customerService.create(customer);
      this.router.navigate(['customers']);
      } else {
        this.customerService.update(customer).subscribe(
          () => this.router.navigate(['customers'])
          );
        }
      //  console.log('onUpdate:',form.value, customer)
  }

  showNotification(from:string, align:string, customer: Customer){
    const type = ['','info','success','warning','danger'];
    let color = 2;
    let title: string = "You have updated this customer:";
    if (!customer.id) {
      title = "You have added this new customer:";
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
        template: `<div data-notify="container" class="col-md-6 ml-auto mr-auto text-center alert alert-{0} alert-with-icon" role="alert">
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
              <th>notes</th>
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
              <td></td>
              </tr>
            </tbody>
          </table>
          </div>`
    });
  }







  showHtmlToaster(customer: Customer) {
    let title: string = "You have updated this customer:";
    if (!customer.id) {
      title = "You have added this new customer:";
    }
    this.notifyService.showSuccessWithTimeout(`
      <br>
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
            <th>notes</th>
            
            
          </tr>
        </thead>
        <tbody>
          <tr class="text-success">
            <td>${customer.id}</td>
            <td>${customer.firstName} </td>
            <td>${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.address}</td>
            <td>${customer.active}</td>
            <td>${customer.address.notes}</td>
            <td></td>

            
          </tr>
        </tbody>
      </table>`,
      title,
      10000)
  }

}




