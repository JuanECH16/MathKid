import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { FormBuilder } from '@angular/forms';
import { UploadImg } from '../../data/interfaces/uploadImg.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  contacts:any=[];

  file:UploadImg;
  noImage = '../assets/img/NoImage.webp';

  constructor(private contactSvc: ContactsService, private fb: FormBuilder) {
    this.file = {
      nameFile: "",
      base64textString: null
    }
  }
  
  ngOnInit() {
    const tableName = localStorage.getItem('tableName') || 'contacto'; // Especifica el nombre de la tabla aquí
    this.contactSvc.getContacts(tableName).subscribe((res: any[]) => {
      this.contacts = res;
    });
  }

  setDefaultImage(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = this.noImage;
  }
}
