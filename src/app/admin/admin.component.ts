import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';
import { User, users } from '../model/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public users: User[];
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }
  ngOnInit(): void {

    console.log("ngOnInit")
    this.userService.getUsers().subscribe(users => {

      console.log("getUsers")
      console.log(users)
      if (!users)
        return;

      this.users = users;
    })
  }

  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? new User() : args.dataItem;
    item.active = args.isNew ? true : item.active;

    this.formGroup = this.formBuilder.group({
      id: item.id,
      firstName: [item.firstName, Validators.required],
      lastName: [item.lastName, Validators.required],
      salary: item.salary,
      bonus: item.bonus,
      active: item.active
    });

    return this.formGroup;
  }
}