import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrlSubject = new BehaviorSubject<string>('');
  gameUrl$ = this.gameUrlSubject.asObservable();

  setGameUrl(url: string) {
    console.log(`URL del juego establecida en servicio: ${url}`);
    this.gameUrlSubject.next(url);
  }
}
