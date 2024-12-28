import { Component } from '@angular/core';
import { GameService } from '../../data/services/game_service/game.service';  // Ruta relativa al archivo del servicio

@Component({
    selector: 'app-game-test',
    templateUrl: './game-test.component.html',
    styleUrl: './game-test.component.scss',
    standalone: false
})
export class GameTestComponent {
  gameUrl: string = '/assets/godot-game/index.html';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.gameUrl$.subscribe(url => {
      this.gameUrl = url;
      console.log(`URL recibida en display: ${this.gameUrl}`);
      // Recargar la página
    });
  }

  ngAfterViewInit() {
    // Asegurarse de que el iframe esté visible
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
