import { Component } from '@angular/core';
import { TagCloudComponent } from '../../../blog/components/tag-cloud/tag-cloud.component';
import { PostHomeListComponent } from '../../../blog/components/post-home-list/post-home-list.component';
import { PostSearchListComponent } from 'src/app/modules/blog/components/post-search-list/post-search-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  imports: [PostHomeListComponent],
})
export class MainPageComponent {}
