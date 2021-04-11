import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CommentModel } from 'src/app/shared/models/comment.model';
import { SubjectsService } from 'src/app/shared/services/subjects.service';

@Component({
  selector: 'app-current-comment',
  templateUrl: './current-comment.component.html',
  styles: []
})
export class CurrentCommentComponent implements OnInit, OnDestroy {
  private currentCommentSub: Subscription;
  private showPopupSub: Subscription;  
  currentComment: CommentModel;
  showPopup: boolean

  constructor(
    private subjects: SubjectsService,
    private actRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.currentCommentSub = this.subjects.currentCommentSubject.subscribe((comment) => {
      this.currentComment = comment;
    });

    this.showPopupSub = this.subjects.showPopupSubject.subscribe((boolean) => {
      this.showPopup = boolean;
    });

    this.actRoute.params.subscribe((params) => {
      this.subjects.openCurrentComment(params['index']);     
    });
  }

  ngOnDestroy() {
    this.currentCommentSub.unsubscribe();
    this.showPopupSub.unsubscribe();
  }
}
