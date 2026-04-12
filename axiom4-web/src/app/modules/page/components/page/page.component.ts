import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { HighlightService } from 'src/app/modules/blog/services/highlight.service';
import { BlogService } from 'src/app/modules/core/api/v1';
import { MarkedPipe } from 'src/app/modules/utils/marked.pipe';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, MarkedPipe],
  standalone: true,
})
export class PageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private title = inject(Title);
  private highlightService = inject(HighlightService);

  page = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('slug')),
      filter((slug): slug is string => !!slug),
      switchMap((slug) =>
        this.blogService.blogPagesRetrieve({ tag: slug }).pipe(
          tap((page) => {
            this.title.setTitle(page.title);
            this.highlightService.highlightAll();
          }),
          catchError(() => {
            this.router.navigate(['/notfound']);
            return EMPTY;
          }),
        ),
      ),
    ),
  );
}
