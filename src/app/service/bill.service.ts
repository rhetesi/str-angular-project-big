import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { bill } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class billService {

  jsonUrl: string = 'http://localhost:3000/bill';

  list$: BehaviorSubject<bil[]> =
    new BehaviorSubject<bil[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<bil[]>(this.jsonUrl).subscribe(
      bils => this.list$.next(bils));
  }

  get(id: number | string): Observable<bil> {
    id = parseInt('' + id);
    return this.http.get<bil>(`${this.jsonUrl}/${id}`);
  }

  create(bil: bil): void {
    this.http.post<bil>(`${this.jsonUrl}`, bil
    ).subscribe(() => this.getAll());
  }

  update(bil: bil): Observable<bil> {
    return this.http.patch<bil>(`${this.jsonUrl}/${bil.id}`, bil
    ).pipe(
      tap(() => this.getAll())
    );
  }

  remove(bil: bil): void {
    this.http.delete(`${this.jsonUrl}/${bil.id}`
    ).subscribe(() => this.getAll());
  }
}
