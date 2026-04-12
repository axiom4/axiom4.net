import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostSearchComponent } from 'src/app/modules/blog/components/post-search/post-search.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SearchComponent {
  private modalService = inject(NgbModal);

  modalRef: NgbModalRef | undefined;
  opened = false;

  @HostListener('window:keydown.control.f', ['$event'])
  public onKeyUp(eventData: Event) {
    eventData.preventDefault();
    eventData.stopImmediatePropagation();
    if (!this.opened) this.open();
  }

  open() {
    this.modalRef = this.modalService.open(PostSearchComponent, { size: 'lg' });
    this.modalRef.dismissed.subscribe(() => {
      this.opened = false;
    });
    this.modalRef.closed.subscribe(() => {
      this.opened = false;
    });
    this.opened = true;
  }
}
