import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private userService: UserService, private router:Router) { }


  goToSignIn() {
    this.router.navigateByUrl('/account');
  }

  logOut() {
    this.userService.logOut();
    this.goToSignIn();
  }
}
