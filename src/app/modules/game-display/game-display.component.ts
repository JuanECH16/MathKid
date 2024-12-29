import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-game-display',
    templateUrl: './game-display.component.html',
    styleUrl: './game-display.component.scss',
    standalone: false
})
export class GameDisplayComponent implements OnInit {
    ngOnInit() {
        document.getElementById('name-game')!.textContent = localStorage.getItem('tableName');
    }
}
