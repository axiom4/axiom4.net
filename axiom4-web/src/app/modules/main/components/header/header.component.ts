import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConfigService, Configuration } from 'src/app/modules/utils';
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, SearchComponent, NgIf],
})
export class HeaderComponent implements OnInit {
  showMenu = false;
  showLogo = false;
  config: Configuration | undefined;
  height = 0;

  constructor(private configService: ConfigService) {
    this.landscape.addEventListener('change', (ev) => {
      console.log('landscape orientation', this.landscape.matches);
      this.height = window.innerHeight;
      console.log('height', this.height);

      if (this.height > 375) {
        this.showLogo = true;
        this.showMenu = false;
      } else {
        this.showLogo = false;
        this.showMenu = false;
      }
    });
  }

  ngOnInit(): void {
    this.config = this.configService.getConfiguration();
    this.height = window.innerHeight;
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
