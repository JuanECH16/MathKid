import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  messageAlert(){
    alert("Gracias por su mensaje, lo contactaremos lo antes posible.");
  }
}