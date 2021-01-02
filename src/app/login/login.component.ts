import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errorMessage: string;
  viewSignUpBtn = false;

  constructor(private fb: FormBuilder, private utility: UtilityService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.buildForm();
  }

  private buildForm() {
    const form = this.fb.group({
      email: [''],
      password: ['']
    });
    return form;
  }

  get form() {
    return this.loginForm.controls;
  }

  signIn() {
    const isUserExist = this.utility.checkCookieExist('user');
    const userEmail = this.form.email.value;
    const userPassword = this.form.password.value;
    if (isUserExist) {
      const authenticateUser = JSON.parse(this.utility.getCookie('user'));
      if ((authenticateUser.email === userEmail) && (authenticateUser.password === userPassword)) {
        this.utility.setCookieAsValue('isLoggedIn', true);
        this.router.navigateByUrl('/dashboard');
      }
    } else {
      this.viewSignUpBtn = true;
      this.errorMessage = 'Sorry You are not authorized!!';
      this.removeErrorMessage();
    }
  }

  routeToRegisterPage() {
    this.router.navigateByUrl('/register');
  }

  removeErrorMessage() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

}
