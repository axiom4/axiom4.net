import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { BlogService } from 'src/app/modules/core/api/v1';
import { MarkedPipe } from 'src/app/modules/utils/marked.pipe';
import { HighlightService } from '../../services/highlight.service';
import { TagCloudComponent } from '../tag-cloud/tag-cloud.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TagCloudComponent, DatePipe, MarkedPipe],
  standalone: true,
})
export class PostComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);
  private title = inject(Title);
  private highlightService = inject(HighlightService);

  post = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      filter((id) => !!id),
      switchMap((id) =>
        this.blogService.blogPostsRetrieve({ id }).pipe(
          tap((post) => {
            this.title.setTitle(post.title);
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
