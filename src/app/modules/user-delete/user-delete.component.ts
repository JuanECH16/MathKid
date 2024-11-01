import { Component } from '@angular/core';
import { User } from '../../data/interfaces/users.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.scss'
})
export class UserDeleteComponent {
  public Form: FormGroup;
  form!:User;

  constructor(private contactSvc: ContactsService, private fb: FormBuilder, private _router: Router) {
    this.Form = this.fb.group({
      //image:null,
      userName:[''],
      email:[''],
      password:[''],
      name:[''],
      lastName:['']     
    })
  }

  deleteContact(){
    console.log("asdasd");
  }
}
