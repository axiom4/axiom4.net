import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './components/post/post.component';
import { MarkdownModule } from 'ngx-markdown';
import { PostSearchComponent } from './components/post-search/post-search.component';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../core/api/v1';
import { NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { PostListComponent } from './components/post-list/post-list.component';


@NgModule({
  declarations: [
    PostComponent,
    PostSearchComponent,
    PostListComponent
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
    PostListComponent
  ]
})
export class BlogModule { }
