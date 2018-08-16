import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { regex } from '../_constants/regular-expressions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  validCredentials: boolean;
  loading: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(regex.password)])]
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.validCredentials = true;
    this.loading = false;

    this.authService.logout();
  }

  login(val) {
    this.submitted = true;
    this.validCredentials = true;
    this.loading = true;

    if (this.form.valid) {
      this.authService.login(val.email, val.password)
          .subscribe(
            data => {
              if (data.success === true) {
                console.log("successful login");
                this.router.navigateByUrl('/dashboard');
              } else {
                this.validCredentials = false;
                this.loading = false;
              }
            },
            error => {
              this.validCredentials = false;
              this.loading = false;
            }
          );
    } else {
      this.validCredentials = false;
      this.loading = false;
    }
  }

  get f() {
    return this.form.controls;
  }
}
