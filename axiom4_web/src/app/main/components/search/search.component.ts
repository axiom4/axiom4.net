import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  modalRef: NgbModalRef | undefined;
  debounceTime = 300;
  opened = false;
  @Output('click.single') singleClick = new EventEmitter();

  ngOnInit() { }

  @HostListener('window:keydown.meta.f', ['$event'])
  public onKeyUp(eventData: KeyboardEvent) {
    eventData.preventDefault();
    eventData.stopImmediatePropagation();
    if (!this.opened)
      this.open();
  }
  constructor(private _modalService: NgbModal) { }

  open() {
    this.modalRef = this._modalService.open(SearchModalComponent, { size: 'lg' });
    this.modalRef.dismissed.subscribe(() => {
      console.log("search dismissed")
      this.opened = false;
    })

    this.modalRef.closed.subscribe(() => {
      console.log("search closed")
      this.opened = false;
    })

    this.opened = true
  }
}
