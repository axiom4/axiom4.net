import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./features/page/page.routes').then((m) => m.pageRoutes),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./features/blog/blog.routes').then((m) => m.blogRoutes),
  },
  {
    // Lazy-loaded but immediately preloaded by PreloadAllModules, so
    // there is no perceived delay for home-page visitors while non-home
    // visitors benefit from a smaller initial bundle.
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/main/main-page/main-page').then(
        (m) => m.MainPageComponent,
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./features/main/page-not-found/page-not-found').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/404',
  },
];
