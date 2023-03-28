import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('api/users');
  }
  
  getUser(userId: number | undefined): Observable<User> {
    return this.httpClient.get<User>(`api/users/${userId}`);
  }

  createUser(user: User): Observable<any> {
    return this.httpClient.post('api/users', user);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put('api/users', user);
  }

  deleteUser(user: User): Observable<any> {
    return this.httpClient.delete(`api/users/${user.id}`);
  }

  signUp(user: User): Observable<any> {
    return this.httpClient.post('api/auth/signup', user).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      // for testing: msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      msg = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(msg);
  }
}
