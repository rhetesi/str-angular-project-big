import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  jsonUrl: string = 'http://localhost:3000/customers';

  list$: BehaviorSubject<Customer[]> =
    new BehaviorSubject<Customer[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<Customer[]>(this.jsonUrl).subscribe(
      customers => this.list$.next(customers));
  }

  get(id: number | string): Observable<Customer> {
    id = parseInt('' + id);
    return this.http.get<Customer>(`${this.jsonUrl}/${id}`);
  }

  create(customer: Customer): void {
    this.http.post<Customer>(`${this.jsonUrl}`, customer
    ).subscribe(() => this.getAll());
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.jsonUrl}/${customer.id}`, customer
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(customer: Customer): void {
    this.http.delete(`${this.jsonUrl}/${customer.id}`
    ).subscribe(() => this.getAll());
  }
}
