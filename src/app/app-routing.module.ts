import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



const appRoutes: Routes = [
  // Home
  { path: '', component: AdminComponent },
  { path: 'home', component: AdminComponent },
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
