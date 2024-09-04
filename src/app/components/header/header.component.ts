import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  toggleMenu() {
    let menu = document.getElementById('optionsHeader');
    if (menu !== null) {
      menu.classList.toggle('active');
    }
  }
  
  nameUser = localStorage.getItem('userNameStg');

  loginUserStoraged = localStorage.getItem('userLoggedStg');

  nameSelect() {
    let nameStoraged = localStorage.getItem('userNameStg');


    if(this.loginUserStoraged === 'false'){
        nameStoraged = "Invitado";
    }

    alert('Hola ' + nameStoraged + ', ¿Cómo vas?');

    this.activateAdmmin();
  }

  numPressedAdmin = 0;
  activateAdmmin() {
      this.numPressedAdmin += 1;
      console.log(this.numPressedAdmin);
      if(this.numPressedAdmin === 3){
          //window.location.href = '/mathkid_online/html/saveDataGame.html';
          window.location.href = '/game-test';
          this.numPressedAdmin = 0;
      }
  }

  changePage() {
    if (this.loginUserStoraged === "true") {
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

    let miCuenta = document.getElementById('login');
    if(miCuenta !== null){
        miCuenta.textContent = 'Iniciar Sesión';
    }
  }
}
