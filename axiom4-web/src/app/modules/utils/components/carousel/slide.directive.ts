import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: 'ng-template[appSlide]',
})
export class SlideDirective {
  readonly templateRef = inject(TemplateRef);

  id = input.required<string>();
}
