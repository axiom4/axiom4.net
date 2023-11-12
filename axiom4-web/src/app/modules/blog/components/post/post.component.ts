import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogService, Post, RetrievePostRequestParams } from 'src/app/modules/core/api/v1';
import { HighlightService } from '../../services/highlight.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
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
  ) { }

  ngAfterViewChecked() {
    if (this.post && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPost(id)
    }

    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.post = undefined
          this.getPost(id)
        }
      }
    });
  }

  getPost(id: string) {
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
