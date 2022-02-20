import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { ProfileComponent } from './profile/profile.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";

import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "./services/user.service";
import {AppGuard} from "./app.guard";
import { MainComponent } from './main/main.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GamesComponent } from './games/games.component';
import { SearchComponent } from './search/search.component';
import { GameCardComponent } from './shared/game-card/game-card.component';
import {GameService} from "./services/game.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSliderModule} from "@angular/material/slider";
import { FilterPipe } from './pipes/filter.pipe';
import { LibraryComponent } from './library/library.component';
import { FriendsComponent } from './friends/friends.component';
import { FriendCardComponent } from './shared/friend-card/friend-card.component';
import {RegisterComponent} from "./register/register.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    MainComponent,
    GamesComponent,
    SearchComponent,
    GameCardComponent,
    FilterPipe,
    LibraryComponent,
    FriendsComponent,
    FriendCardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [
    UserService,
    AppGuard,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
