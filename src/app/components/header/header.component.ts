import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../data/services/contact_service/contacts.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  nameUser: string | null = '';
  loginUserStoraged: string | null = '';

  numPressedAdmin: number = 0;

  constructor(private router: Router, private _contactSvc: ContactsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.nameUser = localStorage.getItem('userNameStg');
    this.loginUserStoraged = localStorage.getItem('userLoggedStg');
    this.updateUserName();
    this.cdr.detectChanges();
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
    
    this.checkUser();

    alert('Hola ' + this.nameUser + ', ¿Cómo vas?');

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
      // Redirigir al perfil del usuario
      this.router.navigate(['/user/profile']);
    } else {
      // Redirigir a la página login
      this.router.navigate(['/user/login']);
    }
  }

  /*emptyAll() {
    //localStorage.setItem('userNameStg', '');
    localStorage.setItem('userLoggedStg', 'false');
    this.updateUserName();

    const miCuenta = document.getElementById('login');
    if (miCuenta) {
      miCuenta.textContent = 'Iniciar Sesión';
    }
  }*/

  handleLoginClick(event: Event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
    //this.emptyAll();
    this.changePage();
  }

  updateUserName() {
    const userNameElement = document.getElementById('userName');
    const loginBtnMsg = document.getElementById('login');

    this._contactSvc.updateUserName(userNameElement!, loginBtnMsg!, this.checkUser(), this.nameUser!).subscribe((data: boolean) => {
      console.log(data);
      this.cdr.detectChanges();
    });
  }

  checkUser(){
    this.nameUser = localStorage.getItem('userNameStg');

    if(this.loginUserStoraged == "true"){
      return true;
    }else{
      this.nameUser = 'Invitado';
      localStorage.setItem('idContact', "4");
      localStorage.setItem('userNameStg', 'Invitado');
      return false;
    }
  }
}