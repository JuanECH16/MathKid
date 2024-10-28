import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { UploadImg } from '../../data/interfaces/uploadImg.interface';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../data/interfaces/users.interface';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  form!:User;
  //file:UploadImg;

  public Form: FormGroup;

  uuid = uuidv4();

  constructor(private contactSvc: ContactsService, private fb: FormBuilder) {
    /*this.file = {
      nameFile: "",
      base64textString: null
    }*/

    this.Form = this.fb.group({
      userName:[''],
      email:[''],
      password:[''],
      name:[''],
      lastName:['']     
    })
  }

 /*selectFile(event:any){
    var files = event.target.files;
    var file = files[0];
    this.file.nameFile = `${this.uuid}-${file.name}`;

    if(files && file){
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }*/

  /*_handleReaderLoaded(readerEvent:any){
    var reader = readerEvent.target;
    this.file.base64textString = btoa(reader);
  }*/

  addContact() {
    this.form = {
      userName: this.Form.value.userName,
      email: this.Form.value.email,
      password: this.Form.value.password,
      name: this.Form.value.name,
      lastName: this.Form.value.lastName
    };
  
    const tableName = 'users'; // Especifica el nombre de la tabla aquí
  
    this.contactSvc.addContact(this.form, tableName).subscribe({
      next: res => {
        //this.upload();
  
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: JSON.stringify(res),
          showConfirmButton: true
        }).then((result) => {
          if (result) {
            location.reload();
          }
        });
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: JSON.stringify(error),
          showConfirmButton: true
        });
      }
    });
  }

  /*upload(){
    this.contactSvc.uploadFile(this.file)?.subscribe((data:User)=>{
      console.log(data);
    });
  }*/
}

