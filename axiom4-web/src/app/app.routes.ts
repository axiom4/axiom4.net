import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./modules/page/page.routes').then(m => m.pageRoutes)
  },
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.routes').then(m => m.blogRoutes)
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./modules/main/components/main-page/main-page.component').then(m => m.MainPageComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./modules/main/components/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/404'
  }
];
