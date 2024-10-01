import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Contacts } from '../../data/interfaces/contacts.interface';
import { UploadImg } from '../../data/interfaces/uploadImg.interface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  contacts:any=[];

  file:UploadImg;
  noImage = '../assets/img/NoImage.webp';
  form!:Contacts;
  uuid = uuidv4();

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
    this.getContacts();
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

  getContacts(){
    this.contactSvc.getContacts().subscribe({
      next: res => {
        this.contacts = res;
        console.log(this.contacts);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  addContact(){
    this.form = {
      name: this.Form.value.name,
      phone: this.Form.value.phone,
      email: this.Form.value.email,
      image: this.file.nameFile
    }

    this.contactSvc.addContact(this.form).subscribe(res=>{
      this.upload();

      Swal.fire({
        icon:'success',
        title:'Success',
        text:res,
        showConfirmButton:true
      }).then((result)=>{
        if(result){
          location.reload();
        }
      });
    });
  }

  upload(){
    this.contactSvc.uploadFile(this.file)?.subscribe((data:any)=>{
      console.log(data);
    });
  }
}
