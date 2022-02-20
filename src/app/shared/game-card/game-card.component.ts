import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../Game";
import {UserService} from "../../services/user.service";
import {User} from "../User";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input()
  game!:Game;

  @Input()
  library!:boolean;



  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

  }


  addToLibrary() {
    const user:User = this.userService.currentUser()!;
    if (user.games){
      user.games.push(this.game.id);
    }else {
      user.games = [this.game.id];
    }
    this.userService.updateUser(user);
  }
}
