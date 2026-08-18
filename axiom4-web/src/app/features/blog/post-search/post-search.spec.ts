import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSearchComponent } from './post-search';

describe('PostSearchComponent', () => {
  let component: PostSearchComponent;
  let fixture: ComponentFixture<PostSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PostSearchComponent]
});
    fixture = TestBed.createComponent(PostSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
