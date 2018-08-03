import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../_services/user.service';
import { errorMessages } from '../_constants/error-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
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
    console.log(this.errors.firstName);
  }

  register() {
    this.submitted = true;
  }

  // Return for easy access
  get f() {
    return this.form.controls;
  }

}
