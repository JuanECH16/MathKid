import { Component, Input, OnInit, Output } from '@angular/core';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadImg } from '../../data/interfaces/uploadImg.interface';
import { Contacts } from '../../data/interfaces/contacts.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  contacts:any=[];
  //@Input() contact:any;

  file:UploadImg;
  noImage = '../assets/img/NoImage.webp';

  public Form: FormGroup;

  constructor(private contactSvc: ContactsService, private fb: FormBuilder, private _router: Router) {
    this.file = {
      nameFile: "",
      base64textString: null
    }

    this.Form = this.fb.group({
      name:[''],
      phone:[''],
      email:[''],
      image:null
    })
  }
  
  ngOnInit() {
    this.getContacts();
  }

  getContacts(){
    const tableName = localStorage.getItem('tableName') || 'contacto'; // Especifica el nombre de la tabla aquí
    this.contactSvc.getContacts().subscribe((res: Contacts[]) => {
      this.contacts = res;
    });
  }

  setDefaultImage(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = this.noImage;
  }

  getContact(id:string){
    this.contactSvc.getContact(id).subscribe((res: Contacts[]) => {
      this.contacts = res;

      this.Form.setValue({
        name: this.contacts[0]['name'],
        phone: this.contacts[0]['phone'],
        email: this.contacts[0]['email'],
        image: null
      });

      localStorage.setItem('idContact',this.contacts[0]['id']);
      localStorage.setItem('idImage',this.contacts[0]['image']);
    });

    this.updateUser();
  }

  updateUser(){
    this._router.navigate(['/user/update/']);
  }
}