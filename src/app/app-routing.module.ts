import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/comments', pathMatch: 'full'},
  {path: 'comments', loadChildren: () => import ('./comments/comments.module').then(m => m.CommentsModule)},
  {path: 'manage-comments', loadChildren: () => import ('./manage-comments/manage-comments.module').then(m => m.ManageCommentsModule)},
  {path: '**', redirectTo: '/comments'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
