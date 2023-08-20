import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './components/post/post.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    BlogRoutingModule
  ]
})
export class BlogModule { }
