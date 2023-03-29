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

  getUser(userId: number): Observable<User> {
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
    return this.httpClient.post('api/auth/signup', user);
  }
}
