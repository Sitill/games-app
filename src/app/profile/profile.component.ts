import { Component, OnInit } from '@angular/core';
import {User} from "../shared/User";
import {UserService} from "../services/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../login/login.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser!:User;

  profileForm!:FormGroup;

  emailMessage!:string;
  ageMessage!:string;

  profileUpdateSuccessful:boolean = true;
  profileUpdateMessage:string = '';


  constructor(private userService:UserService) {

  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser()!;
    this.profileForm = new FormGroup({
      username: new FormControl(this.currentUser.username),
      email: new FormControl(this.currentUser.email,[Validators.required,Validators.email]),
      age: new FormControl(this.currentUser.age,[Validators.min(0),Validators.max(120)])
    });
  }

  clearMessages(){
    this.profileUpdateMessage = '';
    this.emailMessage = '';
    this.ageMessage = '';
  }

  validForm(){
    let valid = true;
    if (this.profileForm.controls['email'].invalid) {
      valid = false;
      this.emailMessage = 'Invalid email';
    }
    if (this.profileForm.controls['age'].invalid) {
      valid = false;
      this.ageMessage = 'Age is out of bounds!';
    }
    return valid;
  }

  updateUserProfile() {
    this.clearMessages();
    if (this.validForm()) {
      const values = this.profileForm.value;
      this.currentUser.username = values.username;
      this.currentUser.age = values.age;
      this.currentUser.email = values.email;
      this.userService.updateUser(this.currentUser)
        .then(success => {
          if (success) {
            this.profileUpdateMessage = 'Profile updated!'
          } else {
            this.profileUpdateMessage = 'Profile update failed!'
            this.profileUpdateSuccessful = false;
          }
        });
    }
  }

}
