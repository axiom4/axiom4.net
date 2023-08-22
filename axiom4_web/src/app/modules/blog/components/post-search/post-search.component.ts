import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { BlogService, ListPostsRequestParams, Post } from 'src/app/modules/core/api/v1';


@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
})
export class PostSearchComponent implements OnInit {
  posts: Post[] = []
  show_search = true;
  show_not_found = false

  @ViewChild('search', { static: false })
  set search(element: ElementRef<HTMLInputElement>) {
    if (element) {
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
      if (currentValue != '' && currentValue.length > 0) {
        this.show_search = false
        const params: ListPostsRequestParams = {
          search: currentValue
        }
        this.subscriptions.forEach(sub => sub.unsubscribe());
        const subscription = this.blogService.listPosts(params).subscribe(posts => {
          this.posts = posts
          if (posts.length == 0)
            this.show_not_found = true
          else
            this.show_not_found = false
        })
        this.subscriptions.push(subscription);
      }
    })
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
      this.show_not_found = false
      this.show_search = true
    }
    this.inputValue.next(search);
  }

  onClear() {
    this.posts = []
    this.inputValue.next('');
  }
}
