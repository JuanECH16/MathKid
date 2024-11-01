import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

import { SafeUrlPipe } from './data/pipes/safe-url';  // Importa el Pipe aquí

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './modules/home/home.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { GamesMenuComponent } from './components/games-menu/games-menu.component';
import { UserRegisterComponent } from './modules/user-register/user-register.component';
import { GameTestComponent } from './components/game-test/game-test.component';
import { GameDisplayComponent } from './modules/game-display/game-display.component';
import { provideHttpClient } from '@angular/common/http';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DomSecurePipe } from './data/pipes/dom-secure.pipe';
import { ContactComponent } from './modules/contact/contact.component';
import { UserUpdateComponent } from './modules/user-update/user-update.component';
import { UserLoginComponent } from './modules/user-login/user-login.component';
import { UserComponent } from './modules/user/user.component';
import { UserDeleteComponent } from './modules/user-delete/user-delete.component';

@NgModule({
  declarations: [
    SafeUrlPipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GameComponent,
    HomeComponent,
    UserProfileComponent,
    GamesMenuComponent,
    UserRegisterComponent,
    GameTestComponent,
    GameDisplayComponent,
    UsersListComponent,
    DomSecurePipe,
    ContactComponent,
    UserUpdateComponent,
    UserLoginComponent,
    UserComponent,
    UserDeleteComponent
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
