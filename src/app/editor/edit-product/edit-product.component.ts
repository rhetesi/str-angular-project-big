import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';

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
      console.log('onUpdate:',form.value, product)
    }

  showHtmlToaster(product: Product) {
    let title: string = "You have updated this product:";
    if (!product.id) {
      title = "You have added this new product:";
    }
    this.notifyService.showSuccessWithTimeout(`
      <br>
      <br>
      <table class="table">
        <thead>
          <tr>
            <th>catID</th>
            <th>product name</th>
            <th>product type</th>
            <th>product description</th>
            <th>product price</th>
            <th>featured</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-success">
            <td>${product.catID}</td>
            <td>${product.name} </td>
            <td>${product.type}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.featured}</td>
          </tr>
        </tbody>
      </table>`,
      title,
        10000)
      }
}