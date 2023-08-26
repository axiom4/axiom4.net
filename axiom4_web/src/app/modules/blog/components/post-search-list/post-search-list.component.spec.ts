import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSearchListComponent } from './post-search-list.component';

describe('PostSearchListComponent', () => {
  let component: PostSearchListComponent;
  let fixture: ComponentFixture<PostSearchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSearchListComponent]
    });
    fixture = TestBed.createComponent(PostSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
