import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from '../model/order'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  jsonUrl: string = 'http://localhost:3000/order';

  list$: BehaviorSubject<Order[]> =
    new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<Order[]>(this.jsonUrl).subscribe(
      customers => this.list$.next(order));
  }

  get(id: number | string): Observable<Order> {
    id = parseInt('' + id);
    return this.http.get<Order>(`${this.jsonUrl}/${id}`);
  }

  create(order: Order): void {
    this.http.post<Order>(`${this.jsonUrl}`, order
    ).subscribe(() => this.getAll());
  }

  update(order: Order): Observable<Order> {
    return this.http.patch<Order>(`${this.jsonUrl}/${order.id}`, order
    ).pipe(
      tap(() => this.getAll())
    );
  }

  delete(order: Order): void {
    this.http.delete(`${this.jsonUrl}/${order.id}`
    ).subscribe(() => this.getAll());
  }
}
