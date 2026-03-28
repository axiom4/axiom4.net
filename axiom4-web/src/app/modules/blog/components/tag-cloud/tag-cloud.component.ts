import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BlogService, Category } from 'src/app/modules/core/api/v1';
import { CloudTacCategory } from '../../models/cloud-tag-category';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class TagCloudComponent {
  private blogService = inject(BlogService);

  categories = toSignal(
    this.blogService.blogCategoriesList().pipe(
      map(values => this.buildTagClod(values))
    ),
    { initialValue: [] as CloudTacCategory[] }
  );

  shuffle(array: CloudTacCategory[]): CloudTacCategory[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  buildTagClod(categories: Category[]): CloudTacCategory[] {
    let fontMin = 1;
    let fontMax = 10;

    if (categories && categories.length > 0) {
      let min = Number(categories[0].posts);
      let max = Number(categories[0].posts);

      for (let tag of categories) {
        if (Number(tag.posts) < min) min = Number(tag.posts);
        if (Number(tag.posts) > max) max = Number(tag.posts);
      }

      const tempCategories: CloudTacCategory[] = [];
      for (let tag of categories) {
        const category: CloudTacCategory = {
          id: Number(tag.id),
          name: tag.name,
          weight:
            Number(tag.posts) == min
              ? fontMin
              : (Number(tag.posts) / max) * (fontMax - fontMin) + fontMin,
        };
        tempCategories.push(category);
      }
      return this.shuffle(tempCategories);
    }
    return [];
  }
}
