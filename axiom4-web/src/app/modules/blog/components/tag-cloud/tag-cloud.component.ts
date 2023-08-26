import { Component, OnInit } from '@angular/core';
import { BlogService, Category } from 'src/app/modules/core/api/v1';
import { CloudTacCategory } from '../../models/cloud-tag-category';



@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.scss']
})
export class TagCloudComponent implements OnInit {
  categories: CloudTacCategory[] = []
  min = 0
  max = 0

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.listCategorys().subscribe(categories => {
      this.buildTagClod(categories);
    })
  }

  buildTagClod(categories: Category[]) {
    const shuffle = (array: CloudTacCategory[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    var fontMin = 1;
    var fontMax = 10;

    if (categories && categories.length > 0) {
      this.min = Number(categories[0].posts)
      this.max = Number(categories[0].posts)

      for (let i = 0; i < categories.length; i++) {
        if (Number(categories[i].posts) < this.min)
          this.min = Number(categories[i].posts)

        if (Number(categories[i].posts) > this.max)
          this.max = Number(categories[i].posts)
      }

      for (let i = 0; i < categories.length; i++) {
        var tag = categories[i];

        const category: CloudTacCategory = {
          id: Number(categories[i].id),
          name: categories[i].name,
          weight: Number(tag.posts) == this.min ? fontMin : (Number(tag.posts) / this.max) * (fontMax - fontMin) + fontMin
        }

        this.categories.push(category)
        this.categories = shuffle(this.categories)
      }
    }
  }


}
