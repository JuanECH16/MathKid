import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSecure'
})
export class DomSecurePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){}

  transform(value: string): any {
    let url = 'http://localhost/apiphpserver/views/img/';

    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }

}
