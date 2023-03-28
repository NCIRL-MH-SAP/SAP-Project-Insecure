import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  user: User | undefined;
  constructor(private userService: UserService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];

      console.log(id)
      if (!id)
        return;

      this.userService.getUser(id).subscribe(data => {
        if (data) {
          this.user = data;
        }

      })
    });

  }
}
