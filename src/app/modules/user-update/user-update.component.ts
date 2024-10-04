import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { UploadImg } from '../../data/interfaces/uploadImg.interface';
import { Contacts } from '../../data/interfaces/contacts.interface';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent implements OnInit{
  uuid = uuidv4();
  contact:any;
  
  file:UploadImg;
  public Form: FormGroup;

  constructor(private contactSvc: ContactsService, private fb: FormBuilder) {
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
    this.getContact(localStorage.getItem('idContact')!);
    this.closeForm();
  }
  
  selectFile(event:any){
    var files = event.target.files;
    var file = files[0];
    this.file.nameFile = `${this.uuid}-${file.name}`;

    if(files && file){
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  
  _handleReaderLoaded(readerEvent:any){
    var reader = readerEvent.target;
    this.file.base64textString = btoa(reader);
  }

  getContact(id:string){
    this.contactSvc.getContact(id).subscribe((res: Contacts[]) => {
      this.contact = res;

      this.Form.setValue({
        name: this.contact[0]['name'],
        phone: this.contact[0]['phone'],
        email: this.contact[0]['email'],
        image: null
      });

      //localStorage.setItem('idContact',this.contact[0]['id']);
      //localStorage.setItem('idImage',this.contact[0]['image']);
    });
  }

  editContact(){
    
  }

  closeForm(){
    this.Form.reset();
    localStorage.removeItem('idContact');
    localStorage.removeItem('idImage');
  }
}
