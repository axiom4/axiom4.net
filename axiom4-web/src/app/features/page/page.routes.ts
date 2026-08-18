import { Routes } from '@angular/router';

export const pageRoutes: Routes = [
  {
    path: ':slug',
    loadComponent: () => import('./page/page').then(m => m.PageComponent)
  }
];
