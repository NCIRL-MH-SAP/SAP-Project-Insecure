import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
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
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('email', res.email);
        localStorage.setItem('isAdmin', res.isAdmin);
        var user = new User();
        user.id = res.id;
        user.firstName = res.firstName;
        user.lastName = res.lastName;
        user.email = res.email;
        user.isAdmin = res.isAdmin;

        this.setLoggedInUserChange(user);

        return res;
      }));
  }

  logout(): void {
    // localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');

    this.setLoggedInUserChange(undefined);
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): boolean {
    if (!this.getLoggedInUserId()) return false;
    if (!this.getLoggedInUserEmail()) return false;

    return true;
  }

  public isLoggedInAdmin(): boolean {
    var isAdmin = (/true/i).test(localStorage.getItem("isAdmin") ?? "");

    return this.isLoggedIn() && isAdmin
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

  getLoggedInUserIsAdmin() {
    console.log(`getLoggedInUserIsAdmin: ${localStorage.getItem('isAdmin')}`)
    return localStorage.getItem('isAdmin');
  }
 
  updatePassword(user: any){
    return this.httpClient.put(`api/auth/update/password/${user.id}`, user);
  }
}
