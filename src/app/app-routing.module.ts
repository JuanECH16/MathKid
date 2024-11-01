import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { GameComponent } from './components/game/game.component';
import { GameTestComponent } from './components/game-test/game-test.component';
import { GamesMenuComponent } from './components/games-menu/games-menu.component';
import { GameDisplayComponent } from './modules/game-display/game-display.component';
import { UserComponent } from './modules/user/user.component';
import { UserLoginComponent } from './modules/user-login/user-login.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { UserRegisterComponent } from './modules/user-register/user-register.component';
import { UserUpdateComponent } from './modules/user-update/user-update.component';
import { UserDeleteComponent } from './modules/user-delete/user-delete.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ContactComponent } from './modules/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent},
  { path: 'game-test', component: GameTestComponent },
  { path: 'games-menu', component: GamesMenuComponent },
  { path: 'game-display', component: GameDisplayComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'user/update', component: UserUpdateComponent },
  { path: 'user/delete', component: UserDeleteComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
