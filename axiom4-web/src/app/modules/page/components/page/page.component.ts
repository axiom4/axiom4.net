import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import { BlogService, Page, RetrievePageRequestParams } from 'src/app/modules/core/api/v1';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [MarkdownService]
})
export class PageComponent implements OnInit, OnDestroy {
  page: Page | undefined;
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
    const tag = this.route.snapshot.paramMap.get('tag');
    if (tag) {
      this.getPage(tag)
    }

    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const tag = this.route.snapshot.paramMap.get('tag');
        if (tag) {
          this.page = undefined
          this.getPage(tag)
        }
      }
    });
  }

  getPage(tag: string) {
    const params: RetrievePageRequestParams = {
      tag: tag
    }
    this.blogService.retrievePage(params).subscribe({
      next: (page) => {
        this.page = page
        this.title.setTitle(page.title)
      },
      error: (error) => {
        this.router.navigate(['/notfound'])
        console.log(error)
      }
    })
  }
}
