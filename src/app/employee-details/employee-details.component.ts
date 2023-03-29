import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeUser(this.route.snapshot.params['id'])
  }

  initializeUser(id: any) {
    if (!id || isNaN(id)) return;

    const userId = Number(id);
    this.userService.getUser(userId).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }
}
