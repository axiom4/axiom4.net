import { Component } from '@angular/core';
import { TagCloudComponent } from '../../../blog/components/tag-cloud/tag-cloud.component';
import { PostHomeListComponent } from '../../../blog/components/post-home-list/post-home-list.component';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    standalone: true,
    imports: [PostHomeListComponent, TagCloudComponent]
})
export class MainPageComponent {

}
