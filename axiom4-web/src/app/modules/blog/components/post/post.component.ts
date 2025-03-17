import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  BlogPostsRetrieveRequestParams,
  BlogService,
  Post,
} from 'src/app/modules/core/api/v1';
import { HighlightService } from '../../services/highlight.service';
import { MarkedPipe } from '../../marked.pipe';
import { TagCloudComponent } from '../tag-cloud/tag-cloud.component';
import { NgIf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  imports: [NgIf, TagCloudComponent, DatePipe, MarkedPipe],
})
export class PostComponent implements OnInit, OnDestroy, AfterViewChecked {
  post: Post | undefined;
  subscription: Subscription | undefined;
  highlighted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private title: Title,
    private highlightService: HighlightService
  ) {}

  ngAfterViewChecked() {
    if (this.post && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getPost(id);
    }

    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id) {
          this.post = undefined;
          this.getPost(id);
        }
      }
    });
  }

  getPost(id: number) {
    const params: BlogPostsRetrieveRequestParams = {
      id: id,
    };
    this.blogService.blogPostsRetrieve(params).subscribe({
      next: (post) => {
        this.post = post;
        this.title.setTitle(post.title);
      },
      error: (error) => {
        this.router.navigate(['/notfound']);
        console.log(error);
      },
    });
  }
}
