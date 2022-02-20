import { Component, OnInit } from '@angular/core';
import {Game} from "../shared/Game";
import {GameService} from "../services/game.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  games:Game[] = [];
  isLoading:boolean = true;
  errorOccurred:boolean = false;

  constructor(public gameService: GameService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.gameService.getGames((games:Game[]|null) => {
      this.isLoading = true;
      this.errorOccurred = false;
      if(games){
        this.games = games;
        this.isLoading = false;
      }else{
        this.errorOccurred = true;
      }
    });
  }

}
