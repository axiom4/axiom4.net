import { Component, OnInit } from '@angular/core';
import { BlogService, ListPostsRequestParams, PostPreview } from 'src/app/modules/core/api/v1';
import { ConfigService, Configuration } from 'src/app/modules/utils';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-home-list',
  templateUrl: './post-home-list.component.html',
  standalone: true,
  imports: [NgbCarousel, NgFor, NgbSlide, RouterLink]
})
export class PostHomeListComponent implements OnInit {
  page: number = 1;
  numOfPages: number = 3;
  posts: PostPreview[] = [];
  config: Configuration | undefined;

  constructor(private configService: ConfigService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.config = this.configService.getConfiguration()
    this.loadPostPreview();
  }

  loadPostPreview() {
    this.numOfPages = this.config?.searchPageSize ?? 5

    const params: ListPostsRequestParams = {
      page: this.page,
      pageSize: this.numOfPages,
      ordering: "-created_at"
    }

    this.blogService.listPosts(params).subscribe(response => {
      this.posts = response.results ?? [];
    })
  }
}
