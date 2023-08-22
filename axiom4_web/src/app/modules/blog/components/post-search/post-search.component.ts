import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { BlogService, ListPostsRequestParams, Post } from 'src/app/modules/core/api/v1';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
  providers: [NgbPagination]
})
export class PostSearchComponent implements OnInit {
  posts: Post[] = []
  show_search = true;
  show_not_found = false;

  currentPage = 1;
  pageSize = 1;
  collectionSize = 0;

  _search: any

  @ViewChild('search', { static: false })
  set search(element: ElementRef<HTMLInputElement>) {
    if (element) {
      this._search = element.nativeElement
      element.nativeElement.focus()
    }
  }

  searchText: string = '';
  debounceTime = 250;
  inputValue = new Subject<string>();

  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  subscriptions: Subscription[] = []

  constructor(public modal: NgbModal, private blogService: BlogService) { }

  ngOnInit(): void {
    this.trigger.subscribe(currentValue => {
      this.currentPage = 1
      this.searchPosts(currentValue);
    })
  }

  searchPosts(currentValue: string) {
    if (currentValue != '' && currentValue.length > 0) {
      this.show_search = false
      const params: ListPostsRequestParams = {
        search: currentValue,
        page: this.currentPage,
        pageSize: this.pageSize,
      }
      this.subscriptions.forEach(sub => sub.unsubscribe());
      const subscription = this.blogService.listPosts(params).subscribe(value => {
        this.collectionSize = value.count || 0;

        this.posts = value.results || []
        if (value.results?.length == 0)
          this.show_not_found = true
        else
          this.show_not_found = false
      })
      this.subscriptions.push(subscription);
    }
  }

  close() {
    this.modal.dismissAll()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onInput(e: any) {
    const search = e.target.value

    if (search.length == 0) {
      this.posts = []
      this.show_not_found = false;
      this.show_search = true;
    }
    this.inputValue.next(search);
  }

  onClear() {
    this.searchText = '';
    this.posts = [];
    this.show_not_found = false;
    this.show_search = true;
    this.inputValue.next('');
    this._search.focus();
  }

  pageChange() {
    this.searchPosts(this.searchText);
  }
}
