import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.modul';
import { CommentsComponent } from './comments.component';

@NgModule({
  declarations:[
    CommentsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: CommentsComponent}
    ])
  ]
})

export class CommentsModule{}