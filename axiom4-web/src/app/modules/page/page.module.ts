import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './components/page/page.component';
import { MarkedPipe } from './marked.pipe';


@NgModule({
    imports: [
        CommonModule,
        PageRoutingModule,
        PageComponent,
        MarkedPipe,
    ],
    providers: []
})
export class PageModule { }
