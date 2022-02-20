import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../User";

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {

  @Input()
  user!:User;

  private currentUser!:User;

  isMyFriend:boolean = false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser()!;
    this.isMyFriend = this.currentUser.friends?.includes(this.user.id);
  }


  private addFriendToUser(friend:User,user:User) {
    if (!user.friends) {
      user.friends = [friend.id];
    }
    else {
      user.friends.push(friend.id);
    }
    this.userService.updateUser(user);
  }

  private removeFriendFromUser(friend:User,user:User) {
    user.friends = user.friends.filter((f) => f !== friend.id);
    this.userService.updateUser(user);
  }

  addFriend() {
    this.addFriendToUser(this.user,this.currentUser);
  }

  removeFriend() {
    this.removeFriendFromUser(this.user,this.currentUser);
  }


}
