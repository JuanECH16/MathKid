import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  nameUser: string | null = '';
  loginUserStoraged: string | null = '';

  constructor(private _router:Router){}

  mostrarElementRemember(){
    this._router.navigate(['/user/update']);
  }

  mostrarElementRegister(){
    this._router.navigate(['/user/register']);
  }

  submitForm(correo: string) {
    const filteredEmail = this.filterEmail(correo);
    localStorage.setItem("userNameStg", filteredEmail);
    this._router.navigate(['/home']);
  }

  private filterEmail(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  }
}
