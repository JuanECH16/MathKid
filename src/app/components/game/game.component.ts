import { Component, Input } from '@angular/core';
import { GameService } from '../../data/services/game_service/game.service'; // Ruta relativa al archivo del servicio
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  // @Input() username = ''; // Comunicación de padre a hijo

  // games = [
  //   {
  //     title: 'Super Mario Bros',
  //     year: 1985
  //   },
  //   {
  //     title: 'The Legend of Zelda',
  //     year: 1986
  //   }
  // ];

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
