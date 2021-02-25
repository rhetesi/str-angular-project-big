import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  
  product$: Observable<Product> = this.activatedRoute.params.pipe(
      switchMap( params => this.productService.get (params.id))
  );
  
  clicked: boolean = false;
  category: string = 'new';
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private notifyService: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  //Url ből idt 
  //ProductService.get et meghívni
  
  //új eseményhez params.id === 0
  
  onUpdate(form: NgForm, product: Product): void {
      this.productService.update(product).subscribe(
      ev => this.router.navigate([''])
      );
      console.log(form.value, product);
  }

  onCreate(form: NgForm, product: Product): void {
      this.productService.create(product)
  }
  showHtmlToaster(product: Product) {
    let title: string = "You have updated this Product:";
    if (!product.id) {
      title = "You have added this new Product:";
    }
    this.notifyService.showSuccessWithTimeout(`
      <br>
      <br>
      <table class="table">
        <thead>
          <tr>
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
            <td>${product.catID}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.featured}</td>
            <td>${product.active}</td>
          </tr>
        </tbody>
      </table>`,
      title,
      10000)
  }

}

// servicbe

// get(id: number): Observable<Event> {
//  id = parseInt( '' + id ), 10) vagy
// if (typeof id === 'string') {
//      id = parseInt(id, 10);
// }

//vagy    id = typof id ==='string' ? parseInt(id, 10) : id;
//  const ev: Product | undefined = this.list.find( item => item.id === id );
//  if (ev) {
//    return of(ev);
//  }
//  
//  return of(new Product());
//
//}

//update(product: Porduct) :Observable<Product> {
//  const index: number = this.list.findIndex( item ===> product.id );
//  this.list.splice(index, 1 , product);
//  this.getAll();
//  return of (this.list[index]);    Http kérés  http.get
//}

//id: number = 0;
//catID: number = 0;
//name: string = '';
//type: string = '';
//description: string = '';
//price: number = 0;
//featured: boolean = false;
//active: boolean = true;
//image?: string = '';