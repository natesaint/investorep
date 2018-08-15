import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  testUsername: string;

  constructor(private dashboardService: DashboardService,
              private userService: UserService) { }

  ngOnInit() {
    // TODO: FIX THIS
    var test = this.dashboardService.getInfo()
                   .subscribe(
                     data => {
                       this.testUsername = data.username;
                     }
                   );
  }

}
