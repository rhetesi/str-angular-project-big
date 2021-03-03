import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from 'src/app/model/customer';
import { NotificationService } from 'src/app/service/notification.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer$: Observable<Customer> = this.activatedRoute.params.pipe(
    switchMap(params => this.customerService.get(params.id))
  );

 
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
        console.log('onUpdate:',form.value, customer)
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




