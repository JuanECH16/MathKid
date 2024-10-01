import { Component } from '@angular/core';
import { Contacts } from '../../data/interfaces/contacts.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { UploadImg } from '../../data/interfaces/uploadImg.interface';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  form!:Contacts;
  file:UploadImg;

  public Form: FormGroup;

  uuid = uuidv4();

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

  addContact(){
    this.form = {
      name: this.Form.value.name,
      phone: this.Form.value.phone,
      email: this.Form.value.email,
      image: this.file.nameFile
    }

    const tableName = 'contacto'; // Especifica el nombre de la tabla aquí

    this.contactSvc.addContact(this.form, tableName).subscribe(res => {
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

