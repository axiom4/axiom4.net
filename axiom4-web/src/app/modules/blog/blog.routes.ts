import { Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { PostSearchListComponent } from './components/post-search-list/post-search-list.component';

export const blogRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "/404" },
  { path: 'posts/:id', component: PostComponent },
  { path: 'search/:category', component: PostSearchListComponent }
];
