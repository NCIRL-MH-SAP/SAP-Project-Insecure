import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

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
        localStorage.setItem('access_token', res.accessToken);

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
    localStorage.removeItem('access_token');

    this.setLoggedInUserChange(undefined);
    this.router.navigate(['/home']);
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token') ?? "";
  }

  public isLoggedIn(): boolean {
    const token = this.getAccessToken();

    return !this.jwtHelper.isTokenExpired(token);
  }

  public isLoggedInAdmin(): boolean {
    if (!this.isLoggedIn()) return false;

    return this.getDecodeToken().isAdmin ?? false
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getLoggedInUserId() {
    return this.getDecodeToken().id ?? 0;
  }

  getLoggedInUserEmail() {
    return this.getDecodeToken().email ?? "";
  }

  updatePassword(user: any) {
    return this.httpClient.put(`api/auth/update/password/${user.id}`, user);
  }

  getDecodeToken() {
    var accessToken = this.getAccessToken();
    const helper = new JwtHelperService();
    return helper.decodeToken(accessToken);
  }
}
