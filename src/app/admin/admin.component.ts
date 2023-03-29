import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEvent, CancelEvent, EditEvent, GridComponent, GridDataResult, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { State, process, DataResult } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public formGroup?: FormGroup;
  public gridData: User[];
  public gridView: any;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };

  private editedRowIndex?: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.initializeUsers();
  }
  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);

    var user = new User();
    user.active = true;

    this.formGroup = this.createFormGroup(user)
    args.sender.addRow(this.formGroup);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const user: User = formGroup.value;

    const upsertFn = user.id ? this.userService.updateUser(user) : this.userService.createUser(user);
    upsertFn.subscribe(data => {
      sender.closeRow(rowIndex);
      this.initializeUsers();
    });
  }

  public onStateChange(state: State): void {
    this.gridState = state;

    this.gridView = process(this.gridData, this.gridState)
  }

  public editHandler(args: EditEvent): void {
    const { dataItem } = args;
    this.closeEditor(args.sender);

    this.formGroup = this.createFormGroup(dataItem);

    this.editedRowIndex = args.rowIndex;
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    this.closeEditor(args.sender, args.rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    this.userService.deleteUser(args.dataItem).subscribe(data => {
      this.initializeUsers();
    })
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  private initializeUsers() {
    this.userService.getUsers().subscribe(users => {
      if (!users)
        return;

      this.gridData = users;
      this.gridView = process(users, this.gridState)
    })
  }

  private createFormGroup(item: User): FormGroup {

    this.formGroup = this.formBuilder.group({
      id: item.id,
      firstName: [item.firstName, Validators.required],
      lastName: [item.lastName, Validators.required],
      email: [item.email, Validators.required],
      salary: item.salary,
      bonus: item.bonus,
      active: item.active,
      isAdmin: item.isAdmin,
      position: item.position
    });

    return this.formGroup;
  }
}