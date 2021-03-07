import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { NotificationService } from 'src/app/service/notification.service';
import { ConfigService, ITableCol } from 'src/app/service/config.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> =
  this.productService.list$;

  cols: ITableCol[] = this.configService.productTableCols;

  phraseControl: FormControl = new FormControl('');

  phrase: string = '';

  columnHead: string = '';
  direction: boolean = false;
  sortColumn: string = '';
  sortDirect: string = 'asc';

  filterKey: string = 'catID';
  filterKeys: string[] = Object.keys(new Product()).slice(1);

  constructor(
    private productService: ProductService,
    private notifyService: NotificationService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();

  }

  onDelete(product: Product) {
    this.productService.remove(product);
    this.notifyService.showSuccessWithTimeout(`
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
          <tr class="text-danger>
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
      </span>`,
      "You have deleted this event:",
      6000)
  }

  onColumnSelect(columnHead: string): void{
    this.sortColumn = columnHead;
    this.direction = !this.direction;
    this.sortDirect == 'asc' ?
    this.sortDirect = 'dsc' :
    this.sortDirect = 'asc';
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
