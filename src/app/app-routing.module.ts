import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { GameTestComponent } from './components/game-test/game-test.component';
import { GamesMenuComponent } from './components/games-menu/games-menu.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { UsersComponent } from './components/users/users.component';
import { UsersRegisterComponent } from './components/users-register/users-register.component';
import { GameDisplayComponent } from './components/game-display/game-display.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'game-test', component: GameTestComponent },
  { path: 'games-menu', component: GamesMenuComponent },
  { path: 'games-detail', component: GameDetailComponent },
  { path: 'game-display', component: GameDisplayComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users-register', component: UsersRegisterComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
