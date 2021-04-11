import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.modul';
import { ManageCommentsComponent } from './manage-comments.component';
import { CurrentCommentComponent } from './current-comment/current-comment.component';
import { CommentArrayComponent } from '../shared/comment-array/comment-array.component';

@NgModule({
  declarations: [
    ManageCommentsComponent,
    CurrentCommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ManageCommentsComponent, children: [
        {path: '', component: CommentArrayComponent },
        {path: ':index', component: CurrentCommentComponent }
      ]}
    ])
  ]
})

export class ManageCommentsModule{}