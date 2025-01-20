import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPurchase } from '../../../../shared/models';
@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private apiUrl = '/api/purchases';

  constructor(private http: HttpClient) {}

  createPurchase(purchase: Partial<IPurchase>): Observable<IPurchase> {
    return this.http.post<IPurchase>(`${this.apiUrl}/create`, purchase);
  }

  getPurchases(): Observable<IPurchase[]> {
    return this.http
      .get<{ data: IPurchase[] }>(`${this.apiUrl}/get`)
      .pipe(map((response) => response.data));
  }

  updatePurchase(
    id: string,
    purchase: Partial<IPurchase>
  ): Observable<IPurchase> {
    return this.http.put<IPurchase>(`${this.apiUrl}/${id}`, purchase);
  }

  deletePurchase(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getPurchasesByUserId(userId: string): Observable<IPurchase[]> {
    return this.http
      .get<{ data: IPurchase[] }>(`${this.apiUrl}/user/${userId}`)
      .pipe(map((response) => response.data));
  }
}
