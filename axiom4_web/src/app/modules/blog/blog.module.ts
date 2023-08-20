import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './components/post/post.component';
import { MarkdownModule } from 'ngx-markdown';
import { PostSearchComponent } from './components/post-search/post-search.component';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../core/api/v1';


@NgModule({
  declarations: [
    PostComponent,
    PostSearchComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    BlogRoutingModule,
    FormsModule
  ],
  providers: [CommonModule],
  exports: [
    PostSearchComponent
  ]
})
export class BlogModule { }
