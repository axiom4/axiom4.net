import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { ModalRef, ModalService } from '../../../utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SearchComponent {
  private modalService = inject(ModalService);

  modalRef: ModalRef | undefined;
  opened = false;

  @HostListener('window:keydown.control.f', ['$event'])
  public onKeyUp(eventData: Event) {
    eventData.preventDefault();
    eventData.stopImmediatePropagation();
    if (!this.opened) this.open();
  }

  async open() {
    const { PostSearchComponent } =
      await import('../../../blog/components/post-search/post-search.component');
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
