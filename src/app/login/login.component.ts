import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(4)])
  });

  loginMode:boolean = true;
  errorMessage!: string;
  emailMessage!:string;
  passwordMessage!:string;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.userService.userIsLoggedIn()) {
      this.goToMain();
    }
  }

  loginUser() {
    if (this.validForm()) {
      console.log(this.loginForm.value);
      this.userService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then((correct) => {
          if (correct) {
            this.goToMain();
          } else {
            this.errorMessage = 'No user with such an email and password found!';
            console.log('No such User');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  registerUser() {
    if (this.validForm()) {
      console.log(this.loginForm.value);
      this.userService.registerUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          this.changeMode();
        })
        .catch(error => {
          this.errorMessage = 'The user with such an email already exists!';
          console.log(error);
        });
    }

  }

  private goToMain() {
    this.router.navigateByUrl('');
  }

  accountAction() {
    this.clearMessages();
    if (this.loginMode) {
      this.loginUser();
    } else {
      this.registerUser();
    }
  }

  changeMode() {
    this.clearMessages();
    this.loginMode = !this.loginMode;
  }

  clearMessages(){
    this.errorMessage = '';
    this.emailMessage = '';
    this.passwordMessage = '';
  }

  validForm(){
    let valid = true;
    if (this.loginForm.controls['email'].invalid) {
      valid = false;
      this.emailMessage = 'Invalid email';
    }
    if (this.loginForm.controls['password'].invalid) {
      valid = false;
      this.passwordMessage = 'Password is too short!';
    }
    return valid;
  }

}
