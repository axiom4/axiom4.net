import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  collectionSize = input.required<number>();
  pageSize = input(10);
  page = input(1);
  maxSize = input(5);

  pageChange = output<number>();

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.collectionSize() / this.pageSize())),
  );

  pages = computed(() => {
    const total = this.totalPages();
    const max = Math.min(this.maxSize(), total);
    const current = this.page();
    let start = Math.max(1, current - Math.floor(max / 2));
    const end = Math.min(total, start + max - 1);
    start = Math.max(1, end - max + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  select(page: number) {
    if (page < 1 || page > this.totalPages() || page === this.page()) return;
    this.pageChange.emit(page);
  }
}
