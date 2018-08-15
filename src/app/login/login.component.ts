import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  validCredentials: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]{8,}$')])]
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.validCredentials = true;

    this.authService.logout();
  }

  login(val) {
    this.submitted = true;
    this.validCredentials = true;

    if (this.form.valid) {
      this.authService.login(val.email, val.password).subscribe(

      );
    }
  }

  get f() {
    return this.form.controls;
  }
}
