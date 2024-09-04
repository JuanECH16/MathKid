import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';  // Ruta actualizada

@Component({
  selector: 'app-games-menu',
  templateUrl: './games-menu.component.html',
  styleUrl: './games-menu.component.scss'
})
export class GamesMenuComponent {
  constructor(private gameService: GameService, private router: Router) {}

  loadGame(gamePath: string) {
    this.gameService.setGameUrl(gamePath);
    this.router.navigate(['/game-display']);
    
  }
}
