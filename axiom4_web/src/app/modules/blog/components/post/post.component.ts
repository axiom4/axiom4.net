import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, Router, NavigationEnd } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import { BlogService, Post, RetrievePostRequestParams } from 'src/app/modules/core/api/v1';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [MarkdownService]
})
export class PostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  currentRoute: string | undefined;
  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private title: Title) { }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPage(id)
    }

    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.post = undefined
          this.getPage(id)
        }
      }
    });
  }

  getPage(id: string) {
    const params: RetrievePostRequestParams = {
      id: id
    }
    this.blogService.retrievePost(params).subscribe({
      next: (post) => {
        this.post = post
        this.title.setTitle(post.title)
      },
      error: (error) => {
        this.router.navigate(['/notfound'])
        console.log(error)
      }
    })
  }
}
