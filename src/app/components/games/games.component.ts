import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  @Input() username = ''; // Comunicación de padre a hijo

  games = [
    {
      title: 'Super Mario Bros',
      year: 1985
    },
    {
      title: 'The Legend of Zelda',
      year: 1986
    }
  ];
}
