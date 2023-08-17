import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(private _modalService: NgbModal) { }

  open() {
    const modalRef = this._modalService.open(SearchModalComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }
}
