import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';
import { User, users } from '../model/user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public users: User[] = users;
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? new User() : args.dataItem;
    item.Active =  args.isNew ? true:  item.Active;
    
    this.formGroup = this.formBuilder.group({
      UserId: item.UserId,
      FirstName: [item.FirstName, Validators.required],
      LastName: [item.LastName, Validators.required],
      Salary: item.Salary,
      Bonus:  item.Bonus,
      Active: item.Active
    });

    return this.formGroup;
  }
}