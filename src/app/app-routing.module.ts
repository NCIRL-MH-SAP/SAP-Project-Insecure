import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const appRoutes: Routes = [
  // Home
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [() => inject(AuthService).isLoggedInAdmin()] },
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [() => inject(AuthService).isLoggedIn()] },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [() => inject(AuthService).isLoggedIn()] },  
  { path: 'signUp', component: RegisterComponent },
  { path: 'signIn', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
