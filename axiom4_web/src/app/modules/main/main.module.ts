import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { SearchModalComponent } from './components/search-modal/search-modal.component';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SearchComponent,
  ],
  providers: [
    NgbActiveModal
  ]
})
export class MainModule { }
