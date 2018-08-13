import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { errorMessages } from '../_constants/error-messages';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  accountDuplicate: boolean;
  loading: boolean;
  errors = errorMessages;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
    // Setup the form fields
    this.form = this.fb.group({
      firstName: ['',            Validators.compose([Validators.required])],
      lastName: ['',             Validators.compose([Validators.required])],
      username: ['',             Validators.compose([Validators.required, Validators.pattern('^[0-9A-Za-z_-]{3,15}$')])],
      email: ['',                Validators.compose([Validators.required, Validators.email])],
      // Min 8 chars, atleast one uppercase, one lowercase, and one number
      password: ['',             Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]{8,}$')])],
      passwordConfirmation: ['', Validators.compose([Validators.required, ])]
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.loading = false;
  }

  // Register a new user, send request only when format is validated and handle errors
  register() {
    this.submitted = true;
    this.accountDuplicate = false;
    this.loading = true;

    let user: User = Object.assign({}, this.form.value);

    if (this.form.valid) {
      this.userService.create(user).subscribe(
        data => {
            console.log('user created');
            this.loading = false;
        },
        error => {
            this.accountDuplicate = true;
            console.log(error);
            this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }

  // Return form controls for easy access
  get f() {
    return this.form.controls;
  }
}
