import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/main/components/page-not-found/page-not-found.component';
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
    path: '',
    pathMatch: 'full',
    component: MainPageComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: "/404"
  }
];
