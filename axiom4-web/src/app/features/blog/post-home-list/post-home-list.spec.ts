import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { PostHomeListComponent } from './post-home-list';

describe('PostHomeListComponent', () => {
  let component: PostHomeListComponent;
  let fixture: ComponentFixture<PostHomeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PostHomeListComponent],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter([]),
      provideHttpClient(),
    ],
});
    fixture = TestBed.createComponent(PostHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
