import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  loginCredentials: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
    // Setup form fields
    this.loginCredentials = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(val) {
    const form = this.loginCredentials;
    if (form.controls['email'].valid && form.controls['password'].valid) {
      this.authService.login(val.email, val.password)
          .subscribe(
            (success) => {
              if (success) {
                console.log("successful login");
                this.router.navigateByUrl('/');
              } else {
                this.failedLogin();
              }
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

}
