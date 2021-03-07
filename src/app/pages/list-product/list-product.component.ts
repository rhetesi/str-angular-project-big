import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service'
import { ConfigService, ITableCol } from 'src/app/service/config.service';

declare var $:any;
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.list$;
  testProduct: Observable<Product> = this.productService.get(1);


  cols: ITableCol[] = this.configService.productTableCols;
  phrase: string = '';

  columnHead: string = '';
  direction: boolean = false;
  sortColumn: string = '';
  sortDirect: string = 'asc';

  filterKey: string = 'catID';
  //filterKeys: string[] = Object.keys(new Product()).slice();
  filterKeys: string[] = ['id', 'catID', 'name', 'description', 'price', 'featured', 'active'];
  choosen: string = 'all';

  draggedColumnIndex: number = 0;
  
  constructor(
    private productService: ProductService,
    private notifyService: NotificationService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
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
          <tr class="text-danger">
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
      "You have deleted this product:",
      5000)
  }
    

  onColumnSelect(columnHead: string): void{
    this.sortColumn = columnHead;
    this.direction = !this.direction;
    this.sortDirect == 'asc' ?
    this.sortDirect = 'dsc' :
    this.sortDirect = 'asc';
  }

}

