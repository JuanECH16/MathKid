import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Games } from '../../interfaces/games.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrlSubject = new BehaviorSubject<string>('');
  gameUrl$ = this.gameUrlSubject.asObservable();
  
  constructor(private http: HttpClient){}

  url: string = "";

  setGameUrl(url: string) {
    console.log(`URL del juego establecida en servicio: ${url}`);
    this.gameUrlSubject.next(url);
  }

  getGames(id:string): Observable<Games[]> {
    return this.http.get<Games[]>(`${this.url}/index.php?id=${id}`);
  }
}
