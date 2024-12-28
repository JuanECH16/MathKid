import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent implements OnInit {

  login: boolean = false;

  ngOnInit() {
    if (!sessionStorage.getItem('idContact')) {
      console.log("Primera vez que entra");

      if (localStorage.getItem('userNameStg') != "Invitado") {
        // window.location.reload();
        this.login = true;
      }
    } else {
      console.log("Usuario logueado");

      if (localStorage.getItem('userNameStg') != "Invitado" && localStorage.getItem('userLoggedStg') == "false") {
        // window.location.reload();
      }
    }
  }
}
