import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http
      .get<{ data: IUser[] }>(`${this.apiUrl}/get`)
      .pipe(map((response) => response.data));
  }

  addUser(user: Partial<IUser>): Observable<IUser> {
    return this.http
      .post<{ data: IUser }>(`${this.apiUrl}/create`, user)
      .pipe(map((response) => response.data));
  }

  deleteUser(id: string): Observable<void> {
    return this.http
      .delete<{ success: boolean }>(`${this.apiUrl}/${id}`)
      .pipe(map(() => undefined));
  }
}
