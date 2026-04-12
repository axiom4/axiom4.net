import { Component, ElementRef, ViewChild, Inject, PLATFORM_ID, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigService, Configuration } from 'src/app/modules/utils';
import { SearchComponent } from '../search/search.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, SearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class HeaderComponent {
  showMenu = false;
  config: Configuration | undefined = inject(ConfigService).getConfiguration();

  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private landscape: MediaQueryList | undefined;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const handler = () => {};
      this.landscape = window.matchMedia('(orientation: landscape)');
      this.landscape.addEventListener('change', handler);
      this.destroyRef.onDestroy(() => this.landscape?.removeEventListener('change', handler));
    }
  }

  @ViewChild('navmenu') navmenu: ElementRef | undefined;

  toogleMenu() {
    if (this.navmenu) {
      if (this.showMenu) this.navmenu.nativeElement.classList.remove('show');
      else this.navmenu.nativeElement.classList.add('show');
    }
    this.showMenu = !this.showMenu;
  }
}

