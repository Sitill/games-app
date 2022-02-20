import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "../shared/User";
import {Game} from "../shared/Game";
import {objectToArray} from "./functions";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private GAMES_GROUP_REF = 'games';

  constructor(private firebase: AngularFireDatabase) {
  }

  getGames(callback: Function){
    this.firebase.database.ref(this.GAMES_GROUP_REF).on('value', (snapshot) => {
      console.log('value changed!');
      if (snapshot.exists()) {
        callback(objectToArray(snapshot.val()));
      } else {
        callback(null);
      }
    });
  }

  gameIsNotInUserLibrary(user:User) {
    return (game:Game) => {
      return !user.games?.includes(game.id);
    }
  }

  gameIsInUserLibrary(user:User) {
    return (game:Game) => {
      return user.games?.includes(game.id);
    }
  }

  gamePriceIsGTE(price:number):Function {
    return (game:Game): boolean => {
      return game.price <= price;
    }
  }

  gameHasAnyTag(tags:string[]):Function {
    return (game:Game) : boolean => {
      if (tags.length === 3 || tags.length === 0) return true;
      return tags.includes(game.tag);
    }
  }

  gameHasText(text:string):Function {
    return (game:Game):boolean => {
      text = text.toLowerCase();
      return game.name.toLowerCase().includes(text)||
        game.description.toLowerCase().includes(text);
    }
  }

}
