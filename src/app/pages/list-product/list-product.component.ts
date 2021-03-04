import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service'

declare var $:any;
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  testProduct: Observable<Product> = this.productService.get(1);


  phrase: string = '';
  filterKey: string = 'catID';
  filterKeys: string[] = Object.keys(new Product()).slice(1);
  choosen: string = 'all';

  choosen: string = 'all';

  constructor(
    private productService: ProductService,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  showNotification(from: string, align: string, product: Product ) {
    this.productService.remove(product);

    const type = ['','info','success','warning','danger'];
    let color = 4;
    let title: string = "You have deleted this product:";

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
                <th>customerID</th>
                <th>productID</th>
                <th>amount</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${product.catID}</td>
                <td>${product.id} </td>
                <td>${product.price}</td>
                <td>${product.featured}</td>
              </tr>
            </tbody>
          </table>
          </div>`
    });
  }

  onDelete(product: Product) {
    this.productService.remove(product);
    this.notifyService.showSuccessWithTimeout(`
      <table class="table">
        <thead>
          <tr>
            <th>customerID</th>
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
          <tr class="text-danger">
          <td>${product.catID}</td>
          <td>${product.id} </td>
          <td>${product.price}</td>
          <td>${product.featured}</td>
          </tr>
        </tbody>
      </table>
      </span>`,
      "You have deleted this event:",
      5000)
  }
}

