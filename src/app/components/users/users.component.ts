import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  userName = 'Juan';
  isLoggedIn = false;

  greet(){
    alert('Hello ' + this.userName);
  }

  logIn(){
    this.isLoggedIn = true;
  }
}
