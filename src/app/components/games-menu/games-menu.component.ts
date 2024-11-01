import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../data/services/game_service/game.service';  // Ruta actualizada
import { Games } from '../../data/interfaces/games.interface';

@Component({
  selector: 'app-games-menu',
  templateUrl: './games-menu.component.html',
  styleUrl: './games-menu.component.scss'
})
export class GamesMenuComponent implements OnInit {

  gamePath: any = localStorage.getItem("gameUrl");
  gameName: any = localStorage.getItem("tableName");

  games:Games[]=[];

  constructor(private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    //this.loadGame(this.gamePath,this.gameName);
  }

  loadGame(gamePath: string, gameName: string) {
    this.gameService.setGameUrl(gamePath);
    localStorage.setItem('gameUrl', gamePath);
    localStorage.setItem('tableName', gameName);
    this.router.navigate(['/game-display']);
  }

  getGames(id:string){
    //const tableName = localStorage.getItem('tableName') || 'users'; // Especifica el nombre de la tabla aquí
    this.gameService.getGames(id).subscribe((res: Games[]) => {
      this.games = res;
    });
  }
}
