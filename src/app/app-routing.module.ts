import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthService } from './auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  // Home
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [() => inject(AuthService).isLoggedInAdmin()] },
  { path: 'employee', component: EmployeeDetailsComponent, canActivate: [() => inject(AuthService).isLoggedIn()] },
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
