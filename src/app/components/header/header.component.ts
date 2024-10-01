import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  nameUser: string | null = '';
  loginUserStoraged: string | null = '';
  numPressedAdmin = 0;

  ngOnInit() {
    this.nameUser = localStorage.getItem('userNameStg');
    this.loginUserStoraged = localStorage.getItem('userLoggedStg');
  }

  toggleMenu() {
    const menu = document.getElementById('optionsHeader');
    if (menu) {
      menu.classList.toggle('active');
    }
  }

  nameSelect() {
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
      window.location.href = '/game-test';
      this.numPressedAdmin = 0;
    }
  }

  changePage() {
    if (this.loginUserStoraged === 'true') {
      // Redirigir a la página principal
      window.parent.location.href = '/index.html';
    } else {
      // Redirigir a la página login
      window.parent.location.href = '/users-register';
    }
  }

  emptyAll() {
    let nameUser = document.getElementById('userName');

    localStorage.setItem('userNameStg', '');
    localStorage.setItem('userLoggedStg', 'false');

    /*if(nameUser !== null){
        nameUser.style.display = "none";
    }else{
        nameUser.style.display = "block";
    }*/

    const miCuenta = document.getElementById('login');
    if (miCuenta) {
      miCuenta.textContent = 'Iniciar Sesión';
    }
  }
}
