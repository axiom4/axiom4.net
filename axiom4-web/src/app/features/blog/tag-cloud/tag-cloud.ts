import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BlogService, Category } from '../../../core/api/v1';
import { CloudTacCategory } from '../../models/cloud-tag-category';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class TagCloudComponent {
  private blogService = inject(BlogService);

  categories = toSignal(
    this.blogService
      .blogCategoriesList()
      .pipe(map((values) => this.buildTagClod(values))),
    { initialValue: [] as CloudTacCategory[] },
  );

  shuffle(array: CloudTacCategory[]): CloudTacCategory[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  buildTagClod(categories: Category[]): CloudTacCategory[] {
    if (!categories?.length) return [];

    const fontMin = 1;
    const fontMax = 10;
    const postCounts = categories.map((c) => Number(c.posts));
    const min = Math.min(...postCounts);
    const max = Math.max(...postCounts);

    const mapped = categories.map((tag) => ({
      id: Number(tag.id),
      name: tag.name,
      weight:
        Number(tag.posts) === min
          ? fontMin
          : (Number(tag.posts) / max) * (fontMax - fontMin) + fontMin,
    }));

    return this.shuffle(mapped);
  }
}
