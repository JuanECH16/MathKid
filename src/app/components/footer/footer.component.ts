import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: false
})
export class FooterComponent {
  constructor(private _router: Router) { }

  toHome(event: Event){
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    this._router.navigate(['/home/']);
  }

  toContact(event: Event){
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    this._router.navigate(['/contact/']);
  }
}
