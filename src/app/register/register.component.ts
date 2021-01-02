import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  userDetails: any;

  constructor(private fb: FormBuilder, private utility: UtilityService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.buildForm();
  }

  private buildForm() {
    const form = this.fb.group({
      firstName: ['', [
        Validators.required, Validators.pattern('[A-Za-z]{1,15}')
      ]],
      lastName: ['', [
        Validators.required, Validators.pattern('[A-Za-z]{1,15}')
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
      ]],
      password: ['', [
        Validators.required ]],
      confirmPassword: ['', [
        Validators.required ]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
    return form;
  }

  get form() {
    return this.registerForm.controls;
  }

  signUp() {
    if (this.registerForm.valid) {
      const userDetails = {
        firstName: this.form.firstName.value,
        lastName: this.form.lastName.value,
        email: this.form.email.value,
        password: this.form.password.value
      };
      this.utility.setCookieAsObject('user', userDetails);
      this.router.navigateByUrl('/dashboard');
    }
  }

  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
  
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

}
