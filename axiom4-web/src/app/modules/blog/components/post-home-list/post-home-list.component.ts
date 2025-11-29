import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  BlogPostsListRequestParams,
  BlogService,
  PostPreview,
} from 'src/app/modules/core/api/v1';
import { ConfigService, Configuration } from 'src/app/modules/utils';
import { RouterLink } from '@angular/router';

import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { PostSearchListComponent } from '../post-search-list/post-search-list.component';

@Component({
  selector: 'app-post-home-list',
  templateUrl: './post-home-list.component.html',
  imports: [NgbCarousel, NgbSlide, RouterLink, PostSearchListComponent],
})
export class PostHomeListComponent implements OnInit {
  page: number = 1;
  numOfPages: number = 3;
  posts: PostPreview[] = [];
  config: Configuration | undefined;

  constructor(
    private configService: ConfigService,
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.config = this.configService.getConfiguration();
    this.loadPostPreview();
  }

  loadPostPreview() {
    this.numOfPages = this.config?.searchPageSize ?? 5;

    const params: BlogPostsListRequestParams = {
      page: this.page,
      pageSize: this.numOfPages,
      ordering: '-created_at',
    };

    this.blogService.blogPostsList(params).subscribe((response) => {
      this.posts = response.results ?? [];
      this.cdr.detectChanges();
    });
  }
}
