import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterLink } from '@angular/router';
import { BlogService, ListPostsRequestParams, PostPreview } from 'src/app/modules/core/api/v1';
import { Subscription } from 'rxjs';
import { ConfigService, Configuration } from 'src/app/modules/utils';
import { TagCloudComponent } from '../tag-cloud/tag-cloud.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-search-list',
  templateUrl: './post-search-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, NgbPagination, TagCloudComponent, DatePipe]
})
export class PostSearchListComponent implements OnInit, OnDestroy {
  posts: PostPreview[] = []
  subscription: Subscription | undefined;
  currentPage = 1;
  pageSize = 1
  collectionSize = 0;
  notFound: boolean = false
  config: Configuration | undefined

  constructor(
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService) { }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.config = this.configService.getConfiguration()
    this.pageSize = this.config?.categoriesPageSize ?? 12;

    const category = this.route.snapshot.paramMap.get('category');

    if (category) {
      this.serchPostByCategory(category)
    }

    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const category = this.route.snapshot.paramMap.get('category');
        if (category) {
          this.serchPostByCategory(category)
        } else {
          this.notFound = true
          this.posts = []
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
        this.collectionSize = response.count ?? 0;
        this.posts = response.results ?? [];
      },
      error: (error) => {
        this.router.navigate(['/notfound'])
        console.log(error)
      }
    })
  }

  pageChange() {
    const category = this.route.snapshot.paramMap.get('category');
    if (category) {
      this.serchPostByCategory(category);
    } else {
      this.notFound = true
      this.posts = []
    }
  }
}
