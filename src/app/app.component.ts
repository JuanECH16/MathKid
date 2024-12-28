import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent {
  title = 'MathKid';

  iframeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // URL inicial del iframe
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/godot-game/index.html');
  }
}
