import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/404' },
  {
    path: 'posts/:id',
    loadComponent: () => import('./post/post').then(m => m.PostComponent)
  },
  {
    path: 'search/:category',
    loadComponent: () => import('./post-search-list/post-search-list').then(m => m.PostSearchListComponent)
  }
];
