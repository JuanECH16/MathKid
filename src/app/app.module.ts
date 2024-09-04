import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SafeUrlPipe } from './pipes/safe-url';  // Importa el Pipe aquí

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GamesComponent } from './components/games/games.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { GamesMenuComponent } from './components/games-menu/games-menu.component';
import { UsersRegisterComponent } from './components/users-register/users-register.component';
import { GameTestComponent } from './components/game-test/game-test.component';
import { GameDisplayComponent } from './components/game-display/game-display.component';

@NgModule({
  declarations: [
    SafeUrlPipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    HomeComponent,
    UsersComponent,
    GameDetailComponent,
    GamesMenuComponent,
    UsersRegisterComponent,
    GameTestComponent,
    GameDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
