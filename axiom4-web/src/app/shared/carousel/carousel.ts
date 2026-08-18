import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  afterNextRender,
  input,
  output,
  signal,
} from '@angular/core';
import { Carousel } from 'bootstrap';
import { SlideDirective } from './slide.directive';

export interface CarouselSlideEvent {
  prev: string;
  current: string;
  direction: 'left' | 'right';
}

@Component({
  selector: 'app-carousel',
  imports: [NgTemplateOutlet],
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(SlideDirective) private slidesQuery!: QueryList<SlideDirective>;
  @ViewChild('carouselEl', { static: true })
  private carouselEl!: ElementRef<HTMLElement>;

  interval = input(0);
  ariaLabel = input('Carousel');

  slide = output<CarouselSlideEvent>();

  protected slides = signal<SlideDirective[]>([]);

  private instance: Carousel | undefined;

  constructor() {
    afterNextRender(() => this.initCarousel());
  }

  ngAfterContentInit() {
    this.slides.set(this.slidesQuery.toArray());
  }

  ngOnDestroy() {
    this.instance?.dispose();
  }

  prev() {
    this.instance?.prev();
  }

  next() {
    this.instance?.next();
  }

  select(id: string) {
    const index = this.slides().findIndex((s) => s.id() === id);
    if (index >= 0) this.instance?.to(index);
  }

  private initCarousel() {
    const el = this.carouselEl.nativeElement;
    const intervalMs = this.interval();

    (el as Element).addEventListener('slide.bs.carousel', (event: Carousel.Event) => {
      const slides = this.slides();
      this.slide.emit({
        prev: slides[event.from]?.id() ?? '',
        current: slides[event.to]?.id() ?? '',
        direction: event.direction,
      });
    });

    this.instance = new Carousel(el, {
      interval: intervalMs > 0 ? intervalMs : false,
      ride: intervalMs > 0 ? 'carousel' : false,
      pause: 'hover',
      wrap: true,
    });
  }
}
