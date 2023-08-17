import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('navmenu') navmenu: ElementRef | undefined;

  hideMenu() {
    if (this.navmenu)
      this.navmenu.nativeElement.classList.remove('show');
  }

}

