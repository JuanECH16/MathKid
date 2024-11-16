import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  /*userName = 'Juan';
  isLoggedIn = false;

  greet(){
    alert('Hello ' + this.userName);
  }

  logIn(){
    this.isLoggedIn = true;
  }*/

  constructor(private _router: Router) {}

  logOut(){
    localStorage.setItem('userLoggedStg', 'false');
    localStorage.setItem('userNameStg','');
    localStorage.setItem('idContact','');
    // location.reload();

    // Navegar a la nueva ruta
    this._router.navigate(['']).then(() => {
      // Actualizar la sesión después de la navegación
      sessionStorage.clear();
    });
  }
}
