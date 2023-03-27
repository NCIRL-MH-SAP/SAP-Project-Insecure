import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public form: FormGroup;
  subscription: Subscription;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    var firstName = this.form.get('firstName')?.value;
    var lastName = this.form.get('lastName')?.value;
    var email = this.form.get('email')?.value;
    var password = this.form.get('password')?.value;
    var user: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      active: true
    };

    this.subscription = this.authService.register(user).subscribe(
      (res: any) => {
        this.router.navigate(['signIn']);
      },
      error => {        
        this.errorMessage = error?.error?.message ?? "Unknown Error";
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}