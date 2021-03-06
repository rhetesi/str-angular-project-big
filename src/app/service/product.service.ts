// Új, Base & Config Service-ekre alapuló Product Service - 1 db "/" jellel több volt a ConfigService apiURL végén, mint kell :D
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Product } from '../model/product';
// import { BaseService } from './base.service';
// import { ConfigService } from './config.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService extends BaseService<Product> {

//   constructor(
//     public http: HttpClient,
//     public config: ConfigService,
//   ) {
//     super(http, config, 'products');
//    }

// }
// Új kód vége

// Eredeti, működő ProductService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  jsonUrl: string = 'http://localhost:3000/products';

  list$: BehaviorSubject<Product[]> =
    new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<Product[]>(this.jsonUrl).subscribe(
      products => this.list$.next(products));
  }

  get(id: number | string): Observable<Product> {
    id = parseInt('' + id);
    return this.http.get<Product>(`${this.jsonUrl}/${id}`);
  }

  create(product: Product): void {
    this.http.post<Product>(`${this.jsonUrl}`, product
    ).subscribe(() => this.getAll());
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.jsonUrl}/${product.id}`, product
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(product: Product): void {
    this.http.delete(`${this.jsonUrl}/${product.id}`
    ).subscribe(() => this.getAll());
  }
}
