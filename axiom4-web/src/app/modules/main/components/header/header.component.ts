import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfigService, Configuration } from 'src/app/modules/utils';
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, SearchComponent],
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  showLogo = false;
  config: Configuration | undefined;

  constructor(private configService: ConfigService) {
    this.landscape.addEventListener('change', (ev) => {
      console.log('landscape orientation', this.landscape.matches);
    });
  }

  ngOnInit(): void {
    this.config = this.configService.getConfiguration();
  }

  landscape = window.matchMedia('(orientation: landscape)');

  @ViewChild('navmenu') navmenu: ElementRef | undefined;

  toogleMenu() {
    if (this.navmenu)
      if (this.showMenu) this.navmenu.nativeElement.classList.remove('show');
      else this.navmenu.nativeElement.classList.add('show');

    this.showMenu = !this.showMenu;
  }
}
