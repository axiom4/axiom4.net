import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { TagCloudComponent } from './components/tag-cloud/tag-cloud.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "/404" },
  { path: 'posts/:id', component: PostComponent },
  { path: 'search/:category_id', component: TagCloudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
