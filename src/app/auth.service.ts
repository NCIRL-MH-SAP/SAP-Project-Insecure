import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  loggedInUser$ = new BehaviorSubject<User | undefined>(undefined);

  getLoggedInUserChange(): Observable<User | undefined> {
    return this.loggedInUser$.asObservable();
  }

  setLoggedInUserChange(loggedInUser: User | undefined) {
    this.loggedInUser$.next(loggedInUser);
  }

  register(user: User): Observable<any> {
    return this.httpClient.post('api/auth/signup', user);
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>('api/auth/signin', { email, password })
      .pipe(map(res => {
        // localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('email', email);

        var user = new User();
        user.id = res.id;
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.email = res.email;

        this.setLoggedInUserChange(user);

        return res;
      }));
  }

  logout(): void {
    // localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');

    this.setLoggedInUserChange(undefined);
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): boolean { 
    if (!this.getLoggedInUserId()) return false;
    if (!this.getLoggedInUserEmail()) return false;

    return true;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getLoggedInUserId() {
    return localStorage.getItem('user_id');
  }

  getLoggedInUserEmail() {
    return localStorage.getItem('email');
  }

  // updatePassword(user: User, id: string): Observable<any> {
  //   return this.httpClient.put(`api/user/update/password/${id}`, user).pipe(
  //     map((res: Response) => {
  //       return res;
  //     }),
  //     catchError((err) => { console.log(err); return this.handleError(err); }));
  // }

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
