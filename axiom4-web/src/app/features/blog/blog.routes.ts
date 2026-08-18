import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/404' },
  {
    path: 'posts/:id',
    loadComponent: () => import('./components/post/post.component').then(m => m.PostComponent)
  },
  {
    path: 'search/:category',
    loadComponent: () => import('./components/post-search-list/post-search-list.component').then(m => m.PostSearchListComponent)
  }
];
