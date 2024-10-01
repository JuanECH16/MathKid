import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userName = 'Juan';
  isLoggedIn = false;

  greet(){
    alert('Hello ' + this.userName);
  }

  logIn(){
    this.isLoggedIn = true;
  }
}