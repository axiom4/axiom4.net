import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './modules/main/components/page-not-found/page-not-found.component';
import { MainPageComponent } from './modules/main/components/main-page/main-page.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./modules/page/page.module').then(m => m.PageModule)
  },
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
