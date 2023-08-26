import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHomeListComponent } from './post-home-list.component';

describe('PostHomeListComponent', () => {
  let component: PostHomeListComponent;
  let fixture: ComponentFixture<PostHomeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostHomeListComponent]
    });
    fixture = TestBed.createComponent(PostHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
