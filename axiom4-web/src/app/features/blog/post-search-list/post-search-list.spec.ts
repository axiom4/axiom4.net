import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { PostSearchListComponent } from './post-search-list';

describe('PostSearchListComponent', () => {
  let component: PostSearchListComponent;
  let fixture: ComponentFixture<PostSearchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PostSearchListComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      provideHttpClient(),
    ],
});
    fixture = TestBed.createComponent(PostSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
