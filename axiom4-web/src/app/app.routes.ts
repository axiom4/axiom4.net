import { Routes } from '@angular/router';
import { MainPageComponent } from './modules/main/components/main-page/main-page.component';

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
    // Eager — not lazy. The home page is the most-visited route;
    // eliminating the lazy-chunk round-trip is worth the ~15 KiB
    // extra in the main bundle.
    path: '',
    pathMatch: 'full',
    component: MainPageComponent
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
