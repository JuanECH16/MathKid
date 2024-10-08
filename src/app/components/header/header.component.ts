import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  nameUser: string | null = '';
  loginUserStoraged: string | null = '';
  numPressedAdmin = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.nameUser = localStorage.getItem('userNameStg');
    this.loginUserStoraged = localStorage.getItem('userLoggedStg');
    this.updateUserName();
  }

  toggleMenu(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    const menu = document.getElementById('optionsHeader');
    if (menu) {
      menu.classList.toggle('active');
    }
  }

  nameSelect(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    let nameStoraged = localStorage.getItem('userNameStg');

    if (this.loginUserStoraged === 'false') {
      nameStoraged = 'Invitado';
    }

    alert('Hola ' + nameStoraged + ', ¿Cómo vas?');

    this.activateAdmin();
  }

  activateAdmin() {
    this.numPressedAdmin += 1;
    console.log(this.numPressedAdmin);
    if (this.numPressedAdmin === 3) {
      this.router.navigate(['/user/profile']);
      this.numPressedAdmin = 0;
    }
  }

  changePage() {
    if (this.loginUserStoraged === 'true') {
      // Redirigir a la página principal
      this.router.navigate(['']);
    } else {
      // Redirigir a la página login
      this.router.navigate(['/user']);
    }
  }

  emptyAll() {
    //localStorage.setItem('userNameStg', '');
    localStorage.setItem('userLoggedStg', 'false');
    this.updateUserName();

    const miCuenta = document.getElementById('login');
    if (miCuenta) {
      miCuenta.textContent = 'Iniciar Sesión';
    }
  }

  handleLoginClick(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    //this.emptyAll();
    this.changePage();
  }

  updateUserName() {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
      const userName = localStorage.getItem('userNameStg');
      userNameElement.textContent = userName ? userName : 'Invitado';
    }
  }
}