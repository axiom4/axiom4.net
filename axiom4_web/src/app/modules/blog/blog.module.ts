import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './components/post/post.component';
import { MarkdownModule } from 'ngx-markdown';
import { PostSearchComponent } from './components/post-search/post-search.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostHomeListComponent } from './components/post-home-list/post-home-list.component';
import { TagCloudComponent } from './components/tag-cloud/tag-cloud.component';
import { PostSearchListComponent } from './components/post-search-list/post-search-list.component';


@NgModule({
  declarations: [
    PostComponent,
    PostSearchComponent,
    PostHomeListComponent,
    TagCloudComponent,
    PostSearchListComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    BlogRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [CommonModule],
  exports: [
    PostSearchComponent,
    PostHomeListComponent,
    TagCloudComponent
  ]
})
export class BlogModule { }
