import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { BlogService, PostPreview } from 'src/app/modules/core/api/v1';
import {
  ConfigService,
  Configuration,
  ImageThumbPipe,
} from 'src/app/modules/utils';
import { PostSearchListComponent } from '../post-search-list/post-search-list.component';

@Component({
  selector: 'app-post-home-list',
  templateUrl: './post-home-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgbCarousel,
    NgbSlide,
    RouterLink,
    PostSearchListComponent,
    ImageThumbPipe,
  ],
})
export class PostHomeListComponent {
  private configService = inject(ConfigService);
  private blogService = inject(BlogService);

  config: Configuration | undefined = this.configService.getConfiguration();

  posts = toSignal(
    this.blogService
      .blogPostsList({
        page: 1,
        pageSize: this.config?.searchPageSize ?? 5,
        ordering: '-created_at',
      })
      .pipe(map((r) => r.results ?? [])),
    { initialValue: [] as PostPreview[] },
  );
}
