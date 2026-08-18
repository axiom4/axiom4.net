import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostHomeListComponent } from '../../blog/post-home-list/post-home-list';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostHomeListComponent],
})
export class MainPageComponent {}
