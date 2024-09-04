import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';  // Ruta relativa al archivo del servicio

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrl: './game-display.component.scss'
})
export class GameDisplayComponent implements OnInit {
  gameUrl: string = '';

  constructor(private gameService: GameService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.gameService.gameUrl$.subscribe(url => {
      this.gameUrl = url;
      console.log(`URL recibida en display: ${this.gameUrl}`);
      window.scrollTo(0, 0);
    });
  }
}
