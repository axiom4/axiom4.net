import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostHomeListComponent } from '../../../blog/components/post-home-list/post-home-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostHomeListComponent],
})
export class MainPageComponent {}
