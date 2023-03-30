import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IconsModule } from "@progress/kendo-angular-icons";

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { environment } from 'src/environments/environment';
import { AlertMessagesComponent } from './alert-message/alert-message.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseUrlInterceptor } from './BaseUrlInterceptor';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    EmployeeDetailsComponent,
    ChangePasswordComponent,
    AlertMessagesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    DateInputsModule,
    BrowserAnimationsModule,
    GridModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    InputsModule,
    DropDownsModule,
    AppRoutingModule,
    MatInputModule,
    NgbModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    { provide: 'BASE_API_URL', useValue: environment.baseUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
