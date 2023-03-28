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

import { MatInputModule } from '@angular/material/input';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './BaseUrlInterceptor';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component'

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    EmployeeDetailsComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
