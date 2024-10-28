import { Component, Input, OnInit, Output } from '@angular/core';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadImg } from '../../data/interfaces/uploadImg.interface';
import { Router } from '@angular/router';
import { User } from '../../data/interfaces/users.interface';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  users:User[]=[];
  //@Input() users:any;

  file:UploadImg;
  noImage = '../assets/img/NoImage.webp';

  public Form: FormGroup;

  constructor(private contactSvc: ContactsService, private fb: FormBuilder, private _router: Router) {
    this.file = {
      nameFile: "",
      base64textString: null
    }

    this.Form = this.fb.group({
      userName:[''],
      email:[''],
      password:[''],
      name:[''],
      lastName:['']     
    })
  }
  
  ngOnInit() {
    this.getContacts();
  }

  getContacts(){
    const tableName = localStorage.getItem('tableName') || 'users'; // Especifica el nombre de la tabla aquí
    this.contactSvc.getContacts().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  // setDefaultImage(event: Event) {
  //   const element = event.target as HTMLImageElement;
  //   element.src = this.noImage;
  // }

  getContact(id:string){
    this.contactSvc.getContact(id).subscribe((res: User[]) => {
      this.users = res;

      this.Form.setValue({
        userName: this.users[0]['userName'],
        email: this.users[0]['email'],
        password: this.users[0]['password'],
        name: this.users[0]['name'],
        lastName: this.users[0]['lastName']
      });

      localStorage.setItem('idContact',this.users[0]['id_user']!);
    });

    this.updateUser();
  }

  updateUser(){
    this._router.navigate(['/user/update/']);
  }
}