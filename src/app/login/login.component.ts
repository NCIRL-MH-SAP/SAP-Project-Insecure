import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  public form: FormGroup;
  @ViewChild("passwordInput") passwordInput: TextBoxComponent;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    this.InitializeControllers();
  }

  private InitializeControllers() {
    if (this.passwordInput?.input?.nativeElement?.type)
      this.passwordInput.input.nativeElement.type = "password";
  }

  public get showSuccess(): boolean {
    if (this.form.controls) {
      const formControl = this.form.controls['firstName'];
      return formControl.value;
    }

    return false;
  }
}