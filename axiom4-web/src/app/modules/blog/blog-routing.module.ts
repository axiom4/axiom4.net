import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { PostSearchListComponent } from './components/post-search-list/post-search-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "/404" },
  { path: 'posts/:id', component: PostComponent },
  { path: 'search/:category', component: PostSearchListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
