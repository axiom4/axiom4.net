import { Component, HostListener } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostSearchComponent } from 'src/app/modules/blog/components/post-search/post-search.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
})
export class SearchComponent {
  modalRef: NgbModalRef | undefined;
  opened = false;

  @HostListener('window:keydown.control.f', ['$event'])
  public onKeyUp(eventData: Event) {
    eventData.preventDefault();
    eventData.stopImmediatePropagation();
    if (!this.opened) this.open();
  }
  constructor(private _modalService: NgbModal) {}

  open() {
    this.modalRef = this._modalService.open(PostSearchComponent, {
      size: 'lg',
    });
    this.modalRef.dismissed.subscribe(() => {
      this.opened = false;
    });

    this.modalRef.closed.subscribe(() => {
      console.log('search closed');
      this.opened = false;
    });

    this.opened = true;
  }
}
