import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { BlogService, ListPostsRequestParams, PostPreview } from 'src/app/modules/core/api/v1';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-search-list',
  templateUrl: './post-search-list.component.html',
  styleUrls: ['./post-search-list.component.scss']
})
export class PostSearchListComponent implements OnInit, OnDestroy {
  posts: PostPreview[] = []
  subscription: Subscription | undefined;
  currentPage = 1;
  pageSize = 1
  collectionSize = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService) { }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category');

    if (category) {
      this.serchPostByCategory(category)
    }

    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const category = this.route.snapshot.paramMap.get('category');
        if (category) {
          this.serchPostByCategory(category)
        }
      }
    });
  }

  serchPostByCategory(category: string) {
    const params: ListPostsRequestParams = {
      categoriesName: category,
      page: this.currentPage,
      pageSize: this.pageSize,
      ordering: "-create_at"
    }
    this.blogService.listPosts(params).subscribe({
      next: (response) => {
        this.collectionSize = response.count || 0;
        this.posts = response.results || [];
      },
      error: (error) => {
        this.router.navigate(['/notfound'])
        console.log(error)
      }
    })
  }

  pageChange() {
    const category = this.route.snapshot.paramMap.get('category');
    if (category)
      this.serchPostByCategory(category);
  }
}
