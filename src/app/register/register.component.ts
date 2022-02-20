import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login/login.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(4)])
  });

  constructor(private router: Router, private userService:UserService)
  { }

  registerUser() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.userService.registerUser(this.registerForm.value.email, this.registerForm.value.password)
        .then(() => {
          this.goToLogin();
        })
        .catch(error => {
          console.log(error);
        });
    }

  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
