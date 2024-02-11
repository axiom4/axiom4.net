import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { BlogModule } from '../blog/blog.module';



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        BlogModule,
        RouterModule,
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        PageNotFoundComponent,
        MainPageComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        PageNotFoundComponent,
        MainPageComponent
    ],
    providers: [
        NgbActiveModal
    ]
})
export class MainModule { }
