import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Type,
  createComponent,
  inject,
} from '@angular/core';
import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';

export interface ModalOptions {
  size?: 'sm' | 'lg' | 'xl';
}

export class ModalRef<T = unknown> {
  readonly componentInstance: T;

  private readonly hiddenSubject = new Subject<void>();

  readonly closed = this.hiddenSubject.asObservable();
  readonly dismissed = this.hiddenSubject.asObservable();

  constructor(
    componentRef: ComponentRef<T>,
    private readonly modalElement: HTMLElement,
    private readonly modalInstance: Modal,
    private readonly onHidden: () => void,
  ) {
    this.componentInstance = componentRef.instance;

    this.modalElement.addEventListener(
      'hidden.bs.modal',
      () => {
        this.hiddenSubject.next();
        this.hiddenSubject.complete();
        this.onHidden();
      },
      { once: true },
    );
  }

  close() {
    this.modalInstance.hide();
  }

  dismiss() {
    this.modalInstance.hide();
  }
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);

  private readonly openModals = new Set<ModalRef>();

  open<T>(component: Type<T>, options: ModalOptions = {}): ModalRef<T> {
    const modalElement = document.createElement('div');
    modalElement.className = 'modal fade';
    modalElement.tabIndex = -1;
    modalElement.setAttribute('role', 'dialog');
    modalElement.setAttribute('aria-modal', 'true');

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog modal-dialog-scrollable modal-dialog-centered';
    if (options.size) dialog.classList.add(`modal-${options.size}`);
    modalElement.appendChild(dialog);

    const content = document.createElement('div');
    content.className = 'modal-content';
    dialog.appendChild(content);

    document.body.appendChild(modalElement);

    const componentRef = createComponent(component, {
      environmentInjector: this.injector,
      hostElement: content,
    });
    this.appRef.attachView(componentRef.hostView);

    const modalInstance = new Modal(modalElement, { backdrop: true, keyboard: true });

    const onHidden = () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      modalInstance.dispose();
      modalElement.remove();
      this.openModals.delete(modalRef);
    };

    const modalRef: ModalRef<T> = new ModalRef<T>(componentRef, modalElement, modalInstance, onHidden);
    this.openModals.add(modalRef);

    modalInstance.show();

    return modalRef;
  }

  dismissAll() {
    for (const modalRef of [...this.openModals]) {
      modalRef.dismiss();
    }
  }
}
