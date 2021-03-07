import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';

declare var $: any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap( params => this.productService.get(params.id))
  );


  clicked: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, product: Product): void {
    this.clicked = true;
    if (!product.id) {
      this.productService.create(product);
      this.router.navigate(['products']);
      } else {
        this.productService.update(product).subscribe(
          () => this.router.navigate(['products'])
        );
      }
      //console.log('onUpdate:',form.value, product)
  }
  showNotification(from:string, align:string, product: Product){
    const type = ['','info','success','warning','danger'];
    let color = 2;
    let title: string = "You have updated this product:";
    if (!product.id) {
      title = "You have added this new product:";
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
        template: `<div data-notify="container" class="col-xl-6 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">
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
                <th>productID</th>
                <th>catID</th>
                <th>name</th>
                <th>description</th>
                <th>price</th>
                <th>featured</th>
                <th>active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${product.id}</td>
                <td>${product.catID} </td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.featured}</td>
                <td>${product.active}</td>
              </tr>
            </tbody>
          </table>
          </div>`
      });
    }

    showHtmlToaster(product: Product) {
      let title: string = "You have updated this order:";
      if (!product.id) {
        title = "You have added this new order:";
      }
      this.notifyService.showSuccessWithTimeout(`
        <br>
        <br>
        <table class="table">
          <thead>
            <tr>
              <th>id</th>
              <th>catID</th>
              <th>name</th>
              <th>description</th>
              <th>price</th>
              <th>featured</th>
              <th>active</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-success">
              <td>${product.id}</td>
              <td>${product.catID} </td>
              <td>${product.name}</td>
              <td>${product.description}</td>
              <td>${product.price}</td>
              <td>${product.featured}</td>
              <td>${product.active}</td>
            </tr>
          </tbody>
        </table>`,
        title,
        5000)
    }

}


