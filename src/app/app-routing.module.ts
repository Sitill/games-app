import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {MainComponent} from "./main/main.component";
import {AppGuard} from "./app.guard";
import {GamesComponent} from "./games/games.component";
import {LibraryComponent} from "./library/library.component";
import {FriendsComponent} from "./friends/friends.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AppGuard],
    children: [
      {path: '', redirectTo: 'games', pathMatch: 'full'},
      {path: 'games', component: GamesComponent},
      {path: 'library', component: LibraryComponent},
      {path: 'friends', component: FriendsComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  },
  {path: 'account', component: LoginComponent},
  {path: '**', redirectTo:'account'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
