import {Component, OnInit} from '@angular/core';
import {GameService} from "../services/game.service";
import {Game} from "../shared/Game";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games:Game[] = [];
  isLoading:boolean = true;
  errorOccurred:boolean = false;
  minPrice:number = 0;
  maxPrice:number = 0;
  price:number = 0;

  searchString:string = '';

  public INDIE:string = 'indie';
  public ACTION:string = 'action';
  public ADVENTURE:string = 'adventure';

  tags:string[] = [];

  constructor(public gameService: GameService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.gameService.getGames((games:Game[]|null) => {
      console.log('Updating game array',games);
      this.isLoading = true;
      this.errorOccurred = false;
      if(games){
        this.games = games;
        this.initMinMaxPrice();
        console.log(this.games);
        this.isLoading = false;
      }else{
        this.errorOccurred = true;
      }
    });
  }

  checkboxHandler(tag:string,event:any){
    if (event.currentTarget.checked) {
      this.tags.push(tag);
    } else {
      this.tags = this.tags.filter(t => t !== tag);
    }
  }

  private initMinMaxPrice() {
    let min = Infinity;
    let max = -Infinity;
    this.games.forEach(g => {
      max = Math.max(max,g.price);
      min = Math.min(min,g.price);
    });
    this.minPrice =  min;
    this.maxPrice = max;
    this.price = max;
  }
}
