import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../_services/dashboard.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;

  constructor(private dashboardService: DashboardService,
              private userService: UserService,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
    var test = this.dashboardService.getInfo()
                   .subscribe(
                     data => {
                       this.username = data.username;
                     },
                     error => {
                       this.authService.logout();
                     }
                   );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }

}
