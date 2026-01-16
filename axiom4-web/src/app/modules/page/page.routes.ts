import { Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';

export const pageRoutes: Routes = [
  { path: ':slug', component: PageComponent }
];
