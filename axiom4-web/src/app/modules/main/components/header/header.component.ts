import { Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigService, Configuration } from 'src/app/modules/utils';
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, SearchComponent],
  standalone: true
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  showLogo = false;
  config: Configuration | undefined;
  landscape: MediaQueryList | undefined;

  constructor(
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.landscape = window.matchMedia('(orientation: landscape)');
      this.landscape.addEventListener('change', (ev) => {
        console.log('landscape orientation', this.landscape?.matches);
      });
    }
  }

  ngOnInit(): void {
    this.config = this.configService.getConfiguration();
  }

  @ViewChild('navmenu') navmenu: ElementRef | undefined;

  toogleMenu() {
    if (this.navmenu)
      if (this.showMenu) this.navmenu.nativeElement.classList.remove('show');
      else this.navmenu.nativeElement.classList.add('show');

    this.showMenu = !this.showMenu;
  }
}
