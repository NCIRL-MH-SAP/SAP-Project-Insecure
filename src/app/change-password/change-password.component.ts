import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  public form: FormGroup;
  subscription: Subscription;
  errorMessage: string | undefined;
  successMessage: string | undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group({
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
    },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    var id = this.authService.getLoggedInUserId();
    var password = this.form.get('password')?.value;
    var user = {
      id: id,
      password: password
    };

    this.subscription = this.authService.updatePassword(user).subscribe(
      (res: any) => {
        this.successMessage = "Password successfuly changed"
      },
      error => {
        this.errorMessage = error?.error?.message ?? "Unknown Error";
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) { return; }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
