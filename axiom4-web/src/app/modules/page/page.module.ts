import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './components/page/page.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    MarkdownModule.forChild()
  ],
  providers: [

  ]
})
export class PageModule { }
