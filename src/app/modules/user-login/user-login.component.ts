import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { User } from '../../data/interfaces/users.interface';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  nameUser: string | null = '';
  loginUserStoraged: string | null = '';

  constructor(private _router:Router, private _contactSvc:ContactsService){}

  mostrarElementRemember(){
    this._router.navigate(['/user/update']);
  }

  mostrarElementRegister(){
    this._router.navigate(['/user/register']);
  }

  /*submitForm(correo: string) {
    const filteredEmail = this.filterEmail(correo);
    localStorage.setItem("userNameStg", filteredEmail);
    this._router.navigate(['/home']);
  }*/

  loginContact(email: string, password: string, event: Event) {
    event.preventDefault();
    this._contactSvc.loginContact(email,password).subscribe((data: User[]) => {
      console.log(data);
      if(data == null){
        console.log("Error en Correo o Contraseña");
      }else{
        localStorage.setItem("userNameStg", data[0].userName);
        localStorage.setItem('userLoggedStg', "true");
        localStorage.setItem('idContact', data[0].id_user!);
        this._router.navigate(['/home']);
      }
    });
  }

  /*private filterEmail(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  }*/
}
