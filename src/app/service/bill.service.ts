import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  delete(bill: typeof Bill) {
    throw new Error('Method not implemented.');
  }

  jsonUrl: string = 'http://localhost:3000/bills';

  list$: BehaviorSubject<Bill[]> =
    new BehaviorSubject<Bill[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<Bill[]>(this.jsonUrl).subscribe(
      bills => this.list$.next(bills));
  }

  get(id: number | string): Observable<Bill> {
    id = parseInt('' + id);
    return this.http.get<Bill>(`${this.jsonUrl}/${id}`);
  }

  create(bill: Bill): void {
    this.http.post<Bill>(`${this.jsonUrl}`, bill
    ).subscribe(() => this.getAll());
  }

  update(bill: Bill): Observable<Bill> {
    return this.http.patch<Bill>(`${this.jsonUrl}/${bill.id}`, bill
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(bill: Bill): void {
    this.http.delete(`${this.jsonUrl}/${bill.id}`
    ).subscribe(() => this.getAll());
  }
}
