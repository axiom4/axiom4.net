import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostSearchComponent } from './components/post-search/post-search.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostHomeListComponent } from './components/post-home-list/post-home-list.component';
import { TagCloudComponent } from './components/tag-cloud/tag-cloud.component';
import { PostSearchListComponent } from './components/post-search-list/post-search-list.component';
import { MarkedPipe } from './marked.pipe';
import { HighlightService } from './services/highlight.service';

@NgModule({
  declarations: [
    PostComponent,
    PostSearchComponent,
    PostHomeListComponent,
    TagCloudComponent,
    PostSearchListComponent,
    MarkedPipe
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [CommonModule, HighlightService],
  exports: [
    PostSearchComponent,
    PostHomeListComponent,
    TagCloudComponent
  ]
})
export class BlogModule { }
