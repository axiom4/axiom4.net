import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-search-modal',
  standalone: true,
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
  imports: [
    FormsModule
  ]
})
export class SearchModalComponent {
  searchText: string = '';
  constructor(public modal: NgbModal) { }

  close() {
    this.modal.dismissAll()
  }

  @ViewChild('search', { static: false })
  set search(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus()
    }
  }
}
