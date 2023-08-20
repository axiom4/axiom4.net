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
    const subscription = this.trigger.subscribe(currentValue => {
      if (currentValue != '') {
        const params: ListPostsRequestParams = {
          search: currentValue
        }
        this.blogService.listPosts(params).subscribe(posts => {
          this.posts = posts
          if (posts.length == 0) {

          }
        })
      }
    })
    this.subscriptions.push(subscription);
  }

  close() {
    this.modal.dismissAll()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }

  onClear() {
    this.inputValue.next('');

  }
}
