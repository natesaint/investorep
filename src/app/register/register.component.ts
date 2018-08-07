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
      username: ['',             Validators.compose([Validators.required])],
      email: ['',                Validators.compose([Validators.required])],
      password: ['',             Validators.compose([Validators.required])],
      passwordConfirmation: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.loading = true;
  }

  // Register a new user, send request only when format is validated and handle errors
  register() {
    this.submitted = true;
    this.accountDuplicate = false;

    let user: User = Object.assign({}, this.form.value);

    if (this.form.valid) {
      this.userService.create(user).subscribe(
        data => {
            console.log('user created');
        },
        error => {
            this.accountDuplicate = true;
            console.log(error);
        }
      );
    }
  }

  // Return form controls for easy access
  get f() {
    return this.form.controls;
  }
}
