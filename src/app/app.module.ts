import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

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
import { provideHttpClient } from '@angular/common/http';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DomSecurePipe } from './pipes/dom-secure.pipe';

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
    GameDisplayComponent,
    UsersListComponent,
    DomSecurePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
