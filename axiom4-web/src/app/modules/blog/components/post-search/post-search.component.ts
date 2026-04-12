import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  inject,
  ChangeDetectionStrategy,
  DestroyRef,
} from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, distinctUntilChanged, switchMap, EMPTY } from 'rxjs';
import { BlogPostsListRequestParams, BlogService, PostPreview } from 'src/app/modules/core/api/v1';
import { ConfigService } from 'src/app/modules/utils';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, NgbPagination, DatePipe],
})
export class PostSearchComponent {
  private blogService = inject(BlogService);
  private destroyRef = inject(DestroyRef);
  public modal = inject(NgbModal);

  pageSize = inject(ConfigService).getConfiguration()?.searchPageSize ?? 1;

  posts = signal<PostPreview[]>([]);
  show_search = signal(true);
  show_not_found = signal(false);
  currentPage = signal(1);
  collectionSize = signal(0);

  searchText = '';
  readonly debounceMs = 250;

  private inputValue = new Subject<string>();

  @ViewChild('search', { static: false })
  set search(element: ElementRef<HTMLInputElement>) {
    if (element) {
      this._search = element.nativeElement;
      element.nativeElement.focus();
    }
  }

  _search: HTMLInputElement | undefined;

  constructor() {
    this.inputValue.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value) {
          this.posts.set([]);
          this.show_not_found.set(false);
          this.show_search.set(true);
          return EMPTY;
        }
        this.currentPage.set(1);
        this.show_search.set(false);
        return this.blogService.blogPostsList({
          search: value,
          page: 1,
          pageSize: this.pageSize,
          ordering: '-created_at',
        });
      }),
      takeUntilDestroyed()
    ).subscribe(response => {
      this.collectionSize.set(response.count ?? 0);
      this.posts.set(response.results ?? []);
      this.show_not_found.set((response.results?.length ?? 0) === 0);
    });
  }

  close() {
    this.modal.dismissAll();
  }

  onInput(e: Event) {
    const search = (e.target as HTMLInputElement).value;
    if (search.length === 0) {
      this.posts.set([]);
      this.show_not_found.set(false);
      this.show_search.set(true);
    }
    this.inputValue.next(search);
  }

  onClear() {
    this.searchText = '';
    this.posts.set([]);
    this.show_not_found.set(false);
    this.show_search.set(true);
    this.inputValue.next('');
    this._search?.focus();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    if (!this.searchText) return;
    const params: BlogPostsListRequestParams = {
      search: this.searchText,
      page,
      pageSize: this.pageSize,
      ordering: '-created_at',
    };
    this.blogService.blogPostsList(params).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(response => {
      this.collectionSize.set(response.count ?? 0);
      this.posts.set(response.results ?? []);
      this.show_not_found.set((response.results?.length ?? 0) === 0);
    });
    this._search?.focus();
  }
}
