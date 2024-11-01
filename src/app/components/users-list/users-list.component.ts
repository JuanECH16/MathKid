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

  //file:UploadImg;
  noImage = '../assets/img/NoImage.webp';

  constructor(private contactSvc: ContactsService, private fb: FormBuilder, private _router: Router) {
    /*this.file = {
      nameFile: "",
      base64textString: null
    }*/
  }
  
  ngOnInit() {
    this.getContact(localStorage.getItem('idContact')!);
  }

  getAllContacts(){
    this.contactSvc.getContacts().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  // setDefaultImage(event: Event) {
  //   const element = event.target as HTMLImageElement;
  //   element.src = this.noImage;
  // }

  updateUser(id:string){
    if(this.getContact(id)){
      this._router.navigate(['/user/update/']);
    }
  }

  deleteUser(id:string){
    if(this.getContact(id)){
      this.contactSvc.deleteContact(id).subscribe((res: User[]) => {
        console.log(res);
        localStorage.setItem('userLoggedStg', 'false');
        localStorage.setItem('userNameStg', '');
        localStorage.setItem('idContact', '');
        this.getAllContacts();
      });
    }
  }

  getContact(id:string){
    return this.contactSvc.getContact(id).subscribe((res: User[]) => {
      this.users = res;
      localStorage.setItem('idContact',this.users[0].id_user!);
    });
  }
}