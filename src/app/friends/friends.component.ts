import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../shared/User";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  users:User[] = [];
  isLoading:boolean = true;
  errorOccurred:boolean = false;

  searchString:string = '';

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers((users:User[]|null) => {
      this.isLoading = true;
      this.errorOccurred = false;
      if(users){
        this.users = users;
        this.isLoading = false;
      }else{
        this.errorOccurred = true;
      }
    });
  }

}
