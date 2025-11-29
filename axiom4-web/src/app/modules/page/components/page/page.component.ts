import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  BlogPagesRetrieveRequestParams,
  BlogService,
  Page,
} from 'src/app/modules/core/api/v1';
import { MarkedPipe } from '../../marked.pipe';
import { DatePipe } from '@angular/common';
import { HighlightService } from 'src/app/modules/blog/services/highlight.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  imports: [DatePipe, MarkedPipe],
  standalone: true,
})
export class PageComponent implements OnInit, OnDestroy, AfterViewChecked {
  page: Page | undefined;
  currentRoute: string | undefined;
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
    if (this.page && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      const tag = params.get('tag');
      if (tag) {
        this.page = undefined;
        this.highlighted = false;
        this.getPage(tag);
      }
    });
  }

  getPage(tag: string) {
    const params: BlogPagesRetrieveRequestParams = {
      tag: tag,
    };
    this.blogService.blogPagesRetrieve(params).subscribe({
      next: (page) => {
        this.page = page;
        this.title.setTitle(page.title);
      },
      error: (error) => {
        this.router.navigate(['/notfound']);
        console.log(error);
      },
    });
  }
}
