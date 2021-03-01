import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> =
  this.productService.list$;

  
  phrase: string = '';
  filterKey: string = 'productID';
  filterKeys: string[] = Object.keys(new Product()).slice(1);

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
    
  }

  onDelete(product: Product) {
    this.productService.remove(product);
  }

}

/*

export class ListOrderComponent implements OnInit {

  filterKey: string = 'customerID';
  filterKeys: string[] = Object.keys(new Order());

  ngOnInit(): void {
    this.orderService.getAll();
  }


}


*/
