import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ContactsService } from '../../data/services/contact_service/contacts.service';
import { UploadImg } from '../../data/interfaces/uploadImg.interface';
import { Router } from '@angular/router';
import { User } from '../../data/interfaces/users.interface';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent implements OnInit{
  uuid = uuidv4();
  user:User[] = [];
  
  file:UploadImg;
  public Form: FormGroup;
  form!:User;

  constructor(private contactSvc: ContactsService, private fb: FormBuilder, private _router: Router) {
    this.file = {
      nameFile: "",
      base64textString: null
    }

    this.Form = this.fb.group({
      //image:null,
      userName:[''],
      email:[''],
      password:[''],
      name:[''],
      lastName:['']     
    })
  }
  ngOnInit() {
    this.getContact(localStorage.getItem('idContact')!);
    this.closeForm();
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
  }
  
  _handleReaderLoaded(readerEvent:any){
    var reader = readerEvent.target;
    this.file.base64textString = btoa(reader);
  }*/

  getContact(id:string){
    this.contactSvc.getContact(id).subscribe((res: User[]) => {
      this.user = res;

      this.Form.setValue({
        userName: this.user[0].userName,
        email: this.user[0].email,
        password: this.user[0].password,
        name: this.user[0].name,
        lastName: this.user[0].lastName
      });

      localStorage.setItem('idContact',this.user[0].id_user!);
      //localStorage.setItem('idImage',this.user[0]['image']!);
    });
  }

  closeForm(){
    this.Form.reset();
    //localStorage.removeItem('idContact');
    //localStorage.removeItem('idImage');
  }

  /*submitForm(correo: string) {
    const filteredEmail = this.filterEmail(correo);
    localStorage.setItem("userNameStg", filteredEmail);
    this._router.navigate(['']);
  }*/

  editContact(){
    this.form = {
      id_user: localStorage.getItem('idContact')!,
      userName: this.Form.value.userName,
      email: this.Form.value.email,
      password: this.Form.value.password,
      name: this.Form.value.name,
      lastName: this.Form.value.lastName
    };

    this.contactSvc.editContact(this.form).subscribe((res: User[]) => {
      const index = this.form.id_user;
      if(index != null){
        this.user = res;
        localStorage.setItem('userNameStg', this.form.userName!);
      }
      
      console.log(res);
      this._router.navigate(['']);
    });
  }

  /*private filterEmail(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  }*/
}
