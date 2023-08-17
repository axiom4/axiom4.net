import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showMenu = false;

  @ViewChild('navmenu') navmenu: ElementRef | undefined;

  toogleMenu() {
    if (this.navmenu)
      if (this.showMenu)
        this.navmenu.nativeElement.classList.remove('show');
      else
        this.navmenu.nativeElement.classList.add('show');

    this.showMenu = !this.showMenu;
  }

}

