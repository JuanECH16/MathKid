import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {

  constructor(private _router:Router){}

  mostrarElementRemember(){
    
  }

  mostrarElementRegister(){
    this._router.navigate(['/user/register']);
  }
}
