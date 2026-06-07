import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BlogService, PostPreview } from '../../../core/api/v1';
import {
  CarouselComponent,
  CarouselSlideEvent,
  ConfigService,
  Configuration,
  ImageThumbPipe,
  SlideDirective,
} from '../../../utils';
import { PostSearchListComponent } from '../post-search-list/post-search-list.component';

@Component({
  selector: 'app-post-home-list',
  templateUrl: './post-home-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CarouselComponent,
    SlideDirective,
    RouterLink,
    PostSearchListComponent,
    ImageThumbPipe,
  ],
})
export class PostHomeListComponent {
  private configService = inject(ConfigService);
  private blogService = inject(BlogService);

  config: Configuration | undefined = this.configService.getConfiguration();
  activeSlideId = '';

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

  onSlide(event: CarouselSlideEvent) {
    this.activeSlideId = event.current;
  }
}
