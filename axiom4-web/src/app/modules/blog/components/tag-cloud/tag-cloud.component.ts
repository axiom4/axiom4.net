import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BlogService, Category } from 'src/app/modules/core/api/v1';
import { CloudTacCategory } from '../../models/cloud-tag-category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  imports: [RouterLink],
})
export class TagCloudComponent implements OnInit {
  categories: CloudTacCategory[] = [];
  min = 0;
  max = 0;

  constructor(
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.blogService.blogCategoriesList().subscribe((values) => {
      this.buildTagClod(values);
      this.cdr.detectChanges();
    });
  }

  shuffle(array: CloudTacCategory[]): CloudTacCategory[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  buildTagClod(categories: Category[]) {
    let fontMin = 1;
    let fontMax = 10;

    if (categories && categories.length > 0) {
      this.min = Number(categories[0].posts);
      this.max = Number(categories[0].posts);

      for (let tag of categories) {
        if (Number(tag.posts) < this.min) this.min = Number(tag.posts);

        if (Number(tag.posts) > this.max) this.max = Number(tag.posts);
      }

      const tempCategories: CloudTacCategory[] = [];
      for (let tag of categories) {
        const category: CloudTacCategory = {
          id: Number(tag.id),
          name: tag.name,
          weight:
            Number(tag.posts) == this.min
              ? fontMin
              : (Number(tag.posts) / this.max) * (fontMax - fontMin) + fontMin,
        };

        tempCategories.push(category);
      }
      this.categories = this.shuffle(tempCategories);
    }
  }
}
