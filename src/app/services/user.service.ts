import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {User} from "../shared/User";
import {objectToArray} from "./functions";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_GROUP_REF:string= '/users/';
  private USER_KEY_LOCAL_STORAGE: string = 'currentUser';


  constructor(private firebase: AngularFireDatabase) {
  }

  registerUser(email:string, password: string) {
    return this.userIsRegistered(email)
      .then(registered => {
        if (registered) {
          throw new Error('User already registered');
        }
        else {
          const ref = this.firebase.database.ref(this.USER_GROUP_REF);
          const key = ref.push().key;
          const user:User = {
            id: key!,
            username:'',
            email:email,
            age:18,
            password:password,
            friends:[],
            games:[]
          };
          return ref.child(user.id).update(user);
        }
      });
  }

  userIsRegistered(email:string) {
    return this.findUserByEmail(email)
      .then(user => {
        return !!user;
      });
  }

  getUserFromSnapshot(snapshot: any) {
    const obj = snapshot.val();
    const keys = Object.keys(obj);
    return obj[keys[0]];
  }

  findUserByEmail(email:string) {
    return this.firebase.database.ref(this.USER_GROUP_REF)
      .orderByChild('email').equalTo(email).get()
      .then(snapshot => {
        if(snapshot.exists()){
          return this.getUserFromSnapshot(snapshot);
        }
        return null;
      })
      .catch(error => {
        console.log(error);
      });
  }


  userIsLoggedIn(): boolean {
    const user = localStorage.getItem(this.USER_KEY_LOCAL_STORAGE);
    return !!user;
  }

  currentUser():User|null {
    if (this.userIsLoggedIn()) {
      return JSON.parse(localStorage.getItem(this.USER_KEY_LOCAL_STORAGE)!);
    }
    return null;
  }

  logOut() {
    localStorage.removeItem(this.USER_KEY_LOCAL_STORAGE);
  }

  loginUser(email: string, password: string) {
    return this.findUserByEmail(email)
      .then(user => {
        if (user) {
          console.log('User in db: ',user);

          const correctUser = user.email === email && user.password === password;
          if (correctUser) {
            this.saveCurrentUser(user);
          }
          return correctUser;
        } else {
          console.log("No data available");
          return false;
        }
      });
  }

  updateUser(user: User) {
    this.updateUserInDB(user);
    if (this.currentUser()?.id === user.id) {
      this.saveCurrentUser(user);
    }
  }

  private updateUserInDB(user: User) {
    return this.firebase.database.ref(this.USER_GROUP_REF+user.id).update(user);
  }

  private saveCurrentUser(user: User) {
    localStorage.setItem(this.USER_KEY_LOCAL_STORAGE,JSON.stringify(user));
  }


  getUsers(callback: Function){
    this.firebase.database.ref(this.USER_GROUP_REF).on('value', (snapshot) => {
      if (snapshot.exists()) {
        callback(objectToArray(snapshot.val()));
      } else {
        callback(null);
      }
    });
  }

  isMyFriend(currentUser:User):Function {
    return (user:User):boolean => {
      return currentUser.friends?.includes(user.id);
    }
  }


  userHasSearchString(searchString:string):Function {
    return (user:User):boolean => {
      searchString = searchString.toLowerCase();
      return (user.username.toLowerCase().includes(searchString)
          || user.email.toLowerCase().includes(searchString))
        && user.id !== this.currentUser()!.id;
    }
  }





}
