import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  @ViewChild("passwordInput") passwordInput: TextBoxComponent;
  @ViewChild("confirmPasswordInput") confirmPasswordInput: TextBoxComponent;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
    });
  }
  ngAfterViewInit(): void {
    this.InitializeControllers();
  }

  private InitializeControllers() {
    if (this.passwordInput?.input?.nativeElement?.type)
      this.passwordInput.input.nativeElement.type = "password";

    if (this.confirmPasswordInput?.input?.nativeElement?.type)
      this.confirmPasswordInput.input.nativeElement.type = "password";
  }

  ngOnInit(): void {
    // this.InitializeControllers();
  }
}