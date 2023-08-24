import { Component, OnInit } from '@angular/core';
import { BlogService, ListPostsRequestParams, Post, PostPreview } from 'src/app/modules/core/api/v1';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: PostPreview[] = []

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    const params: ListPostsRequestParams = {
      page: 1,
      pageSize: 5,
      ordering: "-created_at"
    }

    this.blogService.listPosts(params).subscribe(response => {
      this.posts = response.results || []
    })
  }

}
