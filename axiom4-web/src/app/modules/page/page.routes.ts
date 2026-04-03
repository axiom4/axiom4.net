import { Routes } from '@angular/router';

export const pageRoutes: Routes = [
  {
    path: ':slug',
    loadComponent: () => import('./components/page/page.component').then(m => m.PageComponent)
  }
];
