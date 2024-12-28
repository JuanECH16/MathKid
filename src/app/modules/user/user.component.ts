import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: false
})
export class UserComponent implements OnInit {

  login: boolean = false;

  ngOnInit() {
    if (localStorage.getItem('userLoggedStg') == "true") {
      this.login = true;
    } else {
      this.login = false;
    }
  }
}
