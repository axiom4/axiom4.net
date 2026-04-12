import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { catchError, EMPTY, map, merge, Subject, switchMap, tap } from 'rxjs';
import {
  BlogPostsListRequestParams,
  BlogService,
  PostPreview,
} from 'src/app/modules/core/api/v1';
import { ConfigService, ImageThumbPipe } from 'src/app/modules/utils';
import { TagCloudComponent } from '../tag-cloud/tag-cloud.component';

@Component({
  selector: 'app-post-search-list',
  templateUrl: './post-search-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgbPagination,
    TagCloudComponent,
    DatePipe,
    ImageThumbPipe,
  ],
})
export class PostSearchListComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);

  pageSize = inject(ConfigService).getConfiguration()?.categoriesPageSize ?? 8;

  currentPage = signal(1);
  posts = signal<PostPreview[]>([]);
  collectionSize = signal(0);
  notFound = signal(false);
  loading = signal(true);
  skeletonCards = Array.from({ length: this.pageSize }, (_, i) => i);
  currentCategory = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('category'))),
    { initialValue: null as string | null },
  );

  private pageChange$ = new Subject<number>();

  constructor() {
    const categoryChange$ = this.route.paramMap.pipe(
      map((params) => params.get('category')),
      tap(() => this.currentPage.set(1)),
      map((category) => ({ category, page: 1 })),
    );

    const pageChange$ = this.pageChange$.pipe(
      map((page) => ({
        category: this.route.snapshot.paramMap.get('category'),
        page,
      })),
    );

    merge(categoryChange$, pageChange$)
      .pipe(
        switchMap(({ category, page }) => {
          const params: BlogPostsListRequestParams = {
            page,
            pageSize: this.pageSize,
            ordering: '-created_at',
            ...(category ? { categoriesName: category } : {}),
          };
          return this.blogService.blogPostsList(params).pipe(
            catchError(() => {
              this.router.navigate(['/notfound']);
              return EMPTY;
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((response) => {
        this.collectionSize.set(response.count ?? 0);
        this.posts.set(response.results ?? []);
        this.notFound.set((response.results?.length ?? 0) === 0);
        this.loading.set(false);
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.pageChange$.next(page);
  }
}
