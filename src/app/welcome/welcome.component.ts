import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  loginCredentials: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService) {

    // Setup form fields
    this.loginCredentials = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    const val = this.loginCredentials.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
          .subscribe(
            (success) => {
              if (success) {
                console.log("successful login");
              } else {
                console.log("failed to login, redirecting to login page");
              }
            }
          );
    } else {
      console.log("password or email missing");
    }
  }

}
