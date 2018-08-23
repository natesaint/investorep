import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { DashboardService } from '../_services/dashboard.service';
import { regex } from '../_constants/regular-expressions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginCredentials: FormGroup;
  activeUsername: string;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private dashboardService: DashboardService) {
    // Setup form fields
    this.loginCredentials = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(regex.password)])]
    });
  }

  ngOnInit() {
    this.dashboardService.getInfo()
        .subscribe(
          data => {
            this.activeUsername = data.username;
          },
          error => {
            this.authService.logout();
            //this.router.navigateByUrl('/login');
          }
        );
  }

  login(val) {
    const form = this.loginCredentials;
    if (form.controls['email'].valid && form.controls['password'].valid) {
      this.authService.login(val.email, val.password)
          .subscribe(
            data => {
              if (data.success === true) {
                console.log("successful login");
                this.router.navigateByUrl('/dashboard');
              } else {
                this.failedLogin();
              }
            },
            error => {
              this.failedLogin();
            }
          );
    } else {
      this.failedLogin();
    }
  }

  failedLogin() {
    console.log("failed to login, redirecting to login page");
    this.router.navigateByUrl('/login');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }

}
